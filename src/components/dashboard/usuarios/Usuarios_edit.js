import React, { useEffect, useState } from "react";
import AlertService from "../../../AlertService"; 

function Usuarios_edit({ id, onClose }) {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    contrasena: ""
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://corporativosie.com.mx/web/Back/usuarios/usuarios_obtener.php?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.nombre && data.correo) {
          setFormData({
            nombre: data.nombre,
            correo: data.correo,
            contrasena: ""
          });
        } else {
          AlertService.error("No se pudo cargar el usuario.");
        }
        setLoading(false);
      })
      .catch((error) => {
        AlertService.error("Error al cargar el usuario:", error);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("https://corporativosie.com.mx/web/Back/usuarios/usuarios_editar.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ...formData, id })
    });

    const result = await response.json();

    if (result.success) {
      AlertService.success("Usuario actualizado correctamente.");
      onClose();
    } else {
      AlertService.error("Error: " + (result.message || "No se pudo actualizar"));
    }
  };

  if (loading) return <p>Cargando datos del usuario...</p>;

  return (
    <form className="formulario" onSubmit={handleSubmit}>
      <h2>Editar Usuario</h2>
      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={formData.nombre}
        onChange={handleChange}
      />
      <input
        type="email"
        name="correo"
        placeholder="Correo"
        value={formData.correo}
        onChange={handleChange}
      />
      <input
        type="password"
        name="contrasena"
        placeholder="Nueva contraseña (opcional)"
        value={formData.contrasena}
        onChange={handleChange}
      />
      <button type="submit">Actualizar</button>
    </form>
  );
}

export default Usuarios_edit;
