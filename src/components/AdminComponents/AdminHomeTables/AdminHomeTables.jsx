import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminHomeTables.css';

const AdminHomeTables = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:8080/user/all-users');
        // Filtrar usuarios que tienen hogar
        const filteredUsuarios = response.data.filter(usuario => usuario.hogares && usuario.hogares.length > 0);
        setUsuarios(filteredUsuarios);
      } catch (error) {
        setError('Error al obtener los usuarios');
        console.error(error);
      }
    };

    fetchUsuarios();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="peticion-table-container">
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
          {usuarios.map(usuario => (
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
  );
};

export default AdminHomeTables;