<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require_once("../conexion.php");

try {
    $conexion = new Conexion();
    $db = $conexion->conectar();

    // Validar si se pasó la categoría (nombre)
$categoria = isset($_GET['categoria']) ? intval($_GET['categoria']) : 0;

    if ($categoria) {
        $stmt = $db->prepare("
            SELECT s.imagen, c.nombre AS categoria 
            FROM soporte s
            JOIN categoria_soporte c ON s.categoria = c.id
            WHERE c.id = :categoria
            ORDER BY s.id ASC
        ");
        $stmt->bindParam(':categoria', $categoria);
        $stmt->execute();
    } else {
        $stmt = $db->query("
            SELECT s.imagen, c.nombre AS categoria
            FROM soporte s
            JOIN categoria_soporte c ON s.categoria = c.id
            ORDER BY s.id ASC
        ");
    }

    $slides = [];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $row['imagen'] = "https://corporativosie.com.mx/web/Back/imagenes_soporte/" . $row['imagen'];
        $slides[] = $row;
    }

    echo json_encode([
        "success" => true,
        "data" => $slides
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "mensaje" => "Error al obtener las imágenes: " . $e->getMessage()
    ]);
}
