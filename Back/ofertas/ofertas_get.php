<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require_once("../conexion.php");

try {
    $conexion = new Conexion();
    $db = $conexion->conectar();

    $stmt = $db->query("SELECT imagen, titulo, descripcion, categoria FROM ofertas ORDER BY id ASC");
    $ofertas = [];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $row['imagen'] = "https://corporativosie.com.mx/web/Back/imagenes_ofertas/" . $row['imagen'];
        $ofertas[] = $row;
    }

    echo json_encode($ofertas);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "error" => true,
        "mensaje" => "Error al obtener las ofertas: " . $e->getMessage()
    ]);
}
?>
