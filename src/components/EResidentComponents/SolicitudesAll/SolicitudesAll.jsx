import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/Tables.css';

const SolicitudesAll = () => {
    const [peticiones, setPeticiones] = useState([]);
    const [selectedPeticion, setSelectedPeticion] = useState(null);
    const [popupVisible, setPopupVisible] = useState(false);

    useEffect(() => {
        const fetchPeticiones = async () => {
            try {
                const response = await axios.get('/api/peticiones/all-peticiones');
                setPeticiones(response.data);
            } catch (error) {
                console.error('Error fetching peticiones:', error);
            }
        };

        fetchPeticiones();
    }, []);

    const handleActionClick = (peticion) => {
        setSelectedPeticion(peticion);
        setPopupVisible(true);
    };

    const handleClosePopup = () => {
        setPopupVisible(false);
        setSelectedPeticion(null);
    };

    const handleAccept = async () => {
        try {
            await axios.put('/api/peticiones/update-status', {
                code: selectedPeticion.id,
                estado: 'ACEPTADA',
            });
            setPeticiones((prev) =>
                prev.map((p) =>
                    p.id === selectedPeticion.id ? { ...p, estado: 'ACEPTADA' } : p
                )
            );
            handleClosePopup();
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const handleReject = async () => {
        try {
            await axios.put('/api/peticiones/update-status', {
                code: selectedPeticion.id,
                estado: 'RECHAZADA',
            });
            setPeticiones((prev) =>
                prev.map((p) =>
                    p.id === selectedPeticion.id ? { ...p, estado: 'RECHAZADA' } : p
                )
            );
            handleClosePopup();
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const formatFecha = (fecha) => {
        const date = new Date(fecha);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    };

    return (
        <div>
            <div className="peticion-table-container">
                <table className="peticion-table">
                    <thead>
                        <tr>
                            <th>Nombre Visitante</th>
                            <th>Fecha Entrada</th>
                            <th>Fecha Salida</th>
                            <th>Emisor</th>
                            <th>Estado</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {peticiones.map((peticion) => (
                            <tr key={peticion.id}>
                                <td>{peticion.nombre_visitante}</td>
                                <td>{formatFecha(peticion.fecha_entrada)}</td>
                                <td>{formatFecha(peticion.fecha_salida)}</td>
                                <td>{peticion.user.nombre}</td>
                                <td>{peticion.estado}</td>
                                <td>
                                    <button className='action-button' onClick={() => handleActionClick(peticion)}>Acción</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {popupVisible && (
                    <div className="popup-action">
                        <h3>Acción para la petición</h3>
                        <p>¿Deseas aceptar o rechazar esta petición?</p>
                        <div className="action-buttons">
                            <button className='accept-button' onClick={handleAccept}>Aceptar</button>
                            <button className='log-out-button' onClick={handleReject}>Rechazar</button>
                            <button className='cancel-button' onClick={handleClosePopup}>Cerrar</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SolicitudesAll;