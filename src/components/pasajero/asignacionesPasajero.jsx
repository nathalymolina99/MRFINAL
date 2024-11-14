import React, {  useState } from 'react';

import '../../App.css';

const VerAsignaciones = () => {
  
  const [asignacion] = useState({
    idRuta: 'R105',
    idAsignacion: 'A105',
    conductor: {
      nombre: 'Jorge',
      apellido: 'Guerrero',
      numero: '986432256'
    },
    vehiculo: {
      marca: 'Toyota',
      modelo: 'Corolla',
      anio: '2020',
      color: 'Blanco',
      patente: 'ABCD30'
    }
  });



  return (
    <div className='profile-container'>
      <h2 className='profile-title'>Ver Asignaciones</h2>
      <div className='profile-content'>
        <div className='profile-info'>
          <h3 className='profile-title1'>Detalles de la Asignación</h3>
          <p><strong>ID Ruta:</strong> {asignacion.idRuta}</p>
          <p><strong>ID Asignación:</strong> {asignacion.idAsignacion}</p>
          
          <h3 className='profile-title1'>Información del Conductor</h3>
          <p><strong>Nombre:</strong> {asignacion.conductor.nombre} {asignacion.conductor.apellido}</p>
          <p><strong>Teléfono:</strong> {asignacion.conductor.numero}</p>
          
          <h3 className='profile-title1'>Información del Vehículo</h3>
          <p><strong>Marca:</strong> {asignacion.vehiculo.marca}</p>
          <p><strong>Modelo:</strong> {asignacion.vehiculo.modelo}</p>
          <p><strong>Año:</strong> {asignacion.vehiculo.anio}</p>
          <p><strong>Color:</strong> {asignacion.vehiculo.color}</p>
          <p><strong>Patente:</strong> {asignacion.vehiculo.patente}</p>
        </div>
        
      </div>
    </div>
  );
};

export default VerAsignaciones;