import React, { useState } from "react";
import "./ASPEL.css";
import logo from "../../assets/logo_aspel.png";
import Ofertas from "../Ofertas";
import { FaBell, FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { Link } from 'react-router-dom';

function obtenerImagen(nombreIMG) {
  return require(`../../assets/aspel/${nombreIMG}`);
}

const serviciosAspel = [
  {
    nombre: "aspel SAE",
    descripcion:
      "Es el sistema Adminitrativo Empresarial que apoya a todos aquellos empresarios y Pymes que requieren optimizar la gestio de su negocio.",
    icono: "ASPEL SAE.png",
    videoUrl: "https://youtu.be/7fea0FXKUaQ?si=5bwQhuoI8dp4XJ7b",
  },
  {
    nombre: "aspel FACTURE",
    descripcion:
      "Sistema de Facturacion inteligente online,la herramienta que te ayudara a generar facturas,notas de credito y recibos de honorarios",
    icono: "ASPEL FACTURE.png",
    videoUrl: "https://youtu.be/SP1drc2XsxA?si=8n7goXYsRYHWYoAq",
  },
  {
    nombre: "aspel COI",
    descripcion:
      "Almacena y comparte tu informacion contable y fiscal de manera segura desde la nube.",
    icono: "ASPEL COI.png",
    videoUrl: "https://youtu.be/It1479JFZIU?si=H_0LgTphHlVCuKAb",
  },
  {
    nombre: "aspel CONTA Asistente",
    descripcion:
      "Facilita la captura y gestion de operaciones basicas de una empresa,tales como los ingresos,egresos y la adquisicion de bienes en funcion de un comprobante.",
    icono: "ASPEL CONTA ASISTENTE.png",
    videoUrl: "https://youtu.be/j9SY-zdJAGk?si=TM_gVAHJO5KLOvbq",
  },
  {
    nombre: "aspel SERVIDOR Virtual",
    descripcion:
      "Es un servicio que te permite acceder de forma remota a los Sistemas Aspel SAE, CAJA, BANCO Y PROD de froma sencilla y segura desde cualquier lugar y mometo.",
    icono: "ASPEL SERVIDOR VIRTUAL.png",
    videoUrl: "https://youtu.be/FcP_zFrBE8c?si=WXS1mLRMvABY5b5E",
  },
  {
    nombre: "aspel ESPACIO",
    descripcion:
      "Servicio inteligente en la nube para concentrar y compartir infomacion contable, financiera y comercial de manera segura y efectiva.",
    icono: "ASPEL ESPACIO.png",
    videoUrl: "https://youtu.be/kEQI-iWbiXo?si=cP_JES8LUYeLa28D",
  },
  {
    nombre: "aspel NOI",
    descripcion:
      "Software de nomina integral que te ayuda adminitrar la nomina y capital humano. Automatiza en control de la nomina.",
    icono: "ASPEL NOI.png",
    videoUrl: "https://youtu.be/elZ0EesuDsQ?si=mMERCXdjiKVi1UsZ",
  },
  {
    nombre: "aspel NOI Asistente",
    descripcion:
      "Lleva el control y registro de diversos movimientos como son: asistencias,retardos, vacaciones, permisos e incapacidad, entre otros.",
    icono: "ASPEL NOI ASISTENTE.png",
    videoUrl: "https://youtu.be/svl1QHLogGs?si=Lf4Yyw9RezVxe_tx",
  },
  {
    nombre: "aspel CAJA",
    descripcion:
      "Sistema punto de Venta que facilita realizar cobors en los negocios y automatizar ek manejo de operaciones comerciales.",
    icono: "ASPEL CAJA.png",
    videoUrl: "https://youtu.be/roCQLBwqaVo?si=GrpLv21yDBrTvuFi",
  },
  {
    nombre: "aspel BANCO",
    descripcion:
      "ES el Sistema de Control Bancario que permite controlar de manera sencilla sus operaciones con varios bancos.",
    icono: "ASPEL BANCO.png",
    videoUrl: "https://youtu.be/q83ZIPSTJ6k?si=l0oJta57skqNHBWd",
  },
  {
    nombre: "aspel PROD",
    descripcion:
      "Automatiza la manufactura y todad las operaciones relacionadas,como la gestio de inventarios y calculo de materia prima.",
    icono: "ASPEL PROD.png",
    videoUrl: "https://youtu.be/TwoXDYzhbuo?si=Nb-s_gL3mezN2Eri",
  },
  {
    nombre: "aspel ADM",
    descripcion:
      "Gestiona las principales operaciones de compra-venta y factura desde cualquier lugar en todo memento de manera facil, eficiente y segura.",
    icono: "ASPEL ADM.png",
    videoUrl: "https://youtu.be/LqTHZp2mIic?si=_uhPdtt7W65hJNTE",
  },
  {
    nombre: "aspel ADM Tienda",
    descripcion:
      "App en linea compatible con cualuiqer prunto de venta que facilita el escaneo y cobro de mercancia en la movilidad que requieres en el respaldo de la mejora tecnologia Aspel.",
    icono: "ASPEL ADM TIENDA.webp",
    videoUrl: "https://youtu.be/U_52KPCMAso?si=2eEpmJBjprUVkgX-",
  },
];

// Solo servicios SIIGO separados
const serviciosSiigo = [
  {
    nombre: "aspel SIIGO Facturacion",
    descripcion:
      "Fortalece las relaciones comerciales con tus clientes creando cotizaciones inteligetes, seguimientes comerciales y reportes de ventas.",
    icono: "ASPEL SIIGO FACTURACION.png",
    videoUrl: "https://youtu.be/cPyS_4CgxWU?si=p8YUIPp_O8-IMojn",
  },
  {
    nombre: "aspel SIIGO Gestion",
    descripcion:
      "Ahora administrar con agilidad tus procesos de ventas, cotizaciones, seguimietos comerciales,compras gastos.",
    icono: "ASPEL SIIGO GESTION.png",
    videoUrl: "https://youtu.be/ojF9bem2T-s?si=2bwXlSnMWpB0_fvQ",
  },
   
];


function Aspel() {
  const [mostrarOfertasAspel, setMostrarOfertasAspel] = useState(true);
  const toggleOfertasAspel = () => setMostrarOfertasAspel(!mostrarOfertasAspel);

  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  const cerrarModal = () => setImagenSeleccionada(null);

  return (
    <>
   <section className="aspel-hero">
  <div className="aspel-hero-left">
    <img src={logo} alt="Logo Aspel" className="aspel-hero-logo" />
  </div>
  <div className="aspel-hero-right">
    <h1 className="aspel-hero-title">¿Qué es ASPEL?</h1>
    <p className="aspel-hero-text">
      Como resultado de la innovación en soluciones tecnológicas,
      favorecemos la correcta toma de decisiones para su crecimiento e
      impulsamos su transformación digital. Nuestros sistemas facilitan
      el cumplimiento de las obligaciones fiscales electrónicas
      incluyendo facturación, contabilidad y nómina.
    </p>
    <div className="aspel-hero-redes">
      <a href="https://facebook.com/tuPagina" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
      <a href="https://instagram.com/tuPagina" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
      <a href="https://linkedin.com/tuPagina" target="_blank" rel="noopener noreferrer"><FaTiktok /></a>
      <Link to="/Contacto" className="aspel-contacto-btn">Contáctanos</Link>
    </div>
  </div>
</section>

      <Ofertas categoria="ASPEL" />


      {/* Servicios ASPEL (sin SIIGO) */}
      <div className="aspel-servicios">
        <h3>Servicios ASPEL</h3>
        <div className="aspel-grid">
          {serviciosAspel
            .filter(
              (servicio) =>
                !serviciosSiigo.some((siigo) => siigo.nombre === servicio.nombre)
            )
            .map((servicio, idx) => (
              <div
                className="aspel-card"
                key={idx}
                onClick={() => window.open(servicio.videoUrl, "_blank")}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={obtenerImagen(servicio.icono)}
                  alt={servicio.nombre}
                  className="aspel-img"
                />
                <div className="aspel-overlay">
                  <h4>{servicio.nombre}</h4>
                  <p>{servicio.descripcion}</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="siigo-servicios">
        <h3>Servicios SIIGO</h3>
        <div className="aspel-grid">
          {serviciosSiigo.map((servicio, idx) => (
            <div
              className="aspel-card"
              key={idx}
              onClick={() => window.open(servicio.videoUrl, "_blank")}
              style={{ cursor: "pointer" }}
            >
              <img
                src={obtenerImagen(servicio.icono)}
                alt={servicio.nombre}
                className="aspel-img"
              />
              <div className="aspel-overlay">
                <h4>{servicio.nombre}</h4>
                <p>{servicio.descripcion}</p>
              </div>
            </div>
          ))}
        </div>
      </div>


    </>
  );
}

export default Aspel;
