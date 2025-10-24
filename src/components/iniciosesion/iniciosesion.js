import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './iniciosesion.css';
import logo from '../../assets/LOGOS SIE/SIE LEON BLANCO-10.png';
import AlertService from "../../AlertService"; 

function IniciarSesion() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mensaje, setMensaje] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("https://corporativosie.com.mx/web/Back/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo, contrasena }),
      });

      const data = await response.json();

      if (data.success) {
            AlertService.success("¡Inicio de sesión exitoso");
        localStorage.setItem("usuario", JSON.stringify(data.usuario));
        navigate("/Dashboard"); 
      } else {
        AlertService.error(data.message || "Error al iniciar sesión");
      }
    } catch (error) {
      AlertService.error("Error de red o del servidor");
      console.error(error);
    }
  };

  return (
    <div className="login-background">
      <div className="login-box">
        <img src={logo} alt="Logo" className="login-logo" />
        <h2>Iniciar sesión</h2>
        <input
          type="text"
          placeholder="Correo electrónico"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
        />
        <button className="login-button" onClick={handleLogin}>Iniciar</button>
        {mensaje && <p style={{ color: "white", marginTop: "10px" }}>{mensaje}</p>}
      </div>
    </div>
  );
}

export default IniciarSesion;
