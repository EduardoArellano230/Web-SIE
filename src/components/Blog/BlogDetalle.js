import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './Blog.css';
import Recientes from "./Blog_Recientes"


function BlogDetalle() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    ///http://localhost/web/Back/blogs/blog_detalle.php?id=${id}
    ///https://corporativosie.com.mx/web/Back/blogs/blog_detalle.php?id=${id}
    fetch(`https://corporativosie.com.mx/web/Back/blogs/blog_detalle.php?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBlog(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error al cargar el blog.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  if (!blog) return <p>Blog no encontrado</p>;

  return (
    <div className="blog-detalle">
      {/* Imagen alargada arriba */}
      <img className="blog-banner" src={blog.imagen2} />

      {/* Título y autor */}
      <div className="blog-header">
        <h1 className="blog-titulo">{blog.titulo}</h1>
        <p className="blog-meta">
          Por <strong>{blog.autor}</strong> | <span>{blog.fecha}</span>
        </p>
      </div>

      {/* Contenido */}
      <div className="contenido-html" dangerouslySetInnerHTML={{ __html: blog.contenido }} />

      {/* Video (opcional) */}
      {blog.video_url && (
        <div className="video-blog">
          <h3>Video relacionado:</h3>
          <iframe
            src={blog.video_url}
            title="Video del blog"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}

      <Recientes/>
    </div>
  );
}

export default BlogDetalle;
