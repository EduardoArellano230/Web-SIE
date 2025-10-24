import React, { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import './Ofertas.css'

function Ofertas({ categoria }) {
  const [ofertas, setOfertas] = useState([]);
  const [mostrar, setMostrar] = useState(true);
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);

  useEffect(() => {
    fetch("https://corporativosie.com.mx/web/Back/ofertas/ofertas_get.php")
      .then((res) => res.json())
      .then((data) => {
        console.log("Datos obtenidos:", data); 
        // Si data es arreglo directo
        const filtradas = data.filter(
          (oferta) => oferta.categoria === categoria
        );
        setOfertas(filtradas);
      })
      .catch((err) => console.error("Error de red:", err));
  }, [categoria]);

  const cerrarModal = () => setImagenSeleccionada(null);

  return (
    <div className="Ofertas-container">
      <h3
        className="ofertas-titulo"
        onClick={() => setMostrar(!mostrar)}
        style={{ cursor: "pointer" }}
      >
        <FaBell /> Ofertas {categoria} {mostrar ? "▲" : "▼"}
      </h3>

      {mostrar && (
        <div className="ofertas-grid">
          {ofertas.length > 0 ? (
            ofertas.map((oferta, index) => (
              <div
                key={oferta.id ?? index} // Usa id si existe, si no index
                className="oferta-card"
               onClick={() => setImagenSeleccionada(oferta.imagen)}

              >
                <img
                  src={oferta.imagen} alt={oferta.titulo}
                  className="oferta-imagen"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/150";
                  }}
                />
                <div className="oferta-titulo-overlay">
                  <h4>{oferta.titulo}</h4>
                </div>
              </div>
            ))
          ) : (
            <p>No hay ofertas disponibles en esta categoría.</p>
          )}
        </div>
      )}

      {imagenSeleccionada && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
            <img
              src={imagenSeleccionada}
              alt="Oferta ampliada"
              className="modal-imagen"
            />
            <button className="modal-cerrar" onClick={cerrarModal}>
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Ofertas;
