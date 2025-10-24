<?php  
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require_once("./conexion.php");

$data = json_decode(file_get_contents("php://input"), true);

if ($data && isset($data['nombre']) && isset($data['telefono'])) {
    try {
        $conexion = new Conexion();
        $bd = $conexion->conectar();

        $stmt = $bd->prepare("INSERT INTO siigo (nombre, telefono, fecha) VALUES (?, ?, CURDATE())");

        $stmt->execute([
            $data['nombre'],
            $data['telefono']
        ]);

        echo json_encode(["success" => true, "message" => "Datos guardados correctamente."]);
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "message" => "Error en la base de datos: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Datos incompletos."]);
}
