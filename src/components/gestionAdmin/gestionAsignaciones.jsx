import React, { useState, useEffect } from 'react';
import '../../App.css';

const fetchAsignaciones = () => {
  return Promise.resolve([
    { 
      id: 'A17665368-9', 
      conductor: { rut: '17665368-9', nombre: 'Juan', apellido: 'Pérez' },
      pasajeros: [
        { rut: '19234567-8', nombre: 'Ana', apellido: 'García' },
        { rut: '18345678-9', nombre: 'Carlos', apellido: 'López' }
      ]
    },
    { 
      id: 'A17800268-4',
      conductor: { rut: '17800268-4', nombre: 'María', apellido: 'Rodríguez' },
      pasajeros: [
        { rut: '17456789-0', nombre: 'Pedro', apellido: 'Sánchez' },
        { rut: '16567890-1', nombre: 'Laura', apellido: 'Martínez' }
      ]
    },
  ]);
};

const mockDrivers = [
  { rut: '17665368-9', nombre: 'Juan Pérez' },
  { rut: '17800268-4', nombre: 'María Rodríguez' },
  { rut: '17859268-9', nombre: 'José Fernández' }
];

const mockPassengers = [
  { rut: '19234567-8', nombre: 'Ana García' },
  { rut: '18345678-9', nombre: 'Carlos López' },
  { rut: '17456789-0', nombre: 'Pedro Sánchez' },
  { rut: '16567890-1', nombre: 'Laura Martínez' },
];

const GestionAsignaciones = () => {
  const [asignaciones, setAsignaciones] = useState([]);
  const [asignacionSeleccionada, setAsignacionSeleccionada] = useState(null);
  const [nuevaAsignacion, setNuevaAsignacion] = useState({ 
    conductor: '', 
    pasajeros: [] 
  });
  const [asignacionModificar, setAsignacionModificar] = useState({ 
    id: '', 
    conductor: '', 
    pasajeros: [] 
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const asignacionesData = await fetchAsignaciones();
        setAsignaciones(asignacionesData);
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
        setLoading(false);
      }
    };

    cargarDatos();
  }, []);

  const generarIdAsignacion = (conductorRut) => {
    const baseId = `A${conductorRut.replace(/-/g, '')}`;
    const existingIds = asignaciones.filter(a => a.id.startsWith(baseId)).map(a => a.id);
    if (existingIds.length === 0) return baseId;
    
    const letra = String.fromCharCode(65 + existingIds.length); 
    return `${baseId}${letra}`;
  };

  const handleCrearAsignacion = (e) => {
    e.preventDefault();
    const id = generarIdAsignacion(nuevaAsignacion.conductor);
    const nuevaAsignacionCompleta = {
      id,
      conductor: mockDrivers.find(d => d.rut === nuevaAsignacion.conductor),
      pasajeros: nuevaAsignacion.pasajeros.map(rut => mockPassengers.find(p => p.rut === rut))
    };
    setAsignaciones([...asignaciones, nuevaAsignacionCompleta]);
    setNuevaAsignacion({ conductor: '', pasajeros: [] });
  };

  const handleModificarAsignacion = (e) => {
    e.preventDefault();
    const nuevasAsignaciones = asignaciones.map(asignacion => {
      if (asignacion.id === asignacionModificar.id) {
        const nuevoId = generarIdAsignacion(asignacionModificar.conductor);
        return {
          ...asignacionModificar,
          id: nuevoId,
          conductor: mockDrivers.find(d => d.rut === asignacionModificar.conductor),
          pasajeros: asignacionModificar.pasajeros.map(rut => mockPassengers.find(p => p.rut === rut))
        };
      }
      return asignacion;
    });
    setAsignaciones(nuevasAsignaciones);
    setAsignacionModificar({ id: '', conductor: '', pasajeros: [] });
  };

  const handleVerDetalles = (asignacion) => {
    setAsignacionSeleccionada(asignacion);
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className='user-container'>
      <section className='user-section'>
        <h2 className='user-title'>Ver Asignaciones</h2>
        <table className='user-table'>
          <thead>
            <tr>
              <th className='user-th'>ID</th>
              <th className='user-th'>Conductor</th>
              <th className='user-th'>Pasajeros</th>
              <th className='user-th'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {asignaciones.map((asignacion) => (
              <tr key={asignacion.id}>
                <td className='user-td'>{asignacion.id}</td>
                <td className='user-td'>{asignacion.conductor.nombre} {asignacion.conductor.apellido}</td>
                <td className='user-td'>{asignacion.pasajeros.length} pasajeros</td>
                <td className='user-td'>
                  <button 
                    className='user-button' 
                    onClick={() => handleVerDetalles(asignacion)}
                  >
                    Ver Detalles
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <ul className='mobile-list'>
          {asignaciones.map((asignacion) => (
            <li key={asignacion.id} className='mobile-item'>
              <div className='mobile-item-field'>
                <span className='mobile-item-label'>ID:</span> {asignacion.id}
              </div>
              <div className='mobile-item-field'>
                <span className='mobile-item-label'>Conductor:</span> 
                {asignacion.conductor.nombre} {asignacion.conductor.apellido}
              </div>
              <div className='mobile-item-field'>
                <span className='mobile-item-label'>Pasajeros:</span> 
                {asignacion.pasajeros.length}
              </div>
              <button 
                className='user-button' 
                onClick={() => handleVerDetalles(asignacion)}
              >
                Ver Detalles
              </button>
            </li>
          ))}
        </ul>
        {asignacionSeleccionada && (
          <div className='profile-container'>
            <button 
              className='close-button'
              onClick={() => setAsignacionSeleccionada(null)}
            >
              ×
            </button>
            <div className='profile-content'>
              <div className='profile-info'>
                <h5>Conductor</h5>
                <p>Nombre: {asignacionSeleccionada.conductor.nombre} {asignacionSeleccionada.conductor.apellido}</p>
                <p>RUT: {asignacionSeleccionada.conductor.rut}</p>
              </div>
              <div className='profile-info'>
                <h5>Pasajeros</h5>
                <ul>
                  {asignacionSeleccionada.pasajeros.map((pasajero) => (
                    <li key={pasajero.rut}>
                      {pasajero.nombre} {pasajero.apellido} - {pasajero.rut}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </section>

      <section className='user-section'>
        <h2 className='user-title'>Crear Asignación</h2>
        <form className='user-form' onSubmit={handleCrearAsignacion}>
          <select 
            className='user-input'
            value={nuevaAsignacion.conductor}
            onChange={(e) => setNuevaAsignacion({...nuevaAsignacion, conductor: e.target.value})}
            required
          >
            <option value="">Seleccione un conductor</option>
            {mockDrivers.map((driver) => (
              <option key={driver.rut} value={driver.rut}>
                {driver.nombre}
              </option>
            ))}
          </select>
          <div className='pasajeros-container'>
            <p>Elegir Pasajeros:</p>
            {mockPassengers.map((passenger, index) => (
              <div key={passenger.rut} className='pasajero-dropdown'>
                <select 
                  className='user-input'
                  value={nuevaAsignacion.pasajeros.includes(passenger.rut) ? passenger.rut : ''}
                  onChange={(e) => {
                    if (e.target.value) {
                      setNuevaAsignacion({...nuevaAsignacion, pasajeros: [...nuevaAsignacion.pasajeros, e.target.value]});
                    } else {
                      setNuevaAsignacion({...nuevaAsignacion, pasajeros: nuevaAsignacion.pasajeros.filter(rut => rut !== passenger.rut)});
                    }
                  }}
                >
                  <option value="">Seleccione un pasajero</option>
                  <option value={passenger.rut}>{passenger.nombre} {passenger.apellido}</option>
                </select>
              </div>
            ))}
          </div>
          <button className='user-button' type="submit">Crear Asignación</button>
        </form>
      </section>

      <section className='user-section'>
        <h2 className='user-title'>Modificar Asignación</h2>
        <form className='user-form' onSubmit={handleModificarAsignacion}>
          <select 
            className='user-input'
            value={asignacionModificar.id}
            onChange={(e) => {
              const asignacion = asignaciones.find(a => a.id === e.target.value);
              if (asignacion) {
                setAsignacionModificar({
                  id: asignacion.id,
                  conductor: asignacion.conductor.rut,
                  pasajeros: asignacion.pasajeros.map(p => p.rut)
                });
              }
            }}
            required
          >
            <option value="">Seleccione una asignación</option>
            {asignaciones.map((asignacion) => (
              <option key={asignacion.id} value={asignacion.id}>
                {asignacion.id} - {asignacion.conductor.nombre} {asignacion.conductor.apellido}
              </option>
            ))}
          </select>
          <select 
            className='user-input'
            value={asignacionModificar.conductor}
            onChange={(e) => setAsignacionModificar({...asignacionModificar, conductor: e.target.value})}
            required
          >
            <option value="">Seleccione un conductor</option>
            {mockDrivers.map((driver) => (
              <option key={driver.rut} value={driver.rut}>
                {driver.nombre}
              </option>
            ))}
          </select>
          <div className='pasajeros-container'>
            <p>Elegir Pasajeros:</p>
            {mockPassengers.map((passenger, index) => (
              <div key={passenger.rut} className='pasajero-dropdown'>
                <select 
                  className='user-input'
                  value={asignacionModificar.pasajeros.includes(passenger.rut) ? passenger.rut : ''}
                  onChange={(e) => {
                    if (e.target.value) {
                      setAsignacionModificar({...asignacionModificar, pasajeros: [...asignacionModificar.pasajeros, e.target.value]});
                    } else {
                      setAsignacionModificar({...asignacionModificar, pasajeros: asignacionModificar.pasajeros.filter(rut => rut !== passenger.rut)});
                    }
                  }}
                >
                  <option value="">Seleccione un pasajero</option>
                  <option value={passenger.rut}>{passenger.nombre} {passenger.apellido}</option>
                </select>
              </div>
            ))}
          </div>
          <button className='user-button' type="submit">Modificar Asignación</button>
        </form>
      </section>
    </div>
  );
};

export default GestionAsignaciones;