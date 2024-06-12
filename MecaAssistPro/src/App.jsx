import React from 'react';
import { useState } from 'react';
import { AuthProvider } from './context/AuthContext.jsx';
import { AuthProviderA } from './context/AuthContextA.jsx';
import { Inicio } from './pages/Inicio/Inicio.jsx';
import Registrar from './pages/Usuario/Registrar.jsx';
import { Ingresar } from './pages/Usuario/Ingresar.jsx';
import { Principal } from './pages/Usuario/Principal.jsx';
import { Ingreso } from './pages/Administrador/Ingreso.jsx';
import { Regis } from './pages/Administrador/Regis.jsx';
import GestionC from './pages/Administrador/GestionC.jsx';
import GestionV from './pages/Administrador/GestionV.jsx';
import GestionCit from './pages/Administrador/GestionCit.jsx';
import Comunicacion from './pages/Administrador/Comunicacion.jsx';
import Seguimineto from './pages/Administrador/Seguimineto.jsx';
import Historia from './pages/Administrador/Historia.jsx';
import Sensores from './pages/Administrador/Sensores.jsx';
import Generar from './pages/Administrador/Generar.jsx';
import { Cita } from './pages/Usuario/Cita.jsx';
import { SeguimientoU } from './pages/Usuario/SeguimintoU.jsx';
import { ProtectedRoute } from './ProtectedRoute.jsx';
import { PrincipalA } from './pages/Administrador/PrincipalA.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ForgotPassword from './pages/Administrador/ForgotPassword.jsx';
import ResetPassword from './pages/Administrador/ResetPassword.jsx';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Inicio />} />
          <Route path="/Registrar" element={<Registrar />} />
          <Route path="/Ingresar" element={<Ingresar />} />
                      <Route path="/Principal" element={<Principal />} />
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>

            <Route path="/Cita" element={<Cita />} />
            <Route path="/Seguimiento" element={<SeguimientoU />} />
          </Route>

          {/* Administrator Routes */}
          <Route path="/Record" element={<AuthProviderA><ForgotPassword /></AuthProviderA>} />
          <Route path="/Rese" element={<AuthProviderA><ResetPassword /></AuthProviderA>} />
          <Route path="/IngresarAd" element={<AuthProviderA><Ingreso /></AuthProviderA>} />
          <Route path="/RegistrarAd" element={<AuthProviderA><Regis /></AuthProviderA>} />
          <Route path="/PrincipalA" element={<AuthProviderA><PrincipalA /></AuthProviderA>} />
          <Route path="/Gestión de clientes" element={<AuthProviderA><GestionC /></AuthProviderA>} />
          <Route path="/Gestión de vehículos" element={<AuthProviderA><GestionV /></AuthProviderA>} />
          <Route path="/Gestión de citas" element={<AuthProviderA><GestionCit /></AuthProviderA>} />
          <Route path="/Comunicación con el cliente" element={<AuthProviderA><Comunicacion /></AuthProviderA>} />
          <Route path="/Seguimiento de proceso y diagnóstico" element={<AuthProviderA><Seguimineto /></AuthProviderA>} />
          <Route path="/Historial" element={<AuthProviderA><Historia /></AuthProviderA>} />
          <Route path="/Sensores" element={<AuthProviderA><Sensores /></AuthProviderA>} />
          <Route path="/Generar" element={<AuthProviderA><Generar /></AuthProviderA>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
