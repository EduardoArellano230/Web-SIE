import React, { useEffect, useState } from "react";
import { FaUserPlus, FaEdit, FaTrash, FaArrowUp, FaArrowDown } from "react-icons/fa";

import './equipo_general.css';
import EquipoCreate from './EquipoCreate';
import EquipoEdit from './EquipoEdit'; 
import AlertService from "../../../AlertService";

function EquipoMostrar() {
  const [equipo, setEquipo] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [modoEditar, setModoEditar] = useState(false);
  const [miembroSeleccionado, setMiembroSeleccionado] = useState(null);

  const obtenerEquipo = () => {
    fetch("https://corporativosie.com.mx/web/Back/equipo/get_equipo.php")
      .then(res => res.json())
      .then(data => setEquipo(data))
      .catch(err => AlertService.error("Error al obtener equipo: " + err));
  };

  useEffect(() => {
    obtenerEquipo();
  }, []);


const cambiarOrden = (id, direccion) => {
  fetch("https://corporativosie.com.mx/web/Back/equipo/cambiar_orden_equipo.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, direccion }),
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        obtenerEquipo();
      } else {
        AlertService.error(data.message || "No se pudo cambiar el orden.");
      }
    })
    .catch(() => AlertService.error("Error de conexión al cambiar orden."));
};

  const handleDelete = async (miembro) => {
    const confirmar = await AlertService.confirm?.("¿Deseas eliminar este miembro?") ?? window.confirm("¿Deseas eliminar este miembro?");
    if (!confirmar) return;

    fetch("https://corporativosie.com.mx/web/Back/equipo/eliminar_equipo.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: miembro.id }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          AlertService.success("Miembro eliminado correctamente.");
          obtenerEquipo();
        } else {
          AlertService.error("Error al eliminar: " + (data.message || "Error desconocido."));
        }
      })
      .catch(() => AlertService.error("Error de conexión al eliminar."));
  };

  const handleAdd = () => {
    setModoEditar(false);
    setMiembroSeleccionado(null);
    setMostrarModal(true);
  };

  const handleEdit = (miembro) => {
    setModoEditar(true);
    setMiembroSeleccionado(miembro);
    setMostrarModal(true);
  };

  return (
    <div className="carrusel-container">
      <h1>Equipo</h1>

      <table className="carrusel-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Rol</th>
            <th>Descripción</th>
            <th>Imagen</th>
            <th>Certificaciones</th>
            <th>
              <button className="btn add" onClick={handleAdd} title="Agregar">
                <FaUserPlus />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {equipo.length > 0 ? (
            equipo.map((miembro, idx) => (
              <tr key={idx}>
                <td>{miembro.name}</td>
                <td>{miembro.role}</td>
                <td>{miembro.description}</td>
                <td>
                  <img src={miembro.image} alt={miembro.name} className="carrusel-img" />
                </td>
                <td>
                  {miembro.certificaciones?.length > 0 ? (
                    miembro.certificaciones.map((cert, i) => (
                      <img key={i} src={cert} alt={`Certificación ${i + 1}`} className="cert-icon" />
                    ))
                  ) : (
                    "Sin certificados"
                  )}
                </td>
                <td className="acciones-cell">
  <button
    className="btn-accion btn-editar"
    onClick={() => handleEdit(miembro)}
    title="Editar"
    style={{ marginRight: "5px" }}
  >
    <FaEdit />
  </button>
  <button
    className="btn-accion btn-eliminar"
    onClick={() => handleDelete(miembro)}
    title="Eliminar"
  >
    <FaTrash />
  </button>
  <button
    className="btn-accion"
    title="Subir"
    onClick={() => cambiarOrden(miembro.id, "up")}
    disabled={idx === 0}
  >
    <FaArrowUp />
  </button>
  <button
    className="btn-accion"
    title="Bajar"
    onClick={() => cambiarOrden(miembro.id, "down")}
    disabled={idx === equipo.length - 1}
  >
    <FaArrowDown />
  </button>
</td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Cargando equipo o no hay registros.</td>
            </tr>
          )}
        </tbody>
      </table>

      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="cerrar-modal" onClick={() => setMostrarModal(false)}>X</button>
        {modoEditar ? (
  <EquipoEdit
    id={miembroSeleccionado.id}
    onClose={() => setMostrarModal(false)}
    onUpdate={obtenerEquipo} 
  />
) : (
  <EquipoCreate
    onClose={() => setMostrarModal(false)}
    onUpdate={obtenerEquipo}
  />
)}
          </div>
        </div>
      )}
    </div>
  );
}

export default EquipoMostrar;
