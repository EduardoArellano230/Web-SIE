import React, { useState } from "react";
import AlertService from "../../../AlertService";

function CategoriaCreate({ onClose, onUpdate }) {
  const [nombre, setNombre] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://corporativosie.com.mx/web/Back/soporte/categoria_create.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          AlertService.success("Categoría creada.");
          onUpdate?.();
          onClose?.();
        } else {
          AlertService.error("No se pudo crear la categoría.");
        }
      })
      .catch(() => AlertService.error("Error de conexión."));
  };

  return (
    <form onSubmit={handleSubmit} className="soporte-form">
      <div className="form-group">
        <label>Nombre de la Categoría:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn-submit">Guardar</button>
    </form>
  );
}

export default CategoriaCreate;
