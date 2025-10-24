import React, { useState } from "react";
import './blogs_geneal.css';
import AlertService from "../../../AlertService";

function Blogs_create({ onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    titulo: '',
    resumen: '',
    autor: '',
    contenido: '',
    fecha: '',
    imagen: null,
    imagen2: null,
    video_url: '',
    categoria: ''
  });

  const [leyendas, setLeyendas] = useState({});


  const handleFocus = (campo) => {
  const leyendasText = {
    titulo: "Usa un título corto (menos de 30 caracteres).",
    resumen: "Este resumen se mostrará públicamente. Máximo 2 líneas sugeridas.",
    categoria: "Ejemplo: Tecnología, Educación, etc.",
    imagen: "Imagen principal (recomendado 800x600px).",
    imagen2: "Imagen secundaria opcional (recomendado 1920x1080px).",

  };

  setLeyendas(prev => ({ ...prev, [campo]: leyendasText[campo] || '' }));
};

const handleChange = (e) => {
  const { name, value, files } = e.target;

  if (name === 'imagen' || name === 'imagen2') {
    setFormData({ ...formData, [name]: files[0] });
  } else {
    if (name === 'titulo') {
      const maxCaracteres = 30;
      const longitud = value.length;

      if (longitud > maxCaracteres) {
        setLeyendas(prev => ({
          ...prev,
          titulo: `⚠️ Has escrito ${longitud} caracteres. El límite es de ${maxCaracteres}.`
        }));
      } else {
        setLeyendas(prev => ({
          ...prev,
          titulo: `Recuerda: llevas ${longitud} de ${maxCaracteres} caracteres.`
        }));
      }
    }

    setFormData({ ...formData, [name]: value });
  }
};



  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));

    try {
      const response = await fetch("https://corporativosie.com.mx/web/Back/blogs/blogs_crear.php", {
        method: "POST",
        body: data
      });

      const result = await response.json();
      if (result.success) {
        AlertService.success("Blog guardado correctamente.");
        onUpdate();
        onClose();
      } else {
        AlertService.error("Error al enviar: " + result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      AlertService.error("Error en la conexión al servidor.");
    }
  };

  return (
    <>
      <form className="formulario" onSubmit={handleSubmit}>
        <h2>Crear nuevo Blog</h2>

  <label>Título:</label>
    <div className="input-container">
        {leyendas.titulo && (
          <span className={`tooltip ${leyendas.titulo.includes('⚠️') ? 'tooltip-error' : ''}`}>
            {leyendas.titulo}
          </span>
        )}
        <input type="text" name="titulo" value={formData.titulo} maxLength={50} onChange={handleChange} onFocus={() => handleFocus('titulo')}
          required/>
    </div>
  <label>Resumen:</label>
    <div className="input-container">
        {leyendas.resumen && (
          <span className="tooltip">{leyendas.resumen}</span>
        )}
        <input type="text" name="resumen" value={formData.resumen} onChange={handleChange} onFocus={() => handleFocus('resumen')}
          required/>
    </div>
  <label>Categoría:</label>
      <div className="input-container">
          {leyendas.categoria && (
          <span className="tooltip">{leyendas.categoria}</span>
        )}
         <input type="text" name="categoria" value={formData.categoria}
          onChange={handleChange} onFocus={() => handleFocus('categoria')} required />
       </div>

  <label>Imagen principal:</label>
      <div className="input-container">
          {leyendas.imagen && (
          <span className="tooltip">{leyendas.imagen}</span>
        )}
          <input type="file" name="imagen" accept="image/*"
          onChange={handleChange} onFocus={() => handleFocus('imagen')} required />
      </div>
  <label>Imagen secundaria:</label>
      <div className="input-container">
            {leyendas.imagen2 && (
          <span className="tooltip">{leyendas.imagen2}</span>
        )}
          <input type="file" name="imagen2" accept="image/*"
          onChange={handleChange} onFocus={() => handleFocus('imagen2')} />
     </div>

        <label>Autor:</label>
        <input type="text" name="autor" value={formData.autor}
          onChange={handleChange} onFocus={() => handleFocus('autor')} />

        <label>Contenido:</label>
        <textarea name="contenido" rows="6" value={formData.contenido}
          onChange={handleChange} onFocus={() => handleFocus('contenido')} required />

        <label>Fecha:</label>
        <input type="date" name="fecha" value={formData.fecha}
          onChange={handleChange} onFocus={() => handleFocus('fecha')} />

        <label>URL del video (opcional):</label>
        <input type="text" name="video_url" value={formData.video_url}
          onChange={handleChange} onFocus={() => handleFocus('video_url')} />

     
        <button type="submit">Enviar</button>
      </form>
    </>
  );
}

export default Blogs_create;
