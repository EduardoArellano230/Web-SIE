<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
require_once("../conexion.php");

try {
    $conexion = new Conexion();
    $db = $conexion->conectar();

    $stmt = $db->query("SELECT imagen, titulo, descripcion, categoria FROM carrusel ORDER BY id ASC");
    $slides = [];

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $row['imagen'] = "https://corporativosie.com.mx/web/Back/imagenes_carrusel/" . $row['imagen'];
        $slides[] = $row;
    }

    echo json_encode($slides);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "error" => true,
        "mensaje" => "Error al obtener el carrusel: " . $e->getMessage()
    ]);
}
?>
