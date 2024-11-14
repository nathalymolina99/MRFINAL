import React, { useState, useEffect } from 'react';
import '../../App.css'


const fetchPassengers = () => {
  return Promise.resolve([
    { rut: '14665368-9', nombre: 'Tomas', apellido:'Lopez', direccion: 'Av. Grecia', numero: '986452256', estado: 'ACTIVO' },
    { rut: '17800268-2', nombre: 'Katherine',apellido:'Molina', direccion: 'Av. Granaderos', numero: '955468970', estado: 'NO ACTIVO' },
    { rut: '12859268-6', nombre: 'Juana',apellido:'Gonzalez', direccion: 'Av. Granaderos 3250', numero: '944481863', estado: 'ACTIVO' },
    { rut: '19859268-k', nombre: 'Rosa',apellido:'Rodriguez', direccion: 'Frei Bonn 3098', numero: '994581871', estado: 'ACTIVO' },
    { rut: '10451464-3', nombre: 'Roberto',apellido:'Vazquez', direccion: 'Eduardo Abaroa', numero: '974101860', estado: 'NO ACTIVO' },

  ]);
};

const addPassenger = (passenger) => {
  return Promise.resolve({ ...passenger, estado: 'ACTIVO' });
};

const updatePassenger = (rut, updates) => {
  return Promise.resolve({ rut, ...updates });
};

const deletePassenger = (rut) => {
  return Promise.resolve({ success: true });
};

const togglePassengerStatus = (rut, newStatus) => {
  return Promise.resolve({ rut, estado: newStatus });
};

const PassengerManagement = () => {
  const [passengers, setPassengers] = useState([]);
  const [newPassenger, setNewPassenger] = useState({ rut: '', nombre: '', apellido: '', direccion: '', numero: '' });
  const [updatePassengerData, setUpdatePassengerData] = useState({ rut: '', nombre: '', apellido: '', direccion: '', numero: '' });
  const [deletePassengerData, setDeletePassengerData] = useState({ rut: '', passengerInfo: null });
  const [activatePassengerData, setActivatePassengerData] = useState({ rut: '', estado: '' });
  const [visibleCount, setVisibleCount] = useState(4); 

  useEffect(() => {
    fetchPassengers().then(setPassengers);
  }, []);

  const handleShowMore = () => {
    setVisibleCount(visibleCount + 4); 
  };

  const handleShowLess = () => {
    setVisibleCount(4); 
  };

  const handleAddPassenger = async (e) => {
    e.preventDefault();
    const addedPassenger = await addPassenger(newPassenger);
    setPassengers([...passengers, addedPassenger]);
    setNewPassenger({ rut: '', nombre: '',apellido: '', direccion: '', numero: '' });
  };

  const handleUpdatePassenger = async (e) => {
    e.preventDefault();
    const { rut, ...updates } = updatePassengerData;
    const updatedPassenger = await updatePassenger(rut, updates);
    setPassengers(passengers.map(p => p.rut === rut ? { ...p, ...updatedPassenger } : p));
    setUpdatePassengerData({ rut: '', nombre: '',apellido: '', direccion: '', numero: '' });
  };

  const handleDeletePassenger = async () => {
    await deletePassenger(deletePassengerData.rut);
    setPassengers(passengers.filter(p => p.rut !== deletePassengerData.rut));
    setDeletePassengerData({ rut: '', passengerInfo: null });
  };

  const handleToggleStatus = async () => {
    const newStatus = activatePassengerData.estado === 'ACTIVO' ? 'NO ACTIVO' : 'ACTIVO';
    const updatedPassenger = await togglePassengerStatus(activatePassengerData.rut, newStatus);
    setPassengers(passengers.map(p => p.rut === updatedPassenger.rut ? { ...p, ...updatedPassenger } : p));
    setActivatePassengerData({ rut: '', estado: '' });
  };

  return (
    <div className='user-container'>
      <div className='user-section'>
  <h2 className='user-title'>PASAJEROS REGISTRADOS</h2>
  <div className="table-responsive">
  <table className='user-table'>
    <thead>
      <tr>
        <th className='user-th'>RUT</th>
        <th className='user-th'>NOMBRE</th>
        <th className='user-th'>APELLIDO</th>
        <th className='user-th'>DIRECCIÓN</th>
        <th className='user-th'>NÚMERO</th>
        <th className='user-th'>ESTADO</th>
      </tr>
    </thead>
    <tbody>
      {passengers.slice(0, visibleCount).map((passenger) => (
        <tr key={passenger.rut}>
          <td className='user-td'>{passenger.rut}</td>
          <td className='user-td'>{passenger.nombre}</td>
          <td className='user-td'>{passenger.apellido}</td>
          <td className='user-td'>{passenger.direccion}</td>
          <td className='user-td'>{passenger.numero}</td>
          <td className='user-td'>{passenger.estado}</td>
        </tr>
      ))}
    </tbody>
  </table>
  <ul className='mobile-list'>
          {passengers.map((passenger) => (
            <li key={passenger.rut} className='mobile-item'>
              <div className='mobile-item-field'>
                <span className='mobile-item-label'>RUT:</span> {passenger.rut}
              </div>
              <div className='mobile-item-field'>
                <span className='mobile-item-label'>NOMBRE:</span> {passenger.nombre}
              </div>
              <div className='mobile-item-field'>
                <span className='mobile-item-label'>APELLIDO:</span> {passenger.apellido}
              </div>
              <div className='mobile-item-field'>
                <span className='mobile-item-label'>DIRECCIÓN:</span> {passenger.direccion}
              </div>
              <div className='mobile-item-field'>
                <span className='mobile-item-label'>NÚMERO:</span> {passenger.numero}
              </div>
              <div className='mobile-item-field'>
                <span className='mobile-item-label'>ESTADO:</span> {passenger.estado}
              </div>
            </li>
          ))}
        </ul>
        </div>
        {passengers.length > visibleCount && (
          <button onClick={handleShowMore} className='user-button'>Ver más</button>
        )}
        {visibleCount > 4 && (
          <button onClick={handleShowLess} className='user-button'>Ver menos</button>
        )}
</div>
      <div className='user-section'>
        <h2 className='user-title'>AGREGAR PASAJERO</h2>
        <form onSubmit={handleAddPassenger}className='user-form'>
          <input
            type="text"
            value={newPassenger.rut}
            onChange={(e) => setNewPassenger({ ...newPassenger, rut: e.target.value })}
            placeholder="RUT"
            className='user-input'
            required
          />
          <input
            type="text"
            value={newPassenger.nombre}
            onChange={(e) => setNewPassenger({ ...newPassenger, nombre: e.target.value })}
            placeholder="Nombre"
            className='user-input'
            required
          />
          <input
            type="text"
            value={newPassenger.apellido}
            onChange={(e) => setNewPassenger({ ...newPassenger, apellido: e.target.value })}
            placeholder="Apellido"
            className='user-input'
            required
          />
          <input
            type="text"
            value={newPassenger.direccion}
            onChange={(e) => setNewPassenger({ ...newPassenger, direccion: e.target.value })}
            placeholder="Dirección"
            className='user-input'
            required
          />
          <input
            type="text"
            value={newPassenger.numero}
            onChange={(e) => setNewPassenger({ ...newPassenger, numero: e.target.value })}
            placeholder="Número"
            className='user-input'
            required
          />
          <button type="submit" className='user-button'>Agregar pasajero</button>
        </form>
      </div>

      <div className='user-section'>
        <h2 className='user-title'>ACTUALIZAR PASAJERO</h2>
        <form onSubmit={handleUpdatePassenger} className='user-form'>
          <select
            value={updatePassengerData.rut}
            onChange={(e) => {
              const selectedPassenger = passengers.find(p => p.rut === e.target.value);
              setUpdatePassengerData({ 
                rut: e.target.value, 
                nombre: selectedPassenger ? selectedPassenger.nombre : '', 
                apellido: selectedPassenger ? selectedPassenger.apellido : '', 
                direccion: selectedPassenger ? selectedPassenger.direccion : '', 
                numero: selectedPassenger ? selectedPassenger.numero : '' 
              });
            }}
            className='user-select'
            required
          >
            <option value="">Seleccione un RUT</option>
            {passengers.map((passenger) => (
              <option key={passenger.rut} value={passenger.rut}>
                {passenger.rut}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={updatePassengerData.nombre}
            onChange={(e) => setUpdatePassengerData({ ...updatePassengerData, nombre: e.target.value })}
            placeholder="Nombre"
            className='user-input'
            required
          />
          <input
            type="text"
            value={updatePassengerData.apellido}
            onChange={(e) => setUpdatePassengerData({ ...updatePassengerData, apellido: e.target.value })}
            placeholder="Apellido"
            className='user-input'
            required
          />
          <input
            type="text"
            value={updatePassengerData.direccion}
            onChange={(e) => setUpdatePassengerData({ ...updatePassengerData, direccion: e.target.value })}
            placeholder="Dirección"
            className='user-input'
            required
          />
          <input
            type="text"
            value={updatePassengerData.numero}
            onChange={(e) => setUpdatePassengerData({ ...updatePassengerData, numero: e.target.value })}
            placeholder="Número"
            className='user-input'
            required
          />
          <button type="submit" className='user-button'>Actualizar pasajero</button>
        </form>
      </div>

      <div className='user-section'>
        <h2 className='user-title'>ELIMINAR PASAJERO</h2>
        <form onSubmit={(e) => e.preventDefault()} className='user-form'>
          <select
            value={deletePassengerData.rut}
            onChange={(e) => {
              const selectedPassenger = passengers.find(p => p.rut === e.target.value);
              setDeletePassengerData({ 
                rut: e.target.value, 
                passengerInfo: selectedPassenger 
              });
            }}
            className='user-select'
            required
          >
            <option value="">Seleccione un RUT</option>
            {passengers.map((passenger) => (
              <option key={passenger.rut} value={passenger.rut}>
                {passenger.rut}
              </option>
            ))}
          </select>
          {deletePassengerData.passengerInfo && (
            <div style={{ marginTop: '20px' }}>
              <p>RUT: {deletePassengerData.passengerInfo.rut}</p>
              <p>Nombre: {deletePassengerData.passengerInfo.nombre}</p>
              <p>Dirección: {deletePassengerData.passengerInfo.direccion}</p>
              <p>Número: {deletePassengerData.passengerInfo.numero}</p>
              <button onClick={handleDeletePassenger} className='user-button'>Eliminar pasajero</button>
            </div>
          )}
        </form>
      </div>

      <div className='user-section'>
        <h2 className='user-title'>ACTIVAR O DESACTIVAR PASAJERO</h2>
        <form onSubmit={(e) => e.preventDefault()} className='user-form'>
          <select
            value={activatePassengerData.rut}
            onChange={(e) => {
              const selectedPassenger = passengers.find(p => p.rut === e.target.value);
              setActivatePassengerData({ 
                rut: e.target.value, 
                estado: selectedPassenger ? selectedPassenger.estado : '' 
              });
            }}
            className='user-select'
            required
          >
            <option value="">Seleccione un RUT</option>
            {passengers.map((passenger) => (
              <option key={passenger.rut} value={passenger.rut}>
                {passenger.rut}
              </option>
            ))}
          </select>
          {activatePassengerData.estado && (
            <div style={{ marginTop: '20px' }}>
              <p>Estado actual: {activatePassengerData.estado}</p>
              <button onClick={handleToggleStatus} className='user-button'>
                {activatePassengerData.estado === 'ACTIVO' ? 'Desactivar' : 'Activar'} pasajero
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default PassengerManagement;