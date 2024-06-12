// src/pages/GestionCit.js
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MenuA } from '../../componentes/MenuA';
import { Encabezado } from '../../componentes/Encabezado';
import { Footer } from '../../componentes/Footer';
import { getCitas, createCita, updateCita, deleteCita, getUsers } from '../../api/auth';
import { format } from 'date-fns';

const GestionCit = () => {
  const [citas, setCitas] = useState([]);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("12:00");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [citaData, setCitaData] = useState({
    nombreCliente: '',
    tipoServicio: '',
    fechaHora: '',
    userId: ''
  });
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');

  useEffect(() => {
    fetchCitas();
    fetchUsers();
  }, []);

  const fetchCitas = async () => {
    try {
      const response = await getCitas();
      setCitas(response.data);
    } catch (error) {
      console.error('Error fetching citas:', error);
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
    setSelectedRowIndex(index === selectedRowIndex ? null : index);
  };

  const isRowSelected = (index) => selectedRowIndex === index;

  const handleCreateOrUpdate = async () => {
    try {
      const combinedDateTime = new Date(selectedDate);
      const [hours, minutes] = selectedTime.split(":");
      combinedDateTime.setHours(hours);
      combinedDateTime.setMinutes(minutes);
  
      const selectedUserDetails = users.find(user => user._id === selectedUser);
  
      const newCitaData = {
        ...citaData,
        fechaHora: combinedDateTime,
        userId: selectedUser,
        userEmail: selectedUserDetails.email  // Añadir el correo del usuario
      };
  
      if (isEditMode) {
        await updateCita(citas[selectedRowIndex]._id, newCitaData);
      } else {
        await createCita(newCitaData);
      }
      fetchCitas();
      setIsModalOpen(false);
      setIsEditMode(false);
      setCitaData({
        nombreCliente: '',
        tipoServicio: '',
        fechaHora: '',
        userId: '',
        userEmail: ''  // Reiniciar el campo del correo
      });
      setSelectedDate(new Date());
      setSelectedTime("12:00");
    } catch (error) {
      console.error(`Error ${isEditMode ? 'updating' : 'creating'} cita:`, error);
    }
  };

  const handleEdit = () => {
    if (selectedRowIndex === null) return;
    const selectedCita = citas[selectedRowIndex];
    setIsEditMode(true);
    setCitaData(selectedCita);
    setSelectedDate(new Date(selectedCita.fechaHora));
    setSelectedTime(format(new Date(selectedCita.fechaHora), 'HH:mm'));
    setSelectedUser(selectedCita.userId);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (selectedRowIndex === null) return;
    const citaToDelete = citas[selectedRowIndex];
    const confirmDelete = window.confirm(`¿Estás seguro de que deseas eliminar la cita de ${citaToDelete.nombreCliente}?`);
    if (!confirmDelete) return;

    try {
      await deleteCita(citaToDelete._id);
      fetchCitas();
      setSelectedRowIndex(null);
    } catch (error) {
      console.error('Error deleting cita:', error);
    }
  };

  const areButtonsDisabled = () => selectedRowIndex === null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCitaData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
  };

  // Transformar fechas de las citas a Date objects
  const highlightDates = citas.map(cita => new Date(cita.fechaHora));

  return (
    <div className="flex flex-col h-screen relative" style={{ width: "100vw" }}>
      <Encabezado />
      <MenuA />
      <div className="flex-1 overflow-y-auto bg-orange-500 pb-20">
        <br />
        <h2 className="text-center text-4xl font-extrabold bg-clip-text text-white">Gestión de citas</h2>
        <br />
        <br />

        <div className="flex justify-center">
          <div className="w-2/3 mx-4">
            <div className="bg-white shadow-md rounded my-6">
              <table className="text-left w-full border-collapse">
                <thead>
                  <tr>
                    <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light text-center">Nombre del cliente</th>
                    <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light text-center">Tipo de servicio</th>
                    <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light text-center">Día y hora agendada</th>
                  </tr>
                </thead>
                <tbody>
                  {citas.map((cita, index) => (
                    <tr key={cita._id} className={isRowSelected(index) ? "bg-orange-200 hover:bg-gray-200 cursor-pointer" : "hover:bg-grey-lighter cursor-pointer"} onClick={() => handleRowClick(index)}>
                      <td className="py-4 px-6 border-b border-grey-light text-center">{cita.nombreCliente}</td>
                      <td className="py-4 px-6 border-b border-grey-light text-center">{cita.tipoServicio}</td>
                      <td className="py-4 px-6 border-b border-grey-light text-center">
                        {format(new Date(cita.fechaHora), 'dd/MM/yyyy HH:mm')}
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
            {areButtonsDisabled() && <p className="mt-2 text-white">Selecciona una cita primero</p>}
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-md w-1/2">
              <h2 className="text-lg font-bold mb-4">{isEditMode ? 'Modificar Cita' : 'Agregar Cita'}</h2>
              <form onSubmit={handleCreateOrUpdate}>
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2">Nombre del cliente</label>
    <input name="nombreCliente" value={citaData.nombreCliente} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" required />
  </div>
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2">Tipo de servicio</label>
    <input name="tipoServicio" value={citaData.tipoServicio} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" required />
  </div>
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2">Día y hora agendada</label>
    <div className="calendar mb-4">
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        highlightDates={highlightDates}
        inline
        calendarClassName="highlighted-date"
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">Hora</label>
      <input name="hora" value={selectedTime} onChange={handleTimeChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="time" required />
    </div>
  </div>
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2">Usuario</label>
    <select value={selectedUser} onChange={handleUserChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
      <option value="">Seleccione un usuario</option>
      {users.map(user => (
        <option key={user._id} value={user._id}>{`${user.username} - ${user.email}`}</option>
      ))}
    </select>
  </div>
  <div className="flex items-center justify-between">
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
      {isEditMode ? 'Guardar Cambios' : 'Agregar'}
    </button>
    <button onClick={() => { setIsModalOpen(false); setIsEditMode(false); }} className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" type="button">
      Cancelar
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
}

export default GestionCit;
