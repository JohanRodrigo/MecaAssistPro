import React, { useEffect, useState, useContext } from 'react';
import { Menu } from '../../componentes/MenuU';
import { Encabezado } from '../../componentes/Encabezado';
import { Footer } from '../../componentes/Footer';
import { getSeguimiento } from '../../api/auth'; // Asegúrate de que esta función esté definida correctamente
import { AuthContext } from '../../context/AuthContext'; // Asegúrate de que la ruta es correcta

export const SeguimientoU = () => {
  const [data, setData] = useState([]);
  const { user, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSeguimiento();
        console.log("Datos de seguimiento obtenidos:", response.data); // Depuración
        setData(response.data);
      } catch (error) {
        console.error('Error fetching seguimiento:', error);
      }
    };

    fetchData();
  }, []);

  // Filtra los datos del seguimiento según el correo del usuario autenticado
  const filteredData = data.filter(item => item.correo === user?.email);
  console.log("Datos filtrados:", filteredData); // Depuración

  // Función para formatear la fecha
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('es-ES', options).format(new Date(dateString));
  };

  // Función para obtener el color de la barra de progreso
  const getProgressBarColor = (percentage) => {
    if (percentage < 25) return 'bg-red-500';
    if (percentage < 50) return 'bg-orange-500';
    if (percentage < 75) return 'bg-blue-500';
    return 'bg-green-500';
  };

  return (
    <div className="flex flex-col h-screen relative" style={{ width: "100vw" }}>
      <Encabezado />
      <Menu />
      <div className="flex-1 overflow-y-auto bg-orange-500 pb-20">
        <br />
        <h2 className="text-center text-4xl font-extrabold bg-clip-text text-white">
          Seguimiento de proceso y diagnóstico
        </h2>
        <br />
        <br />
        <div className="flex justify-center">
          <div className="w-2/3 mx-4">
            <div className="bg-white shadow-md rounded my-6">
              <table className="text-left w-full border-collapse">
                <thead>
                  <tr>
                    <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light text-center">
                      Nombre del cliente
                    </th>
                    <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light text-center">
                      Vehículo
                    </th>
                    <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light text-center">
                      Fecha de diagnóstico
                    </th>
                    <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light text-center">
                      Estado de diagnóstico
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((item) => (
                      <tr key={item._id}>
                        <td className="py-4 px-6 border-b border-grey-light text-center">
                          {item.nombre}
                        </td>
                        <td className="py-4 px-6 border-b border-grey-light text-center">
                          {item.vehiculo}
                        </td>
                        <td className="py-4 px-6 border-b border-grey-light text-center">
                          {formatDate(item.fechaDiagnostico)}
                        </td>
                        <td className="py-4 px-6 border-b border-grey-light text-center">
                          <div className="bg-gray-200 rounded-xl shadow-sm overflow-hidden p-1">
                            <div className="relative h-6 flex items-center justify-center">
                              <div
                                className={`absolute top-0 bottom-0 left-0 rounded-lg ${getProgressBarColor(
                                  item.estadoDiagnostico
                                )}`}
                                style={{ width: `${item.estadoDiagnostico}%` }}
                              ></div>
                              <div className="relative text-gray-900 font-medium text-sm">
                                {item.estadoDiagnostico}%
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="py-4 px-6 border-b border-grey-light text-center">
                        No hay datos disponibles
                      </td>
                    </tr>
                  )}
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
