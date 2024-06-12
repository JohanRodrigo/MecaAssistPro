import React from 'react'
import { Encabezado } from '../../componentes/Encabezado'
import { Footer } from '../../componentes/Footer'
import {Link} from "react-router-dom"

export const Inicio = () => {
  return (
    <div className="h-screen bg-orange-500" style={{ width: "100vw" }} >
    
    <Encabezado/>
    <div className="container mx-auto mt-8">
    <h2 className="text-center text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-stone-800 to-white">¡Bienvenido!</h2>
    <p className="text-justify mt-4 text-2xl text-white">
          ¡Bienvenido a MecaAssistPro, la revolución en gestión de diagnósticos mecánicos para talleres automotrices! 
          Nuestra solución tecnológica está diseñada para transformar la forma en que los talleres abordan los diagnósticos mecánicos, 
          brindando una experiencia más eficiente y precisa.
          <br/><br/>
          ¡Pensado especialmente para ti! Sabemos que tu tiempo es esencial y que deseas soluciones rápidas y precisas para tus necesidades automotrices. 
          Nos enorgullece ofrecerte un servicio que no solo simplifica el proceso, sino que también asegura la precisión en cada diagnóstico. 
          La interfaz intuitiva de MecaAssistPro hace que el proceso sea transparente y fácil de entender, permitiéndote tomar decisiones informadas sobre el mantenimiento de tu vehículo.
        </p>
        <div className="flex justify-between mt-8">
          <div className="w-1/3">
            <img src="../src/Imagenes/f1.jpg" alt="Imagen 1" className="w-full h-64 object-cover" />
          </div>
          <div className="w-1/3 ml-4">
            <img src="../src/Imagenes/f2.gif" alt="Imagen 2" className="w-full h-64 object-cover" />
          </div>
          <div className="w-1/3 ml-4">
            <img src="../src/Imagenes/serv.jpg" alt="Imagen 3" className="w-full h-64 object-cover" />
          </div>
        </div>
        <div className="flex justify-center mt-8">
        <Link to='/Registrar' >
            <button className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded mr-4">Crear cuenta</button>
            </Link>
            <Link to='/Ingresar'>
        <button className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded">Ingresar</button>
        </Link>
        </div>
    </div>
    <Footer/>
   </div>
  )
}
