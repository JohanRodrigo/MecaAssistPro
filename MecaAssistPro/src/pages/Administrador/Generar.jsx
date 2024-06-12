import React, { useState, useEffect } from 'react';
import { MenuA } from '../../componentes/MenuA';
import { Encabezado } from '../../componentes/Encabezado';
import { Footer } from '../../componentes/Footer';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';

// Importa tu imagen de logo
import Logo from '../../Imagenes/Mecalog.png';

const Generar = () => {
  const location = useLocation();
  const { formData } = location.state || {};
  const [pdfGenerated, setPdfGenerated] = useState(false);
  const [pdfPreview, setPdfPreview] = useState('');
  const [logoLoaded, setLogoLoaded] = useState(false);

  useEffect(() => {
    const loadImage = async () => {
      const image = new Image();
      image.src = Logo;
      image.onload = () => {
        setLogoLoaded(true);
      };
      image.onerror = (error) => {
        console.error('Error al cargar la imagen:', error);
      };
    };

    loadImage();
  }, []);

  const generatePDF = () => {
    if (!formData) {
      alert("No hay datos para generar el PDF");
      return;
    }

    if (!logoLoaded) {
      alert("La imagen del logo aún se está cargando. Por favor, espera unos segundos y vuelve a intentarlo.");
      return;
    }

    const doc = new jsPDF();

    // Establecer propiedades del documento
    doc.setProperties({
      title: 'Reporte',
    });

    const margin = {
      top: 20,
      bottom: 20,
      left: 20, // Ajusta el margen izquierdo
      right: 20, // Ajusta el margen derecho
    };

    const contentWidth = doc.internal.pageSize.width - margin.left - margin.right;

    doc.setFont('times', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);

    // Encabezado
    doc.addImage(Logo, 'PNG', margin.left, margin.top, 40, 40); // Logo en la esquina izquierda

    // Configurar la fuente y el tamaño para el nombre de la página
    doc.setFont('times', 'bold');
    doc.setFontSize(20); // Aumentar el tamaño de la fuente para el nombre de la página

    const nameX = doc.internal.pageSize.width - doc.getStringUnitWidth('MecaAssistPro') * doc.internal.getFontSize() / doc.internal.scaleFactor - margin.right;
    doc.text('MecaAssistPro', nameX, margin.top + 20); // Nombre en la esquina derecha

    // Centrar el título
    doc.setFontSize(18); // Aumentar el tamaño de la fuente para el título
    const titleWidth = doc.getStringUnitWidth('Informe de Diagnóstico del Automóvil') * doc.internal.getFontSize() / doc.internal.scaleFactor;
    const titleX = (doc.internal.pageSize.width - titleWidth) / 2;
    doc.setFont('times', 'bold');
    doc.text('Informe de Diagnóstico del Automóvil', titleX, margin.top + 60); // Ajusta la posición del título según tu necesidad

    // Restablecer el tamaño de la fuente para el resto del contenido
    doc.setFontSize(15);

    // Datos del formulario
    const clientData = [
      { label: 'Nombre del Cliente:', value: formData.nombreCliente },
      { label: 'Dirección:', value: formData.direccion },
      { label: 'Teléfono:', value: formData.telefono },
      { label: 'Correo Electrónico:', value: formData.email },
      { label: 'Fecha del Servicio:', value: formData.fechaServicio },
      { label: 'Marca:', value: formData.marca },
      { label: 'Modelo:', value: formData.modelo },
      { label: 'Año:', value: formData.anio },
      { label: 'Problema Reportado:', value: formData.problema },
      { label: 'Inspección Física:', value: formData.inspeccion },
      { label: 'Resultados del Diagnóstico:', value: formData.resultados },
      { label: 'Recomendaciones:', value: formData.recomendaciones },
      { label: 'Cotización:', value: formData.cotizacion },
      { label: 'Tiempo Estimado:', value: formData.tiempo },
      { label: 'Observaciones:', value: formData.observaciones },
    ];

    clientData.forEach(({ label, value }, index) => {
      const yPos = margin.top + 80 + (index * 10); // Ajusta la posición vertical de los datos según tu necesidad
      doc.setFont('times', 'bold');
      doc.text(`${label}`, margin.left, yPos);
      doc.setFont('times', 'normal');
      doc.text(`${value}`, margin.left + 60, yPos); // Ajusta la posición de la sangría
    });

    // Convertir el PDF generado a base64
    const pdfBase64 = doc.output('datauristring');
    setPdfPreview(pdfBase64);
    setPdfGenerated(true);
  };

  const downloadPDF = () => {
    const element = document.createElement('a');
    element.setAttribute('href', pdfPreview);
    element.setAttribute('download', 'reporte.pdf');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="h-screen bg-orange-500" style={{ width: "100vw" }}>
      <Encabezado />
      <MenuA />
      <div className="container mx-auto text-white">
        <h1 className="text-2xl font-bold text-center">Generar Reporte</h1>
        {!pdfGenerated && (
          <div className="flex items-center justify-center">
          <button onClick={generatePDF} className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 border-b-4 border-amber-700 hover:border-amber-500 rounded mt-4">
            Generar PDF
          </button>
          </div>
        )}
        {pdfPreview && (
          <div>
            <iframe
              title="PDF Preview"
              src={pdfPreview}
              style={{ width: '100%', height: '500px', marginTop: '20px' }}
            />
            <div className="flex items-center justify-center">
            <button onClick={downloadPDF} className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 border-b-4 border-amber-700 hover:border-amber-500 rounded mt-4">
              Descargar PDF
            </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Generar;
