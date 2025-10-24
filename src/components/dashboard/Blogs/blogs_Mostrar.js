import React, { useEffect, useState } from "react";
import { FaUserPlus, FaEdit, FaTrash } from "react-icons/fa";
import './blogs_geneal.css';
import Blogs_create from './blogs_create';
import Blog_actualizar from './blog_actualizar'; 
import ExportButtons from "../../ExportButtons"; 
import AlertService from "../../../AlertService"; 


function Blogs_Mostrar() {
  const [blogs, setBlogs] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [blogEditId, setBlogEditId] = useState(null);

  const obtenerBlogs = () => {
    
    ///https://corporativosie.com.mx/web/Back/blogs/blogs.php
    ///http://localhost/web/Back/blogs/blogs.php
    fetch("https://corporativosie.com.mx/web/Back/blogs/blogs.php")
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => AlertService.error("Error al obtener blogs:", err));
  };

  useEffect(() => {
    obtenerBlogs();
  }, []);

  const handleEdit = (id) => {
    setBlogEditId(id);
    setModoEdicion(true);
    setMostrarModal(true);
  };

const handleDelete = async (id) => {
  const confirmar = await AlertService.confirm(
    "¿Estás seguro de que deseas eliminar este blog?",
    "Esta acción no se puede deshacer."
  );

  if (!confirmar) return;
////https://corporativosie.com.mx/web/Back/blogs/blog_delete.php
//http://localhost/web/Back/blogs/blog_delete.php
  fetch("https://corporativosie.com.mx/web/Back/blogs/blog_delete.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        AlertService.success("Blog eliminado correctamente.");
        obtenerBlogs();
      } else {
        AlertService.error("Error: " + (data.message || "No se pudo eliminar."));
      }
    })
    .catch(() => {
      AlertService.error("Error de conexión al eliminar.");
    });
};

  return (
    <div className="blogs-container">
      <h1>Lista de Blogs</h1>
      <ExportButtons data={blogs} nombreArchivo="Blogs" />

      <table className="blogs-table">
        
        <thead>
          <tr>
            <th>Título</th>
            <th >Resumen</th>
            <th>Imagen</th>
            <th>Imagen 2</th>
            <th>Autor</th>
            <th>Categoria</th>
            <th>Fecha</th>
            <th>Video</th>
            <th>Acciones</th>
            <th><button className="btn add" onClick={() => { setModoEdicion(false); setMostrarModal(true); }}><FaUserPlus /></button></th>
          </tr>
        </thead>
        <tbody>
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <tr key={blog.id}>
                <td>{blog.titulo}</td>
                <td>{blog.resumen.length > 50 ? blog.resumen.slice(0, 50) + "..." : blog.resumen}</td>
                <td>
                  {blog.imagen && <img src={blog.imagen} alt={blog.titulo} className="blog-img" />}
                </td>
                <td>
                  {blog.imagen2 ? (
                    <img src={blog.imagen2} alt={blog.titulo} className="blog-img" />
                  ) : (
                    <span style={{ color: "gray" }}>Sin imagen</span>
                  )}
                </td>
                <td>{blog.autor}</td>
                <td>{blog.categoria}</td>
                <td>{blog.fecha}</td>
                <td className="col-video_url">{blog.video_url}</td>
                <td className="acciones-cell">
                  <button className="btn-accion btn-editar" onClick={() => handleEdit(blog.id)} title="Editar">
                    <FaEdit />
                  </button>
                  <button className="btn-accion btn-eliminar" onClick={() => handleDelete(blog.id)} title="Eliminar">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">Cargando blogs o no hay registros.</td>
            </tr>
          )}
        </tbody>
      </table>

      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="cerrar-modal" onClick={() => setMostrarModal(false)}>X</button>
            {modoEdicion ? (
              <Blog_actualizar id={blogEditId} onClose={() => setMostrarModal(false)} onUpdate={obtenerBlogs} />

            ) : (
              <Blogs_create onClose={() => setMostrarModal(false)} onUpdate={obtenerBlogs} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Blogs_Mostrar;
