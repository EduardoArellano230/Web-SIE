import React, { useEffect, useState } from "react";
import { FaUserPlus, FaTrash } from "react-icons/fa";
import './imgcaru.css';
import CarruselCreate from './Carrusel_create';
import AlertService from "../../../AlertService";

function CarruselMostrar() {
  const [carruseles, setCarruseles] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);

  const obtenerCarrusel = () => {
    fetch("https://corporativosie.com.mx/web/Back/carrusel/get_carusel.php")
      .then((res) => res.json())
      .then((data) => setCarruseles(data))
      .catch((err) => AlertService.error("Error al obtener carrusel: " + err));
  };

  useEffect(() => {
    obtenerCarrusel();
  }, []);

  const handleDelete = async (imagenURL) => {
    const imagenNombre = imagenURL.split("/").pop(); // Solo el nombre, no la URL

    const confirmar = await AlertService.confirm?.("¿Estás seguro de que deseas eliminar esta imagen del carrusel?")
                     ?? window.confirm("¿Estás seguro de que deseas eliminar esta imagen del carrusel?");
    if (!confirmar) return;

    fetch("https://corporativosie.com.mx/web/Back/carrusel/carrusel_delete.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ imagen: imagenNombre })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          AlertService.success("Imagen eliminada correctamente.");
          obtenerCarrusel();
        } else {
          AlertService.error("No se pudo eliminar: " + (data.message || "Error desconocido."));
        }
      })
      .catch(err => {
        AlertService.error("Error de conexión al eliminar.");
      });
  };

  return (
    <div className="carrusel-container">
      <h1>Carrusel</h1>

      <table className="carrusel-table">
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
                onClick={() => {
                  setModoEdicion(false);
                  setMostrarModal(true);
                }}
              >
                <FaUserPlus />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {carruseles.length > 0 ? (
            carruseles.map((item, idx) => (
              <tr key={idx}>
                <td>{item.titulo}</td>
                <td>{item.descripcion}</td>
                <td>{item.categoria}</td>

                <td>
                  <img
                    src={item.imagen}
                    alt={item.titulo}
                    className="carrusel-img"
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
              <td colSpan="4">Cargando imágenes o no hay registros.</td>
            </tr>
          )}
        </tbody>
      </table>

      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="cerrar-modal" onClick={() => setMostrarModal(false)}>X</button>
            <CarruselCreate onClose={() => setMostrarModal(false)} onUpdate={obtenerCarrusel} />
          </div>
        </div>
      )}
    </div>
  );
}

export default CarruselMostrar;
