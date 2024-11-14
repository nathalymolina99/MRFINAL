import React, { useState } from 'react';
import '../../App.css';

const VerRuta = () => {
  const [rutas] = useState([
    {
      idRuta: 'R105',
      fecha: '2023-10-10', 
      horarioInicio: '08:00', 
      horarioFin: '09:00',
      pasajeros: [
        { idAsignacion: 'A105', nombrePasajero: 'Roberto', apellido: 'Vazquez', direccion: 'Eduardo Abaroa', telefono: '974101860' },
        { idAsignacion: 'A107', nombrePasajero: 'Rosa', apellido: 'Rodriguez', direccion: 'Frei Bonn 3098', telefono: '994581871' },
      ],
    },
    {
      idRuta: 'R106',
      fecha: '2023-10-11', 
      horarioInicio: '09:30', 
      horarioFin: '10:30', 
      pasajeros: [
        { idAsignacion: 'A104', nombrePasajero: 'Tomas', apellido: 'Lopez', direccion: 'Av. Grecia', telefono: '986452256' },
        { idAsignacion: 'A112', nombrePasajero: 'Katherine', apellido: 'Molina', direccion: 'Av. Granaderos', telefono: '955468970' },
      ],
    },
  ]);

  const [selectedRuta, setSelectedRuta] = useState(null);

  const handleVerDetalles = (ruta) => {
    setSelectedRuta(ruta);
  };

  const abrirMapa = (direccion) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(direccion)}`;
    window.open(url, '_blank');
  };

  return (
    <div className='user-container'>
      <section className='user-section'>
        <h2 className='user-title'>RUTAS</h2>
        <table className='user-table'>
          <thead>
            <tr>
              <th className='user-th'>ID RUTA</th>
              <th className='user-th'>FECHA</th>
              <th className='user-th'>HORARIO INICIO</th>
              <th className='user-th'>HORARIO FIN</th>
              <th className='user-th'>ACCIÓN</th>
            </tr>
          </thead>
          <tbody>
            {rutas.map((ruta, index) => (
              <tr key={index}>
                <td className='user-td'>{ruta.idRuta}</td>
                <td className='user-td'>{ruta.fecha}</td>
                <td className='user-td'>{ruta.horarioInicio}</td>
                <td className='user-td'>{ruta.horarioFin}</td>
                <td className='user-td'>
                  <button className='user-button' onClick={() => handleVerDetalles(ruta)}>Ver Detalles</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ul className='mobile-list'>
          {rutas.map((ruta, index) => (
            <li key={index} className='mobile-item'>
              <div className='mobile-item-field'>
                <span className='mobile-item-label'>ID RUTA:</span> {ruta.idRuta}
              </div>
              <div className='mobile-item-field'>
                <span className='mobile-item-label'>FECHA:</span> {ruta.fecha}
              </div>
              <div className='mobile-item-field'>
                <span className='mobile-item-label'>HORARIO INICIO:</span> {ruta.horarioInicio}
              </div>
              <div className='mobile-item-field'>
                <span className='mobile-item-label'>HORARIO FIN:</span> {ruta.horarioFin}
              </div>
              <button className='user-button' onClick={() => handleVerDetalles(ruta)}>Ver Detalles</button>
            </li>
          ))}
        </ul>
      </section>

      {selectedRuta && (
        <section className='ruta-details-section'>
          <h3 className='ruta-details-title'>Detalles de la Ruta: {selectedRuta.idRuta}</h3>
          <p><strong>Fecha:</strong> {selectedRuta.fecha}</p >
          <p><strong>Horario de Inicio:</strong> {selectedRuta.horarioInicio}</p>
          <p><strong>Horario de Término Estimado:</strong> {selectedRuta.horarioFin}</p>
          <div className='ruta-passenger-list'>
            {selectedRuta.pasajeros.map((pasajero, index) => (
              <div key={index} className='ruta-passenger-card'>
                <h4 className='ruta-passenger-name'>{pasajero.nombrePasajero} {pasajero.apellido}</h4>
                <p><strong>Dirección:</strong> {pasajero.direccion}</p>
                <p><strong>Teléfono:</strong> {pasajero.telefono}</p>
                <button 
                  className='ruta-map-button' 
                  onClick={() => abrirMapa(pasajero.direccion)}
                >
                  Ver en Google Maps
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default VerRuta;