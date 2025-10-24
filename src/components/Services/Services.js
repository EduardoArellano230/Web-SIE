import React, { useState } from 'react';
import { FaChartLine, FaTools, FaCode, FaPaintBrush, FaChalkboardTeacher, FaLightbulb } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import './services.css';

function Services() {
    const [selectedService, setSelectedService] = useState(null);

    const icons = [
        <FaChartLine />, <FaTools />, <FaCode />, <FaPaintBrush />, <FaChalkboardTeacher />, <FaLightbulb />
    ];

    const services = [
    {
        title: 'Contables',
        shortCard: 'Gestión financiera y fiscal para empresas.',
        shortModal: 'Mediante el registro y la interpretación continua de la información financiera, conoceremos el estado actual de su empresa y le brindaremos soluciones y estrategias personalizadas para un mejor balance de los ingresos y egresos que se generan día con día.',
        details: 'Contables:\n• servicios  Manejo de contabilidad de personas fisicas y morales .\n•  Presentacion de declaraciones mensuales y anuales ante el SAT.\n• Inscripciones ante SAT.\n•Alta patronal antes IMSS e ISN:\n• Elaboramos y timbramos tus facturas y nominas.',
        video: 'https://www.youtube.com/embed/9dX61Jbsfgs?si=Wahn0-_MfUK1_38Z'
    },
    {
        title: 'Soporte Técnico',
        shortCard: 'Contamos con un equipo altamente capacitado para resolver sus dudas.',
        shortModal: 'Contamos con un equipo altamente capacitado para resolver sus dudas y brindarle soluciones oportunas a cualquier tipo de complicación o fallo que lleguen a presentar sus equipos o sistemas operativos',
        details: '• Mantenimientos preventivos y correctivos.\n• Soporte presencial y remoto en sistemas.\n•  Pólizas de servicios para actualizar sistemas.',
        video: 'https://www.youtube.com/embed/vppIHC7n9gs?si=xdhf-DY6Oq4doVjo'
    },
    {
        title: 'Programación',
        shortCard: 'Desarrollo a medida de software, aplicaciones web y móviles.',
        shortModal: 'Escucharemos tus ideas y crearemos un sistema a la medida que cubra las necesidades de tu negocio o empresa, brindándote control total de las tareas y procesos que se necesitan llevar a cabo para lograr tus objetivos.',
        details: '• Gestión de recursos.\n• Puntos de venta.\n•  Notificaciones en tiempos reales.\n• Programación Web.\n•  Tienda online.\n•   Bot de ayuda.',
        video: 'https://www.youtube.com/embed/tSEDH3wgNyA?si=ABSBpb1tO0I57Oqg'
    },
    {
        title: 'Diseño y Marketing',
        shortCard: 'Identidad visual y estrategias digitales para impulsar tu marca.',
        shortModal: 'Creación de logos, campañas publicitarias y manejo de redes sociales, son algunos de los servicios que nuestro talento creativo te ofrece para que puedas crecer tu empresa dándole un toque fresco y novedoso.',
        details: '•  Diseño Web.\n•  Creación de logotipos e imagen corporativa.\n•  Imágenes y videos promocionales.\n•  Videos homenaje\n•  Catálogos digitales de tus productos y/o servicios.\n•  Diseño e impresión de tarjeta y volantes.',
        video: 'https://www.youtube.com/embed/TuWozVN_OjU?si=Q4HKYuTlEv_E8Bid'
    },
    {
        title: 'Capacitación',
        shortCard: 'Formación especializada para equipos de trabajo y líderes.',
        shortModal: 'Es indispensable contar con personal capacitado, por eso mismo te ofrecemos cursos para que tú y tus colaboradores adquieran las herramientas y habilidades necesarias para crecer como empresa.',
        details: '• Cursos y talleres prácticos.\n• Seminarios en liderazgo.\n• Capacitación técnica.',
        video: 'https://www.youtube.com/embed/rnRX9auNCmw?si=GjLgZtxhVQBRt-A6'
    },
    {
        title: 'Talleres',
        shortCard: 'Implementación de tecnologías innovadoras para transformar tu negocio.',
        shortModal: 'El secreto para el éxito empresarial es el trabajo en equipo, por eso mismo te ofrecemos técnicas y dinámicas de integración, enfocadas en el desarrollo personal y profesional. Algunos de los resultados que obtendrás son: aumento en el rendimiento, colaboradores proactivos, motivación y compromiso organizacional.',
        details: '•  Reingeniería personal.\n• Trabajo en equipo.\n•  Comunicación asertiva',
        video: 'https://www.youtube.com/embed/B-eCf1tvIfM?si=vnbR0T9R0x3bAsUY'
    }
];


    const openModal = (index) => setSelectedService(index);
    const closeModal = () => setSelectedService(null);

    return (
        <section className="services">
            <h1 className="services-title">Nuestros Servicios</h1>

            <div className="services-container">
                {services.map((service, index) => (
                    <motion.div
                        key={index}
                        className="service-card"
                        onClick={() => openModal(index)}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="service-icon">{icons[index]}</div>
                        <h2>{service.title}</h2>
                        <p>{service.shortCard}</p>

                    </motion.div>
                ))}
            </div>

            {/* Modal */}
<AnimatePresence>
    {selectedService !== null && (
                  <motion.div
    className="modal-overlay"
    initial={{ opacity: 1 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 1 }}
    onClick={(e) => {
        if (e.target.classList.contains('modal-overlay')) {
            closeModal();
        }
    }}
>
    <motion.div
        className="modal-content"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
    >
        <button className="modal-close" onClick={closeModal}>×</button>

        <h2>{services[selectedService].title}</h2>
        <p>{services[selectedService].shortModal}</p>

        <ul>
            {services[selectedService].details.split('\n').map((item, i) => (
                <li key={i}>{item.replace('• ', '')}</li>
            ))}
        </ul>
        <div className="video-wrapper">
            <iframe
                src={services[selectedService].video}
                title="Video explicativo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
    </motion.div>
</motion.div>

                )}
            </AnimatePresence>
        </section>
    );
}

export default Services;
