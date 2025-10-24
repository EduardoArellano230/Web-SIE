<?php
class Conexion {
    private $host = "localhost"; 
    private $baseDatos = "siempre4_corporativo_sie";
    private $usuario = "siempre4_eduardo"; 
    private $contrasena = "SIE2025PAGINA$";
    private $conexion;

    public function conectar() {
        try {
            $this->conexion = new PDO("mysql:host=$this->host;dbname=$this->baseDatos;charset=utf8", $this->usuario, $this->contrasena);
            $this->conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $this->conexion;
        } catch (PDOException $e) {
            die("Error de conexión: " . $e->getMessage());
        }
    }
}
?>
