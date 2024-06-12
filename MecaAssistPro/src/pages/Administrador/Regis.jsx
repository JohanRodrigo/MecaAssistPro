import React, { useEffect, useState } from 'react';
import '../../Estilos/Regis.css';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContextA.jsx';
import fondo from '../../Imagenes/fondo.jpg';
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoIosMail } from "react-icons/io";
import { registerRequestA } from '../../api/auth'; // Importa registerRequestA desde el archivo auth.js

export const Regis = () => {
    useEffect(() => {
        document.body.style.backgroundImage = `url(${fondo})`;
        return () => {
            document.body.style.backgroundImage = '';
        };
    }, []);

    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const { signup, isAuthenticated, errors: RegisterErrors } = useAuth();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (isAuthenticated) navigate('/PrincipalA');
    }, [isAuthenticated, navigate]);

    const onSubmit = handleSubmit(async (values) => {
        try {
            const userData = {
                username: values.username,
                email: values.email,
                password: values.password,
                plan: watch("plan")
            };
            await registerRequestA(userData);
            // Redirigir al usuario solo después de que el registro sea exitoso
            navigate('/PrincipalA');
        } catch (error) {
            console.error("Error al registrar usuario:", error);
            await signup(values);
            // Aquí puedes mostrar un mensaje de error al usuario o realizar cualquier acción necesaria
        }
    });

    return (
        <div className='wrapper'>
            {Array.isArray(RegisterErrors) && RegisterErrors.map((error, o) => (
                <div className='bg-red-500 p-2 text-white' key={o}>
                    {error}
                </div>
            ))}
            <form onSubmit={onSubmit} autoComplete="off">
                <h1>MecaAssistPro</h1>
                <img className="im" src='../src/Imagenes/Mecalog.png' alt="Logo" />
                <h2>Registrate</h2><h2>Administrador</h2>
                <div className='input-box'>
                    <input type='text' {...register("username", { required: true })} placeholder='Nombre Completo' required autoComplete="off" />
                    <FaUserCircle className='icon' />
                    {errors.username && (
                        <p className='text-red-500'>El nombre es requerido</p>
                    )}
                </div>
                <div className='input-box'>
                    <input type='text' {...register("email", { required: true })} placeholder='Correo electrónico' required autoComplete="off" />
                    <IoIosMail className='icon' />
                    {errors.email && (
                        <p className='text-red-500'>El correo es requerido</p>
                    )}
                </div>
                <div className='input-box relative'>
                    <input 
                        type={showPassword ? 'text' : 'password'} 
                        {...register("password", { required: true })} 
                        placeholder='Contraseña' 
                        required 
                        className='input-field'
                        autoComplete="off"
                    />
                    <div className='absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2'>
                        <div 
                            className='cursor-pointer' 
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                        </div>
                        <RiLockPasswordFill className='icon' />
                    </div>
                    {errors.password && (
                        <p className='text-red-500'>La contraseña es requerida</p>
                    )}
                </div>
                <div className="planes">
                    <label htmlFor="plan">Selecciona un plan:</label>
                    <select id="plan" {...register("plan", { required: true })} name="plan" autoComplete="off">
                        <option value="Mensual">Mensual</option>
                        <option value="Semestral">Semestral</option>
                        <option value="Anual">Anual</option>
                    </select>
                </div>

                <button type='submit'>Ingresar</button>

                <div className='register-link'>
                    <p>Ya se registró <Link to='/IngresarAd'>Ir al inicio de sesión</Link></p>
                </div>
            </form>
        </div>
    );
};
