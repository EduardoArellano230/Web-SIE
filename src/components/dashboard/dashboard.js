import React from "react";
import './dashboard.css';
import Mostrar_usuarios from './usuarios/Usuarios_mostrar'

function Dashboard() {
  return (
    <div className="dashboard-container">
      <h1>Hola, bienvenido al Dashboard</h1>
      <Mostrar_usuarios/>
    </div>
  );
}

export default Dashboard;
