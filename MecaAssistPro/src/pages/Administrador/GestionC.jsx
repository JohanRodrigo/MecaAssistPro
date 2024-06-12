import React, { useState, useEffect } from 'react';
import { MenuA } from '../../componentes/MenuA';
import { Encabezado } from '../../componentes/Encabezado';
import { Footer } from '../../componentes/Footer';
import { getUsers, registerRequest, updateUser, deleteUser } from '../../api/auth';

const GestionC = () => {
  const [users, setUsers] = useState([]);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    fetchUsers();
  }, []);

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
      if (isEditMode) {
        await updateUser(users[selectedRowIndex]._id, userData);
      } else {
        await registerRequest(userData);
      }
      fetchUsers();
      setIsModalOpen(false);
      setIsEditMode(false);
      setUserData({
        username: '',
        email: '',
        password: ''
      });
    } catch (error) {
      console.error(`Error ${isEditMode ? 'updating' : 'creating'} user:`, error);
    }
  };

  const handleEdit = () => {
    if (selectedRowIndex === null) return;
    setIsEditMode(true);
    setUserData(users[selectedRowIndex]);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (selectedRowIndex === null) return;
    const userToDelete = users[selectedRowIndex];
    const confirmDelete = window.confirm(`¿Estás seguro de que deseas eliminar al usuario ${userToDelete.username}?`);
    if (!confirmDelete) return;

    try {
      await deleteUser(userToDelete._id);
      fetchUsers();
      setSelectedRowIndex(null);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const areButtonsDisabled = () => selectedRowIndex === null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="flex flex-col h-screen relative" style={{ width: "100vw" }}>
      <Encabezado />
      <MenuA />
      <div className="flex-1 overflow-y-auto bg-orange-500 pb-20">
      <br />
      <h2 className="text-center text-4xl font-extrabold bg-clip-text text-white">Gestión de clientes</h2>
      <br />
      <br />

      <div className="flex justify-center">
        <div className="w-2/3 mx-4">
          <div className="bg-white shadow-md rounded my-6">
            <table className="text-left w-full border-collapse"> 
              <thead>
                <tr>
                  <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light text-center">Nombre del usuario</th>
                  <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light text-center">Correo electrónico</th>
                  <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light text-center">Contraseña</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id} className={isRowSelected(index) ? "bg-orange-200 hover:bg-gray-200 cursor-pointer" : "hover:bg-grey-lighter cursor-pointer"} onClick={() => handleRowClick(index)}>
                    <td className="py-4 px-6 border-b border-grey-light text-center">{user.username}</td>
                    <td className="py-4 px-6 border-b border-grey-light text-center">{user.email}</td>
                    <td className="py-4 px-6 border-b border-grey-light text-center">********</td>
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
            <h2 className="text-2xl font-bold mb-4">{isEditMode ? 'Modificar Usuario' : 'Agregar Usuario'}</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleCreateOrUpdate(); }}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Nombre del usuario</label>
                <input name="username" value={userData.username} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Correo electrónico</label>
                <input name="email" value={userData.email} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" required />
              </div>
              {!isEditMode && (
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Contraseña</label>
                  <input name="password" value={userData.password} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" required />
                </div>
              )}
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

</div>
      <Footer />
    </div>
  );
};

export default GestionC;
