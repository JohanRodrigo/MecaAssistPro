import React from 'react'
import { Encabezado } from '../../componentes/Encabezado.jsx'
import { Menu } from '../../componentes/MenuU.jsx'
import { Footer } from '../../componentes/Footer.jsx'

export const Principal = () => {
  return (
    <div className="h-screen bg-orange-500" style={{ width: "100vw" }} >
            <Encabezado />
            <Menu />
            <br />
            <h2 className="text-center text-4xl font-extrabold bg-clip-text text-white">Bienvenido usuario a MecaAssistPro</h2>
            <br />
            <br />
            <div class="flex justify-between mt-8">
                <div class="w-1/3 h-96">
                    <img src="../src/Imagenes/f1.jpg" alt="Imagen 1" class="w-full h-full object-cover max-h-full" />
                </div>
                <div class="w-1/3 ml-4 h-96">
                    <img src="../src/Imagenes/f2.gif" alt="Imagen 2" class="w-full h-full object-cover max-h-full" />
                </div>
                <div class="w-1/3 ml-4 h-96">
                    <img src="../src/Imagenes/serv.jpg" alt="Imagen 3" class="w-full h-full object-cover max-h-full" />
                </div>
            </div>
            <Footer />
        </div>
  )
}
