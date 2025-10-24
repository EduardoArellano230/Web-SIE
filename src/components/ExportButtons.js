// ExportButtons.jsx
import React from "react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import './ExportButtons.css'; // Asegúrate de que la ruta sea correcta

const ExportButtons = ({ data, nombreArchivo = "contactos" }) => {
  const exportarExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");
    XLSX.writeFile(workbook, `${nombreArchivo}.xlsx`);
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.text("Reporte de Contactos", 14, 10);
    if (data.length === 0) return;

    autoTable(doc, {
      head: [Object.keys(data[0])],
      body: data.map((item) => Object.values(item)),
      startY: 20,
      styles: { fontSize: 8 },
    });

    doc.save(`${nombreArchivo}.pdf`);
  };

  return (
    <div className="export-buttons">
      <button onClick={exportarExcel}>📥 Exportar Excel</button>
      <button onClick={exportarPDF}>📄 Exportar PDF</button>
    </div>
  );
};

export default ExportButtons;
