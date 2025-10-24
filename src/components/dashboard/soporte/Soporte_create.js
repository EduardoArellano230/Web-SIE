import React, { useState, useEffect } from "react";
import AlertService from "../../../AlertService";

function SoporteCreate({ onClose, onUpdate }) {
  const [categoria, setCategoria] = useState("");
  const [imagen, setImagen] = useState(null);

const [categorias, setCategorias] = useState([]);

useEffect(() => {
  fetch("https://corporativosie.com.mx/web/Back/soporte/categorias_get.php")
    .then((res) => res.json())
    .then((data) => {
      if (data.success && Array.isArray(data.data)) {
        setCategorias(data.data);
      } else {
        AlertService.error("Error en el formato de las categorías.");
      }
    })
    .catch(() => AlertService.error("Error al cargar las categorías."));
}, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoria || !imagen) {
      AlertService.error("Debes ingresar una categoría y seleccionar una imagen.");
      return;
    }

    const formData = new FormData();
    formData.append("categoria", categoria);
    formData.append("imagen", imagen);

    fetch("https://corporativosie.com.mx/web/Back/soporte/soporte_create.php", {
      method: "POST",
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          AlertService.success("Soporte agregado correctamente.");
          onUpdate();
          onClose();
        } else {
          AlertService.error("Error al agregar: " + data.message);
        }
      })
      .catch(() => AlertService.error("Error de conexión."));
  };

  return (
    <form onSubmit={handleSubmit} className="soporte-form">
      <h2>Agregar Soporte</h2>

      <div className="form-group">
     <label>Categoría:</label>
       <select
  name="categoria"
  value={categoria}
  onChange={(e) => setCategoria(e.target.value)}
  required
>
  <option value="">Selecciona una categoría</option>
  {categorias.map((cat) => (
    <option key={cat.id} value={cat.id}>
      {cat.nombre}
    </option>
  ))}
</select>

      </div>

      <div className="form-group">
        <label>Imagen:</label>
        <input
          type="file"
          onChange={(e) => setImagen(e.target.files[0])}
          accept="image/*"
          required
        />
      </div>

      <button type="submit" className="btn-submit">Guardar</button>
    </form>
  );
}

export default SoporteCreate;
