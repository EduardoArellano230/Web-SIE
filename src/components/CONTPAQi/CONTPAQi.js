import React ,{ useEffect, useState }from "react";
import "./CONTPAQi.css";
import logo from "../../assets/C2.png";
import { FaBell } from "react-icons/fa";
import Ofertas from "../Ofertas";
import LlamadoFinal from "../LlamadoFinal";
import { Link, Links } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";

const servicios = {
  Contables: [
    { nombre: "Contabilidad", descripcion: "Integra y controla tu proceso contables, fiscal y finaciero.", imagen: "contpaqi-contabiliza.png", videoUrl: "https://www.youtube.com/watch?v=Tlqh-OVg3W0&list=PLvrfaCJvgmK0XKO-7FlZG_HSKOnv_jUFL&index=7"},
    { nombre: "Nóminas", descripcion: "Administra tu nomina y cumple en tiempo con las obligaciones de ley.", imagen: "CONTPAQi-Nominas-02.png", videoUrl: "https://youtu.be/Mybba-ZFV6Y?si=qb3mIHcO0Y9O_oTw"},
    { nombre: "Bancos", descripcion: "Facilita la administracion de tus cuentas y flujo de efectivo con el control de ingresos y egresos.", imagen: "CONTPAQi-Bancos-02.png",videoUrl: "https://youtu.be/vGFaMsZYm4o?si=716Im99GHFQwP1Sa" },
    { nombre: "xml en linea+", descripcion: "Busca y descarga de forma automatica y masiva los CFDI del porytal del SAT.", imagen: "xml-contpaq.png",videoUrl: "https://youtu.be/NmkQECRmP3U?si=J3bIKlTrrJkwUwcH" }

  ],
  Comerciales: [
    { nombre: "Factura electrónica", descripcion: "Automatiza y has mas eficiente tu proceso de facturacion.", imagen: "factura-contpaq.png",videoUrl: "https://youtu.be/-gbioazVsk8?si=BIqVBuplWuOYYLid" },
    { nombre: "CFDI Facturacion", descripcion: "Facilita la emicion y timdrado de tus CFDI por internet.", imagen: "cfdi-contpaq.png",videoUrl: "https://youtu.be/O4_8jcDVJzo?si=N_hzGpqZVe-SbCzI" },
    { nombre: "Comercial", descripcion: "Integra y planifica tus actividades", imagen: "comercial-contpaq.png",videoUrl: "https://youtu.be/Q7gZkECJRfk?si=eO5AlO7OGDAI7b9u" },
    { nombre: "produccion", descripcion: "Controla, administr los recursos,procesos de produccion y fabricacion de tu empresa.", imagen: "produccion-contpaq.png",videoUrl: "https://youtu.be/chbPI-0jYNA?si=HL7t1VXF-pLSvW_w" },
  
  ],

  Nube: [
    { nombre: "Decide", descripcion: "Los reportes que necesitas personalizados y tiempo real para que tomes las mejores decisiones para tu negocio.", imagen: "Decide.png",videoUrl: "https://youtu.be/oqHYJsmWloQ?si=cNqnW-3WczfZseaI" },
    { nombre: "Timbra", descripcion: "Es un servicio de timbrado masivo de CFDI'S para empresas que tienen altos niveles de transacciones con requerimientes de automatizar diversos procesos de facturacion.", imagen: "Timbra.png",videoUrl: "https://youtu.be/XOU62YScxNo?si=UNM6wpMVrccJTV9B" },
    { nombre: "Vende", descripcion: "Realiza todo el proceso para la generacion de factura electronica y adminitracion de documentos emitidos de cuentas por cobrar.", imagen: "vende.png",videoUrl: "https://youtu.be/CBOxA4g6FnA?si=Pgcc9AM2ItNlkDx8"},
    { nombre: "Viaticos", descripcion: "Es una plataforma en la nube que lleva con multiples formas de pago, incluyendo gastos en efectivo.", imagen: "Viaticos.png",videoUrl: "https://youtu.be/n7KyZrLmZ9c?si=91qlnvYAalqIDOwC" },
    { nombre: "QR", descripcion: "Automatizar el intercambio de ifomacion fiscal entre un usuario que busca facturar y una empresa proveedora de productos y servicios que le facturara, a traves de la captura de un QR code.", imagen: "QR.png",videoUrl: "https://youtu.be/rrMBuoK7IdU?si=A5dItQs8NJ_jeENH" },
    { nombre: "Personia", descripcion: "Controla, automatiza y adminitra tus operaciones de nomina desde cualquier lugar y en todo momento.", imagen: "Personia.png",videoUrl: "https://youtu.be/3GFI3TludU4?si=tn4vgvy7Tm6hG2vw" },
    { nombre: "Cobra", descripcion: "Seguimiento, gestion y automatizacion del proceso de cuentas por cobrar de una empresa a traves del estado de cuenta interactivo, cumpliendo con el timbrado, entrega y recepcion del REP de clientes.", imagen: "Cobra.png",videoUrl: "https://youtu.be/-f6foaWMGQA?si=CNIowhVDqFB_9fx1" },
    { nombre: "Colabora", descripcion: "Permite gestionar al nominista los procesos de la nomina asi como los de recursos humanos, de sus colaboradores,, con e objetivo agilizar proceso asi como implusar la productividad.", imagen: "Colabora.png",videoUrl: "" },
    { nombre: "Contabiliza", descripcion: "La solucion para llevar tu contabulidad en la nuebe, ten control y visibilidad de tus datos contables en la misma cuenta.", imagen: "Contabiliza.png",videoUrl: "https://youtu.be/jCp8G50oJU0?si=JOZMbPdLMVIjTQGT" },
    { nombre: "Virtual", descripcion: "Acceder al escritorio de tu computadora desde cualquier dispositivo en el lugar y momento que lo necesites.", imagen: "virtual.png",videoUrl: "https://youtu.be/STNnX0CAPE4?si=XDaskfbi4XVxDbH9" },
    { nombre: "Respaldos", descripcion: "Sube, administra y resguara en la nube toda la informacion de tus sistemas CONTPAQI y cualquier archivo de tu equipo.", imagen: "respaldos.png",videoUrl: "https://youtu.be/9BwTELDVse4?si=LtBXZMRZK2oJdAZJ" }

  ],


};


function CONTPAQi() {
  const [mostrarOfertas, setMostrarOfertas] = useState(true);
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
const cerrarModal = () => setImagenSeleccionada(null);
const [certificadosBD, setCertificadosBD] = useState([]);

useEffect(() => {
  fetch("https://corporativosie.com.mx/web/Back/certificados/get_certificados.php")
    .then((res) => res.json())
    .then((data) => setCertificadosBD(data))
    .catch((err) => console.error("Error al cargar certificados:", err));
}, []);
  return (
    <>
 <div className="contpaqi-hero">
  <div className="contpaqi-hero-left">
    <img src={logo} alt="CONTPAQi logo" className="contpaqi-hero-logo" />
  </div>
  <div className="contpaqi-hero-right">
    <h2 className="contpaqi-hero-title">¿Qué es CONTPAQi?</h2>
    <p className="contpaqi-hero-text">
      En <strong>CONTPAQi®</strong> desarrollamos y comercializamos software empresarial
      fácil y completo que ayuda a las personas a ser más productivas.
    </p>
    <div className="contpaqi-hero-redes">
      <a href="https://www.facebook.com/CorporativoSIECONTPAQi" target="_blank" rel="noopener noreferrer" className="contpaqi-icono-red">
        <FaFacebook />
      </a>
      <a href="https://www.instagram.com/corporativo_sie_contpaqi/" target="_blank" rel="noopener noreferrer" className="contpaqi-icono-red">
        <FaInstagram />
      </a>
      <a href="https://www.tiktok.com/@corporativo_sie_contpaqi " target="_blank" rel="noopener noreferrer" className="contpaqi-icono-red">
        <FaTiktok />
      </a>
      <Link to={"/Contacto"} className="contpaqi-contacto-btn">Contáctanos</Link>
    </div>
  </div>
</div>


  <div className="categorias">
   
<Ofertas categoria="CONTPAQi" />
        {/* El resto de las categorías */}
        {Object.entries(servicios).map(([categoria, items]) => (
          <div key={categoria} className="categoria">
            <h3>{categoria}</h3>
            <div className="tarjetas">
              {items.map((item, idx) => (
                   <div key={idx} className="tarjeta" onClick={() => item.videoUrl && window.open(item.videoUrl, "_blank")} style={{ cursor: "pointer"}}>
                  <img
                    src={require(`../../assets/contpaqi/${item.imagen}`)}
                    alt={item.nombre}
                    className="tarjeta-imagen"
                  />
                  <div className="tarjeta-contenido">
                    <h4>{item.nombre}</h4>
                    <p>{item.descripcion}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    
<div className="categoria certificados">
  <h3>Certificaciones</h3>
  <div className="tarjetas-certificados">
    {certificadosBD.map((cert, idx) => (
      <div key={idx} className="tarjeta-certificado">
        <img
          src={cert.imagen}
          alt={cert.nombre || `Certificación ${idx + 1}`}
          className="imagen-certificado"
        />
      </div>
    ))}
  </div>
</div>

<LlamadoFinal/>


    </>
  );
}

export default CONTPAQi;
