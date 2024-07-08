import React, { useEffect, useState } from 'react';
import axios from 'axios';

import AdminHeader from "../../components/AdminComponents/AdminHeader/AdminHeader";

const Admin = () => {
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
  return (
    <div>
      <AdminHeader />
      <div className="user-landing-page">
        <h1>Bienvenido, {userData.nombre}</h1>
        <p><strong>Correo:</strong> {userData.correo}</p>
        <p><strong>Rol:</strong> {userData.role.role}</p>
      </div>
    </div>
  );
}

export default Admin;