<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: DELETE, POST, OPTIONS");
header("Content-Type: application/json");

require_once("../conexion.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents("php://input"), true);
    $id = $input['id'] ?? null;

    if ($id === null) {
        echo json_encode(["success" => false, "message" => "ID no proporcionado"]);
        exit;
    }

    try {
        $conexion = new Conexion();
        $bd = $conexion->conectar();

        $stmt = $bd->prepare("DELETE FROM categoria_soporte WHERE id = ?");
        $stmt->execute([$id]);

        echo json_encode(["success" => true, "message" => "Categoría eliminada correctamente."]);
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "message" => "Error en la base de datos: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Método no permitido"]);
}
