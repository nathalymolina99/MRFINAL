import React, { useState } from 'react';
import '../../App.css';

const GestionIncidenciasConductor = () => {
  const rutas = [
    { id: 'R105', nombre: 'Ruta 1', fecha: '2023-07-01', pasajeros: ['Roberto Vazquez', 'Rosa Rodriguez'] },
    { id: 'R106', nombre: 'Ruta 2', fecha: '2023-07-02', pasajeros: ['Tomas Lopez', 'Katherine Molina'] },
    { id: 'R003', nombre: 'Ruta 3', fecha: '2023-07-03', pasajeros: ['Juana Gonzalez'] },
  ];

  const tiposIncidencia = [
    'Atraso',
    'Accidente',
    'Problema mecánico',
    'Problema con pasajero',
    'Otro'
  ];

  const [incidencias, setIncidencias] = useState([
    { 
      id: 'I001', 
      tipo: 'Atraso',
      detalles: 'Detalles de la incidencia I001', 
      estado: 'Pendiente', 
      fecha: '2023-07-01',
      rutaId: 'R105',
      pasajerosAfectados: ['Roberto Vazquez']
    },
    { 
      id: 'I002', 
      tipo: 'Accidente',
      detalles: 'Detalles de la incidencia I002', 
      estado: 'En Proceso', 
      fecha: '2023-07-02',
      rutaId: 'R106',
      pasajerosAfectados: ['Tomas Lopez']
    },
  ]);

  const [incidenciaSeleccionada, setIncidenciaSeleccionada] = useState(null);
  const [nuevaIncidencia, setNuevaIncidencia] = useState({ 
    rutaId: '', 
    tipo: '',
    detalles: '', 
    fecha: '',
    pasajerosAfectados: [] 
  });

  const handleVerDetalles = (incidencia) => {
    setIncidenciaSeleccionada(incidencia);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevaIncidencia(prev => ({ ...prev, [name]: value }));
  };

  const handlePasajeroChange = (e) => {
    const { value, checked } = e.target;
    setNuevaIncidencia(prev => {
      const pasajerosAfectados = checked 
        ? [...prev.pasajerosAfectados, value] 
        : prev.pasajerosAfectados.filter(p => p !== value);
      return { ...prev, pasajerosAfectados };
    });
  };

  const generarIdIncidencia = () => {
    const existingIds = incidencias.map(inc => parseInt(inc.id.substring(1)));
    const maxId = Math.max(...existingIds, 0);
    const newId = maxId + 1;
    return `I${String(newId).padStart(3, '0')}`;
  };

  const handleCrearIncidencia = (e) => {
    e.preventDefault();
    if (!nuevaIncidencia.rutaId || !nuevaIncidencia.tipo || !nuevaIncidencia.detalles) {
      alert('Por favor complete todos los campos');
      return;
    }
    
    const nuevaIncidenciaCompleta = { 
      ...nuevaIncidencia, 
      id: generarIdIncidencia(),
      estado: 'Pendiente'
    };
    setIncidencias([...incidencias, nuevaIncidenciaCompleta]);
    setNuevaIncidencia({ 
      rutaId: '', 
      tipo: '',
      detalles: '', 
      fecha: '',
      pasajerosAfectados: [] 
    });
  };

  return (
    <div className='user-container'>
      <section className='user-section'>
        <h2 className='user-title'>Incidencias Reportadas</h2>
        <table className='user-table'>
          <thead>
            <tr>
              <th className='user-th'>ID</th>
              <th className='user-th'>Tipo</th>
              <th className='user-th'>Ruta</th>
              <th className='user-th'>Estado</th>
              <th className='user-th'>Fecha</th>
              <th className='user-th'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {incidencias.map((incidencia) => (
              <tr key={incidencia.id}>
                <td className='user-td'>{incidencia.id}</td>
                <td className='user-td'>{incidencia.tipo}</td>
                <td className='user-td'>{incidencia.rutaId}</td>
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
                <span className='mobile-item-label'>Tipo:</span> {incidencia.tipo}
              </div>
              <div className='mobile-item-field'>
                <span className='mobile-item-label'>Ruta:</span> {incidencia.rutaId}
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
              <h3>Detalles de la Incidencia</h3>
              <p><strong>ID:</strong> {incidenciaSeleccionada.id}</p>
              <p><strong>Tipo:</strong> {incidenciaSeleccionada.tipo}</p>
              <p><strong>Ruta:</strong> {incidenciaSeleccionada.rutaId}</p>
              <p><strong>Estado:</strong> {incidenciaSeleccionada.estado}</p>
              <p><strong>Fecha:</strong> {incidenciaSeleccionada.fecha}</p>
              <p><strong>Detalles:</strong> {incidenciaSeleccionada.detalles}</p>
              <p><strong>Pasajeros Afectados:</strong> {incidenciaSeleccionada.pasajerosAfectados.join(', ')}</p>
            </div>
          </div>
        )}
      </section>

      <section className='user-section'>
        <h2 className='user-title'>Reportar Nueva Incidencia</h2>
        <form className='user-form' onSubmit={handleCrearIncidencia}>
          <select 
            className='user-select'
            name="rutaId"
            value={nuevaIncidencia.rutaId}
            onChange={handleInputChange}
            required
          >
            <option value="">Seleccione una ruta</option>
            {rutas.map((ruta) => (
              <option key={ruta.id} value={ruta.id}>
                {ruta.nombre} ({ruta.fecha})
              </option>
            ))}
          </select>

          {nuevaIncidencia.rutaId && (
            <div>
              <h3>Pasajeros Afectados:</h3>
              {rutas.find(r => r.id === nuevaIncidencia.rutaId).pasajeros.map((pasajero) => (
                <div key={pasajero}>
                  <input 
                    type="checkbox" 
                    name="pasajerosAfectados" 
                    value={pasajero} 
                    onChange={handlePasajeroChange}
                  />
                  <span>{pasajero}</span>
                </div>
              ))}
            </div>
          )}

          <select 
            className='user-select'
            name="tipo"
            value={nuevaIncidencia.tipo} onChange={handleInputChange}
            required
          >
            <option value="">Seleccione un tipo de incidencia</option>
            {tiposIncidencia.map((tipo) => (
              <option key={tipo} value={tipo}>{tipo}</option>
            ))}
          </select>

          <textarea 
            className='user-input' 
            name="detalles"
            placeholder="Detalles de la incidencia"
            value={nuevaIncidencia.detalles}
            onChange={handleInputChange}
            required
          ></textarea>

          <input 
            className='user-input' 
            type="date" 
            name="fecha"
            value={nuevaIncidencia.fecha}
            onChange={handleInputChange}
            required
          />

          <button className='user-button' type="submit">Reportar Incidencia</button>
        </form>
      </section>
    </div>
  );
};

export default GestionIncidenciasConductor;