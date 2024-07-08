import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminTableEntradas.css';

const AdminTableEntradas = () => {
    const [peticiones, setPeticiones] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPeticiones = async () => {
            try {
                const response = await axios.get('https://proyectoncapas.studio:8080/peticiones/all-peticiones');
                // Filtrar peticiones donde dui_visitante no es nulo
                const filteredPeticiones = response.data.filter(peticion => peticion.dui_visitante !== null);
                setPeticiones(filteredPeticiones);
            } catch (error) {
                setError('Error al obtener las peticiones');
                console.error(error);
            }
        };

        fetchPeticiones();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="peticion-table-container">
            <table className="peticion-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre Visitante</th>
                        <th>DUI</th>
                        <th>Razón</th>
                        <th>Fecha Entrada</th>
                        <th>Fecha Salida</th>
                    </tr>
                </thead>
                <tbody>
                    {peticiones.map(peticion => (
                        <tr key={peticion.id}>
                            <td>{peticion.id}</td>
                            <td>{peticion.nombre_visitante}</td>
                            <td>{peticion.dui_visitante}</td>
                            <td>{peticion.razon}</td>
                            <td>{new Date(peticion.fecha_entrada).toLocaleString()}</td>
                            <td>{new Date(peticion.fecha_salida).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};



export default AdminTableEntradas;