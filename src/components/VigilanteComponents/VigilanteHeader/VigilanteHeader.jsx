import React, { useState } from "react";
import "../../styles/NavBar.css";
import { Link, NavLink, useNavigate } from "react-router-dom";

const VigilanteHeader = () => {
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
    <nav className="user-nav-bar">
      <Link to="/vigilante-landing" className="title">
        Vigilante
      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/validarQR">Validar código QR</NavLink>
        </li>
        <li>
          <NavLink to="/entrada-anonima">Registrar entrada anónima</NavLink>
        </li>

        <li>
          <button className="log-out-button" onClick={handleLogout}>Log out</button>
        </li>
      </ul>
      {isLoggingOut && (
        <div className="logging-out-overlay">
          <div className="logging-out-message">Cerrando sesión...</div>
        </div>
      )}    </nav>
  );
};

export default VigilanteHeader