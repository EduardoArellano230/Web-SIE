import React, { useEffect, useState } from "react";
import './Blog.css';
import { Link } from "react-router-dom";

function Blos_Resientes() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://corporativosie.com.mx/web/Back/blogs/blogs.php")
      .then(response => response.json())
      .then(data => {
        setBlogs(data.slice(0, 3)); // solo los 3 más recientes
        setLoading(false);
      })
      .catch(error => {
        console.error("Error al cargar blogs:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Cargando blogs recientes...</p>;
  }

  return (
 <div className="recientes-wrapper">
  <h2 className="recientes-title">Blogs más recientes</h2>
  <div className="recientes-grid">
    {blogs.map((post) => (
      <Link to={`/blog_detalle/${post.id}`} key={post.id} className="reciente-card">
        <img src={post.imagen} alt={post.titulo} className="reciente-img" />
        <div className="reciente-body">
          <h3 className="reciente-title">{post.titulo}</h3>
          <p className="reciente-summary">{post.resumen}</p>
          <div className="reciente-footer">
            <span className="reciente-author">{post.autor}</span>
            <span className="reciente-date">{post.fecha}</span>
          </div>
        </div>
      </Link>
    ))}
  </div>
</div>

  );
}

export default Blos_Resientes;
