import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import '../../Estilos/Ingresar.css'
import { Link, useNavigate } from "react-router-dom"
import fondo3 from '../../Imagenes/f1.jpg';
import { FcLock, FcGoogle } from "react-icons/fc";
import { useAuth } from '../../context/AuthContext';


export const Ingresar = () => {

    useEffect(() => { 
        document.body.style.backgroundImage = `url(${fondo3})`;
        return () => {
            document.body.style.backgroundImage = '';
        };
    }, []);


    const { register, handleSubmit, 
        formState: { errors } } = useForm()
    const {signin, errors: signinErrors, isAuthenticated}=useAuth();
    const navigate = useNavigate()
    const onSubmit = handleSubmit(data => {
        signin(data)
    })

    useEffect(()=>{
        if(isAuthenticated) navigate('/Principal')
    },[isAuthenticated])

    return (
        <div className='cuadro'>
            {
                signinErrors.map((error, i)=>(
                    <div className='bg-red-500 p2 text-white text-center my-2'key={i}>
                        {error}
                    </div>
                ))
            }
            <form onSubmit={onSubmit}>
                <h1>MecaAssistPro</h1>
                <img className="im" src='../src/Imagenes/Mecalog.png' alt="Logo" />
                <h2>Inicio de sesión</h2>
                <div className='t'>
                    <input type='text' {...register("email", { required: true })} placeholder='Correo electrónico' required />
                    <FcGoogle className='icon' />
                    {errors.email && (
                        <p className='text-red-500'>El correo es requerido</p>
                    )}
                </div>
                <div className='t'>
                    <input type='password' {...register("password", { required: true })} placeholder='Contraseña' required />
                    <FcLock className='icon' />
                    {errors.password && (
                        <p className='text-red-500'>La contraseña es requerido</p>
                    )}
                </div>
                <div className='recordar'>
                    <label><input type='checkbox' />¿Recordar Contraseña?</label>
                    <a href='#'>¿Olvidó su contraseña?</a>
                </div>
                <button type='submit'>Ingresar</button>
                <div className='register-link'>
                    <p>No se ha registrdo <Link to='/Registrar'>Ir a registro</Link></p>
                </div>
                <div className='register-link'>
                    <p>Eres un administrador <Link to='/RegistrarAd'>Registrate</Link></p>
                </div>
            </form>
            <p></p>
        </div>
    )
}
