import React, { useState } from "react";
import {
  FaFileInvoiceDollar,
  FaUserTie,
  FaLaptopCode,
  FaPaintBrush,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaCarSide
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import "./Nservices.css";

function Nservices() {
  const [selectedNservice, setSelectedNservice] = useState(null);

  const icons = [
    <FaFileInvoiceDollar />,
    <FaUserTie />,
    <FaLaptopCode />,
    <FaPaintBrush />,
    <FaCarSide/>
  ];

  const Nservice = [
    {
      title: "CRM Hospitalaria",
      shortCard: "Administra áreas, pacientes, medicamentos y pagos con facilidad.",
      shortModal:
        "Nuestro sistema Hospitalario está destinado para que puedas tener gestión de tu personal, los medicamentos que traspasas entre las áreas y el control de pagos de los pacientes.",
      details:
        "Modulos:\n• Áreas.\n• Habitaciones\n• Pacientes.\n• Usuarios\n• Medicamentos.\n• Paquetes y pagos",
      video: "https://www.youtube.com/embed/EvYdprEDaSE?si=cXkNCAIQRblVnucD"
    },
    {
      title: "CRM Contable",
      shortCard: "Gestiona clientes, datos fiscales y soporte desde un solo lugar.",
      shortModal:
        "Nuestro CRM Contable te brindará una gestión integral de tus clientes, incluyendo sus datos fiscales. Además, permite administrar los soportes técnicos y hacer los seguimientos a las ventas.",
      details:
        "• Modulos:\n• Soportes\n• Contabilidad.\n• Ventas\n• Empleados\n• Prospectos\n• Marketing",
      video: "https://youtube.com/shorts/Oa_gNTrOicQ?si=r6GZunF6x46-drkU"
    },
    {
      title: "CRM Pago a Proveedores",
      shortCard: "Controla pagos, cuentas y proveedores de forma eficiente.",
      shortModal:
        "Es un intuitivo y amigable sistema en el cual podrás realizar un registro de los pagos, cuentas, proveedores y beneficiarios que cruzan por tu empresa. Lleva el control y registro de lo que pasa en tu negocio mediante reportes y notas de pago.",
      details:
        "• Modulos:\n• Pagos.\n• Cuentas.\n• Proveedores.\n• Beneficiarios.",
      video: "https://www.youtube.com/embed/tSEDH3wgNyA?si=ABSBpb1tO0I57Oqg"
    },
    {
      title: "CRM de Préstamos",
      shortCard: "Administra préstamos, clientes y adeudos con precisión.",
      shortModal:
        "Registra y gestiona los pagos, proveedores y beneficiarios relacionados con los préstamos que recibe o emite. Lleva un control de las operaciones para que siempre tengas visibilidad del manejo de tus finanzas.",
      details:
        "• Modulos:\n• Remitentes\n• Clientes.\n• Préstamos.\n• Adeudos",
      video: "https://www.youtube.com/embed/TuWozVN_OjU?si=Q4HKYuTlEv_E8Bid"
    },
    {
      title: "CRM Renta de vehiculos",
      shortCard: "Gestiona tu negocio de rentas vehiculares desde la comodidad de un solo sistema administrativo",
      shortModal:
        "Nuestro Control de Renta de Vehiculos controlaras de manera clara y organizada los vehículos que tengas en renta. Un sistema ideal para negocios que brindan este servicio en ciudad o áreas recreativas.",
      
      video: "https://www.youtube.com/embed/RGYCTnYv3JQ?si=MoVdbRgjq3mAHVj1"
    }
  ];

  const openModal = (index) => setSelectedNservice(index);
  const closeModal = () => setSelectedNservice(null);

  return (
    <>
          <motion.section
        className="nservice-hero"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="nservice-hero-content">
          <motion.h1
            className="nservice-title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Nuestros Sistemas
          </motion.h1>

          <motion.p
            className="nservice-subtext"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Conoce nuestros sistemas para que elijas el que más se adapte a tus necesidades.
          </motion.p>

          <motion.div
            className="nservice-actions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Link to="/Contacto" className="nservice-btn">
              Contáctanos
            </Link>

            <div className="nservice-redes">
              <a href="https://www.facebook.com/profile.php?id=61568170294218#" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebook className="nservice-icono-red" />
              </a>
              <a href="https://www.instagram.com/corporativo_sie_web_mkt/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram className="nservice-icono-red" />
              </a>
              <a href="https://www.tiktok.com/@corporativo.sie.d" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FaTwitter className="nservice-icono-red" />
              </a>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <div className="Nservice-container">
        {Nservice.map((service, index) => (
          <motion.div
            key={index}
            className="Nservice-card"
            onClick={() => openModal(index)}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 15px 25px rgba(13, 141, 219, 0.4)"
            }}
            transition={{ duration: 0.3 }}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") openModal(index);
            }}
            role="button"
            aria-label={`Abrir detalles de ${service.title}`}
          >
            <div className="Nservice-icon">{icons[index]}</div>
            <h2>{service.title}</h2>
            <p>{service.shortCard}</p>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedNservice !== null && (
          <motion.div
            className="Nservice-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target.classList.contains("Nservice-modal-overlay")) closeModal();
            }}
          >
            <motion.div
              className="Nservice-modal-content"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              <button className="Nservice-modal-close" onClick={closeModal} aria-label="Cerrar modal">
                ×
              </button>
              <h2 id="modal-title">{Nservice[selectedNservice].title}</h2>
              <p>{Nservice[selectedNservice].shortModal}</p>
              <ul>
                {Nservice[selectedNservice].details.split("\n").map((item, i) => (
                  <li key={i}>{item.replace(/^•\s*/, "")}</li>
                ))}
              </ul>
              <div className="Nservice-video-wrapper">
                <iframe
                  src={Nservice[selectedNservice].video}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Video explicativo"
                />
              </div>
              <br/>
                <Link to="/Contacto" className="nservice-btn">
              Contáctanos
            </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Nservices;
