<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
require_once("../conexion.php");

if (!isset($_GET['id'])) {
    http_response_code(400);
    echo json_encode(['error' => 'ID de blog no especificado']);
    exit;
}

$id = intval($_GET['id']);

try {
    $conexion = new Conexion();
    $pdo = $conexion->conectar();

    $stmt = $pdo->prepare("SELECT id, titulo, contenido, imagen2, autor, fecha, resumen, video_url, categoria FROM blogs WHERE id = :id");
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();

    $blog = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($blog) {

        ///http://localhost/web/Back/imagenes_blogs
        //https://corporativosie.com.mx/web/Back/imagenes_blogs/
$blog['imagen2'] = "https://corporativosie.com.mx/web/Back/imagenes_blogs/" . $blog['imagen2'];
        echo json_encode($blog);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Blog no encontrado']);
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Error de base de datos: ' . $e->getMessage()]);
}
