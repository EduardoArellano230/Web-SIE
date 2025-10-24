import React, { useEffect, useState } from "react";
import { FaUserPlus, FaTrash } from "react-icons/fa";
import './ofertas_general.css';
import OfertasCreate from './OfertasCreate';
import AlertService from "../../../AlertService";

function OfertasMostrar() {
  const [ofertas, setOfertas] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);

  const obtenerOfertas = () => {
    fetch("https://corporativosie.com.mx/web/Back/ofertas/ofertas_get.php")
      .then((res) => res.json())
      .then((data) => setOfertas(data))
      .catch((err) => AlertService.error("Error al obtener ofertas: " + err));
  };

  useEffect(() => {
    obtenerOfertas();
  }, []);

  const handleDelete = async (imagenURL) => {
    const imagenNombre = imagenURL.split("/").pop();

    const confirmar = await AlertService.confirm?.("¿Estás seguro de eliminar esta oferta?")
                      ?? window.confirm("¿Estás seguro de eliminar esta oferta?");
    if (!confirmar) return;

    fetch("https://corporativosie.com.mx/web/Back/ofertas/ofertas_delete.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ imagen: imagenNombre })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          AlertService.success("Oferta eliminada correctamente.");
          obtenerOfertas();
        } else {
          AlertService.error("No se pudo eliminar: " + (data.message || "Error desconocido."));
        }
      })
      .catch(err => {
        AlertService.error("Error de conexión al eliminar.");
      });
  };

  return (
    <div className="ofertas-container">
      <h1>Ofertas</h1>

      <table className="ofertas-table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Descripción</th>
            <th>Categoría</th>
            <th>Imagen</th>
            <th>Acciones</th>
            <th>
              <button
                className="btn add"
                onClick={() => setMostrarModal(true)}
              >
                <FaUserPlus />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {ofertas.length > 0 ? (
            ofertas.map((item, idx) => (
              <tr key={idx}>
                <td>{item.titulo}</td>
                <td>{item.descripcion}</td>
                <td>{item.categoria}</td>
                <td>
                  <img
                    src={item.imagen}
                    alt={item.titulo}
                    className="ofertas-img"
                  />
                </td>
                <td className="acciones-cell">
                  <button
                    className="btn-accion btn-eliminar"
                    onClick={() => handleDelete(item.imagen)}
                    title="Eliminar"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Cargando o no hay registros de ofertas.</td>
            </tr>
          )}
        </tbody>
      </table>

      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="cerrar-modal" onClick={() => setMostrarModal(false)}>X</button>
            <OfertasCreate onClose={() => setMostrarModal(false)} onUpdate={obtenerOfertas} />
          </div>
        </div>
      )}
    </div>
  );
}

export default OfertasMostrar;
