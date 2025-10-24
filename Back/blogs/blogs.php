<?php
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
require_once("../conexion.php"); 

try {
    $conexion = new Conexion();
    $pdo = $conexion->conectar();

    $stmt = $pdo->query("SELECT id, titulo, resumen, imagen, imagen2, autor, fecha, video_url, categoria FROM blogs ORDER BY fecha DESC");
    $blogs = [];

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $row['imagen'] = "https://corporativosie.com.mx/web/Back/imagenes_blogs/" . $row['imagen'];
        $row['imagen2'] = "https://corporativosie.com.mx/web/Back/imagenes_blogs/" . $row['imagen2']; 

        $blogs[] = $row;
    }

    echo json_encode($blogs);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Error en la conexión: ' . $e->getMessage()]);
}
?>
