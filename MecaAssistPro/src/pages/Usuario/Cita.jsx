import React, { useEffect, useState, useContext } from 'react';
import { Menu } from '../../componentes/MenuU';
import { Encabezado } from '../../componentes/Encabezado';
import { Footer } from '../../componentes/Footer';
import { getCitasByEmail } from '../../api/auth'; // Importa la función que obtiene las citas por correo
import { AuthContext } from '../../context/AuthContext'; // Asumiendo que tienes un contexto de autenticación

export const Cita = () => {
  const { user } = useContext(AuthContext); // Obtén el usuario autenticado desde el contexto
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    if (user && user.email) {
      fetchCitas(user.email);
    }
  }, [user]);

  const fetchCitas = async (email) => {
    try {
      const response = await getCitasByEmail(email);
      setCitas(response.data);
    } catch (error) {
      console.error('Error fetching citas:', error);
    }
  };

  return (
    <div className="flex flex-col h-screen relative" style={{ width: "100vw" }}>
      <Encabezado />
      <Menu />
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
                  {citas.map(cita => (
                    <tr key={cita._id}>
                      <td className="py-4 px-6 border-b border-grey-light text-center">{cita.nombreCliente}</td>
                      <td className="py-4 px-6 border-b border-grey-light text-center">{cita.tipoServicio}</td>
                      <td className="py-4 px-6 border-b border-grey-light text-center">
                        {new Date(cita.fechaHora).toLocaleString('es-ES', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
