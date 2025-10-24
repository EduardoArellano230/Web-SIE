<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once("../conexion.php");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $categoria = $_GET['categoria'] ?? '';

    $conexion = new Conexion();
    $bd = $conexion->conectar();

    $stmt = $bd->prepare("SELECT * FROM blogs WHERE categoria = ?");
    $stmt->execute([$categoria]);
    $resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($resultados as &$row) {
        $row['imagen'] = "https://corporativosie.com.mx/web/Back/imagenes_blogs/" . $row['imagen'];
    }

    echo json_encode(["success" => true, "data" => $resultados]);
} else {
    echo json_encode(["success" => false, "message" => "Método no permitido."]);
}
