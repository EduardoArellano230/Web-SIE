<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require_once("../conexionlocal.php");

$id = $_GET['id'] ?? null;
if (!$id) {
    echo json_encode(['error' => 'ID no recibido']);
    exit;
}

try {
    $conexion = new Conexion();
    $pdo = $conexion->conectar();

    // Obtener datos básicos del miembro
    $stmt = $pdo->prepare("SELECT id, nombre, rol, descripcion, imagen FROM equipo WHERE id = ?");
    $stmt->execute([$id]);
    $miembro = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$miembro) {
        echo json_encode(['error' => 'Miembro no encontrado']);
        exit;
    }

    // Obtener certificados asignados (solo ids)
    $stmtCert = $pdo->prepare("SELECT id_certificado FROM equipo_certificado WHERE id_equipo = ?");
    $stmtCert->execute([$id]);
    $certificadosIds = $stmtCert->fetchAll(PDO::FETCH_COLUMN);

    $miembro['certificadosIds'] = $certificadosIds;

    // Si quieres, agrega ruta completa imagen
    $miembro['imagen'] = !empty($miembro['imagen']) ? "https://corporativosie.com.mx/web/Back/imagenes_equipo/" . $miembro['imagen'] : null;

    echo json_encode($miembro);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Error en la base de datos: ' . $e->getMessage()]);
}
