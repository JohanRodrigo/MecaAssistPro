import React, { useState, useEffect } from 'react';
import { MenuA } from '../../componentes/MenuA';
import { Encabezado } from '../../componentes/Encabezado';
import { Footer } from '../../componentes/Footer';
import { getVehicles, createVehicle, updateVehicle, deleteVehicle } from '../../api/auth';

const GestionV = () => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [vehicleData, setVehicleData] = useState({
    clientName: '',
    brand: '',
    model: '',
    year: '',
    vehicleType: '',
    licensePlate: '',
    lastServiceDate: ''
  });

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await getVehicles();
      setVehicles(response.data);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  };

  const handleRowClick = (index) => {
    setSelectedRowIndex(index === selectedRowIndex ? null : index);
  };

  const isRowSelected = (index) => selectedRowIndex === index;

  const handleCreateOrUpdate = async () => {
    try {
      if (isEditMode) {
        await updateVehicle(vehicles[selectedRowIndex]._id, vehicleData);
      } else {
        await createVehicle(vehicleData);
      }
      fetchVehicles();
      setIsModalOpen(false);
      setIsEditMode(false);
      setVehicleData({
        clientName: '',
        brand: '',
        model: '',
        year: '',
        vehicleType: '',
        licensePlate: '',
        lastServiceDate: ''
      });
    } catch (error) {
      console.error(`Error ${isEditMode ? 'updating' : 'creating'} vehicle:`, error);
    }
  };

  const handleEdit = () => {
    if (selectedRowIndex === null) return;
    setIsEditMode(true);
    setVehicleData(vehicles[selectedRowIndex]);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (selectedRowIndex === null) return;
    const vehicleToDelete = vehicles[selectedRowIndex];
    const confirmDelete = window.confirm(`¿Estás seguro de que deseas eliminar el vehículo con placas ${vehicleToDelete.licensePlate}?`);
    if (!confirmDelete) return;

    try {
      await deleteVehicle(vehicleToDelete._id);
      fetchVehicles();
      setSelectedRowIndex(null);
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
  };

  const areButtonsDisabled = () => selectedRowIndex === null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicleData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="h-screen bg-orange-500" style={{ width: "100vw" }}>
      <Encabezado />
      <MenuA />
      <br />
      <h2 className="text-center text-4xl font-extrabold bg-clip-text text-white">Gestión de vehículos</h2>
      <br />
      <br />

      <div className="flex justify-center">
        <div className="w-2/3 mx-4">
          <div className="bg-white shadow-md rounded my-6">
            <table className="text-left w-full border-collapse"> 
              <thead>
                <tr>
                  <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light text-center">Nombre del cliente</th>
                  <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light text-center">Marca</th>
                  <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light text-center">Modelo</th>
                  <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light text-center">Año</th>
                  <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light text-center">Tipo de vehículo</th>
                  <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light text-center">Placas</th>
                  <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light text-center">Última fecha de servicios</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((vehicle, index) => (
                  <tr key={vehicle._id} className={isRowSelected(index) ? "bg-orange-200 hover:bg-gray-200 cursor-pointer" : "hover:bg-grey-lighter cursor-pointer"} onClick={() => handleRowClick(index)}>
                    <td className="py-4 px-6 border-b border-grey-light text-center">{vehicle.clientName}</td>
                    <td className="py-4 px-6 border-b border-grey-light text-center">{vehicle.brand}</td>
                    <td className="py-4 px-6 border-b border-grey-light text-center">{vehicle.model}</td>
                    <td className="py-4 px-6 border-b border-grey-light text-center">{vehicle.year}</td>
                    <td className="py-4 px-6 border-b border-grey-light text-center">{vehicle.vehicleType}</td>
                    <td className="py-4 px-6 border-b border-grey-light text-center">{vehicle.licensePlate}</td>
                    <td className="py-4 px-6 border-b border-grey-light text-center">{new Date(vehicle.lastServiceDate).toLocaleDateString()}</td>
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
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-2xl font-bold mb-4">{isEditMode ? 'Modificar Vehículo' : 'Agregar Vehículo'}</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleCreateOrUpdate(); }}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Nombre del cliente</label>
                <input name="clientName" value={vehicleData.clientName} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Marca</label>
                <input name="brand" value={vehicleData.brand} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Modelo</label>
                <input name="model" value={vehicleData.model} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Año</label>
                <input name="year" value={vehicleData.year} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Tipo de vehículo</label>
                <input name="vehicleType" value={vehicleData.vehicleType} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Placas</label>
                <input name="licensePlate" value={vehicleData.licensePlate} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Última fecha de servicio</label>
                <input name="lastServiceDate" value={vehicleData.lastServiceDate} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="date" required />
              </div>
              <div className="flex justify-end">
                <button type="button" onClick={() => setIsModalOpen(false)} className="mr-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  Cancelar
                </button>
                <button type="submit" className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded">
                  {isEditMode ? 'Modificar' : 'Agregar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default GestionV;
