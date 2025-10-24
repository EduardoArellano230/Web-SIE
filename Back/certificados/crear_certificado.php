<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

require_once("../conexion.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = $_POST['nombre'] ?? '';

    if (empty($nombre)) {
        echo json_encode(["success" => false, "message" => "El nombre del certificado es obligatorio."]);
        exit;
    }

    if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] === UPLOAD_ERR_OK) {
        $imagenTmp = $_FILES['imagen']['tmp_name'];
        $imagenNombre = basename($_FILES['imagen']['name']);
        $nombreFinal = uniqid() . "_" . $imagenNombre;
        $rutaRelativa = "../imagenes_certificados/" . $nombreFinal;

        if (!is_dir("../imagenes_certificados")) {
            mkdir("../imagenes_certificados", 0777, true);
        }

        if (move_uploaded_file($imagenTmp, $rutaRelativa)) {
            try {
                $conexion = new Conexion();
                $bd = $conexion->conectar();

                $stmt = $bd->prepare("INSERT INTO certificados (nombre, archivo) VALUES (?, ?)");
                $stmt->execute([$nombre, $nombreFinal]);

                echo json_encode(["success" => true, "message" => "Certificado guardado correctamente."]);
            } catch (PDOException $e) {
                echo json_encode(["success" => false, "message" => "Error en la base de datos: " . $e->getMessage()]);
            }
        } else {
            echo json_encode(["success" => false, "message" => "Error al mover la imagen al servidor."]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "No se subió una imagen válida."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Método no permitido."]);
}
?>
