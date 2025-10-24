// src/AlertService.js
import Swal from 'sweetalert2';

const AlertService = {
  success: (title = "Éxito", text = "") =>
    Swal.fire({
      icon: 'success',
      title,
      text,
      confirmButtonText: 'Aceptar'
    }),

  error: (title = "Error", text = "") =>
    Swal.fire({
      icon: 'error',
      title,
      text,
      confirmButtonText: 'Aceptar'
    }),

  warning: (title = "Advertencia", text = "") =>
    Swal.fire({
      icon: 'warning',
      title,
      text,
      confirmButtonText: 'Ok'
    }),

  info: (title = "Información", text = "") =>
    Swal.fire({
      icon: 'info',
      title,
      text,
      confirmButtonText: 'Ok'
    }),

confirm: (title = "¿Estás seguro?", text = "Esta acción no se puede deshacer.") =>
  Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar"
  }).then((result) => result.isConfirmed)
};

export default AlertService;
