import React, { useState } from 'react';
import '../../App.css';

const GestionIncidenciasPasajero = () => {
  const asignaciones = [
    { 
      id: 'A001', 
      ruta: 'Ruta 1', 
      fecha: '2023-07-01',
      conductor: { id: 'C001', nombre: 'Juan Pérez' }
    },
    { 
      id: 'A002', 
      ruta: 'Ruta 2', 
      fecha: '2023-07-02',
      conductor: { id: 'C002', nombre: 'María López' }
    },
    { 
      id: 'A003', 
      ruta: 'Ruta 3', 
      fecha: '2023-07-03',
      conductor: { id: 'C003', nombre: 'Carlos Rodríguez' }
    },
  ];

  const tiposIncidencia = [
    'Conductor no cumple horario',
    'Conductor conduce de manera imprudente',
    'Vehículo en mal estado',
    'Problema con el servicio',
    'Otro'
  ];

  const [incidencias, setIncidencias] = useState([
    { 
      id: 'I001', 
      tipo: 'Conductor no cumple horario',
      detalles: 'Detalles de la incidencia I001', 
      estado: 'Pendiente', 
      fecha: '2023-07-01',
      asignacionId: 'A001',
      conductor: 'Juan Pérez'
    },
    { 
      id: 'I002', 
      tipo: 'Vehículo en mal estado',
      detalles: 'Detalles de la incidencia I002', 
      estado: 'En Proceso', 
      fecha: '2023-07-02',
      asignacionId: 'A002',
      conductor: 'María López'
    },
  ]);

  const [incidenciaSeleccionada, setIncidenciaSeleccionada] = useState(null);
  const [nuevaIncidencia, setNuevaIncidencia] = useState({ 
    asignacionId: '', 
    tipo: '',
    detalles: '', 
    fecha: '',
    conductor: ''
  });

  const handleVerDetalles = (incidencia) => {
    setIncidenciaSeleccionada(incidencia);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'asignacionId') {
      const asignacion = asignaciones.find(a => a.id === value);
      setNuevaIncidencia(prev => ({ 
        ...prev, 
        [name]: value,
        conductor: asignacion ? asignacion.conductor.nombre : ''
      }));
    } else {
      setNuevaIncidencia(prev => ({ ...prev, [name]: value }));
    }
  };

  const generarIdIncidencia = () => {
    const existingIds = incidencias.map(inc => parseInt(inc.id.substring(1)));
    const maxId = Math.max(...existingIds, 0);
    const newId = maxId + 1;
    return `I${String(newId).padStart(3, '0')}`;
  };

  const handleCrearIncidencia = (e) => {
    e.preventDefault();
    if (!nuevaIncidencia.asignacionId || !nuevaIncidencia.tipo || !nuevaIncidencia.detalles) {
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
      asignacionId: '', 
      tipo: '',
      detalles: '', 
      fecha: '',
      conductor: ''
    });
  };

  return (
    <div className='user-container'>
      <section className='user-section'>
        <h2 className='user-title'>Mis Incidencias</h2>
        <table className='user-table'>
          <thead>
            <tr>
              <th className='user-th'>ID</th>
              <th className='user-th'>Tipo</th>
              <th className='user-th'>Conductor</th>
              <th className='user-th'>Estado</th>
              <th className='user-th '>Fecha</th>
              <th className='user-th'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {incidencias.map((incidencia) => (
              <tr key={incidencia.id}>
                <td className='user-td'>{incidencia.id}</td>
                <td className='user-td'>{incidencia.tipo}</td>
                <td className='user-td'>{incidencia.conductor}</td>
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
                <span className='mobile-item-label'>Conductor:</span> {incidencia.conductor}
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
              <p><strong>Conductor:</strong> {incidenciaSeleccionada.conductor}</p>
              <p><strong>Estado:</strong> {incidenciaSeleccionada.estado}</p>
              <p><strong>Fecha:</strong> {incidenciaSeleccionada.fecha}</p>
              <p><strong>Detalles:</strong> {incidenciaSeleccionada.detalles}</p>
            </div>
          </div>
        )}
      </section>

       <section className='user-section'>
        <h2 className='user-title'>Reportar Nueva Incidencia</h2>
        <form className='user-form' onSubmit={handleCrearIncidencia}>
          <select 
            className='user-select'
            name="asignacionId"
            value={nuevaIncidencia.asignacionId}
            onChange={handleInputChange}
            required
          >
            <option value="">Seleccione una asignación</option>
            {asignaciones.map((asignacion) => (
              <option key={asignacion.id} value={asignacion.id}>
                Asignación {asignacion.id} - Conductor {asignacion.conductor.nombre} - Fecha {asignacion.fecha}
              </option>
            ))}
          </select>

          <select 
            className='user-select'
            name="tipo"
            value={nuevaIncidencia.tipo}
            onChange={handleInputChange}
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

export default GestionIncidenciasPasajero;