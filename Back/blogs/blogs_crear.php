<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once("../conexion.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $titulo = $_POST['titulo'] ?? '';
    $resumen = $_POST['resumen'] ?? '';
    $contenido = $_POST['contenido'] ?? '';
    $autor = $_POST['autor'] ?? '';
    $fecha = $_POST['fecha'] ?? '';
    $video_url = $_POST['video_url'] ?? null;
    $imagen1_path = null;
    $imagen2_path = null;
    $categoria = $_POST['categoria'] ?? '';


    // Crear carpeta si no existe
    $uploadDir = "../imagenes_blogs/";
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    // Procesar imagen 1
    if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] === UPLOAD_ERR_OK) {
        $imagenTmp = $_FILES['imagen']['tmp_name'];
        $imagenNombre = basename($_FILES['imagen']['name']);
        $imagen1_path = $uploadDir . uniqid() . "_" . $imagenNombre;
        move_uploaded_file($imagenTmp, $imagen1_path);
    }

    // Procesar imagen 2
    if (isset($_FILES['imagen2']) && $_FILES['imagen2']['error'] === UPLOAD_ERR_OK) {
        $imagenTmp2 = $_FILES['imagen2']['tmp_name'];
        $imagenNombre2 = basename($_FILES['imagen2']['name']);
        $imagen2_path = $uploadDir . uniqid() . "_" . $imagenNombre2;
        move_uploaded_file($imagenTmp2, $imagen2_path);
    }

    if ($imagen1_path && $imagen2_path) {
        $conexion = new Conexion();
        $bd = $conexion->conectar();

        $stmt = $bd->prepare("INSERT INTO blogs (titulo, resumen, contenido, imagen, imagen2, autor, fecha, video_url, categoria) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([
            $titulo,
            $resumen,
            $contenido,
            $imagen1_path,
            $imagen2_path,
            $autor,
            $fecha,
            $video_url,
            $categoria
        ]);

        echo json_encode(["success" => true, "message" => "Blog guardado con dos imágenes."]);
    } else {
        echo json_encode(["success" => false, "message" => "Error al subir ambas imágenes."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Método no permitido."]);
}
