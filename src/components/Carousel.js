import React, { useState, useEffect } from 'react';
import './Carousel.css';

export default function Carousel() {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  fetch("https://corporativosie.com.mx/web/Back/carrusel/get_carusel.php")
    .then(res => res.json())
    .then(data => {

      const filteredSlides = data.filter(slide => slide.categoria === "carrusel");
      setSlides(filteredSlides);
      setLoading(false);
    })
    .catch(err => {
      console.error("Error al cargar el carrusel:", err);
      setLoading(false);
    });
}, []);


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (slides.length > 0 ? (prev + 1) % slides.length : 0));
    }, 5000);
    return () => clearInterval(timer);
  }, [slides]);

  const goToSlide = (index) => {
    setCurrent(index);
  };

  if (loading || slides.length === 0) {
    return (
      <div className="carousel-loader-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="carousel">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`slide ${index === current ? 'active' : ''}`}
        >
          <img src={slide.imagen} alt={slide.titulo} className="slide-image" />
        {(slide.titulo || slide.descripcion) && (
  <div className="content">
    {slide.titulo && <h2>{slide.titulo}</h2>}
    {slide.descripcion && <p>{slide.descripcion}</p>}
  </div>
)}
        </div>
      ))}

      <div className="indicators">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === current ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}
