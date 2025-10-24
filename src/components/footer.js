import React, { useState, useEffect } from 'react';
import './footer.css';
import logo from '../assets/logo.png';
import { FaFacebookF, FaWhatsapp, FaTelegram, FaYoutube, FaLinkedinIn, FaTiktok, FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';

const Footer = () => {
 const [modalOpen, setModalOpen] = useState(false);
  const [categoriaModal, setCategoriaModal] = useState('');
  const [imagenes, setImagenes] = useState([]);
  const [categorias, setCategorias] = useState([]);

useEffect(() => {
  fetch('https://corporativosie.com.mx/web/Back/soporte/categorias_get.php')
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setCategorias(data.data);
      }
    });
}, []);

useEffect(() => {
  if (categoriaModal) {
    fetch(`https://corporativosie.com.mx/web/Back/soporte/soporte_get.php?categoria=${categoriaModal}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setImagenes(data.data);
        } else {
          setImagenes([]);
        }
      });
  }
}, [categoriaModal]);

  const abrirModal = (categoria) => {
    setCategoriaModal(categoria);
    setModalOpen(true);
  };
  return (
    <footer className="footer">
      <div className="footer-top">
        <p>Te invitamos a visitar nuestras redes sociales:</p>
        <div className="social-icons">
          <a href="https://www.facebook.com/CorporativoSIECONTPAQi/"><FaFacebookF /></a>
          <a href="https://wa.me/5213339540617"><FaWhatsapp /></a>
          <a href="https://www.youtube.com/@corporativo_sie?si=Lqy_1WB-ywV0nHrn"><FaYoutube /></a>
          <a href="https://www.linkedin.com/company/corporativo-sie/"><FaLinkedinIn /></a>
          <a href="https://www.tiktok.com/@corporativo_sie_contpaqi?_t=ZS-8xjGVpIwFKz&_r=1"><FaTiktok /></a>
        </div>
      </div>
          <img src={logo} alt="Corporativo SIE" className="footer-logo" />

      <div className="footer-main">
        <div className="footer-left">
          <h4>Description</h4>
          <p className="footer-description">
            Brindamos asesoría a las PYMES desde el 2012.<br />
            Atención a clientes de lunes a viernes de 9:30 a 19:30 hrs.<br/>
            Ofrecer soluciones integrales y de calidad a nuestros clientes por medio de la asesoría, 
            capacitación e implementación de tecnologías, diseño y sistemas contables administrativos,
             siempre con la mejor atención al cliente y pronta resolución de sus requerimientos.
          </p>
        
        </div>
<div className="footer-map">
    <h4>Ubicación</h4>
    <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3732.7658729487274!2d-103.31791979999999!3d20.6801357!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428b19c876ca70d%3A0xd04c5c6fb9217c56!2sCorporativo%20SIE%20Guadalajara!5e0!3m2!1ses-419!2smx!4v1715181483771!5m2!1ses-419!2smx"
      allowFullScreen=""
      loading="lazy"
      title="Ubicación Corporativo SIE"
    ></iframe>
  </div>
  
     <div className="footer-contact">
  <h4>Contacto</h4>
  <p><FaMapMarkerAlt className="icon" /> Pablo Valdez No.1458<br />
    Col. San Juan Bosco, C.P. 44730<br />
    Guadalajara, Jalisco, México.
  </p>

  <p>
    <FaEnvelope className="icon" />
    <a href="mailto:contacto@corporativosie.com.mx"> contacto@corporativosie.com.mx</a>
  </p>

  <p>
    <FaPhone className="icon" />
    <a href="https://wa.me/5213340401698" target="_blank" rel="noopener noreferrer">
      33-4040-1698
    </a> / 
    <a href="https://wa.me/5213313065406" target="_blank" rel="noopener noreferrer">
      33-1306-5406
    </a>
  </p>

  <p>
    <FaPhone className="icon" />
    <a href="https://wa.me/5213313065407" target="_blank" rel="noopener noreferrer">
      33-1306-5407
    </a> / 
    <a href="https://wa.me/5213339868054" target="_blank" rel="noopener noreferrer">
      33-3986-8054
    </a>
  </p>
</div>
<div className="footer-modal-trigger">
{categorias.map((cat) => (
  <button
    key={cat.id}
    onClick={() => abrirModal(cat.id)} 
    className="footer-link-button"
  >
    {cat.nombre}
  </button>
))}

</div>

{modalOpen && (
 <div className="footer-modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="footer-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="footer-modal-close" onClick={() => setModalOpen(false)}>×</button>
            {imagenes.length > 0 ? (
              imagenes.map((img, index) => (
                <img
                  key={index}
                  src={img.imagen}
                  alt={`Soporte ${categoriaModal}`}
                  className="modal-image"
                />
              ))
            ) : (
              <p>No hay imágenes disponibles.</p>
            )}

               <a
      href="https://wa.me/5213339540617"
      target="_blank"
      rel="noopener noreferrer"
      className="modal-whatsapp-button"
    >
      <FaWhatsapp className="whatsapp-icon" />
      Escríbenos
    </a>
          </div>
        </div>
)}

      </div>

      <div className="footer-bottom">
        <p>© 2025 CORPORATIVO SIE GUADALAJARA SOLUCIONES INTEGRALES S.A.S DE C.V. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
