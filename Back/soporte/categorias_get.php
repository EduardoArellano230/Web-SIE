<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require_once("../conexion.php");

try {
    $conexion = new Conexion();
    $db = $conexion->conectar();

    $stmt = $db->query("SELECT id, nombre FROM categoria_soporte ORDER BY nombre ASC");
    $categorias = $stmt->fetchAll(PDO::FETCH_ASSOC); // <-- clave para que funcione bien con React

    echo json_encode([
        "success" => true,
        "data" => $categorias
    ]);
} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "mensaje" => "Error al obtener las categorías: " . $e->getMessage()
    ]);
}
