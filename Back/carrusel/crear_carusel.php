<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

require_once("../conexion.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $titulo = $_POST['titulo'] ?? '';
    $descripcion = $_POST['descripcion'] ?? '';
    $categoria = $_POST['categoria'] ?? 'carrusel';

    if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] === UPLOAD_ERR_OK) {
        $imagenTmp = $_FILES['imagen']['tmp_name'];
        $imagenNombre = basename($_FILES['imagen']['name']);
        $nombreFinal = uniqid() . "_" . $imagenNombre;
        $rutaRelativa = "../imagenes_carrusel/" . $nombreFinal;

        if (!is_dir("../imagenes_carrusel")) {
            mkdir("../imagenes_carrusel", 0777, true);
        }

        if (move_uploaded_file($imagenTmp, $rutaRelativa)) {
            try {
                $conexion = new Conexion();
                $bd = $conexion->conectar();

                $stmt = $bd->prepare("INSERT INTO carrusel (imagen, titulo, descripcion, categoria) VALUES (?, ?, ?, ?)");
                $stmt->execute([
                    $nombreFinal,
                    $titulo,
                    $descripcion,
                    $categoria
                ]);

                echo json_encode(["success" => true, "message" => "Imagen de carrusel guardada correctamente con categoría."]);
            } catch (PDOException $e) {
                echo json_encode(["success" => false, "message" => "Error en la base de datos: " . $e->getMessage()]);
            }
        } else {
            echo json_encode(["success" => false, "message" => "Error al mover la imagen al servidor."]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "No se subió una imagen válida."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Método no permitido."]);
}
?>
