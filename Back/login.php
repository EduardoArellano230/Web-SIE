<?php
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once("conexion.php");

$data = json_decode(file_get_contents("php://input"), true);

if ($data && isset($data['correo']) && isset($data['contrasena'])) {
    $correo = $data['correo'];
    $contrasena = $data['contrasena'];

    $conexion = new Conexion();
    $bd = $conexion->conectar();

    // Busca el usuario por correo
    $stmt = $bd->prepare("SELECT id, nombre, correo, contrasena FROM usuarios WHERE correo = ?");
    $stmt->execute([$correo]);
    $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($usuario) {
        if (password_verify($contrasena, $usuario['contrasena'])){
            echo json_encode([
                "success" => true,
                "message" => "Inicio de sesión exitoso.",
                "usuario" => [
                    "id" => $usuario['id'],
                    "nombre" => $usuario['nombre'],
                    "correo" => $usuario['correo']
                ]
            ]);
        } else {
            echo json_encode(["success" => false, "message" => "Contraseña incorrecta."]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Usuario no encontrado."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Datos incompletos."]);
}
?>
