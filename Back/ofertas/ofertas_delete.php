<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once("../conexion.php");

$data = json_decode(file_get_contents("php://input"), true);
$imagen = $data['imagen'] ?? null;

if ($imagen) {
    try {
        $conexion = new Conexion();
        $bd = $conexion->conectar();

        // Elimina la fila de la base de datos
        $stmt = $bd->prepare("DELETE FROM ofertas WHERE imagen = ?");
        $stmt->execute([$imagen]);

        // Intenta eliminar la imagen del servidor (ajusta la ruta si es distinta)
        $ruta = "../imagenes_ofertas/" . $imagen;
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
