import React, { useEffect, useState } from "react";
import './Blog.css';
import Blog_1 from'../../assets/IMAGENES BLOG/Blog_1_new.jpeg'
import { Link } from "react-router-dom";
import Buscador from './Blog_buscador';

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [resultadosBusqueda, setResultadosBusqueda] = useState(null);  

  useEffect(() => {
    fetch("https://corporativosie.com.mx/web/Back/blogs/blogs.php")
      .then(async res => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || 'Error en la respuesta');
        }
        return res.json();
      })
      .then(data => {
        setBlogs(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error al cargar los blogs:", err);
        setError(err.message || "No se pudo cargar la información de blogs.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="blog-container">
        <h1 className="blog-title">Nuestro Blog</h1>
        <p>Cargando blogs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blog-container">
        <h1 className="blog-title">Nuestro Blog</h1>
        <p>{error}</p>
      </div>
    );
  }

  const blogsParaMostrar = resultadosBusqueda !== null ? resultadosBusqueda : blogs;

  return (
    <div className="blog-container">
      <h1 className="blog-title">Nuestro Blog</h1>
      <Buscador setResultadosBusqueda={setResultadosBusqueda} />

      <div className="blog-list">
        {blogsParaMostrar.length === 0 ? (
          <div className="no-blogs-message">
            <p>No hay blogs disponibles por el momento. Gracias por su preferencia.</p>
          </div>
        ) : (
          blogsParaMostrar.map((post) => (
            <Link to={`/blog_detalle/${post.id}`} key={post.id} className="blog-card">
              <img src={post.imagen} alt={post.titulo} className="blog-image" />
              <div className="blog-content">
                <h2 className="blog-post-title">{post.titulo}</h2>
                <p className="blog-summary">{post.resumen}</p>
                <div className="blog-footer">
                  <span className="blog-author">{post.autor}</span>
                  <span className="blog-date">{post.fecha}</span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}


export default Blog;
