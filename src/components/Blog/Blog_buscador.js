import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Blog.css';

function Blog_buscador({ setResultadosBusqueda }) {
  const [query, setQuery] = useState('');

  const buscarBlogs = async () => {
    if (!query.trim()) {
      setResultadosBusqueda(null); // Mostrar blogs originales
      return;
    }

    try {
      const url = `https://corporativosie.com.mx/web/Back/blogs/blogs_categoria.php?q=${encodeURIComponent(query)}`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.success) {
        setResultadosBusqueda(data.data); // Enviar al padre
      } else {
        setResultadosBusqueda([]); // Búsqueda sin resultados
      }
    } catch (error) {
      console.error("Error al buscar:", error);
      setResultadosBusqueda([]);
    }
  };

  const manejarKeyPress = (e) => {
    if (e.key === 'Enter') buscarBlogs();
  };

  useEffect(() => {
    if (!query.trim()) {
      setResultadosBusqueda(null); // Búsqueda vacía
    }
  }, [query]);

  return (
    <div className="blog-buscador">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={manejarKeyPress}
        placeholder="Busca por título o categoría"
        className="Buscador"
      />
      
    </div>

    
  );
}


export default Blog_buscador;
