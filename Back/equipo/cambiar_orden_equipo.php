<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once("../conexion.php");

try {
    $input = json_decode(file_get_contents("php://input"), true);

    if (!isset($input['id']) || !isset($input['direccion'])) {
        throw new Exception("Faltan parámetros requeridos.");
    }

    $id = (int)$input['id'];
    $direccion = $input['direccion']; // 'up' o 'down'

    $conexion = new Conexion();
    $db = $conexion->conectar();

    // Obtener el orden actual del miembro
    $stmt = $db->prepare("SELECT id, orden FROM equipo WHERE id = :id");
    $stmt->execute([':id' => $id]);
    $miembro = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$miembro) {
        throw new Exception("Miembro no encontrado.");
    }

    $orden_actual = $miembro['orden'];

    // Buscar el miembro con el que se va a intercambiar el orden
    if ($direccion === 'up') {
        $stmtSwap = $db->prepare("SELECT id, orden FROM equipo WHERE orden < :orden ORDER BY orden DESC LIMIT 1");
    } else if ($direccion === 'down') {
        $stmtSwap = $db->prepare("SELECT id, orden FROM equipo WHERE orden > :orden ORDER BY orden ASC LIMIT 1");
    } else {
        throw new Exception("Dirección inválida.");
    }

    $stmtSwap->execute([':orden' => $orden_actual]);
    $otro = $stmtSwap->fetch(PDO::FETCH_ASSOC);

    if (!$otro) {
        echo json_encode([
            "success" => false,
            "message" => "No se puede mover más en esa dirección."
        ]);
        exit;
    }

    // Intercambiar los valores de orden
    $db->beginTransaction();

    $stmtUpdate1 = $db->prepare("UPDATE equipo SET orden = :orden WHERE id = :id");
    $stmtUpdate1->execute([
        ':orden' => $otro['orden'],
        ':id' => $miembro['id']
    ]);

    $stmtUpdate2 = $db->prepare("UPDATE equipo SET orden = :orden WHERE id = :id");
    $stmtUpdate2->execute([
        ':orden' => $orden_actual,
        ':id' => $otro['id']
    ]);

    $db->commit();

    echo json_encode([
        "success" => true,
        "message" => "Orden actualizado correctamente."
    ]);
} catch (Exception $e) {
    if ($db && $db->inTransaction()) {
        $db->rollBack();
    }
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Error al cambiar orden: " . $e->getMessage()
    ]);
}
