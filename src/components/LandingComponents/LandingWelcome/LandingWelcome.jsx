import React from 'react';
import { useNavigate } from 'react-router-dom';
import seguridad_nb from '../../../assets/logo.png';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import './LandingWelcome.css';

const LandingWelcome = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = (response) => {
    console.log('Login Success:', response);

    const token = response.credential;
    console.log('Received Token:', token);

    try {
      const decoded = jwtDecode(token);
      console.log('Decoded Token:', decoded);

      localStorage.setItem('token', token);
      localStorage.setItem('correo', decoded.email);

      console.log('User Info:', {
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture
      });

      navigate('/auth/callback'); // Cambia '/user' a la ruta deseada
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  };

  const handleLoginFailure = (error) => {
    console.log('Login Failed:', error);
  };

  return (
    <div className='welcome-information container'>
      <div className="text-welcome">
        <h1>Bienvenido</h1>
        <p>Descubre cómo nuestra solución de seguridad residencial garantiza la protección de tu hogar y la tranquilidad de tu familia, con tecnología avanzada y servicio confiable las 24 horas.</p>
      </div>
      <img src={seguridad_nb} alt="Logo" className='app-logo' />
      <div className='google-button-wrapper'>
        <div className='google-button'>
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginFailure}
            type="standard"
            shape="pill"
            width="350"
            text="signin_with"
            locale="en"
            logo_alignment="center"
            className="google-login-button"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingWelcome;