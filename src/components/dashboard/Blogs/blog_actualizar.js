import React, { useState, useEffect } from "react";
import AlertService from "../../../AlertService"; 


function Blog_actualizar({ id, onClose, onUpdate }) {
  const [blog, setBlog] = useState(null);
  const [imagenFile, setImagenFile] = useState(null);
  const [imagen2File, setImagen2File] = useState(null);

  useEffect(() => {
    fetch(`https://corporativosie.com.mx/web/Back/blogs/blog_detalle.php?id=${id}`)
      .then((res) => res.json())
      .then((data) => setBlog(data))
      .catch((err) => console.error("Error al obtener blog:", err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", id);
    formData.append("titulo", blog.titulo);
    formData.append("resumen", blog.resumen);
    formData.append("contenido", blog.contenido);
    formData.append("autor", blog.autor);
    formData.append("video_url",blog.video_url);
    formData.append("categoria",blog.categoria);

  if (imagenFile) formData.append("imagen", imagenFile);
    if (imagen2File) formData.append("imagen2", imagen2File)
///https://corporativosie.com.mx/web/Back/blogs/blog_actualizar.php
//http://localhost/web/Back/blogs/blog_actualizar.php
    fetch("https://corporativosie.com.mx/web/Back/blogs/blog_actualizar.php", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
         AlertService.success("Blog actualizado:", data);
        onUpdate(); 
        onClose();  
      })
      .catch((err) =>  AlertService.error("Error al actualizar:", err));
  };

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  if (!blog) return <p>Cargando...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Editar Blog</h2>
      <label>Título:</label>
      <input type="text" name="titulo" value={blog.titulo} onChange={handleChange} required />
      
      <label>Resumen:</label>
      <textarea name="resumen" value={blog.resumen} onChange={handleChange} required />
      
      <label>Categoria:</label>
      <input name="categoria" value={blog.categoria} onChange={handleChange} required />

      <label>Contenido:</label>
      <textarea name="contenido" value={blog.contenido} onChange={handleChange} required />
      
      <label>Autor:</label>
      <input type="text" name="autor" value={blog.autor} onChange={handleChange} required />
      
      <label>Imagen (opcional):</label>
      <input type="file" accept="image/*" onChange={(e) => setImagenFile(e.target.files[0])} />

       <label>Imagen 2 (opcional):</label>
      <input type="file" accept="image/*" onChange={(e) => setImagen2File(e.target.files[0])} />

      <label>Video (opcional):</label>
      <input type="text" name="video_url" onChange={handleChange} value={blog.video_url}  placeholder="URL del video" />

      <button type="submit">Actualizar</button>
      <button type="button" onClick={onClose}>Cancelar</button>
    </form>
  );
}

export default Blog_actualizar;
