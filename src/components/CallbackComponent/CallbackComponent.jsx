import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './CallbackComponent.css';
import axios from 'axios';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [userChecked, setUserChecked] = useState(false); // Estado adicional para evitar llamadas múltiples

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserInfo(decoded);

        // Guardar el token y el correo en localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('correo', decoded.email);

        const handleUserRegistration = async () => {
          if (userChecked) return; // Evitar múltiples ejecuciones
          setUserChecked(true); // Marcar que se ha realizado la verificación inmediatamente

          try {
            // Verificar si el usuario ya existe
            const userDetailsResponse = await axios.post('https://proyectoncapas.studio:8080/user/find-user', {
              correo: decoded.email
            });

            const userDetails = userDetailsResponse.data;
            const userRole = userDetails.role.role;

            console.log('User already exists:', userDetails);

            // Redirigir al usuario basado en su rol después de 2 segundos
            setTimeout(() => {
              switch (userRole) {
                case 'ADMIN':
                  navigate('/admin');
                  break;
                case 'RESIDENTE':
                  navigate('/resident-landing');
                  break;
                case 'USER':
                  navigate('/visitante-landing');
                  break;
                case 'VIGILANTE':
                  navigate('/vigilante-landing');
                  break;
                case 'RESIDENTE ENCARGADO':
                  navigate('/residente-encargado-landing');
                  break;
                default:
                  navigate('/home');
                  break;
              }
            }, 2000); // 2000 milisegundos = 2 segundos

          } catch (error) {
            // Si el usuario no existe, lo creamos
            if (error.response && error.response.status === 404) {
              try {
                const addUserResponse = await axios.post('https://proyectoncapas.studio:8080/user/add-user', {
                  nombre: decoded.name,
                  correo: decoded.email,
                  token: token
                });

                console.log('User added successfully:', addUserResponse.data);

                // Esperar 2 segundos antes de intentar obtener los detalles del usuario nuevamente
                setTimeout(async () => {
                  try {
                    const userDetailsResponse = await axios.post('https://proyectoncapas.studio:8080/user/find-user', {
                      correo: decoded.email
                    });

                    const userDetails = userDetailsResponse.data;
                    const userRole = userDetails.role.role;

                    console.log(userRole);

                    // Redirigir al usuario basado en su rol después de 2 segundos
                    setTimeout(() => {
                      switch (userRole) {
                        case 'ADMIN':
                          navigate('/admin');
                          break;
                        case 'RESIDENTE':
                          navigate('/resident-landing');
                          break;
                        case 'USER':
                          navigate('/visitante-landing');
                          break;
                        case 'VIGILANTE':
                          navigate('/vigilante-landing');
                          break;
                        case 'ENCARGADO':
                          navigate('/residente-encargado-landing');
                          break;
                        default:
                          navigate('/home');
                          break;
                      }
                    }, 2000); // 2000 milisegundos = 2 segundos
                  } catch (userDetailsError) {
                    console.error('Error fetching user details after creation:', userDetailsError);
                  }
                }, 2000); // Esperar 2 segundos antes de buscar los detalles del usuario
              } catch (addUserError) {
                console.error('Error creating user:', addUserError);
              }
            } else {
              console.error('Error fetching user details:', error);
            }
          }
        };

        handleUserRegistration();
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    } else {
      console.error('No token found');
      navigate('/');
    }
  }, [navigate, userChecked]);

  return (
    <div className="auth-callback">
      <div className="spinner"></div>
      <p>Redirigiendo...</p>
      {userInfo && (
        <div className="user-info">
          <p className='text-callback'><strong>Nombre:</strong> {userInfo.name}</p>
          <p className='text-callback'><strong>Email:</strong> {userInfo.email}</p>
        </div>
      )}
    </div>
  );
};

export default AuthCallback;