<?php  
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require '../vendor/phpmailer/phpmailer/src/PHPMailer.php';
require '../vendor/phpmailer/phpmailer/src/SMTP.php';
require '../vendor/phpmailer/phpmailer/src/Exception.php';
$credenciales = require './credenciales.php'; 

require_once("./conexion.php");

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$data = json_decode(file_get_contents("php://input"), true);

if ($data) {
    $conexion = new Conexion();
    $bd = $conexion->conectar();


    $stmt = $bd->prepare("INSERT INTO contacto (nombre, correo, telefono, mensaje, contpaqi, aspel, servicio, status, fecha) VALUES (?, ?, ?, ?, ?, ?, ?, 'pendiente', CURDATE())");

    $stmt->execute([
        $data['nombre'],
        $data['correo'],
        $data['telefono'],
        $data['mensaje'],
        $data['contpaqi'],
        $data['aspel'],
        $data['servicio'],
    ]);

    try {
        // Enviar correo electrónico
        $mail = new PHPMailer(true); 
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = $credenciales['mail_username']; 
        $mail->Password = $credenciales['mail_password']; 
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;


        $mail->setFrom($credenciales['mail_username'], $credenciales['mail_from_name']);
        $mail->addAddress($credenciales['mail_to']);

        $mail->Subject = 'Nuevo contacto recibido';
        $mail->Body =
            "Se ha recibido un nuevo mensaje:\n\n" .
            "Nombre: {$data['nombre']}\n" .
            "Correo: {$data['correo']}\n" .
            "Teléfono: {$data['telefono']}\n" .
            "Mensaje: {$data['mensaje']}\n" .
            "CONTPAQi: {$data['contpaqi']}\n" .
            "ASPEL: {$data['aspel']}\n" .
            "Servicio: {$data['servicio']}\n" .
            "Fecha: " . date("Y-m-d");

        $mail->send();

        $phone = $credenciales['CALLMEBOT_PHONE'];
        $apikey = $credenciales['CALLMEBOT_KEY'];

        $mensajeWhatsapp = urlencode(
            "Nuevo contacto recibido:\n" .
            "Nombre: {$data['nombre']}\n" .
            "Correo: {$data['correo']}\n" .
            "Teléfono: {$data['telefono']}\n" .
            "Mensaje: {$data['mensaje']}\n"
        );

        // Construye la URL para enviar el mensaje
        $whatsappUrl = "https://api.callmebot.com/whatsapp.php?phone=$phone&text=$mensajeWhatsapp&apikey=$apikey";

        // Ejecuta la llamada para enviar WhatsApp
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $whatsappUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);
        echo json_encode(["success" => true, "message" => "Datos guardados, correo y WhatsApp enviados."]);

    } catch (Exception $e) {
        echo json_encode(["success" => false, "message" => "Datos guardados, pero error: {$mail->ErrorInfo}"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "No se recibieron datos."]);
}
?>
