<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once("../conexion.php");

$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'] ?? null;

if ($id) {
    try {
        $conexion = new Conexion();
        $bd = $conexion->conectar();
        $stmtCheck = $bd->prepare("SELECT archivo FROM certificados WHERE id = ?");
        $stmtCheck->execute([$id]);
        $certificado = $stmtCheck->fetch(PDO::FETCH_ASSOC);

        if (!$certificado) {
            echo json_encode(["success" => false, "message" => "Certificado no encontrado."]);
            exit;
        }

        $imagen = $certificado['archivo'];
        $stmtRel = $bd->prepare("DELETE FROM equipo_certificado WHERE id_certificado = ?");
        $stmtRel->execute([$id]);
        $stmt = $bd->prepare("DELETE FROM certificados WHERE id = ?");
        $stmt->execute([$id]);
        $ruta = "../imagenes_certificados/" . $imagen;
        if (file_exists($ruta)) {
            unlink($ruta);
        }

        echo json_encode(["success" => true]);
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "message" => "Error al eliminar: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "message" => "ID no recibido"]);
}