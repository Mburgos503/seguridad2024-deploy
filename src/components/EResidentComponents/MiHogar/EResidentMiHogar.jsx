import React, { useState } from 'react';
import axios from 'axios';
import './EResidentMiHogar.css'; // Asegúrate de crear este archivo CSS para estilos

const EResidentMiHogar = () => {
  const [direccion, setDireccion] = useState('');
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');

    try {
      const response = await axios.post('http://localhost:8080/user/add-hogarXuser', {
        direccion: [direccion],
        correo: correo,
      });

      setMensaje('Usuario agregado al hogar exitosamente');
    } catch (error) {
      setMensaje('Error al agregar usuario al hogar');
      console.error(error);
    }
  };

  return (
    <div className="add-hogar-form-container">
      <form onSubmit={handleSubmit} className="add-hogar-form">
        <div className="add-hogar-form-group">
          <label htmlFor="direccion">Dirección del Hogar</label>
          <input
            type="text"
            id="direccion"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            required
          />
        </div>
        <div className="add-hogar-form-group">
          <label htmlFor="correo">Correo del Usuario</label>
          <input
            type="email"
            id="correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>
        <button type="submit">Agregar</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default EResidentMiHogar;