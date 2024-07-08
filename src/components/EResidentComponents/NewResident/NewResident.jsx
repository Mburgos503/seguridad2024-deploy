import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../NormalResidentComponents/SolicitudFormVisita/SolicitudFormVisita.css';
import user_icon from '../../../assets/person.png';
import date_icon from '../../../assets/date2.png';
import clock_icon from '../../../assets/clock.png';

const NewResident = () => {
    const [nombreVisitante, setNombreVisitante] = useState('');
    const [fechaEntrada, setFechaEntrada] = useState('');
    const [horaEntrada, setHoraEntrada] = useState('');
    const [fechaSalida, setFechaSalida] = useState('');
    const [horaSalida, setHoraSalida] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const formatISODate = (date, time) => {
        const [year, month, day] = date.split('-');
        const [hours, minutes] = time.split(':');
        const formattedDate = new Date(year, month - 1, day, hours, minutes);
        return formattedDate.toISOString().split('.')[0];
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nombreVisitante || !fechaEntrada || !horaEntrada || !fechaSalida || !horaSalida) {
            setError('Por favor llenar todos los campos necesarios');
            return;
        }

        const correo = localStorage.getItem('correo');
        const fechaEntradaCompleta = formatISODate(fechaEntrada, horaEntrada);
        const fechaSalidaCompleta = formatISODate(fechaSalida, horaSalida);
        console.log(fechaEntradaCompleta)
        console.log(fechaSalidaCompleta)
        
        const peticion = {
            fecha_entrada: fechaEntradaCompleta,
            fecha_salida: fechaSalidaCompleta,
            dui_visitante: null,
            estado: "ACEPTADA",
            nombre_visitante: nombreVisitante,
            tipo_peticion: "VISITA",
            correo: correo
        };

        try {
            const response = await axios.post('https://proyectoncapas.studio:8080/peticiones/add-peticion', peticion, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Solicitud enviada exitosamente:', response.data);
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                window.location.reload(); // Recargar la página para limpiar el formulario
            }, 3000); // El popup de éxito desaparecerá después de 3 segundos
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
            setError('Hubo un error al enviar la solicitud');
        }
    };

    return (
        <div className="container">
            {success && (
                <div className="popup">
                    <p>Solicitud enviada exitosamente</p>
                </div>
            )}
            {error && (
                <div className="error-popup">
                    <p>{error}</p>
                </div>
            )}
            <div className='form-container'>
                <form onSubmit={handleSubmit}>
                    <div className="header">
                        <div className="text">Crear solicitud para visitas</div>
                        <div className="underline"></div>
                    </div>

                    <div className="inputs">
                        <div className="error-message">
                            <p>Por favor llenar todos los campos necesarios</p>
                            {error && <p>{error}</p>}
                        </div>

                        <div className="input">
                            <img src={user_icon} alt="" />
                            <input
                                type="text"
                                name='nombre-visitante'
                                placeholder='Nombre del invitado'
                                value={nombreVisitante}
                                onChange={(e) => setNombreVisitante(e.target.value)}
                                required
                            />
                        </div>

                        <p>Fecha y hora de entrada</p>
                        <div className="input">
                            <img src={date_icon} alt="" />
                            <input
                                type="date"
                                name='fecha-entrada'
                                value={fechaEntrada}
                                onChange={(e) => setFechaEntrada(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input">
                            <img src={clock_icon} alt="" />
                            <input
                                type="time"
                                name='hora-entrada'
                                value={horaEntrada}
                                onChange={(e) => setHoraEntrada(e.target.value)}
                                required
                            />
                        </div>

                        <p>Fecha y hora de salida</p>
                        <div className="input">
                            <img src={date_icon} alt="" />
                            <input
                                type="date"
                                name='fecha-salida'
                                value={fechaSalida}
                                onChange={(e) => setFechaSalida(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input">
                            <img src={clock_icon} alt="" />
                            <input
                                type="time"
                                name='hora-salida'
                                value={horaSalida}
                                onChange={(e) => setHoraSalida(e.target.value)}
                                required
                            />
                        </div>

                        <div className="submit-container">
                            <div className="submit">
                                <button className='log-in-btn' type="submit">Enviar</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewResident;