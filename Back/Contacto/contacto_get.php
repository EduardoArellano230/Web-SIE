<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once("../conexion.php");

try {
    $conexion = new Conexion();
    $bd = $conexion->conectar();

    $stmt = $bd->prepare("SELECT id,nombre, correo, telefono, mensaje, contpaqi, aspel, servicio,status,fecha FROM contacto");
    $stmt->execute();

    $resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "success" => true,
        "data" => $resultados
    ]);
} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => "Error al obtener los datos: " . $e->getMessage()
    ]);
}
?>
