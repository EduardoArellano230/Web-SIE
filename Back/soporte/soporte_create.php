<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

require_once("../conexion.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $categoria = $_POST['categoria'] ?? '';

    if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] === UPLOAD_ERR_OK) {
        $imagenTmp = $_FILES['imagen']['tmp_name'];
        $imagenNombre = basename($_FILES['imagen']['name']);
        $nombreFinal = uniqid() . "_" . $imagenNombre;
        $rutaRelativa = "../imagenes_soporte/" . $nombreFinal;

        if (!is_dir("../imagenes_soporte")) {
            mkdir("../imagenes_soporte", 0777, true);
        }

        if (move_uploaded_file($imagenTmp, $rutaRelativa)) {
            try {
                $conexion = new Conexion();
                $bd = $conexion->conectar();

                $stmt = $bd->prepare("INSERT INTO soporte (imagen, categoria) VALUES (?, ?)");
                $stmt->execute([
                    $nombreFinal,
                    $categoria
                ]);

                echo json_encode(["success" => true, "message" => "Soporte creado correctamente."]);
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
