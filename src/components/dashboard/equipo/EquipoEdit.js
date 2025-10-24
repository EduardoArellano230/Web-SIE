import React, { useEffect, useState } from "react";
import AlertService from "../../../AlertService";

export default function EquipoEdit({ id, onClose, onUpdate }) {
  const [nombre, setNombre] = useState("");
  const [rol, setRol] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagenPreview, setImagenPreview] = useState(null);
  const [imagenFile, setImagenFile] = useState(null);

  const [todosCertificados, setTodosCertificados] = useState([]);
  const [certificadosAsignados, setCertificadosAsignados] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cargar datos del miembro a editar
    fetch(`https://corporativosie.com.mx/web/Back/equipo/get_equipo_por_id.php?id=${id}`)
      .then(res => res.json())
      .then(data => {
        setNombre(data.nombre || "");
        setRol(data.rol || "");
        setDescripcion(data.descripcion || "");
        setImagenPreview(data.imagen || null);
        setCertificadosAsignados(data.certificadosIds || []);
        setLoading(false);
      })
      .catch(err => {
        AlertService.error("Error al cargar datos: " + err);
        setLoading(false);
      });

    // Cargar todos los certificados para mostrar checkboxes
    fetch("https://corporativosie.com.mx/web/Back/certificados/get_certificados.php")
      .then(res => res.json())
      .then(data => setTodosCertificados(data))
      .catch(err => AlertService.error("Error al cargar certificados: " + err));
  }, [id]);

  const toggleCertificado = (certId) => {
    if (certificadosAsignados.includes(certId)) {
      setCertificadosAsignados(certificadosAsignados.filter(id => id !== certId));
    } else {
      setCertificadosAsignados([...certificadosAsignados, certId]);
    }
  };

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagenFile(file);
      setImagenPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", id);
    formData.append("nombre", nombre);
    formData.append("rol", rol);
    formData.append("descripcion", descripcion);
    formData.append("certificados", JSON.stringify(certificadosAsignados));
    if (imagenFile) {
      formData.append("imagen", imagenFile);
    }

    try {
      const res = await fetch("https://corporativosie.com.mx/web/Back/equipo/editar_equipo.php", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        AlertService.success(data.message);
        onUpdate();
        onClose();
      } else {
        AlertService.error(data.message || "Error desconocido");
      }
    } catch (error) {
      AlertService.error("Error al actualizar: " + error.message);
    }
  };

  if (loading) return <p>Cargando datos...</p>;

  return (
    <form onSubmit={handleSubmit} className="form-equipo-edit">
      <div>
        <label>Nombre</label>
        <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} required />
      </div>

      <div>
        <label>Rol</label>
        <input type="text" value={rol} onChange={e => setRol(e.target.value)} required />
      </div>

      <div>
        <label>Descripción</label>
        <textarea value={descripcion} onChange={e => setDescripcion(e.target.value)} />
      </div>

      <div>
        <label>Imagen actual</label><br />
        {imagenPreview && <img src={imagenPreview} alt="Imagen" style={{ maxWidth: "150px" }} />}
      </div>

      <div>
        <label>Cambiar imagen</label>
        <input type="file" accept="image/*" onChange={handleImagenChange} />
      </div>

      <div>
        <label>Certificados</label>
        <div className="certificados-checkboxes" style={{ maxHeight: "150px", overflowY: "auto", border: "1px solid #ccc", padding: "5px" }}>
          {todosCertificados.length === 0 && <p>No hay certificados disponibles.</p>}
          {todosCertificados.map(cert => (
            <label key={cert.id} style={{ display: "block", marginBottom: "5px" }}>
              <input
                type="checkbox"
                checked={certificadosAsignados.includes(cert.id)}
                onChange={() => toggleCertificado(cert.id)}
              />
              {" "}{cert.nombre}
            </label>
          ))}
        </div>
      </div>

      <button type="submit">Guardar cambios</button>
      <button type="button" onClick={onClose} style={{ marginLeft: "10px" }}>Cancelar</button>
    </form>
  );
}
