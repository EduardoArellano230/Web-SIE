import React, { useState, useEffect } from "react";
import "./siigo.css";
import { FaCheckCircle } from "react-icons/fa";
import imgSiigoNube from '../../assets/NUBEFACTURACION.png';
import LlamadoFinal from "../LlamadoFinal";

function Siigo() {
const [siigoBg, setSiigoBg] = useState(null);

  useEffect(() => {
    fetch("https://corporativosie.com.mx/web/Back/carrusel/get_carusel.php")
      .then((res) => res.json())
      .then((data) => {
        const siigoImage = data.find(slide => slide.categoria === "siigo");
        if (siigoImage) {
          setSiigoBg(siigoImage.imagen);
        }
      })
      .catch((error) => console.error("Error cargando imagen Siigo:", error));
  }, []);

  return (
    <div className="siigo-landing">
      {/* Sección principal con imagen dinámica */}
      <section
              className="siigo-hero-simple"
              style={{
                backgroundImage: siigoBg ? `url(${encodeURI(siigoBg)})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}>
   
            <div className="boton-flotante-con-icono">
              <img
                src="https://www.educadictos.com/wp-content/uploads/2015/03/whatsapp.png"
                alt="WhatsApp"
                className="icono-flotante"
              />
              <a
                href="https://wa.me/5213314162657?text=Hola%2C%20estoy%20interesado%20en%20contratar%20SIIGO%20NUBE%20Facturaci%C3%B3n"
                className="siigo-btn gigante pulse-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                ¡Contrátalo ahora por WhatsApp!
              </a>
            </div>
      </section>

      {/* Beneficios */}
      <section className="siigo-beneficios">
        <h2>Beneficios destacados de Siigo Nube</h2>
        <ul className="beneficios-lista">
          {[
            "Multiusuario",
            "Timbrado ilimitado",
            "Administración clientes y productos",
            "Manejo de impuestos",
            "Cancelación de comprobantes",
            "Reportes",
            "Notas de crédito",
            "Múltiples comprobantes y complementos",
            "Complemento carta porte",
            "Cotizaciones",
            "Seguimiento comercial",
            "Sistema en la nube",
            "Prefacturas"
          ].map((beneficio, index) => (
            <li key={index} className="beneficio-item">
              <FaCheckCircle className="beneficio-icono-lista" />
              <span>{beneficio}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Módulo Siigo Nube */}
      <section className="siigo-modulo-dos-columnas">
        <div className="modulo-dos-columnas-contenido">
          <div className="modulo-texto">
            <h2>Siigo Nube Facturación</h2>
            <ul>
              <li>✅ Emite CFDI y administra tus ventas, cotizaciones y gastos desde cualquier dispositivo.</li>
              <li>✅ Acceso seguro y multiusuario con respaldo en la nube.</li>
              <li>✅ Integración con otras herramientas para simplificar tu contabilidad.</li>
            </ul>
          </div>
          <div className="modulo-imagen">
            <img src={imgSiigoNube} alt="Siigo Nube Facturación" />
          </div>
        </div>
      </section>

           <LlamadoFinal
            titulo="¿Listo para facturar con Siigo Nube?" 
            descripcion="Nuestro equipo está listo para ayudarte a empezar." />
 </div>
  );
}

export default Siigo;
