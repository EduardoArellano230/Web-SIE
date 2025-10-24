<?php
header("Access-Control-Allow-Origin: *"); 
header("Content-Type: application/json");

require_once("../conexion.php");

$conexion = new Conexion();
$bd = $conexion->conectar();

$stmt = $bd->query("SELECT nombre, telefono, fecha FROM siigo");
$resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode([
    "success" => true,
    "data" => $resultado
]);
?>
