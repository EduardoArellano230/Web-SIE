import React, { useState } from "react";
import AlertService from "../../../AlertService"; 
import './CarruselMostrar'; 

function CarruselCreate({ onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    categoria: 'carrusel',
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
    data.append("titulo", formData.titulo); // puede ir vacío
    data.append("descripcion", formData.descripcion); // puede ir vacío
    data.append("categoria", formData.categoria); // se envía como 'carrusel'
    data.append("imagen", formData.imagen); // obligatorio

    try {
      const response = await fetch("https://corporativosie.com.mx/web/Back/carrusel/crear_carusel.php", {
        method: "POST",
        body: data
      });

      const result = await response.json();

      if (result.success) {
        AlertService.success("Imagen del carrusel guardada correctamente.");
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
      <h2>Imagenes</h2>

      <input
        type="text"
        name="titulo"
        placeholder="Título (opcional)"
        value={formData.titulo}
        onChange={handleChange}
      />

      <textarea
        name="descripcion"
        placeholder="Descripción (opcional)"
        value={formData.descripcion}
        onChange={handleChange}
        rows="4"
      ></textarea>
      <label>
      Categoría:
      <select name="categoria" value={formData.categoria} onChange={handleChange}>
        <option value="carrusel">Carrusel</option>
        <option value="siigo">Siigo</option>
      </select>
    </label>

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

export default CarruselCreate;
