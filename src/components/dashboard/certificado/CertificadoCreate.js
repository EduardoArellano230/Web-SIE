import React, { useState } from "react";
import AlertService from "../../../AlertService";

function CertificadoCreate({ onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    nombre: '',
    imagen: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imagen') {
      setFormData({ ...formData, imagen: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("nombre", formData.nombre);
    data.append("imagen", formData.imagen);

    try {
      const response = await fetch("https://corporativosie.com.mx/web/Back/certificados/crear_certificado.php", {
        method: "POST",
        body: data
      });

      const result = await response.json();

      if (result.success) {
        AlertService.success("Certificado guardado correctamente.");
        if (onUpdate) onUpdate();
        if (onClose) onClose();
      } else {
        AlertService.error("Error: " + result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      AlertService.error("Error en la conexión al servidor.");
    }
  };

  return (
    <form className="formulario" onSubmit={handleSubmit}>
      <h2>Nuevo Certificado</h2>

      <input
        type="text"
        name="nombre"
        placeholder="Nombre del certificado"
        value={formData.nombre}
        onChange={handleChange}
        required
      />

      <input
        type="file"
        name="imagen"
        accept="image/*"
        onChange={handleChange}
        required
      />

      <button type="submit">Guardar</button>
    </form>
  );
}

export default CertificadoCreate;
