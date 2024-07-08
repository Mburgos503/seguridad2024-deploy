import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EResidentMiHogar.css'; 

const EResidentMiHogar = () => {
  const [direccion, setDireccion] = useState('');
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [residents, setResidents] = useState([]);

  useEffect(() => {
    const fetchHogar = async () => {
      const email = localStorage.getItem('correo');
      if (!email) {
        setMensaje('Correo no encontrado en localStorage');
        return;
      }

      try {
        const response = await axios.post('http://167.172.244.10:8080/user/find-user', { correo: email });
        if (response.data.hogares.length > 0) {
          const hogarDireccion = response.data.hogares[0].direccion;
          setDireccion(hogarDireccion);

          // Fetch residents for the home
          const residentsResponse = await axios.get('http://167.172.244.10:8080/user/all-users');
          const filteredResidents = residentsResponse.data.filter(user =>
            user.hogares.some(hogar => hogar.direccion === hogarDireccion)
          );
          setResidents(filteredResidents);
        } else {
          setMensaje('No se encontraron hogares para este usuario');
        }
      } catch (error) {
        setMensaje('Error al obtener la dirección del hogar');
        console.error(error);
      }
    };

    fetchHogar();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');

    try {
      await axios.post('http://167.172.244.10:8080/user/add-hogarXuser', {
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
            readOnly
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
        <div className='accept-form'>
          <button className='accept-button' type="submit">Agregar</button>
        </div>
      </form>
      {mensaje && <p>{mensaje}</p>}

      {residents.length > 0 && (
        <div className="peticion-table-container">
          <h2 >Residentes en {direccion}</h2>
          <table className="peticion-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Rol</th>
              </tr>
            </thead>
            <tbody>
              {residents.map(resident => (
                <tr key={resident.id}>
                  <td>{resident.nombre}</td>
                  <td>{resident.correo}</td>
                  <td>{resident.role.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EResidentMiHogar;