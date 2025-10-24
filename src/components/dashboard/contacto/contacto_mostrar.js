import React, { useEffect, useState } from "react";
import './contacto_general.css';
import { FaEdit, FaTrash } from "react-icons/fa";
import ExportButtons from "../../ExportButtons"; 
import AlertService from "../../../AlertService"; 

function Contacto_mostrar() {
  const [contactos, setContactos] = useState([]);
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    obtenerContactos();
  }, []);

  const obtenerContactos = () => {
    fetch("https://corporativosie.com.mx/web/Back/Contacto/contacto_get.php")
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setContactos(data.data);
        } else {
          AlertService.error("Error al obtener contactos");
        }
      })
      .catch(err => AlertService.error("Error de red:", err));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditando({ ...editando, [name]: value });
  };

  const guardarCambios = () => {
    if (!editando.id || !editando.status) {
      alert("Faltan datos necesarios para actualizar");
      return;
    }

    fetch("https://corporativosie.com.mx/web/Back/Contacto/contacto_edit.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: editando.id,
        status: editando.status,
      }),
    })
    .then(res => res.json())
    .then(data => {
      console.log("Respuesta del servidor:", data);
      if (data.success) {
        AlertService.success("Contacto actualizado");
        setEditando(null);
        obtenerContactos();
      } else {
        AlertService.error("Error al actualizar");
      }
    })
    .catch(err => {
      AlertService.error("Error al enviar datos:", err);
      AlertService.error("Error de red");
    });
  };

const eliminarContacto = async (id) => {
  const confirmar = await AlertService.confirm(
    "¿Estás seguro de que deseas eliminar este contacto?"
  );

  if (!confirmar) return;

  const formData = new FormData();
  formData.append("id", id);

  fetch("https://corporativosie.com.mx/web/Back/Contacto/contacto_eliminar.php", {
    method: "POST",
    body: formData,
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        AlertService.success("Contacto eliminado correctamente.");
        obtenerContactos(); 
      } else {
        AlertService.error("Error al eliminar: " + data.message);
      }
    })
    .catch(err => {
      AlertService.error("Error de red al eliminar.");
    });
};

  return (
    <div className="contacto-container">
      <h1>Mensajes de Contacto</h1>
      <ExportButtons data={contactos} nombreArchivo="contactos" />

      <table className="contact-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th className="col-correo">Correo</th>
            <th>Teléfono</th>
            <th>Mensaje</th>
            <th>CONTPAQi</th>
            <th>ASPEL</th>
            <th>Servicio</th>
            <th>Status</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {contactos.length > 0 ? (
            contactos.map((c, index) => (
              <tr key={index}>
                <td>{c.nombre}</td>
                <td className="col-correo">{c.correo}</td>
                <td>{c.telefono}</td>
                <td className="col-correo">{c.mensaje}</td>
                <td>{c.contpaqi}</td>
                <td>{c.aspel}</td>
                <td>{c.servicio}</td>
                <td className={c.status === 'pendiente' ? 'status-pendiente' : 'status-contactado'}>
                  {c.status}
                </td>
                <td>{c.fecha}</td>
                <td>
                  <button className="btn edit" onClick={() => setEditando({ id: c.id, status: c.status })}><FaEdit /></button>
                  <button className="btn delete" onClick={() => eliminarContacto(c.id)}><FaTrash /></button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="11">Cargando datos o no hay registros.</td></tr>
          )}
        </tbody>
      </table>

      {editando && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Editar Contacto</h2>

            <label>Status:</label>
            <select name="status" value={editando.status} onChange={handleInputChange}>
              <option value="pendiente">Pendiente</option>
              <option value="contactado">Contactado</option>
            </select>

            <div className="modal-buttons">
              <button onClick={guardarCambios}>Guardar</button>
              <button onClick={() => setEditando(null)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Contacto_mostrar;
