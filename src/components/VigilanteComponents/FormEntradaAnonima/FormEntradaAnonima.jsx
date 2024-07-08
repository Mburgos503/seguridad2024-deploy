import React, { useState } from 'react';
import axios from 'axios';
import './FormEntradaAnonima.css';
import email_icon from '../../../assets/email.png';
import user_icon from '../../../assets/person.png';
import dui_icon from '../../../assets/DUI.png';

const FormEntradaAnonima = () => {
    const [nombre, setNombre] = useState('');
    const [razonEntrada, setRazonEntrada] = useState('');
    const [dui, setDui] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!nombre  || !razonEntrada || !dui) {
            setError('Llenar todos los campos necesarios');
            return;
        }

        const fechaEntrada = new Date().toISOString();
        const fechaSalida = new Date(new Date().getTime() + 10 * 60000).toISOString(); // Sumar 10 minutos para la salida

        const data = {
            nombre_visitante: nombre,
            razon: razonEntrada,
            dui_visitante: dui,
            fecha_entrada: fechaEntrada,
            fecha_salida: fechaSalida,
            tipo_peticion: "ANÓNIMA",
            correo: localStorage.getItem('correo'),
            estado: "ACEPTADA"
        };

        try {
            const response = await axios.post('https://proyectoncapas.studio:8080/peticiones/add-peticion', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Entrada registrada exitosamente:', response.data);
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                window.location.reload(); // Recargar la página para limpiar el formulario
            }, 3000); // El popup de éxito desaparecerá después de 3 segundos
        } catch (error) {
            console.error('Error al registrar la entrada:', error);
            setError('Hubo un error al registrar la entrada');
        }
    };

    return (
        <div className='form-container'>
            {success && (
                <div className="popup">
                    <p>Entrada registrada exitosamente</p>
                </div>
            )}
            {error && (
                <div className="error-popup">
                    <p>{error}</p>
                </div>
            )}
            <form onSubmit={handleRegister}>
                <div className="header">
                    <div className="text">Registrar entrada anónima</div>
                    <div className="underline"></div>
                </div>

                <div className="inputs">
                    <div className="error-message">
                        {error && <p>{error}</p>}
                    </div>

                    <div className="input">
                        <img src={user_icon} alt="" />
                        <input 
                            type="text" 
                            name='name' 
                            placeholder='Nombre' 
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required 
                        />
                    </div>

                    <div className="input">
                        <img src={email_icon} alt="" />
                        <input 
                            type="text" 
                            name='razon-entrada' 
                            placeholder='Razón de entrada' 
                            value={razonEntrada}
                            onChange={(e) => setRazonEntrada(e.target.value)}
                            required 
                        />
                    </div>
                    <div className="input">
                        <img src={dui_icon} alt="" />
                        <input 
                            type="text" 
                            name='dui' 
                            placeholder='DUI' 
                            value={dui}
                            onChange={(e) => setDui(e.target.value)}
                            required 
                        />
                    </div>

                    <div className="submit-container">
                        <div className="submit">
                            <button className='log-in-btn' type="submit">Registrar entrada</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default FormEntradaAnonima;