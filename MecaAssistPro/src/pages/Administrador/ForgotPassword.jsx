import React from 'react';
import { useForm } from 'react-hook-form';
import { sendResetPasswordEmail } from '../../api/auth';
import '../../Estilos/Ingresar.css';

const ForgotPassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            await sendResetPasswordEmail(data.email);
            alert('Se ha enviado un correo para restablecer su contraseña');
        } catch (error) {
            console.error("Error al enviar el correo de restablecimiento:", error);
            alert('Error al enviar el correo de restablecimiento');
        }
    };

    return (
        <div className='cuadro'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2>Restablecer Contraseña</h2>
                <div className='t relative'>
                    <input 
                        type='email' 
                        {...register("email", { required: true })} 
                        placeholder='Correo electrónico' 
                        className='input-field' 
                    />
                    {errors.email && (
                        <p className='text-red-500'>El correo es requerido</p>
                    )}
                </div>
                <button type='submit' className='btn-submit'>Enviar</button>
            </form>
        </div>
    );
};

export default ForgotPassword;
