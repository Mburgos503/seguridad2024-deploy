import React, { useState, useEffect } from 'react';
import { QrReader } from 'react-qr-reader';
import axios from 'axios';
import './VigilanteValidarQR.css';

const API_URL = import.meta.env.VITE_API_URL;


const VigilanteValidarQR = () => {
    const [data, setData] = useState(localStorage.getItem('qrData') || 'No result');
    const [scanning, setScanning] = useState(false);
    const [status, setStatus] = useState('Pendiente');

    const startScanning = () => {
        setScanning(true);
        setData('No result');
        setStatus('Pendiente');
    };

    const stopScanning = () => {
        setScanning(false);
    };

    useEffect(() => {
        if (data !== 'No result' && data !== 'Pendiente') {
            localStorage.setItem('qrData', data);
            verifyUser(data);
        }
    }, [data]);

    const verifyUser = async (email) => {
        try {
            const response = await axios.post(`${API_URL}user/find-user`, { correo: email });
            if (response.data && response.data.correo) {
                setStatus('Aceptada');
                handleAcepptQR();
            } else {
                setStatus('Rechazada');
            }
        } catch (error) {
            console.error('Error verifying user:', error);
            setStatus('Rechazada');
        } finally {
            stopScanning();
        }
    };

    const handleAcepptQR = () => {
        axios.post(`${API_URL}/qr-data`, { qrData: data })
            .then(response => {
                console.log('State activated, response from backend:', response.data);
            })
            .catch(error => {
                console.error('Error sending data to backend:', error);
            });
    };

    const handleError = (err) => {
        console.error('QR Scan Error: ', err);
    };

    return (
        <div className="qr-container">
            <h1 className='title-qr'>Lector de Código QR</h1>
            {scanning ? (
                <div className="qr-reader-wrapper">
                    <div className="qr-reader-container">
                        <QrReader
                            key="scanner"
                            onResult={(result, error) => {
                                if (!!result) {
                                    setData(result?.text);
                                    stopScanning();
                                }

                                if (!!error) {
                                    console.info(error);
                                }
                            }}
                            style={{ width: '100%', height: '100%' }}
                        />
                    </div>
                    <button className='qr-button-generator' onClick={stopScanning}>Cerrar Lector</button>
                </div>
            ) : (
                <button className='qr-button-generator' onClick={startScanning}>Escanear</button>
            )}

            <div className="estado-container">
                <span className='state-qr'><strong>Última información recuperada: </strong> </span>
                <span className="state-qr"> {data}</span>
            </div>
            <div className="estado-container">
                <span className='state-qr'><strong>Estado entrada: </strong> </span>
                <span className='status'> {status}</span>
            </div>
        </div>
    );
};

export default VigilanteValidarQR;