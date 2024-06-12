import React, { useState, useEffect } from 'react';
import { MenuA } from '../../componentes/MenuA';
import { Encabezado } from '../../componentes/Encabezado';
import { Footer } from '../../componentes/Footer';
import { getSeguimiento, createSeguimiento, updateSeguimiento, deleteSeguimiento, getUsers } from '../../api/auth';

const Seguimiento = () => {
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [seguimientoData, setSeguimientoData] = useState({
    nombre: '',
    vehiculo: '',
    fechaDiagnostico: '',
    estadoDiagnostico: '',
    usuarioId: '',
    correo: ''
  });

  useEffect(() => {
    fetchData();
    fetchUsers();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getSeguimiento();
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
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

  const handleCreateOrUpdate = async () => {
    try {
      console.log('Sending data:', seguimientoData);
      if (isEditMode) {
        await updateSeguimiento(data[selectedRow]._id, seguimientoData);
      } else {
        await createSeguimiento(seguimientoData);
      }
      fetchData();
      setIsModalOpen(false);
      setIsEditMode(false);
      setSeguimientoData({
        nombre: '',
        vehiculo: '',
        fechaDiagnostico: '',
        estadoDiagnostico: '',
        usuarioId: '',
        correo: ''
      });
    } catch (error) {
      console.error(`Error ${isEditMode ? 'updating' : 'creating'} seguimiento:`, error);
    }
  };

  const handleEdit = () => {
    if (selectedRow === null) return;
    setIsEditMode(true);
    setSeguimientoData(data[selectedRow]);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (selectedRow === null) return;
    const seguimientoToDelete = data[selectedRow];
    const confirmDelete = window.confirm(`¿Estás seguro de que deseas eliminar el seguimiento de ${seguimientoToDelete.nombre}?`);
    if (!confirmDelete) return;

    try {
      await deleteSeguimiento(seguimientoToDelete._id);
      fetchData();
      setSelectedRow(null);
    } catch (error) {
      console.error('Error deleting seguimiento:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSeguimientoData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  
    if (name === 'usuarioId') {
      const selectedUser = users.find(user => user._id === value);
      if (selectedUser) {
        setSeguimientoData((prevState) => ({
          ...prevState,
          correo: selectedUser.email
        }));
      }
    }
  };
  
  const handleCancel = () => {
    setIsModalOpen(false);
    setSeguimientoData({
      nombre: '',
      vehiculo: '',
      fechaDiagnostico: '',
      estadoDiagnostico: '',
      usuarioId: '',
      correo: ''
    });
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('es-ES', options).format(new Date(dateString));
  };

  const getProgressBarColor = (percentage) => {
    if (percentage < 25) return 'bg-red-500';
    if (percentage < 50) return 'bg-orange-500';
    if (percentage < 75) return 'bg-blue-500';
    return 'bg-green-500';
  };

  return (
    <div className="flex flex-col h-screen relative" style={{ width: "100vw" }}>
      <Encabezado />
      <MenuA />
      <div className="flex-1 overflow-y-auto bg-orange-500 pb-20">
        <br />
        <h2 className="text-center text-4xl font-extrabold bg-clip-text text-white">Seguimiento de proceso y diagnóstico</h2>
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
                    <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light text-center">Fecha de diagnóstico</th>
                    <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light text-center">Estado de diagnóstico</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={item._id} className={isRowSelected(index) ? "bg-orange-200 hover:bg-gray-200 cursor-pointer" : "hover:bg-grey-lighter cursor-pointer"} onClick={() => handleRowClick(index)}>
                      <td className="py-4 px-6 border-b border-grey-light text-center">{item.nombre}</td>
                      <td className="py-4 px-6 border-b border-grey-light text-center">{item.vehiculo}</td>
                      <td className="py-4 px-6 border-b border-grey-light text-center">{formatDate(item.fechaDiagnostico)}</td>
                      <td className="py-4 px-6 border-b border-grey-light text-center">
                        <div className="bg-gray-200 rounded-xl shadow-sm overflow-hidden p-1">
                          <div className="relative h-6 flex items-center justify-center">
                            <div className={`absolute top-0 bottom-0 left-0 rounded-lg ${getProgressBarColor(item.estadoDiagnostico)}`} style={{ width: `${item.estadoDiagnostico}%` }}></div>
                            <div className="relative text-gray-900 font-medium text-sm">{item.estadoDiagnostico}%</div>
                          </div>
                        </div>
                      </td>
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
              <h2 className="text-2xl font-bold mb-4">{isEditMode ? 'Modificar Seguimiento' : 'Agregar Seguimiento'}</h2>
              <form onSubmit={(e) => { e.preventDefault(); handleCreateOrUpdate(); }}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Nombre del cliente</label>
                  <input name="nombre" value={seguimientoData.nombre} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" required />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Vehículo</label>
                  <input name="vehiculo" value={seguimientoData.vehiculo} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" required />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Fecha de diagnóstico</label>
                  <input name="fechaDiagnostico" value={seguimientoData.fechaDiagnostico} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="date" />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Estado de diagnóstico</label>
                  <input name="estadoDiagnostico" value={seguimientoData.estadoDiagnostico} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" min="0" max="100" required />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Seleccionar Usuario</label>
                  <select name="usuarioId" value={seguimientoData.usuarioId} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
                    <option value="" disabled>Seleccione un usuario</option>
                    {users.map(user => (
                      <option key={user._id} value={user._id}>
                        {user.username} - {user.email}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end">
                  <button type="button" onClick={handleCancel} className="mr-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
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
      </div>
      <Footer />
    </div>
  );
};

export default Seguimiento;
