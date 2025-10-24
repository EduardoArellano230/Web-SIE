<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

require_once("../conexion.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = $_POST['nombre'] ?? '';
    $rol = $_POST['rol'] ?? '';
    $descripcion = $_POST['descripcion'] ?? '';
    $certificados = $_POST['certificados'] ?? [];

    if (!$nombre || !isset($_FILES['imagen']) || $_FILES['imagen']['error'] !== UPLOAD_ERR_OK) {
        echo json_encode(["success" => false, "message" => "Faltan datos obligatorios o imagen inválida."]);
        exit;
    }

    // Subir imagen
    $imagenTmp = $_FILES['imagen']['tmp_name'];
    $imagenNombre = basename($_FILES['imagen']['name']);
    $nombreFinal = uniqid() . "_" . $imagenNombre;
    $rutaRelativa = "../imagenes_equipo/" . $nombreFinal;

    if (!is_dir("../imagenes_equipo")) {
        mkdir("../imagenes_equipo", 0777, true);
    }

    if (!move_uploaded_file($imagenTmp, $rutaRelativa)) {
        echo json_encode(["success" => false, "message" => "Error al mover la imagen al servidor."]);
        exit;
    }

    try {
        $conexion = new Conexion();
        $db = $conexion->conectar();

        // Insertar empleado
        $stmt = $db->prepare("INSERT INTO equipo (nombre, rol, descripcion, imagen) VALUES (?, ?, ?, ?)");
        $stmt->execute([$nombre, $rol, $descripcion, $nombreFinal]);

        $idEquipo = $db->lastInsertId();

        // Insertar relaciones con certificados
        if (is_array($certificados) && !empty($certificados)) {
            $stmtCert = $db->prepare("INSERT INTO equipo_certificado (id_equipo, id_certificado) VALUES (?, ?)");
            foreach ($certificados as $idCert) {
                $stmtCert->execute([$idEquipo, $idCert]);
            }
        }

        echo json_encode([
            "success" => true,
            "message" => "Empleado creado correctamente.",
            "id_equipo" => $idEquipo
        ]);
    } catch (PDOException $e) {
        echo json_encode([
            "success" => false,
            "message" => "Error en la base de datos: " . $e->getMessage()
        ]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Método no permitido."]);
}
