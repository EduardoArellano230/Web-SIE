import React, { useState } from "react";
import "./Contacto.css";
import AlertService from "../../AlertService"; 

function Contacto() {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    mensaje: "",
    contpaqi: "",
    aspel: "",
    servicio: "",
    aviso: false,
  });

  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.contpaqi && !formData.aspel && !formData.servicio) {
      AlertService.warning("Debes seleccionar al menos un servicio.");
      return;
    }

    setIsLoading(true);           

    try {
      const response = await fetch(
        "https://corporativosie.com.mx/web/Back/guardar_contacto.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (result.success) {
        AlertService.success("Gracias por contactarnos.");
        setFormData({
          nombre: "",
          correo: "",
          telefono: "",
          mensaje: "",
          contpaqi: "",
          aspel: "",
          servicio: "",
          aviso: false,
        });
      } else {
        AlertService.error("❌ Error al enviar: " + result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      AlertService.error("❌ Error en la conexión al servidor.");
    } finally {
      setIsLoading(false);         
    }
  };

  return (
    <>
      {/* Pantalla de carga */}
      {isLoading && (
        <div className="loader-overlay">
          <div className="loader-spinner"></div>
          <p>Enviando tu información, por favor espera…</p>
        </div>
      )}

      <h2 className="mensaje-inicial">
        No dudes más y contáctanos para obtener la solución ideal para ti y para tu negocio
      </h2>

      <form
        className={`formulario_from ${isLoading ? "deshabilitado" : ""}`}
        onSubmit={handleSubmit}
      >
        <h2>Contáctanos</h2>

        <input
          type="text"
          name="nombre"
          className="contacto_from"
          placeholder="Tu nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="correo"
          className="contacto_from"
          placeholder="Correo electrónico"
          value={formData.correo}
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="telefono"
          placeholder="Teléfono"
          className="contacto_from"
          value={formData.telefono}
          onChange={handleChange}
        />

        <label htmlFor="contpaqi">Selecciona un servicio CONTPAQi</label>
        <select name="contpaqi" value={formData.contpaqi} onChange={handleChange}>
          <option value="">-- Elige una opción --</option>
          <option value="Contabilidad">Contabilidad</option>
          <option value="Nóminas">Nóminas</option>
          <option value="Bancos">Bancos</option>
          <option value="Facturación">Facturación</option>
        </select>

        <label htmlFor="aspel">Selecciona un servicio ASPEL</label>
        <select name="aspel" value={formData.aspel} onChange={handleChange}>
          <option value="">-- Elige una opción --</option>
          <option value="SAE">SAE</option>
          <option value="COI">COI</option>
          <option value="NOI">NOI</option>
          <option value="Caja">Caja</option>
        </select>

        <label htmlFor="servicio">Selecciona uno de nuestros servicios</label>
        <select name="servicio" value={formData.servicio} onChange={handleChange}>
          <option value="">-- Elige una opción --</option>
          <option value="Implementación">Implementación</option>
          <option value="Capacitación">Capacitación</option>
          <option value="Soporte técnico">Soporte técnico</option>
          <option value="Consultoría personalizada">Consultoría personalizada</option>
        </select>

        <div className="checkbox-container">
          <input
            type="checkbox"
            id="aviso"
            name="aviso"
            checked={formData.aviso}
            onChange={handleChange}
            required
          />
          <label htmlFor="aviso">
            Acepto el{" "}
            <span className="link-aviso" onClick={() => setShowModal(true)}>
              Aviso de Privacidad
            </span>{" "}
            de Corporativo SIE.
          </label>
        </div>

        <textarea
          name="mensaje"
          placeholder="Escribe tu mensaje..."
          rows="5"
          value={formData.mensaje}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit" disabled={isLoading}>
          Enviar
        </button>
      </form>

      {/* Modal de Aviso de Privacidad */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Aviso de Privacidad</h2>
            <p>
            CORPORATIVO SIE GUADALAJARA S.A.S DE C.V, EN LO SUBSIGUIENTE “CORPORATIVO SIE”, CON DOMICILIO EN LA CALLE PABLO VALDEZ #1458, COL. SAN JUAN BOSCO, EN LA CIUDAD DE GUADALAJARA, JALISCO, DE CONFORMIDAD CON LO ESTABLECIDO EN LA LEY FEDERAL DE PROTECCIÓN DE DATOS PERSONALES EN POSESIÓN DE PARTICULARES (“LFPDPPP”) HAGO DE CONOCIMIENTO QUE LOS INTERESADOS QUE ENTREGUEN INFORMACIÓN PERSONAL (“EL TITULAR”) LO SIGUIENTE: 1.- DATOS PERSONALES PROPORCIONADOS POR USTED QUE SERÁN SOMETIDOS AL TRATAMIENTO CORRESPONDIENTE: A. DATOS PERSONALES. -DATOS DE IDENTIFICACIÓN, CONTACTO, LABORALES, ACADÉMICOS. B. DATOS DE EMPRESA. - DATOS FISCALES (RAZÓN SOCIAL, RFC, DOMICILIO, NÚMERO TELEFÓNICO FIJO O CELULAR, CORREO ELECTRÓNICO DE SU TRABAJO O ASOCIADO AL TRABAJO). NINGUNA DE ESTA INFORMACIÓN ES CONSIDERADA COMO DATOS SENSIBLES EN LOS TÉRMINOS SEÑALADOS EN LA FRACCIÓN VI DEL ARTÍCULO 3RO. DE LA LEY FEDERAL DE PROTECCIÓN DE DATOS PERSONALES EN POSESIÓN DE LOS PARTICULARES. FINALIDADES PRIMARIAS DEL TRATAMIENTO Y TRANSFERENCIA DE DATOS A. CLIENTES (PROSPECTOS, SOLICITANTES, CONTRATANTES Y PROVEEDORES DE RECURSOS): I. INTERCAMBIO DE PROPUESTAS, COMERCIALIZACIÓN Y ASESORAMIENTO PARA INSTALACIÓN DE SISTEMAS ECONÓMICOS FINANCIEROS, SU CONSERVACIÓN O MODIFICACIÓN, RENOVACIÓN O CANCELACIÓN. II. IDENTIFICACIÓN Y ANÁLISIS DE LAS NECESIDADES DE SERVICIO O INSTALACIÓN DE PRODUCTOS, REDES, SISTEMAS ELECTRÓNICOS, SOLUCIONES PARA MANEJO DE INFORMACIÓN ECONÓMICO-FINANCIERA. III. GENERAR PROPUESTAS Y COTIZACIONES DE PRODUCTOS DE CORPORATIVO SIE (“SIE EMPRESARIAL” O “SIE”) IV. LLENAR FORMATOS CORRESPONDIENTES PARA LA SOLICITUD DEL PRODUCTO A SIE EMPRESARIAL, V. PROVEER ATENCIÓN, SERVICIO, MANTENIMIENTO ACTUALIZACIÓN, RENOVACIÓN, APOYO EN TRAMITES FISCALES, PAGOS Y SERVICIOS ADICIONALES A AQUELLAS PERSONAS QUE SEAN CLIENTES DE SIE EMPRESARIAL. B. RELACIÓN CONTRACTUAL: I. EN EL SUPUESTO DE QUE SURJA UNA RELACIÓN CONTRACTUAL ENTRE LAS PARTES DICHA INFORMACIÓN SERÁ UTILIZADA PARA EL CUMPLIMIENTO DE LAS OBLIGACIONES SOCIALES Y FISCALES. ASÍ COMO MANTENER, MODIFICAR O CONCLUIR LA RELACIÓN ANTES MENCIONADA. II. ESTUDIOS ESTADÍSTICOS. III. SE HACE DEL CONOCIMIENTO DEL TITULAR QUE SUS DATOS PERSONALES SERÁN UTILIZADOS EXCLUSIVAMENTE PARA PROVEERLE PRODUCTOS Y SERVICIOS QUE OFRECE DE “CORPORATIVO SIE”, INFORMARLE SOBRE NUEVOS PRODUCTOS O SERVICIOS DE “CORPORATIVO SIE”, CAMBIOS EN LOS MISMOS, MENSAJES PROMOCIONALES, MERCADOLÓGICOS, PUBLICITARIOS O DE PROSPECCIÓN COMERCIAL Y EVALUAR LA CALIDAD DEL SERVICIO BRINDADO. TRANSFERENCIA DE DATOS SUS DATOS PERSONALES SERÁN TRANSFERIDOS A CORPORATIVO SIE Y/O A EMPLEADOS DEL ASESOR, PARA LAS FINALIDADES ANTES DESCRITAS EN EL APARTADO 2 DE ESTE AVISO DE PRIVACIDAD. EN CASO DE EVALUACIÓN PARA ESTABLECER UNA POSIBLE RELACIÓN CONTRACTUAL O DE SERVICIOS, TUS DATOS PERSONALES SE TRANSFERIRÁN AL PRESTADOR DE SERVICIOS QUE ES SU MOMENTO TENGA CONTRATADO PARA REALIZAR LA EVALUACIÓN DE LAS NECESIDADES DE SERVICIO O SOLUCIONES EMPRESARIALES CORRESPONDIENTE A LA SOLICITUD DEL CLIENTE. ASIMISMO, LE INFORMAMOS QUE DEBIDO A QUE SOMOS DISTRIBUIDORES DE SOFTWARE DE CONTPAQI®, ASPEL®, ANTIVIRUS, MICROSOFT PARTHER, MANTENIMIENTO DE SOFTWARE Y HARDWARE, ENTRE OTROS, SUS DATOS PERSONALES PUEDEN SER TRANSFERIDOS A ALGUNO DE ELLOS, CONSIDERANDO ESTOS ACTOS COMO REMISIÓN DE LA INFORMACIÓN EN LOS TÉRMINOS DE LA FRACCIÓN IX DEL ARTÍCULO 2DO. DEL REGLAMENTO DE LA LEY FEDERAL DE PROTECCIÓN DE DATOS PERSONALES EN POSESIÓN DE LOS PARTICULARES, SIENDO APLICABLE LO DISPUESTO POR LOS ARTÍCULOS 10 FRACCIÓN IV Y 37 FRACCIONES IV Y VII DE LA LEY Y EL ARTÍCULO 53 DEL REGLAMENTO. PARA EL TRATAMIENTO DE SUS DATOS PERSONALES SE HAN ESTABLECIDO Y SE MANTIENEN MEDIDAS DE SEGURIDAD ADMINISTRATIVAS, TÉCNICAS Y FÍSICAS, QUE PERMITEN PROTEGER SUS DATOS PERSONALES; QUE NO SON MENORES A LAS QUE SE MANTIENEN PARA EL MANEJO DE NUESTRA PROPIA INFORMACIÓN. DEL CONSENTIMIENTO Y MEDIOS Y PROCEDIMIENTOS PARA LA REVOCACIÓN DE SU CONSENTIMIENTO, Y EJERCICIO DE SUS DERECHOS ARCO. NO SE REQUERIRÁ DEL CONSENTIMIENTO DE EL TITULAR, PARA TRATAR DATOS PERSONALES CUANDO LO HAGA CON FUNDAMENTO EN EL ARTÍCULO 10 DE LA LFPDPPP. TODO TRATAMIENTO DE DATOS PERSONALES ESTARÁ SUJETO AL CONSENTIMIENTO DE SU TITULAR, SALVO LAS EXCEPCIONES ESTABLECIDAS EN LA LEY DE LA MATERIA Y SU REGLAMENTO. ADVERTIMOS QUE DE CONFORMIDAD CON EL ARTÍCULO 8VO. DE LA LEY FEDERAL DE PROTECCIÓN DE DATOS PERSONALES EN POSESIÓN DE LOS PARTICULARES, EL TITULAR CONSIENTE TÁCITAMENTE EL TRATAMIENTO DE SUS DATOS PERSONALES, SI NO MANIFIESTA SU OPOSICIÓN. MEDIOS Y PROCEDIMIENTOS PARA LA REVOCACIÓN DE SU CONSENTIMIENTO, Y EJERCICIO DE SUS DERECHOS ARCO. USTED TIENE DERECHO DE ACCEDER, RECTIFICAR Y CANCELAR SUS DATOS PERSONALES, ASÍ COMO DE OPONERSE AL TRATAMIENTO DE LOS MISMOS PARA AQUELLAS FINALIDADES QUE NO SON NECESARIAS, NI HAYAN DADO ORIGEN A LA RELACIÓN JURÍDICA CON “CORPORATIVO SIE”, O REVOCAR EL CONSENTIMIENTO QUE PARA TAL FIN NOS HAYA OTORGADO. SI EN EL EJERCICIO DE SU DERECHO DE CANCELACIÓN, SOLICITA QUE SUS DATOS SEAN ELIMINADOS DE NUESTRAS BASES DE DATOS, ES IMPORTANTE SEÑALAR QUE SEGUIRÁN EN NUESTROS SISTEMAS, HASTA EN TANTO NO SE EXTINGAN LAS ACCIONES QUE PUDIERAN DERIVAR DE NUESTRA RELACIÓN JURÍDICA, EN EL QUE SERÁN CONSERVADOS EXCLUSIVAMENTE PARA EFECTOS DE LAS RESPONSABILIDADES EMANADAS DE SU TRATAMIENTO. A. REQUISITOS: • SOLICITUD (FORMATO) QUE LE PROPORCIONE EL ASESOR EMPRESARIAL Y/O ESCRITO LIBRE, • IDENTIFICACIÓN OFICIAL VIGENTE • REPRESENTANTE LEGAL: CARTA PODER FIRMADA POR EL TITULAR, REPRESENTANTE LEGAL Y DOS TESTIGOS, IDENTIFICACIÓN VIGENTE DEL TITULAR, DE LOS TESTIGOS Y DEL REPRESENTANTE LEGAL. • ENVÍE SU SOLICITUD MEDIANTE UNA NOTA ELECTRÓNICA A INFO@SIEMPRESARIAL.COM.MX. B. PROCEDIMIENTO: EN CUALQUIER MOMENTO USTED PODRÁ REALIZAR LA SOLICITUD CORRESPONDIENTE CON EL ASESOR EMPRESARIAL CON LOS REQUISITOS ANTES DESCRITOS. LA PERSONA ANTES MENCIONADA VERIFICARÁ LA INFORMACIÓN PROPORCIONADA Y PROCEDERÁ A LA ATENCIÓN DE SU SOLICITUD. CABE MENCIONAR QUE SE DEBERÁ LLENAR O ESCRIBIR UNA SOLICITUD PARA CADA TRÁMITE A REALIZAR. EL ASESOR EMPRESARIAL ENTREGARA A EL TITULAR UN ESCRITO Y DEMÁS DOCUMENTACIÓN NECESARIA PARA DAR RESPUESTA A SU SOLICITUD, EN UN PLAZO NO MAYOR A 20 DÍAS HÁBILES DE CONFORMIDAD CON LO INDICADO EN EL ARTÍCULO 32 DE LA LFPDPPP. PROCEDIMIENTO Y MEDIOS PARA PONER A SU DISPOSICIÓN EL AVISO DE PRIVACIDAD Y SUS MODIFICACIONES. PUEDE OBTENER UNA COPIA DEL PRESENTE AVISO A TRAVÉS DE CUALQUIERA DE LOS MEDIOS DE SU ELECCIÓN: - CORREO ENVIADO A CUALQUIER ASESOR EMPRESARIAL. - AVISOS COLOCADOS EN EL SITIO DE INTERNET DEL ASESOR EMPRESARIAL. POR LO QUE SE RECOMIENDA A EL TITULAR VISITAR PERIÓDICAMENTE LA PÁGINA DE INTERNET DE EL ASESOR EMPRESARIAL Y/O ESTAR ATENTO A POSIBLES MODIFICACIONES DE ESTE AVISO DE PRIVACIDAD. CONTACTO DEL RESPONSABLE DE DATOS PERSONALES SI TIENE ALGUNA DUDA SOBRE ESTE AVISO, ASÍ COMO EL TRATAMIENTO DE SUS DATOS Y/O LOS MEDIOS Y PROCEDIMIENTOS PARA LA REVOCACIÓN DE SU CONSENTIMIENTO Y EJERCICIO DE SUS DERECHOS ARCO, SE PUEDE COMUNICAR AL TELÉFONO 01 331 306 5406 O ESCRIBIR AL CORREO ELECTRÓNICO INFO@SIEMPRESARIAL.COM.MX, TAMBIÉN PUEDE ACUDIR AL INSTITUTO FEDERAL DE ACCESO A LA INFORMACIÓN Y PROTECCIÓN DE DATOS (IFAI) PARA CUALQUIER DUDA O SUGERENCIA EN EL EJERCICIO DE SUS DERECHOS. TAMBIÉN PUEDE CONTACTARLOS A TRAVÉS DEL TELÉFONO: 01 800 IFAI DE LA PÁGINA DE INTERNET WWW.IFAI.MX BASES DE DATOS EL ASESOR EMPRESARIAL GARANTIZA EL RESPETO AL ARTÍCULO 10 DE LA LFPDPPP, POR LO TANTO, NO CREARÁ LISTAS QUE CONTENGAN DATOS PERSONALES SENSIBLES, SIN QUE SE JUSTIFIQUE LA CREACIÓN DE LAS MISMAS PARA FINALIDADES LEGÍTIMAS, CONCRETAS Y ACORDES CON LAS ACTIVIDADES O FINES EXPLÍCITOS QUE PERSIGUE EL SUJETO REGULADO.
            </p>
            <button onClick={() => setShowModal(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Contacto;
