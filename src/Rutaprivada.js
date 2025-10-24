import { Navigate } from "react-router-dom";

const RutaPrivada = ({ children }) => {
  const usuario = localStorage.getItem("usuario");
  return usuario ? children : <Navigate to="/acceso-denegado" replace />;
};

export default RutaPrivada;
