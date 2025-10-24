import React, { useState } from 'react';
import './navbar.css';
import logo1 from '../assets/logo1.png'; 
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const handleLinkClick = () => {
  setIsOpen(false);
};

  return (
    <nav className="navbar-container">
  <Link to="/" className="navbar-logo">
    <img src={logo1} alt="Corporativo SIE" />
    <span>Corporativo <strong>SIE</strong></span>
  </Link>

  <ul className={`navbar-links ${isOpen ? 'open' : ''}`}>
    <li><Link to="/" className="gradient-text" onClick={handleLinkClick} >Inicio</Link></li>
    <li><Link to="/services" className="gradient-text" onClick={handleLinkClick}>Servicios</Link></li>
    <li><Link to="/Nservices" className="gradient-text" onClick={handleLinkClick}>Sistemas</Link></li>
    <li><Link to="/CONTPAQi" className="gradient-text" onClick={handleLinkClick}>CONTPAQi</Link></li>
    <li><Link to="/ASPEL" className="gradient-text" onClick={handleLinkClick}>ASPEL</Link></li>
    <li><Link to="/Siigo" className="gradient-text" onClick={handleLinkClick}>Siigo</Link></li>
    <li><a href="https://sie-store.com/" className="gradient-text" onClick={handleLinkClick}>SIE Store</a></li>
    <li><Link to="/Conocenos" className="gradient-text" onClick={handleLinkClick}>Conócenos</Link></li>
    <li><Link to="/Blog" className="gradient-text" onClick={handleLinkClick}>Blog</Link></li>

  </ul>

  <div
    className={`navbar-hamburger ${isOpen ? 'toggle' : ''}`}
    onClick={() => setIsOpen(!isOpen)}
  >
    <span></span>
    <span></span>
    <span></span>
  </div>
</nav>
  );
}
