import React, { useState } from "react";
import AlertService from "../../../AlertService";

function OfertasCreate({ onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    categoria: '',
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

    if (!formData.categoria) {
      AlertService.error("Por favor selecciona una categoría.");
      return;
    }

    const data = new FormData();
    data.append("titulo", formData.titulo);
    data.append("descripcion", formData.descripcion);
    data.append("categoria", formData.categoria);
    data.append("imagen", formData.imagen);

    try {
      const response = await fetch("https://corporativosie.com.mx/web/Back/ofertas/ofertas_create.php", {
        method: "POST",
        body: data
      });

      const result = await response.json();

      if (result.success) {
        AlertService.success("Oferta guardada correctamente.");
        if (onUpdate) onUpdate();
        if (onClose) onClose();
      } else {
        AlertService.error("Error: " + (result.message || "Error desconocido"));
      }
    } catch (error) {
      console.error("Error:", error);
      AlertService.error("Error en la conexión al servidor.");
    }
  };

  return (
    <form className="formulario" onSubmit={handleSubmit}>
      <h2>Crear Nueva Oferta</h2>

      <input
        type="text"
        name="titulo"
        placeholder="Título"
        value={formData.titulo}
        onChange={handleChange}
        required
      />

      <textarea
        name="descripcion"
        placeholder="Descripción"
        value={formData.descripcion}
        onChange={handleChange}
        rows="4"
        required
      ></textarea>

      <select
        name="categoria"
        value={formData.categoria}
        onChange={handleChange}
        required
      >
        <option value="">Selecciona una categoría</option>
        <option value="CONTPAQi">CONTPAQi</option>
        <option value="ASPEL">ASPEL</option>
    
      </select>

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

export default OfertasCreate;
