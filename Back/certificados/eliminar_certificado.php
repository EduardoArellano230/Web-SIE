<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once("../conexionlocal.php");

$data = json_decode(file_get_contents("php://input"), true);
$imagen = $data['imagen'] ?? null;

if ($imagen) {
    try {
        $conexion = new Conexion();
        $bd = $conexion->conectar();
        $stmtCheck = $bd->prepare("SELECT id FROM certificados WHERE archivo = ?");
        $stmtCheck->execute([$imagen]);
        $certificado = $stmtCheck->fetch(PDO::FETCH_ASSOC);

        if (!$certificado) {
            echo json_encode(["success" => false, "message" => "Certificado no encontrado."]);
            exit;
        }
        $certificadoId = $certificado['id'];
        $stmtRel = $bd->prepare("DELETE FROM equipo_certificado WHERE id_certificado = ?");
        $stmtRel->execute([$certificadoId]);
        $stmt = $bd->prepare("DELETE FROM certificados WHERE id = ?");
        $stmt->execute([$certificadoId]);
        $ruta = "../imagenes_certificados/" . $imagen;
        if (file_exists($ruta)) {
            unlink($ruta);
        }

        echo json_encode(["success" => true]);
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "message" => "Error al eliminar: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Nombre de imagen no recibido"]);
}
?>
