import React, { useState, useEffect } from 'react';
import { QrReader } from 'react-qr-reader';
import axios from 'axios';
import './VigilanteValidarQR.css'

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
        if (data !== 'No result') {
            localStorage.setItem('qrData', data);
            verifyUser(data);
        }
    }, [data]);

    const verifyUser = async (email) => {
        try {
            const response = await axios.post('http://167.172.244.10:8080/user/find-user', { correo: email });
            if (response.data && response.data.correo) {
                setStatus('Aceptada');
            } else {
                setStatus('Rechazada');
            }
        } catch (error) {
            console.error('Error verifying user:', error);
            setStatus('Rechazada');
        }
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