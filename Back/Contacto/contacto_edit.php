<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once("../conexion.php");

$data = json_decode(file_get_contents("php://input"), true);

if ($data && isset($data['id']) && isset($data['status'])) {
    $conexion = new Conexion();
    $bd = $conexion->conectar();

    $stmt = $bd->prepare("UPDATE contacto SET status = ? WHERE id = ?");
    $success = $stmt->execute([
        $data['status'],
        $data['id']
    ]);

    echo json_encode(["success" => $success]);
} else {
    echo json_encode(["success" => false, "message" => "Datos incompletos"]);
}
