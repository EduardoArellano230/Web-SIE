<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require_once("../conexion.php");

try {
    $conexion = new Conexion();
    $db = $conexion->conectar();

    $stmt = $db->query("
        SELECT 
            e.id AS empleado_id,
            e.nombre,
            e.rol,
            e.descripcion,
            e.imagen,
            e.orden,
            c.archivo AS certificado
        FROM equipo e
        LEFT JOIN equipo_certificado ec ON e.id = ec.id_equipo
        LEFT JOIN certificados c ON c.id = ec.id_certificado
        ORDER BY e.orden ASC

    ");

    $equipo = [];

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $id = $row['empleado_id'];

        // Si aún no se ha agregado el empleado, lo inicializamos
        if (!isset($equipo[$id])) {
            $equipo[$id] = [
                'id' => $id,
                'name' => $row['nombre'],
                'role' => $row['rol'],
                'description' => $row['descripcion'],
                'image' => "https://corporativosie.com.mx/web/Back/imagenes_equipo/" . $row['imagen'],
                'certificaciones' => [],
                'orden' => (int)$row['orden'] 
            ];
        }

        // Si tiene certificado, lo agregamos
        if (!empty($row['certificado'])) {
            $equipo[$id]['certificaciones'][] =
                "https://corporativosie.com.mx/web/Back/imagenes_certificados/" . $row['certificado'];
        }
    }

    // Devolver los valores como array (sin índices por ID)
    echo json_encode(array_values($equipo));
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "error" => true,
        "mensaje" => "Error al obtener el equipo: " . $e->getMessage()
    ]);
}
?>
