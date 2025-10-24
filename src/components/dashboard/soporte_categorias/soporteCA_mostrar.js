import React, { useEffect, useState } from "react";
import { FaUserPlus, FaTrash } from "react-icons/fa";
import "./soporteCA_General.css";
import CategoriaCreate from "./Categoria_create";
import AlertService from "../../../AlertService";

function CategoriaMostrar() {
  const [categorias, setCategorias] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);

  const obtenerCategorias = () => {
    fetch("https://corporativosie.com.mx/web/Back/soporte/categorias_get.php")
      .then(res => res.json())
      .then(data => {
        if (data.success) setCategorias(data.data);
        else setCategorias([]);
      })
      .catch(err => AlertService.error("Error al obtener categorías: " + err));
  };

  useEffect(() => {
    obtenerCategorias();
  }, []);

  const handleDelete = async (id) => {
    const confirmar = await AlertService.confirm?.("¿Eliminar esta categoría?")
                    ?? window.confirm("¿Eliminar esta categoría?");
    if (!confirmar) return;

    fetch("https://corporativosie.com.mx/web/Back/soporte/categoria_delete.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          AlertService.success("Categoría eliminada.");
          obtenerCategorias();
        } else {
          AlertService.error("No se pudo eliminar: " + (data.message || "Error desconocido."));
        }
      })
      .catch(() => AlertService.error("Error de conexión al eliminar."));
  };

  return (
    <div className="categoria-container">
      <h1>Categorías de Soporte</h1>

      <table className="categoria-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Acciones</th>
            <th>
              <button className="btn add" onClick={() => setMostrarModal(true)}>
                <FaUserPlus />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {categorias.length > 0 ? (
            categorias.map((cat, index) => (
              <tr key={index}>
                <td>{cat.nombre}</td>
                <td>
                  <button
                    className="btn-accion btn-eliminar"
                    onClick={() => handleDelete(cat.id)}
                    title="Eliminar"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No hay categorías disponibles.</td>
            </tr>
          )}
        </tbody>
      </table>

      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="cerrar-modal" onClick={() => setMostrarModal(false)}>X</button>
            <CategoriaCreate onClose={() => setMostrarModal(false)} onUpdate={obtenerCategorias} />
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoriaMostrar;
