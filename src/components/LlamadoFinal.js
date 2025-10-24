import React, { useState } from "react";
import Formulario from "./siigo/siigocontacto"; 
import "./siigo/siigo.css"; 

function LlamadoFinal({ titulo = "¡Empieza hoy mismo!", descripcion = "Moderniza tu negocio, automatiza tus procesos y olvídate del papeleo." }) {
  const [mostrarModal, setMostrarModal] = useState(false);

  return (
    <>
      <section className="siigo-final">
        <div className="siigo-final-contenido">
          <h2>{titulo}</h2>
          <p>{descripcion}</p>
          <button className="siigo-btn-final" onClick={() => setMostrarModal(true)}>
            Habla con un asesor
          </button>
        </div>
      </section>

      {mostrarModal && (
        <div className="siigo-modal-overlay">
          <div className="siigo-modal-content">
            <button className="siigo-cerrar-modal" onClick={() => setMostrarModal(false)}>×</button>
            <Formulario onClose={() => setMostrarModal(false)} />
          </div>
        </div>
      )}
    </>
  );
}

export default LlamadoFinal;
