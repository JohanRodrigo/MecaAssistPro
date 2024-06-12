import React from 'react';
import { IoIosHome } from "react-icons/io";
import { FaCalendarCheck } from "react-icons/fa6";
import { BsClipboardCheckFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { logoutRequest } from '../api/auth'; // Importa la función de logout

export const Menu = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await logoutRequest();
            if (response.status === 200) {
                setIsAuthenticated(false); // Actualiza el estado de autenticación
                navigate('/Ingresar'); // Redirigir a la página de login
            } else {
                console.error('Error al cerrar sesión');
            }
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <div>
            <nav className="bg-white shadow dark:bg-gray-900">
                <div className="container flex items-center justify-center p-6 mx-auto text-gray-600 capitalize dark:text-gray-300">
                    <Link to='/Principal' className="flex items-center text-center text-gray-800 dark:text-gray-200 mx-1.5 sm:mx-6"><IoIosHome className="mr-1" /> Principal</Link>
                    <Link to='/Cita' className="flex items-center text-center text-gray-800 dark:text-gray-200 mx-1.5 sm:mx-6"><FaCalendarCheck className="mr-1" /> Gestión de citas</Link>
                    <Link to='/Seguimiento' className="flex items-center text-center text-gray-800 dark:text-gray-200 mx-1.5 sm:mx-6"><BsClipboardCheckFill className="mr-1" /> Seguimiento de Progreso y Diagnóstico </Link>
                    <button onClick={handleLogout} className="flex items-center text-center text-gray-800 dark:text-gray-200 mx-1.5 sm:mx-6">Cerrar Sesión</button>
                </div>
            </nav>
        </div>
    );
}
