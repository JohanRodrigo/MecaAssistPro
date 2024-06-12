import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContextA";

export const MenuA = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(navigate);
    };

    return (
        <div>
            <nav className="bg-white shadow dark:bg-gray-900">
                <div className="container flex items-center justify-center p-6 mx-auto text-gray-600 capitalize dark:text-gray-300">
                    <Link to='/PrincipalA' className="flex items-center text-center text-gray-800 dark:text-gray-200 border-b-2 border-blue-500 mx-1.5 sm:mx-6"> Principal</Link>
                    <Link to='/Gestión de clientes' className="flex items-center text-center text-gray-800 dark:text-gray-200 mx-1.5 sm:mx-6">Gestión de clientes</Link>
                    <Link to='/Gestión de vehículos' className="flex items-center text-center text-gray-800 dark:text-gray-200 mx-1.5 sm:mx-6">Gestión de vehículos </Link>
                    <Link to='/Comunicación con el cliente' className="flex items-center text-center text-gray-800 dark:text-gray-200 mx-1.5 sm:mx-6">Comunicación con clientes </Link>
                    <Link to='/Gestión de citas' className="flex items-center text-center text-gray-800 dark:text-gray-200 mx-1.5 sm:mx-6">Gestión de citas </Link>
                    <Link to='/Seguimiento de proceso y diagnóstico' className="flex items-center text-center text-gray-800 dark:text-gray-200 mx-1.5 sm:mx-6">Seguimiento de progreso y diagnóstico </Link>
                    <Link to='/Historial' className="flex items-center text-center text-gray-800 dark:text-gray-200 mx-1.5 sm:mx-6">Historial de vehículo </Link>
                    <Link to='/Generar' className="flex items-center text-center text-gray-800 dark:text-gray-200 mx-1.5 sm:mx-6">Generación de reportes</Link>
                    <Link to='/Sensores' className="flex items-center text-center text-gray-800 dark:text-gray-200 mx-1.5 sm:mx-6">Sensores externos </Link>
                    <button onClick={handleLogout} className="flex items-center text-center text-gray-800 dark:text-gray-200 mx-1.5 sm:mx-6">Cerrar Sesión</button>
                </div>
            </nav>
        </div>
    );
};
