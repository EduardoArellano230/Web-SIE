import './App.css';
import Navbar from './components/navbar';
import Carousel from './components/Carousel';
import Footer from './components/footer';
import Contactobtn from './components/FloatingContact'
import c2 from './assets/C1.png';
import c3 from './assets/C3.png';
import RutaPrivada from "./Rutaprivada";
import { FaCalculator, FaPaintBrush, FaHeadset, FaChalkboardTeacher, FaLaptop } from 'react-icons/fa';
import { Briefcase, Calculator, ClipboardList, DollarSign, Book, FileText, FileCheck } from 'lucide-react';
import Services from './components/Services/Services';
import CONTPAQi from './components/CONTPAQi/CONTPAQi';
import ASPEL from'./components/ASPEL/ASPEL';
import AccesoDenegado from './AccesoDenegado';
import Blog from './components/Blog/Blog';
import Nservices from './components/Nservices/Nservices';
import Conocenos from './components/Conocenos/Conocenos';
import Contacto from './components/Contacto/Contacto';
import Iniciar_sesion from './components/iniciosesion/iniciosesion'
import Dashboard from './components/dashboard/dashboard'
import Sidebar from './components/dashboard/Sidebar'; 
import Soporte_mostrar from './components/dashboard/soporte/soporte_mostrar';
import CarruselMostrar from './components/dashboard/carrusel/CarruselMostrar';
import OfertasMostrar from './components/dashboard/ofertas/OfertasMostrar';
import EquipoMostrar from './components/dashboard/equipo/equipo_mostrar';
import Categoria_Mostrar from './components/dashboard/soporte_categorias/soporteCA_mostrar';
import CertificadoMostrar from './components/dashboard/certificado/mostrar_certificado';
import Blogs_create from './components/dashboard/Blogs/blogs_create';
import Blogs_Mostrar from './components/dashboard/Blogs/blogs_Mostrar';
import BlogDetalle from './components/Blog/BlogDetalle';
import Siigo from './components/siigo/siigo';
import Siigo_get from './components/dashboard/siigo/siigo_get';
import Mostrar_contacto from './components/dashboard/contacto/contacto_mostrar'
import {FaDesktop,FaVideo,FaHome,FaShieldAlt,FaLightbulb,FaBolt} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect  } from 'react';
import { BrowserRouter, Route, Routes, Link,useLocation, useNavigate } from 'react-router-dom';
import { initGA, trackPageView } from "./analytics";



function App() {
  const servicios = [
    { icon: <FaCalculator size={40} />, titulo: 'Una asesoría fiscal', },
    { icon: <FaPaintBrush size={40} />, titulo: 'Rediseño para mi marca' },
    { icon: <FaHeadset size={40} />, titulo: 'Servicio para mi equipo' },
    { icon: <FaChalkboardTeacher size={40} />, titulo: 'Un taller para mi equipo' },
    { icon: <FaLaptop size={40} />, titulo: 'Equipo para mi empresa' },
  ];

    const navigate = useNavigate();


  const handleClick = () => {
    navigate("/Contacto"); 
  };
  const sistemas = [
    { icon: <Briefcase size={40} />, title: 'Comercial', description: 'Aprenderás a facturar, llevar el análisis de tu información comercial, controlarás el proceso de compra y venta, gestionarás inventarios a detalles, generarás reportes administrativos, financieros y contables para conocer tu negocio, aprenderás a usar el visor de documentos digitales y aprovechar la información contenida en los XML.' },
    { icon: <Calculator size={40} />, title: 'Contabilizador', description: 'A partir de tus CFDI aprenderás a configurar y contabilizar tus pólizas de ingresos ,egresos, y diario, ahorrando en promedio un 60% del tiempo en la realización de la captura de los movimientos de la empresa.' },
    { icon: <ClipboardList size={40} />, title: 'Administrativo', description: 'Con este curso aprenderás a planear , organizar, dirigir y controlar los recursos humanos, materiales y financieros de tu empresa, conocerás herramientas para gestionar a tu equipo de operaciones.' },
    { icon: <DollarSign size={40} />, title: 'Capital', description: 'Aprenderás a gestionar las emociones de los empleados, comunicar de manera asertiva y efectiva, obteniendo como resultado un mejor ambiente laboral, aprenderás a empoderar el liderazgo dentro del equipo de operaciones.' },
    { icon: <Book size={40} />, title: 'Contable', description: 'Conocerás los términos básicos del lenguaje contable, aprenderás a identificar activos, pasivos, capital , cuentas de resultado y de balance, así como la elaboración de estados financieros y su interpretación.' },
    { icon: <FileText size={40} />, title: 'Office', description: 'Aprende a aprovechar al máximo las funciones de office para aplicarlas en tu trabajo o negocio,aprenderás a utilizar desde lo más básico de Excel , Word, ya que son las herramientas básicas que debes conocer para gestionar mejor la administración.' },
    { icon: <FileCheck size={40} />, title: 'Facturación', description: 'Aprende a utilizar el sistema para realizar facturas, recibos electrónicos de pago, llevar el control de cobranza, así como reportes administrativos que te ayudarán a tomar las mejores decisiones para tu negocio.' },
  ];
const Store = [
  { icon: <FaDesktop size={40} />, titulo: 'Computadoras', url: 'https://sie-store.com/computadoras/' },
  { icon: <FaVideo size={40} />, titulo: 'Vigilancia', url: 'https://sie-store.com/vigilancia/' },
  { icon: <FaHome size={40} />, titulo: 'Smart Home', url: 'https://sie-store.com/product-category/smart-home/' },
  { icon: <FaShieldAlt size={40} />, titulo: 'Seguridad', url: 'https://sie-store.com/product-category/seguridad/' },
  { icon: <FaLightbulb size={40} />, titulo: 'Iluminación', url: 'https://sie-store.com/product-category/iluminacion/' },
  { icon: <FaBolt size={40} />, titulo: 'Energía', url: 'https://sie-store.com/product-category/energia/' },
];
  const infoBlocks = [
    {
      title: 'Somos Proveedores Autorizados',
      content:
      'Mejora tu gestión empresarial con CONTPAQi, la solución para optimizar tus procesos contables, fiscales y administrativos. Sumérgete en la eficiencia operativa a través de módulos especializados que abarcan contabilidad, bancos, nóminas, comercio y punto de venta. Con CONTPAQi, no solo obtienes herramientas, sino una experiencia de usuario excepcional. Desde el control preciso de tus finanzas hasta la automatización de tareas clave, nuestra suite se adapta a las necesidades cambiantes de tu empresa. Impulsa tu crecimiento con la confianza de contar con un proveedor autorizado de CONTPAQi.\n\nSimplifica, optimiza y lleva tu gestión empresarial al siguiente nivel con la potente suite de CONTPAQi.',
      image: c2,
    },
    {
      title: '¡Optimiza, simplifica y destaca con Aspel!',
      content:
      'Experimenta la suite de software, diseñada para simplificar tu gestión empresarial. Descubre la eficiencia a través de módulos especializados que abarcan contabilidad, bancos, nóminas, comercio y punto de venta. Aspel ofrece una sinergia perfecta, proporcionando herramientas intuitivas y potentes para impulsar la productividad, garantizar la conformidad legal y llevar tus procesos empresariales al siguiente nivel. Confía en nosotros como tu proveedor autorizado de Aspel para acceder a la vanguardia tecnológica y transformar tu enfoque empresarial.',
      image: c3,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSystem, setSelectedSystem] = useState(null);
  const location = useLocation();
  const rutasConSidebar = ["/Dashboard", "/Mostrar_contacto", "/Blogs_create","/Blogs_Mostrar","/Siigo_get","/CarruselMostrar", "/OfertasMostrar", "/EquipoMostrar" ,"/CertificadoMostrar","/Soporte_mostrar" ,"/Categoria_Mostrar"];

  const mostrarSidebar = rutasConSidebar.includes(location.pathname);

    useEffect(() => {
    initGA();
  }, []);

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % infoBlocks.length);
    }, 7000);

    return () => clearInterval(timer);
  }, [infoBlocks.length]);

  const openModal = (sistema) => {
    setSelectedSystem(sistema);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedSystem(null);
  };

  const currentBlock = infoBlocks[currentIndex];

  return (
    <div className="App">
            <Contactobtn/>
      {mostrarSidebar ? <Sidebar /> : <Navbar />}  
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Carousel />

              <section className="servicios">
                <motion.h2 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                  ¿En qué podemos ayudarte?
                </motion.h2>

                <div className="servicios-grid">
  {servicios.map((item, index) => (
    <motion.div
      key={index}
      className="servicio-card"
      whileHover={{ scale: 1.1 }}
      onClick={handleClick}       
      style={{ cursor: "pointer" }}
    >
      <div className="icono">{item.icon}</div>
      <p>{item.titulo}</p>
    </motion.div>
  ))}
</div>

                <div className="info-banner">
                  <h1>CONTPAQi, ASPEL, contabilidad, soporte, programación, diseño y marketing</h1>
                  <h2><span>Corporativo SIE</span> tu mejor aliado</h2>
                </div>
              </section>

              <section className="info-carousel" style={{ backgroundColor: '#f9f9f9', padding: '40px 20px' }}>
                <div className="carousel-content" style={{ maxWidth: '1200px', margin: '0 auto', minHeight: '300px', position: 'relative' }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.8 }}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '20px'
                      }}
                      className="carousel-item"
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: window.innerWidth >= 768 ? 'row' : 'column',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          width: '100%'
                        }}
                        className="carousel-item-content"
                      >
                        <img
                          src={currentBlock.image}
                          alt={currentBlock.title}
                          style={{
                            width: '100%',
                            maxWidth: '400px',
                            height: 'auto',
                            objectFit: 'contain',
                            borderRadius: '10px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            marginBottom: window.innerWidth >= 768 ? '0' : '20px'
                          }}
                        />
                        <div style={{ flex: 1, paddingLeft: window.innerWidth >= 768 ? '40px' : '0' }}>
                          <h2 style={{ fontSize: '2rem', marginBottom: '15px', color: '#1d4ed8' }}>{currentBlock.title}</h2>
                          <p style={{ fontSize: '1.1rem', color: '#333', lineHeight: '1.6', whiteSpace: 'pre-line' }}>{currentBlock.content}</p>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </section>

              <section className="catalogo-sistemas">
                <h2>Nuestros Servicios</h2>
                <div className="catalogo-grid">
                  {sistemas.map((sistema, index) => (
                    <div
                      key={index}
                      className="catalogo-card"
                      onClick={() => openModal(sistema)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="catalogo-icono">
                        {sistema.icon}
                      </div>
                      <p>{sistema.title}</p>
                    </div>
                  ))}
                </div>
                <Link   to={'/Contacto'}>

                <button className="catalogo-button">
                  Cotizar
                </button>
                </Link>
                   
             
              </section>
              <section className="ariculos">
                <motion.h2 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                  SIE Store
                </motion.h2>

                <div className="ariculos-grid">
                  {Store.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.url}
                    className="ariculos-card"
                    whileHover={{ scale: 1.1 }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="ariculos-icono">{item.icon}</div>
                    <p>{item.titulo}</p>
                  </motion.a>
                ))}
               </div>
                <div className="ariculos-info-banner">
                  <h1>Productos tecnológicos, seguridad, iluminación, energía y más.</h1>
                  <h2><span>SIE Store</span>  tu mejor aliado en productos electrónicos</h2>
                </div>
              </section>
            </>
          }
        />
        <Route path="/services" element={<Services />} />
        <Route path="/CONTPAQi" element={<CONTPAQi />} />
        <Route path="/ASPEL" element={<ASPEL />} />
        <Route path="/Blog" element={<Blog />} />
        <Route path="/Conocenos" element={<Conocenos />} />
        <Route path="/Contacto" element={<Contacto/>}/>
        <Route path ="/Iniciar_sesion" element={<Iniciar_sesion/>}/>
        <Route path='/Nservices' element={<Nservices/>}/>
        <Route path="/Dashboard" element={<RutaPrivada><Dashboard /></RutaPrivada>} />
        <Route path="/acceso-denegado" element={<AccesoDenegado />} />
        <Route path="/OfertasMostrar" element={<RutaPrivada><OfertasMostrar /></RutaPrivada>} />        
        <Route path="/CarruselMostrar" element={<RutaPrivada><CarruselMostrar /></RutaPrivada>} /> 
        <Route path="/EquipoMostrar" element={<RutaPrivada><EquipoMostrar /></RutaPrivada>} />      
        <Route path="/Mostrar_contacto" element={<RutaPrivada><Mostrar_contacto /></RutaPrivada>} />
        <Route path="/Soporte_mostrar" element={<RutaPrivada><Soporte_mostrar /></RutaPrivada>} />        
        <Route path="/CertificadoMostrar" element={<RutaPrivada><CertificadoMostrar /></RutaPrivada>} /> 
        <Route path="/Categoria_Mostrar" element={<RutaPrivada><Categoria_Mostrar/></RutaPrivada>} />        
        <Route path="/Blogs_create" element={<RutaPrivada><Blogs_create /></RutaPrivada>} />        
        <Route path="/Blogs_Mostrar" element={<RutaPrivada><Blogs_Mostrar /></RutaPrivada>} />  
        <Route path="/Siigo_get" element={<RutaPrivada><Siigo_get /></RutaPrivada>} />        
        <Route path="/blog_detalle/:id" element={<BlogDetalle />} />
        <Route path="/Siigo" element={<Siigo/>} />
      </Routes>

      {/* Modal */}
  {modalOpen && selectedSystem && (
 <div className="modal-overlay-Sistemas" onClick={closeModal}>
  <motion.div
    className="modal-content-Sistemas"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    onClick={(e) => e.stopPropagation()}
  >
    <button className="close-button-Sistemas" onClick={closeModal}>×</button>

    <div className="modal-header-Sistemas">
      <div className="modal-icon">{selectedSystem.icon}</div>
      <h2>{selectedSystem.title}</h2>
    </div>

    <p>{selectedSystem.description}</p>
  </motion.div>
</div>
)}



{!mostrarSidebar && <Footer />}

      
      
    </div>
  );
}

export default App;
