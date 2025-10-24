import React, { useState } from "react";
import './Usuarios_generla.css';
import AlertService from "../../../AlertService"; 


function Usuarios_creata({ actualizarLista, onClose }) {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://corporativosie.com.mx/web/Back/usuarios/crear_usuario.php", { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre, correo, contrasena }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMensaje(data.message);
        if (data.success) {
          setNombre("");
          setCorreo("");
          setContrasena("");
          actualizarLista(); 
          onClose();        
        }
      })
      .catch((error) => {
        setMensaje("Error al enviar el formulario.");
        AlertService.error("Error:", error);
      });
  };

  return (
    <div className="form-container">
      <h2>Crear Usuario</h2>
      <form onSubmit={handleSubmit} className="form-usuario">
        <label>Nombre:</label>
        <input
          placeholder="Ingrese un nombre"
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <label>Correo:</label>
        <input
          placeholder="Ingrese un correo (ejemplo@gmail.com)"
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />

        <label>Contraseña:</label>
        <input
          placeholder="Ingrese una contraseña Min 8 caracteres ($%=?)"
          type="password"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
        />

        <button type="submit">Registrar</button>
      </form>

      {mensaje && <p className="mensaje">{mensaje}</p>}
    </div>
  );
}

export default Usuarios_creata;
