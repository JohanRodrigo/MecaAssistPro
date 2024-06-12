import React from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { resetPassword } from '../../api/auth';
import '../../Estilos/Ingresar.css';

const ResetPassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    const onSubmit = async (data) => {
        try {
            await resetPassword({ token, newPassword: data.newPassword });
            alert('Contraseña restablecida correctamente');
        } catch (error) {
            console.error("Error al restablecer la contraseña:", error);
            alert('Error al restablecer la contraseña');
        }
    };

    return (
        <div className='cuadro'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2>Establecer Nueva Contraseña</h2>
                <div className='t relative'>
                    <input 
                        type='password' 
                        {...register("newPassword", { required: true })} 
                        placeholder='Nueva Contraseña' 
                        className='input-field' 
                    />
                    {errors.newPassword && (
                        <p className='text-red-500'>La nueva contraseña es requerida</p>
                    )}
                </div>
                <button type='submit' className='btn-submit'>Restablecer Contraseña</button>
            </form>
        </div>
    );
};

export default ResetPassword;
