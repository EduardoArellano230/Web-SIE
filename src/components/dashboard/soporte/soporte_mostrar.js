import React, { useEffect, useState } from "react";
import { FaUserPlus, FaTrash } from "react-icons/fa";
import "./soporte.css";
import SoporteCreate from "./Soporte_create";
import AlertService from "../../../AlertService";

function SoporteMostrar() {
  const [imagenes, setImagenes] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);

  const obtenerSoporte = () => {
    fetch("https://corporativosie.com.mx/web/Back/soporte/soporte_get.php")
      .then(res => res.json())
      .then(data => {
        if (data.success) setImagenes(data.data);
        else setImagenes([]);
      })
      .catch(err => AlertService.error("Error al obtener soporte: " + err));
  };

  useEffect(() => {
    obtenerSoporte();
  }, []);

  const handleDelete = async (imgURL) => {
    const imagen = imgURL.split("/").pop();
    const confirmar = await AlertService.confirm?.("¿Eliminar esta imagen de soporte?")
                    ?? window.confirm("¿Eliminar esta imagen de soporte?");
    if (!confirmar) return;

    fetch("https://corporativosie.com.mx/web/Back/soporte/soporte_delete.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imagen })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          AlertService.success("Soporte eliminado correctamente.");
          obtenerSoporte();
        } else {
          AlertService.error("No se pudo eliminar: " + (data.message || "Error desconocido."));
        }
      })
      .catch(() => AlertService.error("Error de conexión al eliminar."));
  };

  return (
    <div className="soporte-container">
      <h1>Imágenes de Soporte</h1>

      <table className="soporte-table">
        <thead>
          <tr>
            <th>Categoría</th>
            <th>Imagen</th>
            <th>Acciones</th>
            <th>
              <button className="btn add" onClick={() => setMostrarModal(true)}>
                <FaUserPlus />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {imagenes.length > 0 ? (
            imagenes.map((img, index) => (
              <tr key={index}>
                <td>{img.categoria}</td>
                <td>
                  <img src={img.imagen} alt={img.categoria} className="soporte-img" />
                </td>
                <td className="acciones-cell">
                  <button
                    className="btn-accion btn-eliminar"
                    onClick={() => handleDelete(img.imagen)}
                    title="Eliminar"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No hay imágenes disponibles.</td>
            </tr>
          )}
        </tbody>
      </table>

      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="cerrar-modal" onClick={() => setMostrarModal(false)}>X</button>
            <SoporteCreate onClose={() => setMostrarModal(false)} onUpdate={obtenerSoporte} />
          </div>
        </div>
      )}
    </div>
  );
}

export default SoporteMostrar;
