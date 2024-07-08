import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import NoPage from './pages/NoPage';
import LogIn from './pages/LogIn';
import NormalResident from './pages/Resident/NormalResident';
import ForgotPassword from './pages/ForgotPassword';
import CodQr from './pages/Resident/CodQr';
import CrearSolicitud from './pages/Resident/CrearSolicitud';
import HistorialSolicitud from './pages/Resident/HistorialSolicitud';
import Visita from './pages/Visita/Visita';
import CodQrVisita from './pages/Visita/CodQrVisita';
import Vigilante from './pages/Vigilante/Vigilante';
import ValidarQR from './pages/Vigilante/ValidarQR';
import EntradaAnonima from './pages/Vigilante/EntradaAnonima';
import EResidente from './pages/SuperResident/EResidente';
import CodQrEResidente from './pages/SuperResident/CodQrEResidente';
import NuevoResidente from './pages/SuperResident/NuevoResidente';
import MiHogar from './pages/SuperResident/MiHogar';
import EResidentPermisos from './pages/SuperResident/EResidentPermisos';
import Admin from './pages/Admin/Admin';
import HistorialEntradas from './pages/Admin/HistorialEntradas';
import Hogares from './pages/Admin/Hogares';
import Vigilantes from './pages/Admin/Vigilantes';
import Terminales from './pages/Admin/Terminales';
import AuthCallback from './pages/AuthCallback';
import { GoogleOAuthProvider } from '@react-oauth/google';

const CLIENT_ID = '303346432410-e1pstl1edpc7v0otlf9ekdkgr1j0l4ts.apps.googleusercontent.com';

function App() {
  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/home' element={<LandingPage />} />
          <Route path='/login' element={<LogIn />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />

          <Route path='/resident-landing' element={<NormalResident />} />
          <Route path='/crear-solicitud' element={<CrearSolicitud />} />
          <Route path='/historial-solicitud' element={<HistorialSolicitud />} />
          <Route path='/codQR' element={<CodQr />} />

          <Route path='/visitante-landing' element={<Visita />} />
          <Route path='/visitaCodQR' element={<CodQrVisita />} />

          <Route path='/vigilante-landing' element={<Vigilante />} />
          <Route path='/validarQR' element={<ValidarQR />} />
          <Route path='/entrada-anonima' element={<EntradaAnonima />} />

          <Route path='/residente-encargado-landing' element={<EResidente />} />
          <Route path='/residente-encargado-permisos' element={<EResidentPermisos />} />
          <Route path='/residente-encargado-qr' element={<CodQrEResidente />} />
          <Route path='/residente-encargado-nuevo-residente' element={<NuevoResidente />} />
          <Route path='/residente-encargado-mi-hogar' element={<MiHogar />} />

          <Route path='/admin' element={<Admin />} />
          <Route path='/admin/historial-entradas' element={<HistorialEntradas />} />
          <Route path='/admin/hogares' element={<Hogares />} />
          <Route path='/admin/vigilantes' element={<Vigilantes />} />
          <Route path='/admin/terminales' element={<Terminales />} />
          <Route path='/auth/callback' element={<AuthCallback />} />



          <Route path='*' element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
