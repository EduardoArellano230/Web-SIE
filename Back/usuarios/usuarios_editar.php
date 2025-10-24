<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
require_once("../conexion.php");

$data = json_decode(file_get_contents("php://input"), true);

if ($data && isset($data['id']) && isset($data['nombre']) && isset($data['correo'])) {
    $id = $data['id'];
    $nombre = $data['nombre'];
    $correo = $data['correo'];
    $contrasena = isset($data['contrasena']) && !empty($data['contrasena']) 
        ? password_hash($data['contrasena'], PASSWORD_DEFAULT) 
        : null;

    try {
        $conexion = new Conexion();
        $bd = $conexion->conectar();

        // Verificar si el correo ya existe para otro usuario
        $verificar = $bd->prepare("SELECT id FROM usuarios WHERE correo = ? AND id != ?");
        $verificar->execute([$correo, $id]);

        if ($verificar->rowCount() > 0) {
            echo json_encode(["success" => false, "message" => "El correo ya está en uso por otro usuario."]);
            exit;
        }

        if ($contrasena) {
            $stmt = $bd->prepare("UPDATE usuarios SET nombre = ?, correo = ?, contrasena = ? WHERE id = ?");
            $stmt->execute([$nombre, $correo, $contrasena, $id]);
        } else {
            $stmt = $bd->prepare("UPDATE usuarios SET nombre = ?, correo = ? WHERE id = ?");
            $stmt->execute([$nombre, $correo, $id]);
        }

        echo json_encode(["success" => true, "message" => "Usuario actualizado correctamente."]);

    } catch (PDOException $e) {
        echo json_encode(["success" => false, "message" => "Error en la base de datos: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Datos incompletos."]);
}
?>
