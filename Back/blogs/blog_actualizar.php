<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

require_once("../conexion.php");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
    exit;
}

try {
    $conexion = new Conexion();
    $pdo = $conexion->conectar();

    if (!isset($_POST['id']) || empty($_POST['id'])) {
        http_response_code(400);
        echo json_encode(['error' => 'ID del blog es requerido']);
        exit;
    }

    $id = intval($_POST['id']);
    $titulo = $_POST['titulo'] ?? '';
    $resumen = $_POST['resumen'] ?? '';
    $contenido = $_POST['contenido'] ?? '';
    $autor = $_POST['autor'] ?? '';
    $fecha = date("Y-m-d");
    $video_url = $_POST['video_url'] ?? null;
    $nuevaImagen1 = null;
    $nuevaImagen2 = null;
    $categoria = $_POST['categoria'] ?? '';


    // Procesar imagen1
    if (isset($_FILES['imagen1']) && $_FILES['imagen1']['error'] === UPLOAD_ERR_OK) {
        $tmpNombre = $_FILES['imagen1']['tmp_name'];
        $nombreOriginal = basename($_FILES['imagen1']['name']);
        $nuevaImagen1 = uniqid("img1_") . "_" . $nombreOriginal;
        $rutaDestino = "../imagenes_blogs/" . $nuevaImagen1;

        if (!move_uploaded_file($tmpNombre, $rutaDestino)) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al guardar imagen1']);
            exit;
        }
    }

    // Procesar imagen2
    if (isset($_FILES['imagen2']) && $_FILES['imagen2']['error'] === UPLOAD_ERR_OK) {
        $tmpNombre = $_FILES['imagen2']['tmp_name'];
        $nombreOriginal = basename($_FILES['imagen2']['name']);
        $nuevaImagen2 = uniqid("img2_") . "_" . $nombreOriginal;
        $rutaDestino = "../imagenes_blogs/" . $nuevaImagen2;

        if (!move_uploaded_file($tmpNombre, $rutaDestino)) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al guardar imagen2']);
            exit;
        }
    }

    // Construir consulta SQL dinámica
    $sql = "UPDATE blogs SET 
                titulo = :titulo, 
                resumen = :resumen, 
                contenido = :contenido, 
                autor = :autor, 
                fecha = :fecha, 
                video_url = :video_url,
                categoria=:categoria";

    if ($nuevaImagen1) {
        $sql .= ", imagen1 = :imagen1";
    }
    if ($nuevaImagen2) {
        $sql .= ", imagen2 = :imagen2";
    }

    $sql .= " WHERE id = :id";

    $stmt = $pdo->prepare($sql);

    // Bind comunes
    $stmt->bindParam(':titulo', $titulo);
    $stmt->bindParam(':resumen', $resumen);
    $stmt->bindParam(':contenido', $contenido);
    $stmt->bindParam(':autor', $autor);
    $stmt->bindParam(':fecha', $fecha);
    $stmt->bindParam(':video_url', $video_url);
    $stmt->bindParam(':categoria', $categoria);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);

    // Bind imágenes si existen
    if ($nuevaImagen1) {
        $stmt->bindParam(':imagen1', $nuevaImagen1);
    }
    if ($nuevaImagen2) {
        $stmt->bindParam(':imagen2', $nuevaImagen2);
    }

    $stmt->execute();

    echo json_encode(['mensaje' => 'Blog actualizado correctamente']);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Error en la base de datos: ' . $e->getMessage()]);
}
?>
