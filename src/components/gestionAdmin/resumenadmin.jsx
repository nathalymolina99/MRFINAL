import React, { useState, useEffect } from 'react';
import '../../App.css'

const fetchDrivers = () => {

  return Promise.resolve([
    { rut: '17665368-9', nombre: 'Jorge',apellido:'Guerrero', numero: '986432256',vehiculo: 'ABCD30', estado: 'ACTIVO' },
    { rut: '15800268-4', nombre: 'Antonia',apellido:'Gomez', numero: '955468970', vehiculo: 'AACD15', estado: 'NO ACTIVO' },
    { rut: '13859268-6', nombre: 'Luis',apellido:'Fernandez', numero: '976461863',  vehiculo: 'CABD20',estado: 'NO ACTIVO' },
    { rut: '19859268-2', nombre: 'Mario',apellido:'Fernandez', numero: '916481866',  vehiculo: 'BCFK25',estado: 'ACTIVO' },
    { rut: '17942815-k', nombre: 'Tamara',apellido:'Beltran', numero: '976248614',  vehiculo: 'CHBK10',estado: 'ACTIVO' },
  ]);
};

const fetchPassengers = () => {
  return Promise.resolve([
    { rut: '14665368-9', nombre: 'Tomas', apellido:'Lopez', direccion: 'Av. Grecia', numero: '986452256', estado: 'ACTIVO' },
    { rut: '17800268-2', nombre: 'Katherine',apellido:'Molina', direccion: 'Av. Granaderos', numero: '955468970', estado: 'NO ACTIVO' },
    { rut: '12859268-6', nombre: 'Juana',apellido:'Gonzalez', direccion: 'Av. Granaderos 3250', numero: '944481863', estado: 'ACTIVO' },
    { rut: '19859268-k', nombre: 'Rosa',apellido:'Rodriguez', direccion: 'Frei Bonn 3098', numero: '994581871', estado: 'ACTIVO' },
    { rut: '10451464-3', nombre: 'Roberto',apellido:'Vazquez', direccion: 'Eduardo Abaroa', numero: '974101860', estado: 'NO ACTIVO' },

  ]);
};




const Resumen = ({   routes = [] }) => {
  const [visibleCount, setVisibleCount] = useState(4); 
  const [visibleCountP, setVisibleCountP] = useState(4); 
  const [drivers, setDrivers] = useState([]);
  const [passengers, setPassengers] = useState([]);

  

  const handleShowMore = () => {
    setVisibleCount(visibleCount + 4); 
  };

  const handleShowLess = () => {
    setVisibleCount(4); 
  };

  const handleShowMoreP = () => {
    setVisibleCountP(visibleCountP + 4); 
  };

  const handleShowLessP = () => {
    setVisibleCountP(4); 
  };
  
  useEffect(() => {
    fetchDrivers().then(setDrivers);
  }, []);
  useEffect(() => {
    fetchPassengers().then(setPassengers);
  }, []);


  return (
    <div className='user-container'>
      <div className='user-section'>
        <h2 className='user-title'>CONDUCTORES REGISTRADOS</h2>
        <div className="table-responsive">
          <table className='user-table'>
            <thead>
              <tr>
                <th className='user-th'>RUT</th>
                <th className='user-th'>NOMBRE</th>
                <th className='user-th'>APELLIDO</th>
                <th className='user-th'>NÚMERO</th>
                <th className='user-th'>PATENTE VEHICULO</th>
                <th className='user-th'>ESTADO</th>
              </tr>
            </thead>
            <tbody>
              {drivers.slice(0, visibleCount).map((driver) => (
                <tr key={driver.rut}>
                  <td className='user-td'>{driver.rut}</td>
                  <td className='user-td'>{driver.nombre}</td>
                  <td className='user-td'>{driver.apellido}</td>
                  <td className='user-td'>{driver.numero}</td>
                  <td className='user-td'>{driver.vehiculo}</td>
                  <td className='user-td'>{driver.estado}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <ul className='mobile-list'>
            {drivers.slice(0, visibleCount).map((driver) => (
              <li key={driver.rut} className='mobile-item'>
                <div className='mobile-item-field'>
                  <span className='mobile-item-label'>RUT:</span> {driver.rut}
                </div>
                <div className='mobile-item-field'>
                  <span className='mobile-item-label'>NOMBRE:</span> {driver.nombre}
                </div>
                <div className='mobile-item-field'>
                  <span className='mobile-item-label'>APELLIDO:</span> {driver.apellido}
                </div>
                <div className='mobile-item-field'>
                  <span className='mobile-item-label'>NÚMERO:</span> {driver.numero}
                </div>
                <div className='mobile-item-field'>
                  <span className='mobile-item-label'>PATENTE VEHICULO:</span> {driver.vehiculo}
                </div>
                <div className='mobile-item-field'>
                  <span className='mobile-item-label'>ESTADO:</span> {driver.estado}
                </div>
              </li>
            ))}
          </ul>
        </div>
        {drivers.length > visibleCount && (
          <button onClick={handleShowMore} className='user-button'>Ver más</button>
        )}
        {visibleCount > 4 && (
          <button onClick={handleShowLess} className='user-button'>Ver menos</button>
        )}
      </div>

    
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
      {passengers.slice(0, visibleCountP).map((passenger) => (
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
          {passengers.slice(0, visibleCountP).map((passenger) => (
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
        {passengers.length > visibleCountP && (
          <button onClick={handleShowMoreP} className='user-button'>Ver más</button>
        )}
        {visibleCountP > 4 && (
          <button onClick={handleShowLessP} className='user-button'>Ver menos</button>
        )}
</div>

      
      
    </div>
  );
};

export default Resumen;