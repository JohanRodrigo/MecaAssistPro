import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContextA.jsx';
import '../../Estilos/Ingresar.css';
import fondo4 from '../../Imagenes/fond.jpg';
import { FcKey, FcBusinessman } from "react-icons/fc";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6"; // Importar íconos de ojo
import { Link, useNavigate } from "react-router-dom";
import { loginRequestA } from '../../api/auth.js';

export const Ingreso = () => {
    useEffect(() => {
        document.body.style.backgroundImage = `url(${fondo4})`;
        return () => {
            document.body.style.backgroundImage = '';
        };
    }, []);

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const { signin, isAuthenticated, errors: RegisterErrors } = useAuth();
    const navigate = useNavigate();
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const savedEmail = localStorage.getItem('email');
        const savedPassword = localStorage.getItem('password');
        if (savedEmail && savedPassword) {
            setValue('email', savedEmail);
            setValue('password', savedPassword);
            setRememberMe(true);
        }
    }, [setValue]);

    const onSubmit = handleSubmit(async (data) => {
        try {
            if (rememberMe) {
                localStorage.setItem('email', data.email);
                localStorage.setItem('password', data.password);
            } else {
                localStorage.removeItem('email');
                localStorage.removeItem('password');
            }

            await loginRequestA(data);
            navigate('/PrincipalA');
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            await signin(data);
        }
    });

    useEffect(() => {
        if (isAuthenticated) navigate('/PrincipalA');
    }, [isAuthenticated, navigate]);

    return (
        <div className='cuadro'>
            {Array.isArray(RegisterErrors) && RegisterErrors.map((error, o) => (
                <div className='bg-red-500 p-2 text-white' key={o}>
                    {error}
                </div>
            ))}
            <form onSubmit={onSubmit}>
                <h1>MecaAssistPro</h1>
                <img className="im" src='../src/Imagenes/Mecalog.png' alt="Logo" />
                <h2>Ingresar</h2>
                <div className='t relative'>
                    <input type='text' {...register("email", { required: true })} placeholder='Correo electrónico' required className='input-field' />
                    <FcBusinessman className='icon absolute right-3 top-1/2 transform -translate-y-1/2' />
                    {errors.email && (
                        <p className='text-red-500'>El correo es requerido</p>
                    )}
                </div>
                <div className='t relative'>
                    <input 
                        type={showPassword ? 'text' : 'password'} 
                        {...register("password", { required: true })} 
                        placeholder='Contraseña' 
                        required 
                        className='input-field' 
                    />
                    <div className='absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2'>
                        <div 
                            className='cursor-pointer' 
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                        </div>
                        <FcKey className='icon' />
                    </div>
                    {errors.password && (
                        <p className='text-red-500'>La contraseña es requerida</p>
                    )}
                </div>
                <div className='recordar'>
                    <label className='flex items-center'>
                        <input 
                            type='checkbox' 
                            checked={rememberMe} 
                            onChange={() => setRememberMe(!rememberMe)} 
                            className='mr-2'
                        />
                        ¿Recordar Contraseña?
                    </label>
                    <a href='/Record'>¿Olvidó su contraseña?</a>
                </div>
                <button type='submit' className='btn-submit'>Ingresar</button>
                <div className='register-link'>
                    <p>No se ha registrado <Link to='/RegistrarAd'>Ir a registro</Link></p>
                </div>
                <div className='register-link'>
                    <p>No eres administrador <Link to='/Registrar'>Regístrate</Link></p>
                </div>
            </form>
        </div>
    );
};
