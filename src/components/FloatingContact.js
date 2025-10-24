import React, { useState, useEffect } from "react";
import {
  FaWhatsapp,
  FaFacebookF,
  FaTimes,
  FaCommentDots,
  FaRobot
} from "react-icons/fa";
import './FloatingContact.css';

const FloatingContact = () => {
  const [showButtons, setShowButtons] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);


  // Cargar el script de Dialogflow una sola vez
  useEffect(() => {
    if (!document.getElementById("df-messenger-script")) {
      const script = document.createElement("script");
      script.id = "df-messenger-script";
      script.src = "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);
useEffect(() => {
  const showTimer = setTimeout(() => {
    setShowTooltip(true);
  }, 5000); // Mostrar después de 5s

  const hideTimer = setTimeout(() => {
    setShowTooltip(false);
  }, 10000); // Ocultar después de 10s

  return () => {
    clearTimeout(showTimer);
    clearTimeout(hideTimer);
  };
}, []);


  const toggleButtons = () => {
    setShowButtons(!showButtons);
  };

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  return (
    <div className="floating-container">
     {showButtons && (
  <div className="floating-socials">
    <div className="tooltip-icon">
      <a
        href="https://wa.me/5213339540617"
        target="_blank"
        rel="noopener noreferrer"
        className="social-btn whatsapp"
      >
        <FaWhatsapp />
      </a>
      <span className="tooltip-label">WhatsApp</span>
    </div>

    <div className="tooltip-icon">
      <a
        href="https://facebook.com/CorporativoSIECONTPAQi"
        target="_blank"
        rel="noopener noreferrer"
        className="social-btn facebook"
      >
        <FaFacebookF />
      </a>
      <span className="tooltip-label">Facebook</span>
    </div>

    <div className="tooltip-icon">
      <button className="social-btn chatbot" onClick={toggleChatbot}>
        <FaRobot />
      </button>
      <span className="tooltip-label">Chatbot</span>
    </div>

    <div className="tooltip-icon">
      <button className="social-btn close" onClick={toggleButtons}>
        <FaTimes />
      </button>
      <span className="tooltip-label">Cerrar</span>
    </div>
  </div>
)}


    <div className="tooltip_floting">
  <span className={`tooltiptext ${showTooltip ? 'visible' : ''}`}>
    Contáctanos para más información
  </span>
  <button className="chat-button" onClick={toggleButtons}>
    <FaCommentDots />
  </button>
</div>


      {/* Mostrar chatbot Dialogflow si está activo */}
      {showChatbot && (
        <div className="chatbot-window" style={{ position: 'fixed', bottom: '80px', right: '20px', zIndex: 9999 }}>
          <div className="chatbot-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 10px', backgroundColor: '#1976d2', color: 'white' }}>
            <h4 style={{ margin: 0 }}>Asistente Virtual</h4>
            <button onClick={toggleChatbot} style={{ background: 'none', border: 'none', color: 'white', fontSize: '18px', cursor: 'pointer' }}>
              <FaTimes />
            </button>
          </div>
          {}
          <df-messenger
            intent="WELCOME"
            chat-title="SoporteBot"
            agent-id="98b03e1e-e924-4157-abf2-6d49b7385956"
            language-code="es"
          ></df-messenger>
        </div>
      )}
    </div>
  );
};

export default FloatingContact;
