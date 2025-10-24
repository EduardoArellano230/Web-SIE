import React, { useEffect, useState } from "react";
import { FaUserPlus, FaTrash } from "react-icons/fa";
import "./certificados.css"; // Asegúrate de tener estilos similares
import CertificadoCreate from "./CertificadoCreate";
import AlertService from "../../../AlertService";

function CertificadoMostrar() {
  const [certificados, setCertificados] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);

  const obtenerCertificados = () => {
    fetch("https://corporativosie.com.mx/web/Back/certificados/get_certificados.php")
      .then(res => res.json())
      .then(data => setCertificados(data))
      .catch(err => AlertService.error("Error al obtener certificados: " + err));
  };

  useEffect(() => {
    obtenerCertificados();
  }, []);

  const handleDelete = async (certificado) => {
    const confirmar = await AlertService.confirm?.(`¿Eliminar el certificado "${certificado.nombre}"?`)
      ?? window.confirm(`¿Eliminar el certificado "${certificado.nombre}"?`);
    if (!confirmar) return;

    fetch("https://corporativosie.com.mx/web/Back/certificados/eliminar_certificado.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: certificado.id })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          AlertService.success("Certificado eliminado correctamente.");
          obtenerCertificados();
        } else {
          AlertService.error("No se pudo eliminar: " + (data.message || "Error desconocido."));
        }
      })
      .catch(() => AlertService.error("Error de conexión al eliminar."));
  };

  return (
    <div className="certificados-container">
      <h1>Certificados</h1>

      <table className="certificados-table">
        <thead>
          <tr>
            <th>Nombre</th>
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
          {certificados.length > 0 ? (
            certificados.map((cert) => (
              <tr key={cert.id}>
                <td>{cert.nombre}</td>
                <td>
                  <img
                    src={cert.imagen}
                    alt={cert.nombre}
                    className="certificado-img"
                  />
                </td>
                <td>
                  <button
                    className="btn-accion btn-eliminar"
                    onClick={() => handleDelete(cert)}
                    title="Eliminar"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No hay certificados disponibles.</td>
            </tr>
          )}
        </tbody>
      </table>

      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="cerrar-modal" onClick={() => setMostrarModal(false)}>X</button>
            <CertificadoCreate onClose={() => setMostrarModal(false)} onUpdate={obtenerCertificados} />
          </div>
        </div>
      )}
    </div>
  );
}

export default CertificadoMostrar;
