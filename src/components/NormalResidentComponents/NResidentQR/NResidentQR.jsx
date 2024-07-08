import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import axios from 'axios';
import '../../styles/QR.css';

const NResidentQR = () => {
    const [apiKey, setApiKey] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [expiryTime, setExpiryTime] = useState('');
    const email = localStorage.getItem('correo');

    useEffect(() => {
        // Recuperar el valor del QR y la marca de tiempo desde localStorage al montar el componente
        const storedApiKey = localStorage.getItem('apiKey');
        const storedTimestamp = localStorage.getItem('qrTimestamp');
        
        if (storedApiKey && storedTimestamp) {
            const now = new Date().getTime();
            const timestamp = new Date(storedTimestamp).getTime();

            // Verificar si han pasado 10 minutos
            if (now - timestamp < 3 * 60000) {
                setApiKey(storedApiKey);
            } else {
                // Borrar el QR y la marca de tiempo si han pasado 10 minutos
                localStorage.removeItem('apiKey');
                localStorage.removeItem('qrTimestamp');
            }
        }
    }, []);

    const generateQRCode = async () => {
        if (!email) {
            setError('No se encontró el correo en el almacenamiento local');
            return;
        }

        const now = new Date();
        const tiempo = new Date(now.getTime() + 3 * 60000).toISOString(); // Sumar 10 minutos

        const data = {
            tiempo: tiempo,
            correo: email
        };

        try {
            const response = await axios.post('https://proyectoncapas.studio:8080/codigoqr/add-codeqr', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            console.log('QR code data sent successfully:', response.data);
            setApiKey(email);
            const timestamp = new Date().toISOString();
            localStorage.setItem('apiKey', email); // Guardar el valor del QR en localStorage
            localStorage.setItem('qrTimestamp', timestamp); // Guardar la marca de tiempo en localStorage
            setSuccess(true);
            setExpiryTime('3 minutos'); // Establecer el tiempo de expiración para mostrar en el popup
            setTimeout(() => {
                setSuccess(false);
            }, 3000); // El popup de éxito desaparecerá después de 3 segundos
        } catch (error) {
            console.error('Error al enviar los datos del código QR:', error);
            setError('Hubo un error al generar el código QR');
        }
    };

    return (
        <div className="qr-container">
            {success && (
                <div className="popup">
                    <p>Código QR generado exitosamente</p>
                    <p>Duración: {expiryTime}</p>
                </div>
            )}
            {error && (
                <div className="error-popup">
                    <p>{error}</p>
                </div>
            )}
            <h1 className='title-qr'>Generador de Código QR</h1>
            {apiKey ? (
                <div className="qr-code">
                    <QRCode value={apiKey} />
                </div>
            ) : (
                <p className='qrinfo'></p>
            )}

            <div className="estado-container">
                <span className='state-qr'>Estado:  </span>
                <span className="active-qr"> Activo</span>
            </div>

            <button className='qr-button-generator' onClick={generateQRCode}>Generar QR</button>
        </div>
    );
};

export default NResidentQR;