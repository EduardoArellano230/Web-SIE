import React, { useState } from "react";
import "./siigo.css";
import AlertService from "../../AlertService";

function SiigoContacto({ onClose }) {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://corporativosie.com.mx/web/Back/siigo_contacto.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        AlertService.success("Datos enviados correctamente.");
        setFormData({ nombre: "", telefono: "" });

        if (onClose) onClose(); 
        AlertService.error("Error: " + result.message);
        if (onClose) onClose();
      }
    } catch (error) {
      console.error("Error al enviar:", error);
      AlertService.warning("Hubo un error al conectar con el servidor.");
      if (onClose) onClose();
    }
  };

  return (
    <div className="siigo-contacto-container">
      <h1 className="siigo-contacto-titulo">Contacto</h1>
      <form onSubmit={handleSubmit} className="siigo-contacto-form">
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="telefono">Teléfono:</label>
          <input
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="siigo-contacto-btn">Enviar</button>
      </form>
    </div>
  );
}

export default SiigoContacto;
