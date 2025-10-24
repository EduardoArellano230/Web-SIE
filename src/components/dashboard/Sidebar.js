import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import logo1 from '../../assets/logo1.png';
export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'collapsed'}`}>
      <div className="sidebar-header">
        <img src={logo1} alt="Corporativo SIE" className="sidebar-logo" />
        <span className="sidebar-title">Corporativo <strong>SIE</strong></span>
        <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>
      </div>
      <ul className="sidebar-links">
        <li><Link to="/Dashboard">Usuarios</Link></li>
        <li><Link to="/Mostrar_contacto">Contacto</Link></li>
        <li><Link to="/Blogs_Mostrar">Blogs</Link></li>
        <li><Link to="/Siigo_get">Siigo</Link></li>
        <li><Link to="/CarruselMostrar">Imagenes</Link></li>
        <li><Link to="/OfertasMostrar">Ofertas</Link></li>
        <li><Link to="/EquipoMostrar">Equipo</Link></li>
        <li><Link to="/CertificadoMostrar">Certificados</Link></li>
        <li><Link to="/Soporte_mostrar">soporte</Link></li>
        <li><Link to="/Categoria_Mostrar">Categoría Soporte</Link></li>

<li>
  <Link to="/" onClick={() => {
    localStorage.removeItem("usuario");
    sessionStorage.removeItem("usuario");
  }}>
    Cerrar sesión
  </Link>
</li>
        
      </ul>
    </div>
  );
}
