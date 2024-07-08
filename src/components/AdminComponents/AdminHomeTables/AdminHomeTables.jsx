import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminHomeTables.css';

const AdminHomeTables = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [hogares, setHogares] = useState([]);
  const [selectedHogar, setSelectedHogar] = useState('');
  const [filteredUsuarios, setFilteredUsuarios] = useState([]);
  const [residentesEncargados, setResidentesEncargados] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('https://proyectoncapas.studio:8080/user/all-users');
        // Filtrar usuarios que tienen hogar
        const usuariosConHogar = response.data.filter(usuario => usuario.hogares && usuario.hogares.length > 0);
        setUsuarios(usuariosConHogar);
      } catch (error) {
        setError('Error al obtener los usuarios');
        console.error(error);
      }
    };

    const fetchHogares = async () => {
      try {
        const response = await axios.get('https://proyectoncapas.studio:8080/Hogar/all-hogares');
        setHogares(response.data);
      } catch (error) {
        setError('Error al obtener los hogares');
        console.error(error);
      }
    };

    const fetchResidentesEncargados = async () => {
      try {
        const response = await axios.post('https://proyectoncapas.studio:8080/user/find-by-role', { role: 'RESIDENTE ENCARGADO' });
        setResidentesEncargados(response.data);
      } catch (error) {
        setError('Error al obtener los residentes encargados');
        console.error(error);
      }
    };

    fetchUsuarios();
    fetchHogares();
    fetchResidentesEncargados();
  }, []);

  useEffect(() => {
    if (selectedHogar) {
      const usuariosFiltrados = usuarios.filter(usuario =>
        usuario.hogares.some(hogar => hogar.direccion === selectedHogar)
      );
      setFilteredUsuarios(usuariosFiltrados);
    } else {
      setFilteredUsuarios([]);
    }
  }, [selectedHogar, usuarios]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="admin-home-tables">
      <div className="search-container">
        <br />
        <select
          id="hogar"
          value={selectedHogar}
          onChange={(e) => setSelectedHogar(e.target.value)}
        >
          <option value="">Seleccione un hogar</option>
          {hogares.map(hogar => (
            <option key={hogar.id} value={hogar.direccion}>
              {hogar.direccion}
            </option>
          ))}
        </select>
        <br />
        <button className='accept-button' onClick={() => setSelectedHogar(selectedHogar)}>Buscar</button>
      </div>

      <div className="peticion-table-container">
        <table className="peticion-table">
          <thead>
            <tr>
              <th>ID Hogar</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Nombre del Residente</th>
              <th>Correo</th>
              <th>Tipo de Usuario</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsuarios.map(usuario => (
              usuario.hogares.map(hogar => (
                <tr key={hogar.id}>
                  <td>{hogar.id}</td>
                  <td>{hogar.direccion}</td>
                  <td>{hogar.telefono}</td>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.correo}</td>
                  <td>{usuario.role.role}</td>
                </tr>
              ))
            ))}
          </tbody>
        </table>
      </div>

      <div className="residentes-encargados-table-container">
        <h2>Residentes Encargados</h2>
        <table className="peticion-table">
          <thead>
            <tr>
              <th>ID Hogar</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Nombre del Residente</th>
              <th>Correo</th>
            </tr>
          </thead>
          <tbody>
            {residentesEncargados.map(usuario => (
              usuario.hogares.map(hogar => (
                <tr key={hogar.id}>
                  <td>{hogar.id}</td>
                  <td>{hogar.direccion}</td>
                  <td>{hogar.telefono}</td>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.correo}</td>
                </tr>
              ))
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHomeTables;