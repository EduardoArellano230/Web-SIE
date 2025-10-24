import React, { useState, useEffect } from "react";
import AlertService from "../../../AlertService";
import './equipo_general.css';

function EquipoCreate({ onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    nombre: '',
    rol: '',
    descripcion: '',
    imagen: null,
    certificadosSeleccionados: []
  });

  const [certificadosDisponibles, setCertificadosDisponibles] = useState([]);

  useEffect(() => {
    fetch('https://corporativosie.com.mx/web/Back/certificados/get_certificados.php')
      .then(res => res.json())
      .then(data => setCertificadosDisponibles(data))
      .catch(err => AlertService.error("Error al cargar certificados: " + err));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imagen') {
      setFormData({ ...formData, imagen: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const toggleCertificado = (id) => {
    setFormData(prev => {
      const yaExiste = prev.certificadosSeleccionados.includes(id);
      return {
        ...prev,
        certificadosSeleccionados: yaExiste
          ? prev.certificadosSeleccionados.filter(cid => cid !== id)
          : [...prev.certificadosSeleccionados, id]
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const datos = new FormData();
    datos.append("nombre", formData.nombre);
    datos.append("rol", formData.rol);
    datos.append("descripcion", formData.descripcion);
    datos.append("imagen", formData.imagen);

    formData.certificadosSeleccionados.forEach(id => {
      datos.append("certificados[]", id);
    });

    try {
      const response = await fetch("https://corporativosie.com.mx/web/Back/equipo/crear_equipo.php", {
        method: "POST",
        body: datos
      });

      const result = await response.json();

      if (result.success) {
        AlertService.success("Empleado registrado correctamente.");
        if (onUpdate) onUpdate();
        if (onClose) onClose();
        setFormData({
          nombre: '',
          rol: '',
          descripcion: '',
          imagen: null,
          certificadosSeleccionados: []
        });
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
      <h2>Nuevo Integrante</h2>

      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={formData.nombre}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="rol"
        placeholder="Rol o puesto"
        value={formData.rol}
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
      />

      <input
        type="file"
        name="imagen"
        accept="image/*"
        onChange={handleChange}
        required
      />

      <label>Certificados:</label>
      <div className="certificados-lista">
        {certificadosDisponibles.map(cert => (
          <div key={cert.id} className="certificado-opcion">
            <input
              type="checkbox"
              checked={formData.certificadosSeleccionados.includes(cert.id)}
              onChange={() => toggleCertificado(cert.id)}
            />
            <img src={cert.imagen} alt={cert.nombre} className="cert-icono" />
            <span>{cert.nombre}</span>
          </div>
        ))}
      </div>

      <button type="submit">Guardar</button>
    </form>
  );
}

export default EquipoCreate;
