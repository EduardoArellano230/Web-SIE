<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

require_once("../conexion.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    $id = $data['id'] ?? null;

    if ($id === null) {
        echo json_encode(["success" => false, "message" => "ID no proporcionado."]);
        exit;
    }

    $conexion = new Conexion();
    $bd = $conexion->conectar();

    // Obtener ambas rutas de imagen
    $stmtImagen = $bd->prepare("SELECT imagen, imagen2 FROM blogs WHERE id = ?");
    $stmtImagen->execute([$id]);
    $blog = $stmtImagen->fetch(PDO::FETCH_ASSOC);

    if (!$blog) {
        echo json_encode(["success" => false, "message" => "Blog no encontrado."]);
        exit;
    }

    $rutaImagen1 = $blog['imagen1'] ?? null;
    $rutaImagen2 = $blog['imagen2'] ?? null;

    // Eliminar el registro
    $stmtDelete = $bd->prepare("DELETE FROM blogs WHERE id = ?");
    $resultado = $stmtDelete->execute([$id]);

    if ($resultado) {
        if ($rutaImagen1 && file_exists($rutaImagen1)) {
            unlink($rutaImagen1);
        }
        if ($rutaImagen2 && file_exists($rutaImagen2)) {
            unlink($rutaImagen2);
        }

        echo json_encode(["success" => true, "message" => "Blog e imágenes eliminados correctamente."]);
    } else {
        echo json_encode(["success" => false, "message" => "Error al eliminar el blog."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Método no permitido."]);
}
?>
