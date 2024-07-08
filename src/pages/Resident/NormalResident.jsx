import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../LandingStyles.css"
import NormalResidentHeader from '../../components/NormalResidentComponents/NormalResidentHeader/NormalResidentHeader';

const NormalResident = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const email = localStorage.getItem('correo');
      if (!email) {
        setError('Correo no encontrado en localStorage');
        return;
      }

      try {
        const response = await axios.post('https://proyectoncapas.studio:8080/user/find-user', { correo: email });
        setUserData(response.data);
      } catch (error) {
        setError('Error al obtener la información del usuario');
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <div>Cargando...</div>;
  }
  const hogar = userData.hogares && userData.hogares.length > 0 ? userData.hogares[0] : null;

  return (
    <div>
      <NormalResidentHeader />
      <div className="welcome-information">
        <div className="user-landing-page">
          <h1>Bienvenido, {userData.nombre}</h1>
          <p><strong>Correo:</strong> {userData.correo}</p>
          <p><strong>Rol:</strong> {userData.role.role}</p>
          {hogar && (
            <div>
              <p><strong>Dirección del Hogar:</strong> {hogar.direccion}</p>
              <p><strong>Teléfono de Contacto:</strong> {hogar.telefono}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default NormalResident