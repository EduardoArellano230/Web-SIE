import React, { useEffect, useState } from "react";
import './Conocenos.css';
import sieImage from '../../assets/LOGOS SIE/SIE LEON BLANCO-10.png';
import { FaEye, FaBullseye, FaHeart, FaCheckCircle, FaHandsHelping } from "react-icons/fa";



function Conocenos() {
const [equipo, setEquipo] = useState([]);
const [loading, setLoading] = useState(true);
const firstThree = equipo.slice(0, 3);
const rest = equipo.slice(3);
const groupInRows = (array, itemsPerRow) => {
  const rows = [];
  for (let i = 0; i < array.length; i += itemsPerRow) {
    rows.push(array.slice(i, i + itemsPerRow));
  }
  return rows;
};

const restRows = groupInRows(rest, 4);



useEffect(() => {
  fetch("https://corporativosie.com.mx/web/Back/equipo/get_equipo.php")
    .then(res => res.json())
    .then(data => {
      setEquipo(data);
      setLoading(false);
    })
    .catch(err => {
      console.error("Error al cargar el equipo:", err);
      setLoading(false);
    });
}, []);

  const renderCard = (member, highlight = false) => (
    <div className={`team-card ${highlight ? 'center-member' : ''}`} key={member.name}>
      <div className="image-wrapper">
        <img src={member.image} alt={member.name} />
      </div>
     <h3>{member?.name || "Sin nombre"}</h3>
      <p className="role">{member?.role || "Sin rol"}</p>
      {member?.certificaciones?.length > 0 && (
       <div className="team-icons">
    {member.certificaciones.map((icon, index) => (
      <img key={index} src={icon} alt={`Certificación ${index + 1}`} />
    ))}
  </div>
)}
      <div className="description-hover">
        <p>{member.description}</p>
      </div>
    </div>
  );
    return (
        <>
        <div className="conocenos-container">
            <div className="conocenos-imagen">
                <img src={sieImage} alt="SIE logo" />
            </div>
            <div className="conocenos-texto">
                <h2>¿Qué es SIE?</h2>
                <h3>Solución Integral Empresarial</h3>
                <p>
                    En <strong>Corporativo SIE Guadalajara</strong> somos tu equipo para ayudarte a crecer tu negocio, 
                    seremos tu respaldo y aliado para desarrollar estrategias y procesos que te ayudarán a lograr tus objetivos empresariales.
                </p>
                <p>
                    <strong>Nuestras áreas son:</strong><br />
                    Distribuidores de CONTPAQi y ASPEL, asesorías en contabilidad y fiscal, elaboración de nóminas, 
                    soporte técnico, marketing y diseño, programación y cursos en desarrollo humano empresarial.
                </p>
            </div>
        </div>
        <div className="historia-container">
            <div className="historia-video">
                <iframe
                    src="https://www.youtube.com/embed/M_AEO1OH07U?si=OsmIt4iI-Zn8hUlY"
                    title="Video institucional"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
            <div className="historia-texto">
                <h2>Historia</h2>
                <ul>
                    <li>
                        <strong>2012. Nuestro comienzo.</strong> En el año 2012, comenzó la idea tan sencilla, pero a la vez tan responsable
                        de apoyar a los pequeños y grandes empresarios, en alcanzar y mantener el éxito empresarial, trabajando en equipo
                        con apoyo de la tecnología e implementación de sistemas y capacitación.
                    </li>
                    <li>
                        <strong>2018 – 2019. Expansión.</strong> Cambio de oficinas a Pablo Valdez 1458, se amplió la gama de productos, 
                        servicios y soluciones como: dispositivos de seguridad, diseño web y programación para satisfacer las nuevas necesidades
                        de los clientes. En 2019 estos capacitadores están registrados como capacitadores externos en la Secretaría de Trabajo y
                        Previsión Social. Somos una empresa tutora en el programa de Jóvenes Construyendo el Futuro.
                    </li>
                </ul>
            </div>
        </div>

         <div className="vmv-container">
      <div className="mision-vision-row">
        <div className="vmv-box mision">
          <h2><FaBullseye className="vmv-icon" /> Misión</h2>
          <p>
            Ofrecer soluciones integrales y de calidad a nuestros clientes por medio de la asesoría,
            capacitación e implementación de tecnologías, diseño y sistemas contables administrativos,
            siempre con la mejor atención al cliente y pronta resolución de sus requerimientos.
          </p>
        </div>

        <div className="vmv-box vision">
          <h2><FaEye className="vmv-icon" /> Visión</h2>
          <p>
            Ser reconocidos como la empresa líder en impulsos empresariales en PYMES a nivel nacional.
            Haciendo uso de nuevas tecnologías para implementar sistemas y procesos que garanticen
            la productividad de nuestros clientes.
          </p>
        </div>
      </div>

     <div className="vmv-box valores">
  <h2><FaHeart className="vmv-icon" /> Valores</h2>

  <div className="valores-grid">
    <div className="vmv-valor">
      <FaCheckCircle className="vmv-bullet" />
      <strong>Responsabilidad.</strong>
      <p>Ser eficientes y responsables para el buen funcionamiento del trabajo en equipo.</p>
    </div>

    <div className="vmv-valor">
      <FaCheckCircle className="vmv-bullet" />
      <strong>Honestidad.</strong>
      <p>Comportarse dentro de la verdad y cumplir con los compromisos.</p>
    </div>

    <div className="vmv-valor">
      <FaCheckCircle className="vmv-bullet" />
      <strong>Excelencia.</strong>
      <p>Perseverancia y liderazgo en la gestión y organización para el logro de resultados.</p>
    </div>

    <div className="vmv-valor">
      <FaCheckCircle className="vmv-bullet" />
      <strong>Constancia.</strong>
      <p>Esfuerzo al logro de objetivos y metas establecidas.</p>
    </div>

    <div className="vmv-valor">
      <FaCheckCircle className="vmv-bullet" />
      <strong>Adaptabilidad.</strong>
      <p>Capacidad de responder con flexibilidad a los cambios que ocurren en el entorno.</p>
    </div>

    <div className="vmv-valor">
      <FaCheckCircle className="vmv-bullet" />
      <strong>Colaboración.</strong>
      <p>Unir esfuerzos con el equipo para lograr los resultados deseados.</p>
    </div>
  </div>
</div>

    </div>
<section className="team-container">
  <h2 className="team-title">Nuestro Equipo</h2>

  {loading ? (
    <p>Cargando equipo...</p>
  ) : (
    <>
      <div className="team-grid team-grid-three">
        {firstThree.map((member, index) => renderCard(member))}
      </div>
        <hr className="team-divider" />
    {restRows.map((row, rowIndex) => (
  <div
    className="team-grid team-grid-four"
    key={rowIndex}
    style={{
      justifyContent: row.length < 4 ? 'center' : 'initial'
    }}
  >
    {row.map((member, index) => renderCard(member))}
  </div>
))}
    </>
  )}
</section>

        </>
    );
}

export default Conocenos;
