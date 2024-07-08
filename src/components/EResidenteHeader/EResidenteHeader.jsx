import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../styles/NavBar.css";

const EResidenteHeader = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        setIsLoggingOut(true);
        localStorage.removeItem('token');  // Eliminar el token del localStorage
        localStorage.removeItem('correo');  // Eliminar el correo del localStorage
        setTimeout(() => {
            navigate('/');  // Redirigir a la página de inicio después de un retraso
        }, 2000);  // 2000 milisegundos = 2 segundos
    };

    return (
        <div>
            <nav className='container user-nav-bar'>
                <Link to="/residente-encargado-landing" className="title">
                    Home
                </Link>
                <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <ul className={menuOpen ? "open" : ""}>
                    <li>
                        <NavLink to="/residente-encargado-permisos">Permisos solicitados</NavLink>
                    </li>
                    <li>
                        <NavLink to="/residente-encargado-qr">Código Qr</NavLink>
                    </li>

                    <li>
                        <NavLink to="/residente-encargado-nuevo-residente">Crear Solicitud</NavLink>
                    </li>
                    <li>
                        <NavLink to="/residente-encargado-mi-hogar">Mi Hogar</NavLink>
                    </li>

                    <li>
                        <button className="log-out-button" onClick={handleLogout}>Log out</button>
                    </li>
                </ul>
                {isLoggingOut && (
                    <div className="logging-out-overlay">
                        <div className="logging-out-message">Cerrando sesión...</div>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default EResidenteHeader;