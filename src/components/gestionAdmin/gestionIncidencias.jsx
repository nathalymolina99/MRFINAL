import React, { useState } from 'react';
import '../../App.css';

const GestionIncidencias = () => {
  const [incidencias, setIncidencias] = useState([
    { 
      id: 'I105', 
      detalles: 'Detalles de la incidencia I105', 
      estado: 'Pendiente', 
      fecha: '2023-07-01',
      creador: {
        rut: '17665368-9',
        nombre: 'Jorge',
        apellido: 'Guerrero',
        tipo: 'Conductor'
      },
      asignacion: {
        id: 'A001',
        conductor: { rut: '17665368-9', nombre: 'Jorge', apellido: 'Guerrero' },
        vehiculo: { patente: 'ABCD30', marca: 'Toyota', modelo: 'Corolla' }
      },
      ruta: {
        id: 'R20230701',
        fecha: '2023-07-01',
        horaInicio: '08:00',
        horaLlegada: '09:30'
      }
    },
    { 
      id: 'I106', 
      detalles: 'Detalles de la incidencia I106', 
      estado: 'En Proceso', 
      fecha: '2023-07-02',
      creador: {
        rut: '14665368-9',
        nombre: 'Tomas',
        apellido: 'Lopez',
        tipo: 'Pasajero'
      },
      asignacion: {
        id: 'A002',
        conductor: { rut: '15800268-4', nombre: 'Antonia', apellido: 'Gomez' },
        vehiculo: { patente: 'AACD15', marca: 'Honda', modelo: 'Civic' }
      },
      ruta: {
        id: 'R20230702',
        fecha: '2023-07-02',
        horaInicio: '10:00',
        horaLlegada: '11:30'
      }
    },
    { 
      id: 'I107', 
      detalles: 'Detalles de la incidencia I107', 
      estado: 'Resuelto', 
      fecha: '2023-07-03',
      creador: {
        rut: '15800268-4',
        nombre: 'Antonia',
        apellido: 'Gomez',
        tipo: 'Conductor'
      },
      asignacion: {
        id: 'A002',
        conductor: { rut: '15800268-4', nombre: 'Antonia', apellido: 'Gomez' },
        vehiculo: { patente: 'AACD15', marca: 'Honda', modelo: 'Civic' }
      },
      ruta: {
        id: 'R20230703',
        fecha: '2023-07-03',
        horaInicio: '09:00',
        horaLlegada: '10:30'
      }
    },
  ]);

  const [incidenciaSeleccionada, setIncidenciaSeleccionada] = useState(null);
  const [incidenciaActualizar, setIncidenciaActualizar] = useState({ id: '', estado: '' });
  const [incidenciaEliminar, setIncidenciaEliminar] = useState('');

  const handleVerDetalles = (incidencia) => {
    setIncidenciaSeleccionada(incidencia);
  };

  const handleActualizarIncidencia = (e) => {
    e.preventDefault();
    setIncidencias(incidencias.map(inc => 
      inc.id === incidenciaActualizar.id ? { ...inc, estado: incidenciaActualizar.estado } : inc
    ));
    setIncidenciaActualizar({ id: '', estado: '' });
    setIncidenciaSeleccionada(null);
  };

  const handleEliminarIncidencia = () => {
    setIncidencias(incidencias.filter(inc => inc.id !== incidenciaEliminar));
    setIncidenciaEliminar('');
    setIncidenciaSeleccionada(null);
  };

  return (
    <div className='user-container'>
      <section className='user-section'>
        <h2 className='user-title'>Ver Incidencias</h2>
        <table className='user-table'>
          <thead>
            <tr>
              <th className='user-th'>ID</th>
              <th className='user-th'>Creador</th>
              <th className='user-th'>Estado</th>
              <th className='user-th'>Fecha</th>
              <th className='user-th'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {incidencias.map((incidencia) => (
              <tr key={incidencia.id}>
                <td className='user-td'>{incidencia.id}</td>
                <td className='user-td'>{`${incidencia.creador.nombre} ${incidencia.creador.apellido}`}</td>
                <td className='user-td'>{incidencia.estado}</td>
                <td className='user-td'>{incidencia.fecha}</td>
                <td className='user-td'>
                  <button className='user-button' onClick={() => handleVerDetalles(incidencia)}>
                    Ver Detalles
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <ul className='mobile-list'>
          {incidencias.map((incidencia) => (
            <li key={incidencia.id} className='mobile-item'>
              <div className='mobile-item-field'>
                <span className='mobile-item-label'>ID:</span> {incidencia.id}
              </div>
              <div className='mobile-item-field'>
                <span className='mobile-item-label'>Creador:</span> 
                {`${incidencia.creador.nombre} ${incidencia.creador.apellido}`}
              </div>
              <div className='mobile-item-field'>
                <span className='mobile-item-label'>Estado:</span> {incidencia.estado}
              </div>
              <div className='mobile-item-field'>
                <span className='mobile-item-label'>Fecha:</span> {incidencia.fecha}
              </div>
              <button 
                className='user-button' 
                onClick={() => handleVerDetalles(incidencia)}
              >
                Ver Detalles
              </button>
            </li>
          ))}
        </ul>

        {incidenciaSeleccionada && (
          <div className='profile-container'>
            <button 
              className='close-button'
              onClick={() => setIncidenciaSeleccionada(null)}
            >
              ×
            </button>
            <div className='profile-content'>
              <div className='profile-info'>
                <h3>Detalles de la Incidencia</h3>
                <p><strong>ID:</strong> {incidenciaSeleccionada.id}</p>
                <p><strong>Ruta:</strong> {incidenciaSeleccionada.ruta.id}</p>
                <p><strong>Asignación:</strong> {incidenciaSeleccionada.asignacion.id}</p>
                <p><strong>RUT:</strong> {incidenciaSeleccionada.creador.rut}</p>
                <p><strong>Nombre:</strong> {`${incidenciaSeleccionada.creador.nombre} ${incidenciaSeleccionada.creador.apellido}`}</p>
                <p><strong>Usuario:</strong> {incidenciaSeleccionada.creador.tipo}</p>
                <p><strong>Detalles:</strong> {incidenciaSeleccionada.detalles}</p>
                <p><strong>Vehículo:</strong> {incidenciaSeleccionada.asignacion.vehiculo.patente}</p>
                <p><strong>Fecha Ruta:</strong> {incidenciaSeleccionada.ruta.fecha}</p>
                <p><strong>Hora Inicio Ruta:</strong> {incidenciaSeleccionada.ruta.horaInicio}</p>
                <p><strong>Hora Llegada Ruta:</strong> {incidenciaSeleccionada.ruta.horaLlegada}</p>
               
                
                
                <p><strong>Vehículo:</strong> {incidenciaSeleccionada.asignacion.vehiculo.patente}</p>
                
                
              </div>
            </div>
          </div>
        )}
      </section>

      <section className='user-section'>
        <h2 className='user-title'>Actualizar Incidencia</h2>
        <form className='user-form' onSubmit={handleActualizarIncidencia}>
          <select 
            className='user-select'
            value={incidenciaActualizar.id}
            onChange={(e) => {
              if (e.target.value === "") {
                setIncidenciaActualizar({ id: '', estado: '' });
                setIncidenciaSeleccionada(null);
              } else {
                const incidenciaEncontrada = incidencias.find(inc => inc.id === e.target.value);
                if (incidenciaEncontrada) {
                  setIncidenciaActualizar({ 
                    id: e.target.value, 
                    estado: incidenciaEncontrada.estado 
                  });
                  setIncidenciaSeleccionada(incidenciaEncontrada);
                }
              }}}
          >
            <option value="">Seleccione una incidencia</option>
            {incidencias.map((incidencia) => (
              <option key={incidencia.id} value={incidencia.id}>{incidencia.id}</option>
            ))}
          </select>
          {incidenciaSeleccionada && (
            <>
              <select 
                className='user-select'
                value={incidenciaActualizar.estado}
                onChange={(e) => setIncidenciaActualizar({...incidenciaActualizar, estado: e.target.value})}
              >
                <option value="">ESTADO</option>
                <option value="Pendiente">Pendiente</option>
                <option value="En Proceso">En Proceso</option>
                <option value="Resuelto">Resuelto</option>
              </select>
              <button className='user-button' type="submit">Actualizar estado</button>
            </>
          )}
        </form>
      </section>

      <section className='user-section'>
        <h2 className='user-title'>Eliminar Incidencia</h2>
        <form className='user-form'>
          <select 
            className='user-select'
            value={incidenciaEliminar}
            onChange={(e) => {
              if (e.target.value === "") {
                setIncidenciaEliminar('');
                setIncidenciaSeleccionada(null);
              } else {
                const incidenciaEncontrada = incidencias.find(inc => inc.id === e.target.value);
                if (incidenciaEncontrada) {
                  setIncidenciaEliminar(e.target.value);
                  setIncidenciaSeleccionada(incidenciaEncontrada);
                }
              }
            }}
          >
            <option value="">Seleccione una incidencia</option>
            {incidencias.map((incidencia) => (
              <option key={incidencia.id} value={incidencia.id}>{incidencia.id}</option>
            ))}
          </select>
          {incidenciaSeleccionada && (
            <>
              <button className='user-button' type="button" onClick={handleEliminarIncidencia}>
                Eliminar Incidencia
              </button>
            </>
          )}
        </form>
      </section>
    </div>
  );
};

export default GestionIncidencias;