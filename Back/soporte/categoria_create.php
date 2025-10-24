<?php
// Encabezados
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

// Conexión
require_once("../conexion.php");

try {
    // Crear conexión
    $conexionDB = new Conexion();
    $conexion = $conexionDB->conectar();
} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => "Error al conectar a la base de datos: " . $e->getMessage()
    ]);
    exit;
}

// Leer datos
$data = json_decode(file_get_contents("php://input"), true);

// Validar
if (!isset($data['nombre']) || empty(trim($data['nombre']))) {
    echo json_encode([
        "success" => false,
        "message" => "El nombre de la categoría es obligatorio."
    ]);
    exit;
}

$nombre = trim($data['nombre']);

try {
    // Insertar
    $stmt = $conexion->prepare("INSERT INTO categoria_soporte (nombre) VALUES (:nombre)");
    $stmt->bindParam(':nombre', $nombre);

    if ($stmt->execute()) {
        echo json_encode([
            "success" => true,
            "message" => "Categoría registrada correctamente."
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "No se pudo guardar la categoría."
        ]);
    }
} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => "Error en la base de datos: " . $e->getMessage()
    ]);
}
?>
