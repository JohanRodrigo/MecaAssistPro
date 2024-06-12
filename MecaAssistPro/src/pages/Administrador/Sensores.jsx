import React, { useState } from 'react';
import { MenuA } from '../../componentes/MenuA';
import { Encabezado } from '../../componentes/Encabezado';
import { Footer } from '../../componentes/Footer';

const Sensores = () => {
    const [sensorData, setSensorData] = useState([]);
    const [formData, setFormData] = useState({
      sensor: '',
      action: ''
    });
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (formData.sensor.trim() !== '' && formData.action.trim() !== '') {
        setSensorData([...sensorData, formData]);
        setFormData({
          sensor: '',
          action: ''
        });
      } else {
        alert('Por favor, completa todos los campos');
      }
    };
  
    return (
      <div className="flex flex-col h-screen relative" style={{ width: "100vw" }}>
        <Encabezado />
        <MenuA />
        <div className="flex-1 overflow-y-auto bg-orange-500 pb-20">
          <div className="max-w-3xl mx-auto py-8 px-4">
            <h2 className="text-center text-4xl font-extrabold bg-clip-text text-white">Integración de sensores externos</h2>
            <br />
            <br />
            <h2 className="text-2xl font-bold mb-4 text-white">Información de tipo de sensores</h2>
  
            <div className="container mx-auto mt-8">
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="mb-4">
                  <label className="block text-white text-sm font-bold mb-2" htmlFor="sensor">
                    Nombre del Sensor
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                    id="sensor"
                    type="text"
                    name="sensor"
                    value={formData.sensor}
                    onChange={handleChange}
                    placeholder="Ej: Scanner Automotriz"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-white text-sm font-bold mb-2" htmlFor="action">
                    Función del sensor
                  </label>
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline resize-y"
                    id="action"
                    name="action"
                    value={formData.action}
                    onChange={handleChange}
                    placeholder="Ej: leer códigos de falla almacenados en el sistema de diagnóstico del coche"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 border-b-4 border-amber-700 hover:border-amber-500 rounded"
                    type="submit"
                  >
                    Guardar
                  </button>
                </div>
              </form>
  
              <div className="mt-8">
                <h2 className="text-xl font-bold mb-4 text-white">Datos del sensor</h2>
                <ul>
                  {sensorData.map((data, index) => (
                    <li key={index} className="mb-2">
                      <span className="font-bold text-white">Nombre del Sensor:</span> {data.sensor}<br />
                      <span className="font-bold text-white">Función del Sensor:</span> {data.action}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <Footer style={{ position: "absolute", bottom: 0, width: "100%" }} />
      </div>
    );
}

export default Sensores;
