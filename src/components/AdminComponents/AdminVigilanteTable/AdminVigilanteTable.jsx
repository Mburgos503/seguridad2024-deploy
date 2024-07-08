import React, { useState } from 'react';
import axios from 'axios';
import './AdminVigilanteTable.css'; // Asegúrate de crear este archivo CSS para estilos

const AdminVigilanteTable = () => {
    const [role, setRole] = useState('');
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [action, setAction] = useState('');
    const [message, setMessage] = useState('');
    const [newRole, setNewRole] = useState('');
    const [hogar, setHogar] = useState('');

    const handleSearch = async () => {
        try {
            let response;
            if (role === 'ALL') {
                response = await axios.get('http://localhost:8080/user/all-users');
            } else {
                response = await axios.post('http://localhost:8080/user/find-by-role', { role });
            }
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    const handleAction = async (user, actionType) => {
        setSelectedUser(user);
        setAction(actionType);
        setMessage('');
    };

    const executeAction = async () => {
        if (action === 'changeRole') {
            try {
                await axios.post('http://localhost:8080/user/update-role', {
                    correo: selectedUser.correo,
                    newRole: newRole,
                });
                setMessage('Rol actualizado exitosamente');
            } catch (error) {
                setMessage('Error al actualizar el rol');
                console.error(error);
            }
        } else if (action === 'deleteUser') {
            try {
                await axios.delete('http://localhost:8080/user/delete-user', {
                    data: { correo: selectedUser.correo },
                });
                setMessage('Usuario eliminado exitosamente');
            } catch (error) {
                setMessage('Error al eliminar el usuario');
                console.error(error);
            }
        } else if (action === 'addHogar') {
            try {
                await axios.post('http://localhost:8080/user/add-hogarXuser', {
                    direccion: [hogar],
                    correo: selectedUser.correo,
                });
                setMessage('Hogar agregado exitosamente');
            } catch (error) {
                setMessage('Error al agregar el hogar');
                console.error(error);
            }
        }

        setTimeout(() => {
            window.location.reload();
        }, 2000);
    };

    return (
        <div className="admin-user-management">
            <div className="search-container">
                <h1>Buscar usuario por rol</h1>
                <br />
                <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="">Seleccione un rol</option>
                    <option value="ALL">Todos los usuarios</option>
                    <option value="ADMIN">ADMIN</option>
                    <option value="RESIDENTE">RESIDENTE</option>
                    <option value="RESIDENTE ENCARGADO">RESIDENTE ENCARGADO</option>
                    <option value="VIGILANTE">VIGILANTE</option>
                    <option value="USER">USER</option>
                </select>
                <br />
                <button className='accept-button'onClick={handleSearch}>Buscar</button>
            </div>

            {users.length > 0 && (
                <div className="peticion-table-container">
                    <table className="peticion-table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th>Rol</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.nombre}</td>
                                    <td>{user.correo}</td>
                                    <td>{user.role.role}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <button
                                                className="action-button"
                                                onClick={() => handleAction(user, 'changeRole')}
                                            >
                                                Cambiar Rol
                                            </button>
                                            <button
                                                className="log-out-button"
                                                onClick={() => handleAction(user, 'deleteUser')}
                                            >
                                                Eliminar
                                            </button>
                                            {(user.role.role === 'RESIDENTE' || user.role.role === 'RESIDENTE ENCARGADO') && (
                                                <button
                                                    className="action-button"
                                                    onClick={() => handleAction(user, 'addHogar')}
                                                >
                                                    Agregar Hogar
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {selectedUser && (
                <div className="popup-action">
                    <h3>{action === 'changeRole' ? 'Cambiar Rol' : action === 'deleteUser' ? 'Eliminar Usuario' : 'Agregar Hogar'}</h3>
                    {action === 'changeRole' && (
                        <>
                            <label htmlFor="newRole">Nuevo Rol:</label>
                            <select id="newRole" value={newRole} onChange={(e) => setNewRole(e.target.value)}>
                                <option value="">Seleccione un rol</option>
                                <option value="ADMIN">ADMIN</option>
                                <option value="RESIDENTE">RESIDENTE</option>
                                <option value="RESIDENTE ENCARGADO">RESIDENTE ENCARGADO</option>
                                <option value="VIGILANTE">VIGILANTE</option>
                                <option value="USER">USER</option>
                            </select>
                            <button className="accept-button" onClick={executeAction}>Aceptar</button>
                        </>
                    )}

                    {action === 'deleteUser' && (
                        <>
                            <p>¿Está seguro que desea eliminar a {selectedUser.nombre}?</p>
                            <button className="log-out-button" onClick={executeAction}>Sí</button>
                        </>
                    )}

                    {action === 'addHogar' && (
                        <>
                            <label htmlFor="hogar">Dirección del Hogar:</label>
                            <input
                                type="text"
                                id="hogar"
                                value={hogar}
                                onChange={(e) => setHogar(e.target.value)}
                            />
                            <button className="accept-button" onClick={executeAction}>Aceptar</button>
                        </>
                    )}
                    <button className="cancel-button" onClick={() => setSelectedUser(null)}>Cancelar</button>
                    {message && <p>{message}</p>}
                </div>
            )}
        </div>
    );
};

export default AdminVigilanteTable;