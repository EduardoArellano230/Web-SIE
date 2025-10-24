<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once("../conexion.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'] ?? null;

    if ($id === null) {
        echo json_encode(["success" => false, "message" => "ID no proporcionado."]);
        exit;
    }

    try {
        $conexion = new Conexion();
        $bd = $conexion->conectar();

        $stmt = $bd->prepare("DELETE FROM contacto WHERE id = ?");
        $stmt->execute([$id]);

        if ($stmt->rowCount() > 0) {
            echo json_encode(["success" => true, "message" => "Contacto eliminado correctamente."]);
        } else {
            echo json_encode(["success" => false, "message" => "No se encontró el contacto con el ID proporcionado."]);
        }
    } catch (Exception $e) {
        echo json_encode([
            "success" => false,
            "message" => "Error al eliminar el contacto: " . $e->getMessage()
        ]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Método no permitido."]);
}
?>
