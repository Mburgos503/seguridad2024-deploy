import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/Tables.css';

const SentSolicitudesTable = () => {
    const [peticiones, setPeticiones] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPeticiones = async () => {
            const correo = localStorage.getItem('correo');
            if (!correo) {
                setError('No se encontró el correo en el almacenamiento local');
                return;
            }

            try {
                const response = await axios.post('https://proyectoncapas.studio:8080/peticiones/find-peticion-user', { correo }, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                setPeticiones(response.data);
            } catch (error) {
                console.error('Error al obtener las peticiones:', error);
                setError('Hubo un error al obtener las peticiones');
            }
        };

        fetchPeticiones();
    }, []);

    return (
        <div className="peticion-table-container">
            {error && <p className="error-message">{error}</p>}
            <table className="peticion-table">
                <thead>
                    <tr>
                        <th>Nombre Visitante</th>
                        <th>Fecha Entrada</th>
                        <th>Fecha Salida</th>
                        <th>Estado</th>
                        <th>Solicitud ID</th>

                    </tr>
                </thead>
                <tbody>
                    {peticiones.map(peticion => (
                        <tr key={peticion.id}>
                            <td>{peticion.nombre_visitante}</td>
                            <td>{new Date(peticion.fecha_entrada).toLocaleString()}</td>
                            <td>{new Date(peticion.fecha_salida).toLocaleString()}</td>
                            <td>{peticion.estado}</td>
                            <td>{peticion.id}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SentSolicitudesTable;