import React, { useState, useEffect } from 'react';
import { getHistoria, createHistoria, updateHistoria, deleteHistoria } from '../../api/auth';
import { MenuA } from '../../componentes/MenuA';
import { Encabezado } from '../../componentes/Encabezado';
import { Footer } from '../../componentes/Footer';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const Historia = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [historial, setHistorial] = useState([]);
  const [form, setForm] = useState({
    nombre: '',
    vehiculo: '',
    modelo: '',
    fecha: '',
    servicio: '',
    descripcion: ''
  });

  useEffect(() => {
    loadHistorial();
  }, []);

  const loadHistorial = async () => {
    try {
      const response = await getHistoria();
      setHistorial(response);
    } catch (error) {
      console.error('Error loading historial:', error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await updateHistoria(historial[selectedRow]._id, form);
      } else {
        await createHistoria(form);
      }
      resetForm();
      loadHistorial();
      setIsModalOpen(false);
    } catch (error) {
      console.error(`Error ${isEditMode ? 'updating' : 'creating'} historia:`, error);
    }
  };

  const resetForm = () => {
    setForm({
      nombre: '',
      vehiculo: '',
      modelo: '',
      fecha: '',
      servicio: '',
      descripcion: ''
    });
    setSelectedRow(null);
    setIsEditMode(false);
  };

  const handleRowClick = (index) => {
    setSelectedRow(index === selectedRow ? null : index);
  };

  const isRowSelected = (index) => {
    return index === selectedRow;
  };

  const areButtonsDisabled = () => {
    return selectedRow === null;
  };

  const handleEdit = () => {
    if (selectedRow === null) return;
    setIsEditMode(true);
    const selectedHistoria = historial[selectedRow];
    setForm({
      ...selectedHistoria,
      fecha: selectedHistoria.fecha.split('T')[0], // Ajuste para asegurarse de que la fecha esté en el formato YYYY-MM-DD
    });
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (selectedRow === null) return;
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este historial?');
    if (!confirmDelete) return;

    try {
      await deleteHistoria(historial[selectedRow]._id);
      loadHistorial();
      setSelectedRow(null);
    } catch (error) {
      console.error('Error deleting historia:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "d 'de' MMMM 'de' yyyy", { locale: es });
  };

  return (
    <div className="flex flex-col h-screen relative" style={{ width: "100vw" }}>
      <Encabezado />
      <MenuA />
      <div className="flex-1 overflow-y-auto bg-orange-500 pb-20">
        <br />
        <h2 className="text-center text-4xl font-extrabold bg-clip-text text-white">Historial de vehículos</h2>
        <br />
        <br />
        <div className="flex justify-center">
          <div className="w-2/3 mx-4">
            <div className="bg-white shadow-md rounded my-6">
              <table className="text-left w-full border-collapse">
                <thead>
                  <tr>
                    <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light text-center">Nombre del cliente</th>
                    <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light text-center">Vehículo</th>
                    <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light text-center">Modelo</th>
                    <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light text-center">Fecha</th>
                    <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light text-center">Tipo de servicio</th>
                    <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light text-center">Descripción</th>
                  </tr>
                </thead>
                <tbody>
                  {historial.map((entry, index) => (
                    <tr key={index} className={isRowSelected(index) ? "bg-orange-200 hover:bg-gray-200 cursor-pointer" : "hover:bg-grey-lighter cursor-pointer"} onClick={() => handleRowClick(index)}>
                      <td className="py-4 px-6 border-b border-grey-light text-center">{entry.nombre}</td>
                      <td className="py-4 px-6 border-b border-grey-light text-center">{entry.vehiculo}</td>
                      <td className="py-4 px-6 border-b border-grey-light text-center">{entry.modelo}</td>
                      <td className="py-4 px-6 border-b border-grey-light text-center">{formatDate(entry.fecha)}</td>
                      <td className="py-4 px-6 border-b border-grey-light text-center">{entry.servicio}</td>
                      <td className="py-4 px-6 border-b border-grey-light text-center">{entry.descripcion}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex flex-col justify-start mt-8 ml-4">
            <h3 className="mb-2 text-xl font-bold text-center text-white">¿Qué deseas hacer?</h3>
            <button onClick={() => { setIsEditMode(false); setIsModalOpen(true); }} className="mb-2 bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 border-b-4 border-amber-700 hover:border-amber-500 rounded">
              Agregar
            </button>
            <button onClick={handleEdit} disabled={areButtonsDisabled()} className={`mb-2 bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 border-b-4 border-amber-700 hover:border-amber-500 rounded ${areButtonsDisabled() && "opacity-50 cursor-not-allowed"}`}>
              Modificar
            </button>
            <button onClick={handleDelete} disabled={areButtonsDisabled()} className={`bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 border-b-4 border-amber-700 hover:border-amber-500 rounded ${areButtonsDisabled() && "opacity-50 cursor-not-allowed"}`}>
              Eliminar
            </button>
            {areButtonsDisabled() && <p className="mt-2 text-gray-100">Selecciona una fila de la tabla</p>}
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
            <div className="bg-white p-8 rounded-lg shadow-lg z-10 w-1/2">
              <h2 className="text-2xl font-bold mb-4">{isEditMode ? 'Editar' : 'Agregar'} historial</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Nombre del cliente</label>
                  <input type="text" name="nombre" value={form.nombre} onChange={handleChange} className="w-full px-3 py-2 border rounded" required />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Vehículo</label>
                  <input type="text" name="vehiculo" value={form.vehiculo} onChange={handleChange} className="w-full px-3 py-2 border rounded" required />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Modelo</label>
                  <input type="text" name="modelo" value={form.modelo} onChange={handleChange} className="w-full px-3 py-2 border rounded" required />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Fecha</label>
                  <input type="date" name="fecha" value={form.fecha} onChange={handleChange} className="w-full px-3 py-2 border rounded" required />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Tipo de servicio</label>
                  <input type="text" name="servicio" value={form.servicio} onChange={handleChange} className="w-full px-3 py-2 border rounded" required />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Descripción</label>
                  <textarea name="descripcion" value={form.descripcion} onChange={handleChange} className="w-full px-3 py-2 border rounded" required></textarea>
                </div>
                <div className="flex justify-end">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 mr-2 rounded">
                    Cancelar
                  </button>
                  <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                    {isEditMode ? 'Actualizar' : 'Agregar'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Historia;
