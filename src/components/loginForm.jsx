import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const LoginForm = () => {
  const [credentials, setCredentials] = useState({ rut: '', password: '' });
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/inicio', credentials);
      
      if (response.data && response.data.usuario) {
        setAuth(response.data);
        const role = response.data.usuario.role;

        if (role === 'admin') {
          navigate('/admin');
        } else if (role === 'conductor') {
          navigate('/conductor');
        } else if (role === 'pasajero') {
          navigate('/pasajero');
        } else {
          setErrorMessage('Rol desconocido');
        }
      } else {
        setErrorMessage('La respuesta no contiene los datos esperados');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setErrorMessage('Credenciales incorrectas. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="login-box">
      <p>Iniciar Sesión</p>
      <form onSubmit={handleSubmit}>
        <div className="user-box">
          <input 
            required
            type="text" 
            name="rut"
            value={credentials.rut}
            onChange={handleChange}
          />
          <label>Rut</label>
        </div>
        <div className="user-box">
          <input
            required
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
          <label>Contraseña</label>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit" className="submit-btn">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Iniciar Sesión
          </button>
      </form>
    </div>
  );
};

export default LoginForm;