import React, { useState } from "react";
import "../../styles/NavBar.css";
import { Link, NavLink, useNavigate } from 'react-router-dom'

export const AdminHeader = () => {
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
      <Link to='/admin' className="title">
        Admin
      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to='/admin/historial-entradas'>Historial entradas</NavLink>
        </li>
        <li>
          <NavLink to='/admin/hogares'>Hogares</NavLink>
        </li>
        <li>
          <NavLink to='/admin/vigilantes'>Usuarios</NavLink>
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
    </nav >
  );
}

export default AdminHeader;