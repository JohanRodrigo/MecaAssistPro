import React, { useEffect, useState } from 'react';
import '../../Estilos/Registrar.css'
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import fondo2 from '../../Imagenes/serv.jpg';
import { TiUser } from "react-icons/ti";
import { FcGoogle, FcLock } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom"

export default function Registrar() {
    useEffect(() => {
        document.body.style.backgroundImage = `url(${fondo2})`;
        return () => {
            document.body.style.backgroundImage = '';
        };
    }, []);

    const { register, handleSubmit, formState:{
        errors
    } } = useForm();
    const {signup, isAuthenticated, errors: RegisterErrors}=useAuth();
    const navigate = useNavigate()

    useEffect(()=>{
        if(isAuthenticated) navigate('/Principal');
    },[isAuthenticated])

    const onSubmit = handleSubmit(async (values) => {
        signup(values);
    });

    return (
        <div className='caja'>
            {
                RegisterErrors.map((error, i)=>(
                    <div className='bg-red-500 p2 text-white'key={i}>
                        {error}
                    </div>
                ))
            }
            <form
                onSubmit={onSubmit}>
                <h1>MecaAssistPro</h1>
                <img className="im" src='../src/Imagenes/Mecalog.png' alt="Logo" />
                <h2>Registrate</h2>
                <div className='texto'>
                    <input type='text' {...register("username", { required: true })} placeholder='Nombre Completo' />
                    <TiUser className='icon' />
                    {errors.username &&(
                        <p className='text-red-500'>El nombre es requerido</p>
                    )}
                </div>
                <div className='texto'>
                    <input type='text' {...register("email", { required: true })} placeholder='Correo electrónico' />
                    <FcGoogle className='icon' />
                    {errors.email &&(
                        <p className='text-red-500'>El correo es requerido</p>
                    )}
                </div>
                <div className='texto'>
                    <input type='password' {...register("password", { required: true })} placeholder='Contraseña' />
                    <FcLock className='icon' />
                    {errors.password &&(
                        <p className='text-red-500'>La contraseña es requerido</p>
                    )}
                </div>
                <button type='submit'>Ingresar</button>

                <div className='register-link'>
                    <p>Ya se registró <Link to='/Ingresar'>Ir al inicio de sesión</Link></p>
                </div>
            </form>
        </div>
    )
}
