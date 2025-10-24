import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import ExportButtons from "../../ExportButtons"; 

import "./siigo_general.css";

function SiigoMostrar() {
  const [registros, setRegistros] = useState([]);

  const fetchDatos = async () => {
    try {
      const res = await fetch("https://corporativosie.com.mx/web/Back/siigo/siigo_get.php");
      const data = await res.json();

      if (data.success) {
        setRegistros(data.data);
      } else {
        console.error("Error al obtener datos:", data.message);
      }
    } catch (error) {
      console.error("Error en la conexión:", error);
    }
  };

  const handleDelete = async (telefono) => {
    const confirmar = window.confirm("¿Deseas eliminar este registro?");
    if (!confirmar) return;

    try {
      const res = await fetch("https://corporativosie.com.mx/web/Back/siigo/siigo_eliminar.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ telefono }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Registro eliminado.");
        setRegistros(registros.filter((r) => r.telefono !== telefono));
      } else {
        alert("Error: " + data.message);
      }
    } catch (err) {
      console.error("Error al eliminar:", err);
    }
  };

  useEffect(() => {
    fetchDatos();
  }, []);

  return (
    <div className="siigo-tabla-container">
      <h2>Registros de contacto Siigo</h2>
      <table className="siigo-tabla">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {registros.length > 0 ? (
            registros.map((item, index) => (
              <tr key={index}>
                <td>{item.nombre}</td>
                <td>{item.telefono}</td>
                <td>{item.fecha}</td>
                <td>
                <div className="btn-group">
                    <button className="btn edit" title="Editar">
                    <FaEdit />
                    </button>
                    <button
                    className="btn delete"
                    onClick={() => handleDelete(item.telefono)}
                    title="Eliminar"
                    >
                    <FaTrash />
                    </button>
                </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Cargando o sin registros.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default SiigoMostrar;
