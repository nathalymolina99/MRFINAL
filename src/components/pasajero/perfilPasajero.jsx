import React, {  useState } from 'react';
import '../../App.css';

const EditarPerfilPasajero = () => {
  const [perfil, setPerfil] = useState({
    rut: '10451464-3',
    nombre: 'Roberto',
    apellido: 'Vazquez',
    numero: '974101860',
    direccion: 'Eduardo Abaroa'
  });

  const [editando, setEditando] = useState(false);
  const [cambiandoContrasena, setCambiandoContrasena] = useState(false);
  const [contrasenaAntigua, setContrasenaAntigua] = useState('');
  const [nuevaContrasena, setNuevaContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPerfil(prevPerfil => ({
      ...prevPerfil,
      [name]: value,
    }));
  };

  const handleGuardarCambios = () => {
   
    console.log('Perfil actualizado:', perfil);
    setEditando(false);
  };

  const handleCambiarContrasena = () => {
    
    const contrasenaActual = 'contrasenaActual'; 

    if (contrasenaAntigua === contrasenaActual) {
      if (nuevaContrasena === confirmarContrasena) {
        console.log('Contraseña actualizada:', nuevaContrasena);
        setCambiandoContrasena(false);
        setContrasenaAntigua('');
        setNuevaContrasena('');
        setConfirmarContrasena('');
      } else {
        alert('Las contraseñas nuevas no coinciden');
      }
    } else {
      alert('La contraseña antigua es incorrecta');
    }
  };

  return (
    <div className='profile-container'>
      <h2 className='profile-title'>Mi Perfil</h2>
      <div className='profile-content'>
        {!editando ? (
          <>
            <div className='profile-info'>
              <p><strong>Nombre:</strong> {perfil.nombre} {perfil.apellido}</p>
              <p><strong>RUT:</strong> {perfil.rut}</p>
              <p><strong>Teléfono:</strong> {perfil.numero}</p>
              <p><strong>Dirección:</strong> {perfil.direccion}</p>
            </div>
            <button className='profile-button edit' onClick={() => setEditando(true)}>
              Editar Perfil
            </button>
            <button className='profile-button edit' onClick={() => setCambiandoContrasena(!cambiandoContrasena)}>
              {cambiandoContrasena ? 'Cancelar Cambio de Contraseña' : 'Cambiar Contraseña'}
            </button>

          </>
        ) : (
          <form className='profile-form'>
            <div className='form-group'>
              <label>Nombre:</label>
              <input
                type="text"
                name="nombre"
                value={perfil.nombre}
                onChange={handleInputChange}
              />
            </div>
            <div className='form-group'>
              <label>Apellido:</label>
              <input
                type="text"
                name="apellido"
                value={perfil.apellido}
                onChange={handleInputChange}
              />
            </div>
            <div className='form-group'>
              <label>Teléfono:</label>
              <input
                type="text"
                name="numero"
                value={perfil.numero}
                onChange={handleInputChange}
              />
            </div>
            <div className='form-group'>
              <label>Dirección:</label>
              <input
                type="text"
                name="direccion"
                value={perfil.direccion}
                onChange={handleInputChange}
              />
            </div>
            <div className='form-actions'>
              <button className='profile-button save' onClick={handleGuardarCambios}>
                Guardar
              </button>
              <button className='profile-button cancel' onClick={() => setEditando(false)}>
                Cancelar
              </button>
            </div>
          </form>
        )}
         {cambiandoContrasena && (
          <div className='change-password-form'>
            < h3>Cambiar Contraseña</h3>
            <div className='form-group'>
              <label>Contraseña Antigua:</label>
              <input
                type="password"
                value={contrasenaAntigua}
                onChange={(e) => setContrasenaAntigua(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label>Nueva Contraseña:</label>
              <input
                type="password"
                value={nuevaContrasena}
                onChange={(e) => setNuevaContrasena(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label>Confirmar Nueva Contraseña:</label>
              <input
                type="password"
                value={confirmarContrasena}
                onChange={(e) => setConfirmarContrasena(e.target.value)}
              />
            </div>
            <button className='profile-button change-password' onClick={handleCambiarContrasena}>Cambiar Contraseña</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditarPerfilPasajero;