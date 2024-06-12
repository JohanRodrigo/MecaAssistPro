import React from 'react'
import logo from '../../src/Imagenes/Mecalog.png';

export const Encabezado = () => {
  return (
    <div>
    <header className="bg-gray-800 py-4 px-8 flex items-center justify-between">
      {/* Logo */}
      <img src={logo} alt="Logo" className="w-24 h-24" />

      {/* Nombre de la página */}
      <h1 className="text-white text-3xl font-bold Oswald">MecaAssistPro</h1>
    </header>
    
    </div>
  )
}
