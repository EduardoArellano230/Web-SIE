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

        // Obtener nombre de imagen antes de eliminar
        $stmtImg = $bd->prepare("SELECT imagen FROM equipo WHERE id = ?");
        $stmtImg->execute([$id]);
        $fila = $stmtImg->fetch(PDO::FETCH_ASSOC);

        if (!$fila) {
            echo json_encode(["success" => false, "message" => "Integrante no encontrado."]);
            exit;
        }

        $imagen = $fila['imagen'];

        // Eliminar registros en tabla intermedia si hay certificados relacionados
        $stmtCert = $bd->prepare("DELETE FROM equipo_certificado WHERE id_equipo = ?");
        $stmtCert->execute([$id]);

        // Eliminar empleado
        $stmt = $bd->prepare("DELETE FROM equipo WHERE id = ?");
        $stmt->execute([$id]);

        // Eliminar imagen si existe
        if ($imagen) {
            $ruta = "../imagenes_equipo/" . $imagen;
            if (file_exists($ruta)) {
                unlink($ruta);
            }
        }

        echo json_encode(["success" => true]);
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "message" => "Error al eliminar: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "message" => "ID no recibido"]);
}
?>
