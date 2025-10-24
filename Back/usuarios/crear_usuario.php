<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once("../conexion.php");

$data = json_decode(file_get_contents("php://input"), true);

if ($data && isset($data['nombre']) && isset($data['correo']) && isset($data['contrasena'])) {
    $nombre = $data['nombre'];
    $correo = $data['correo'];
    $contrasena = password_hash($data['contrasena'], PASSWORD_DEFAULT); 
    try {
        $conexion = new Conexion();
        $bd = $conexion->conectar();
        $verificar = $bd->prepare("SELECT id FROM usuarios WHERE correo = ?");
        $verificar->execute([$correo]);

        if ($verificar->rowCount() > 0) {
            echo json_encode(["success" => false, "message" => "El usuario ya existe."]);
            exit;
        }

        $stmt = $bd->prepare("INSERT INTO usuarios (nombre, correo, contrasena) VALUES (?, ?, ?)");
        $stmt->execute([$nombre, $correo, $contrasena]);

        echo json_encode(["success" => true, "message" => "Usuario creado correctamente."]);

    } catch (PDOException $e) {
        echo json_encode(["success" => false, "message" => "Error en la base de datos: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Datos incompletos."]);
}
?>
