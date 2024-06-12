import React, { useState } from 'react';
import { MenuA } from '../../componentes/MenuA';
import { Encabezado } from '../../componentes/Encabezado';
import { Footer } from '../../componentes/Footer';
import { useNavigate } from 'react-router-dom';

const Comunicacion = () => {
  const [formData, setFormData] = useState({
    nombreCliente: '',
    direccion: '',
    telefono: '',
    email: '',
    fechaServicio: '',
    marca: '',
    modelo: '',
    anio: '',
    problema: '',
    inspeccion: '',
    resultados: '',
    recomendaciones: '',
    cotizacion: '',
    tiempo: '',
    observaciones: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/Generar', { state: { formData } });
  };

  return (
    <div className="flex flex-col h-screen relative" style={{ width: "100vw" }}>
      <Encabezado />
      <MenuA />
      <div className="flex-1 overflow-y-auto bg-orange-500 pb-20">
        <div className="max-w-3xl mx-auto py-8 px-4">
          <h2 className="text-center text-4xl font-extrabold bg-clip-text text-white">Comunicación con clientes</h2>
          <br />
          <br />
          <h2 className="text-2xl font-bold mb-4 text-white">Informe de Diagnóstico del Automóvil</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Información del Cliente */}
            <div className="space-y-2">
              <h3 className="text-lg text-center font-semibold text-white">Información del Cliente</h3>
              <div className="flex flex-wrap -mx-2">
                <div className="w-full md:w-1/2 px-2 mb-4">
                  <label htmlFor="nombreCliente" className="block text-sm font-medium text-white">Nombre del Cliente</label>
                  <input type="text" id="nombreCliente" name="nombreCliente" value={formData.nombreCliente} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div className="w-full md:w-1/2 px-2 mb-4">
                  <label htmlFor="direccion" className="block text-sm font-medium text-white">Dirección</label>
                  <input type="text" id="direccion" name="direccion" value={formData.direccion} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div className="w-full md:w-1/2 px-2 mb-4">
                  <label htmlFor="telefono" className="block text-sm font-medium text-white">Teléfono</label>
                  <input type="text" id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div className="w-full md:w-1/2 px-2 mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-white">Correo Electrónico</label>
                  <input type="text" id="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div className="w-full px-2 mb-4">
                  <label htmlFor="fechaServicio" className="block text-sm font-medium text-white">Fecha del Servicio</label>
                  <input type="date" id="fechaServicio" name="fechaServicio" value={formData.fechaServicio} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
              </div>
            </div>
            
            {/* Información del Vehículo */}
            <div className="space-y-2">
              <h3 className="text-lg text-center font-semibold text-white">Información del Vehículo</h3>
              <div className="flex flex-wrap -mx-2">
                <div className="w-full md:w-1/3 px-2 mb-4">
                  <label htmlFor="marca" className="block text-sm font-medium text-white">Marca</label>
                  <input type="text" id="marca" name="marca" value={formData.marca} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div className="w-full md:w-1/3 px-2 mb-4">
                  <label htmlFor="modelo" className="block text-sm font-medium text-white">Modelo</label>
                  <input type="text" id="modelo" name="modelo" value={formData.modelo} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div className="w-full md:w-1/3 px-2 mb-4">
                  <label htmlFor="anio" className="block text-sm font-medium text-white">Año</label>
                  <input type="text" id="anio" name="anio" value={formData.anio} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
              </div>
            </div>
            
            {/* Problema Reportado por el Cliente */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-white">Problema Reportado por el Cliente</h3>
              <textarea id="problema" name="problema" value={formData.problema} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
            </div>

            {/* Inspección Física del Vehículo */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-white">Inspección Física del Vehículo</h3>
              <textarea id="inspeccion" name="inspeccion" value={formData.inspeccion} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
            </div>

            {/* Resultados del Diagnóstico */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-white">Resultados del Diagnóstico</h3>
              <textarea id="resultados" name="resultados" value={formData.resultados} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
            </div>

            {/* Recomendaciones de Reparación */}
            <div className="space-y-2 ">
              <h3 className="text-lg font-semibold text-white">Recomendaciones de Reparación</h3>
              <textarea id="recomendaciones" name="recomendaciones" value={formData.recomendaciones} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
            </div>

            {/* Cotización de Reparación */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-white">Cotización de Reparación</h3>
              <textarea id="cotizacion" name="cotizacion" value={formData.cotizacion} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
            </div>

            {/* Tiempo de Reparación Estimado */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-white">Tiempo de Reparación Estimado</h3>
              <textarea id="tiempo" name="tiempo" value={formData.tiempo} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
            </div>

            {/* Observaciones Adicionales */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-white">Observaciones Adicionales</h3>
              <textarea id="observaciones" name="observaciones" value={formData.observaciones} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
            </div>

            <div className="pt-5">
              <button type="submit" className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 border-b-4 border-amber-700 hover:border-amber-500 rounded">
                Enviar Reporte
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Comunicacion;
