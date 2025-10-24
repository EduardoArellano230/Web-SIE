<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once("../conexion.php");

try {
    $conexion = new Conexion();
    $bd = $conexion->conectar();

    // Solo POST
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode(["success" => false, "message" => "Método no permitido"]);
        exit;
    }

    $id = $_POST['id'] ?? null;
    $nombre = $_POST['nombre'] ?? '';
    $rol = $_POST['rol'] ?? '';
    $descripcion = $_POST['descripcion'] ?? '';
    $certificados = isset($_POST['certificados']) ? json_decode($_POST['certificados'], true) : [];
    
    if (!$id) {
        echo json_encode(["success" => false, "message" => "ID es requerido"]);
        exit;
    }

    // Primero obtenemos la imagen actual para borrarla si se cambia
    $stmtImg = $bd->prepare("SELECT imagen FROM equipo WHERE id = ?");
    $stmtImg->execute([$id]);
    $row = $stmtImg->fetch(PDO::FETCH_ASSOC);
    $imagenActual = $row ? $row['imagen'] : null;

    // Procesar imagen si se envió
    $nuevaImagenNombre = null;
    if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] === UPLOAD_ERR_OK) {
        $tmpNombre = $_FILES['imagen']['tmp_name'];
        $nombreOriginal = basename($_FILES['imagen']['name']);
        $nuevaImagenNombre = uniqid() . "_" . $nombreOriginal;
        $rutaDestino = "../imagenes_equipo/" . $nuevaImagenNombre;

        if (!move_uploaded_file($tmpNombre, $rutaDestino)) {
            echo json_encode(["success" => false, "message" => "Error al guardar la imagen"]);
            exit;
        }

        // Borrar imagen anterior si existe
        if ($imagenActual && file_exists("../imagenes_equipo/" . $imagenActual)) {
            unlink("../imagenes_equipo/" . $imagenActual);
        }
    }

    // Actualizar datos en equipo
    if ($nuevaImagenNombre) {
        $sql = "UPDATE equipo SET nombre = ?, rol = ?, descripcion = ?, imagen = ? WHERE id = ?";
        $params = [$nombre, $rol, $descripcion, $nuevaImagenNombre, $id];
    } else {
        $sql = "UPDATE equipo SET nombre = ?, rol = ?, descripcion = ? WHERE id = ?";
        $params = [$nombre, $rol, $descripcion, $id];
    }

    $stmtUpdate = $bd->prepare($sql);
    $stmtUpdate->execute($params);

    // Actualizar certificados: borrar los antiguos y agregar los nuevos
    $stmtDelete = $bd->prepare("DELETE FROM equipo_certificado WHERE id_equipo = ?");
    $stmtDelete->execute([$id]);

    if (!empty($certificados) && is_array($certificados)) {
        $stmtInsert = $bd->prepare("INSERT INTO equipo_certificado (id_equipo, id_certificado) VALUES (?, ?)");
        foreach ($certificados as $certId) {
            $stmtInsert->execute([$id, $certId]);
        }
    }

    echo json_encode(["success" => true, "message" => "Equipo actualizado correctamente"]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Error en la base de datos: " . $e->getMessage()]);
}
?>
