import React, { useEffect, useState } from "react";
import { FaUserPlus, FaEdit, FaTrash } from "react-icons/fa";
import './Usuarios_generla.css';
import Usuarios_creata from './Usuarios_create';
import Usuarios_edit from './Usuarios_edit';
import ExportButtons from "../../ExportButtons"; 
import AlertService from "../../../AlertService"; 



function Usuarios_mostrar() {
  const [usuarios, setUsuarios] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [modoEditar, setModoEditar] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);


  const fetchUsuarios = () => {
  fetch("https://corporativosie.com.mx/web/Back/usuarios/usuario_get.php")
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        setUsuarios(data.data);
      } else {
        console.error("Error al obtener usuarios:", data.message);
      }
    })
    .catch((error) => {
      console.error("Error en la solicitud:", error);
    });
};
 
  useEffect(() => {
  fetchUsuarios();
}, []);

  const handleAdd = () => {
    setModoEditar(false);
    setUsuarioSeleccionado(null);
    setMostrarModal(true);
  };

  const handleEdit = (id) => {
    setModoEditar(true);
    setUsuarioSeleccionado(id);
    setMostrarModal(true);
    fetchUsuarios(); 
  };

const handleDelete = async (id) => {
  const confirmar = await AlertService.confirm(
    "¿Seguro que deseas eliminar este usuario?"
  );

  if (!confirmar) return;

  fetch("https://corporativosie.com.mx/web/Back/usuarios/usuarios_eliminar.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ id: id })
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.mensaje) {
        AlertService.success("Usuario eliminado");
        setUsuarios(usuarios.filter(u => u.id !== id));
      } else {
        AlertService.error("Error al eliminar: " + data.error);
      }
    })
    .catch((error) => {
      AlertService.error("Error al eliminar: " + error);
    });
};



  return (
    <div className="usuarios-container">
      <h1>Lista de Usuarios</h1>
<ExportButtons data={usuarios} nombreArchivo="usuarios" />
      
      <table className="usuarios-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th className="col-correo">Correo</th>
            <th className="col-correo" >Contraseña</th>
            <th>Acciones</th>
            <th><button className="btn add" onClick={handleAdd} title="Agregar">
                    <FaUserPlus />
                  </button></th>
          </tr>
        </thead>
        <tbody>
          {usuarios.length > 0 ? (
            usuarios.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.nombre}</td>
                <td className="col-correo">{user.correo}</td>
                <td className="contrasena-cell">{user.contrasena}</td>
                <td className="btn-group">
                  
                  <button className="btn edit" onClick={() => handleEdit(user.id)} title="Editar">
                    <FaEdit />
                  </button>
                  <button className="btn delete" onClick={() => handleDelete(user.id)} title="Eliminar">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Cargando usuarios o no hay registros.</td>
            </tr>
          )}
        </tbody>
      </table>

      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="cerrar-modal" onClick={() => setMostrarModal(false)}>X</button>
            {modoEditar ? (
                <Usuarios_edit id={usuarioSeleccionado} onClose={() => {setMostrarModal(false);fetchUsuarios(); }}/>
            ) : (
                <Usuarios_creata onClose={() => setMostrarModal(false)} actualizarLista={fetchUsuarios}/>)}
          </div>
        </div>
      )}
    </div>
  );
}

export default Usuarios_mostrar;
