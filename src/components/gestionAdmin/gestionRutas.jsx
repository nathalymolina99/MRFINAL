import React, { useState, useEffect } from 'react';
import '../../App.css';

const fetchAsignaciones = () => {
  return Promise.resolve([
    { 
      id: 'A001', 
      conductor: { rut: '17665368-9', nombre: 'Jorge', apellido: 'Guerrero' },
      vehiculo: { patente: 'ABCD30', marca: 'Toyota', modelo: 'Corolla' },
      pasajeros: [
        { rut: '14665368-9', nombre: 'Tomas', apellido: 'Lopez' },
        { rut: '17800268-2', nombre: 'Katherine', apellido: 'Molina' }
      ]
    },
    { 
      id: 'A002',
      conductor: { rut: '15800268-4', nombre: 'Antonia', apellido: 'Gomez' },
      vehiculo: { patente: 'AACD15', marca: 'Honda', modelo: 'Civic' },
      pasajeros: [
        { rut: '12859268-6', nombre: 'Juana', apellido: 'Gonzalez' },
        { rut: '19859268-k', nombre: 'Rosa', apellido: 'Rodriguez' }
      ]
    },
  ]);
};


const rutasIniciales = [
  {
    id: 'R20230801',
    asignacion: { 
      id: 'A001', 
      conductor: { rut: '17665368-9', nombre: 'Jorge', apellido: 'Guerrero' },
      vehiculo: { patente: 'ABCD30', marca: 'Toyota', modelo: 'Corolla' },
      pasajeros: [
        { rut: '14665368-9', nombre: 'Tomas', apellido: 'Lopez' },
        { rut: '17800268-2', nombre: 'Katherine', apellido: 'Molina' }
      ]
    },
    fecha: '2023-08-01',
    horaInicio: '08:00',
    horaLlegada: '09:30'
  },
  {
    id: 'R20230801A',
    asignacion: { 
      id: 'A002',
      conductor: { rut: '15800268-4', nombre: 'Antonia', apellido: 'Gomez' },
      vehiculo: { patente: 'AACD15', marca: 'Honda', modelo: 'Civic' },
      pasajeros: [
        { rut: '12859268-6', nombre: 'Juana', apellido: 'Gonzalez' },
        { rut: '19859268-k', nombre: 'Rosa', apellido: 'Rodriguez' }
      ]
    },
    fecha: '2023-08-01',
    horaInicio: '10:00',
    horaLlegada: '11:30'
  },
  {
    id: 'R20230802',
    asignacion: { 
      id: 'A003', 
      conductor: { rut: '17665368-9', nombre: 'Luis', apellido: 'Fernandez' },
      vehiculo: {  patente: 'CABD20', marca: 'Ford', modelo: 'Focus' },
      pasajeros: [
        { rut: '12959248-7', nombre: 'Jose',apellido:'Gonzalez' },
        { rut: '10451464-3', nombre: 'Roberto',apellido:'Vazquez'}
      ]
    },
    fecha: '2023-08-02',
    horaInicio: '08:00',
    horaLlegada: '09:30'
  }
];

const GestionRutas = () => {
  const [rutas, setRutas] = useState(rutasIniciales);
  const [asignaciones, setAsignaciones] = useState([]);
  const [rutaSeleccionada, setRutaSeleccionada] = useState(null);
  const [nuevaRuta, setNuevaRuta] = useState({ 
    asignacionId: '', 
    fecha: '', 
    horaInicio: '', 
    horaLlegada: '' 
  });
  const [rutaModificar, setRutaModificar] = useState({ 
    id: '', 
    fecha: '', 
    horaInicio: '', 
    horaLlegada: '' 
  });
  const [rutaEliminar, setRutaEliminar] = useState('');
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

  const generarIdRuta = (fecha) => {
    const rutasEnFecha = rutas.filter(ruta => ruta.fecha === fecha);
    if (rutasEnFecha.length === 0) {
      return `R${fecha.replace(/-/g, '')}`;
    } else {
      const letra = String.fromCharCode(65 + rutasEnFecha.length);
      return `R${fecha.replace(/-/g, '')}${letra}`;
    }
  };

  const handleVerDetalles = (ruta) => {
    setRutaSeleccionada(ruta);
  };

  const handleCrearRuta = (e) => {
    e.preventDefault();
    const asignacion = asignaciones.find(a => a.id === nuevaRuta.asignacionId);
    const id = generarIdRuta(nuevaRuta.fecha);
    const nuevaRutaCompleta = {
      ...nuevaRuta,
      id,
      asignacion,
    };

    setRutas([...rutas, nuevaRutaCompleta]);
    setNuevaRuta({ 
      asignacionId: '', 
      fecha: '', 
      horaInicio: '', 
      horaLlegada: '' 
    });
  };

  const handleModificarRuta = (e) => {
    e.preventDefault();
    const nuevasFechas = rutaModificar.fecha !== '';
    const nuevoId = nuevasFechas ? generarIdRuta(rutaModificar.fecha) : rutaModificar.id;

    setRutas(rutas.map(ruta => 
      ruta.id === rutaModificar.id ? {
        ...ruta,
        ...rutaModificar,
        id: nuevoId
      } : ruta
    ));
    setRutaModificar({ id: '', fecha: '', horaInicio: '', horaLlegada: '' });
  };

  const handleEliminarRuta = () => {
    if (rutaEliminar) {
      setRutas(rutas.filter(ruta => ruta.id !== rutaEliminar));
      setRutaEliminar('');
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className='user-container'>
      <section className='user-section'>
        <h2 className='user-title'>Ver Rutas</h2>
        <table className='user-table'>
          <thead>
            <tr>
              <th className='user-th'>ID</th>
              <th className='user-th'>Asignación</th>
              <th className='user-th'>Conductor</th>
              <th className='user-th'>Fecha</th>
              <th className='user-th'>Hora Inicio</th>
              <th className='user-th'>Hora Llegada</th>
              <th className='user-th'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {rutas.map((ruta) => (
              <tr key={ruta.id}>
                <td className='user-td'>{ruta.id}</td>
                <td className='user-td'>{ruta.asignacion.id}</td>
                <td className='user-td'>{`${ruta.asignacion.conductor.nombre} ${ruta.asignacion.conductor.apellido}`}</td>
                <td className='user-td'>{ruta.fecha}</td>
                <td className='user-td'>{ruta.horaInicio}</td>
                <td className='user-td'>{ruta.horaLlegada}</td>
                <td className='user-td'>
                  <button 
                    className='user-button' 
                    onClick={() => handleVerDetalles(ruta)}
                  >
                    Ver Detalles
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <ul className='mobile-list'>
          {rutas.map((ruta) => (
            <li key={ruta.id} className='mobile-item'>
              <div className='mobile-item-field'>
                <span className='mobile-item-label'>ID:</span> {ruta.id}
              </div>
              <div className='mobile-item-field'>
                <span className='mobile-item-label'>Asignación:</span> {ruta.asignacion.id}
              </div>
              <div className='mobile-item-field'>
                <span className='mobile-item-label'>Conductor:</span> 
                {`${ruta.asignacion.conductor.nombre} ${ruta.asignacion.conductor.apellido}`}
              </div>
              <div className='mobile-item-field'>
                <span className='mobile-item-label'>Vehículo:</span> 
                {ruta.asignacion.vehiculo.patente}
              </div>
              <div className='mobile-item-field'>
                <span className='mobile-item-label'>Fecha:</span> {ruta.fecha}
              </div>
              <div className='mobile-item-field'>
                <span className='mobile-item-label'>Hora Inicio:</span> {ruta.horaInicio}
              </div>
              <div className='mobile-item-field'>
                <span className='mobile-item-label'>Hora Llegada:</span> {ruta.horaLlegada}
              </div>
              <button 
                className='user-button' 
                onClick={() => handleVerDetalles(ruta)}
              >
                Ver Detalles
              </button>
            </li>
          ))}
        </ul>
        {rutaSeleccionada && (
          
          
          <div className='profile-container'>
            <button 
      className='close-button'
      onClick={() => setRutaSeleccionada(null)}
    >
      ×
    </button>
            <div className='profile-content'>
            <div className='profile-info'>
            <h5>Conductor</h5>
            <p>Nombre: {rutaSeleccionada.asignacion.conductor.nombre} {rutaSeleccionada.asignacion.conductor.apellido}</p>
            <p>RUT: {rutaSeleccionada.asignacion.conductor.rut}</p>
          </div>
          <div className='profile-info'>
            <h5>Vehículo</h5>
            <p>Patente: {rutaSeleccionada.asignacion.vehiculo.patente}</p>
            <p>Marca: {rutaSeleccionada.asignacion.vehiculo.marca}</p>
            <p>Modelo: {rutaSeleccionada.asignacion.vehiculo.modelo}</p>
          </div>
          <div className='profile-info'>
            <h5>Pasajeros</h5>
            <ul>
              {rutaSeleccionada.asignacion.pasajeros.map((pasajero) => (
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
        <h2 className='user-title'>Crear Ruta</h2>
        <form className='user-form' onSubmit={handleCrearRuta}>
          <select 
            className='user-input'
            value={nuevaRuta.asignacionId}
            onChange={(e) => setNuevaRuta({...nuevaRuta, asignacionId: e.target.value})}
            required
          >
            <option value="">Seleccione una asignación</option>
            {asignaciones.map((asignacion) => (
              <option key={asignacion.id} value={asignacion.id}>
                {asignacion.id} - {asignacion.conductor.nombre} {asignacion.conductor.apellido}
              </option>
            ))}
          </select>
          <input 
            className='user-input' 
            type="date" 
            value={nuevaRuta.fecha}
            onChange={(e) => setNuevaRuta({...nuevaRuta, fecha: e.target.value})}
            required
          />
          <input 
            className='user-input' 
            type="time" 
            value={nuevaRuta.horaInicio}
            onChange={(e) => setNuevaRuta({...nuevaRuta, horaInicio: e.target.value})}
            required
          />
          <input 
            className='user-input' 
            type="time" 
            value={nuevaRuta.horaLlegada}
            onChange={(e) => setNuevaRuta({...nuevaRuta, horaLlegada: e.target.value})}
            required
          />
          <button className='user-button' type="submit">Agregar Ruta</button>
        </form>
      </section>

      <section className='user-section'>
        <h2 className='user-title'>Modificar Ruta</h2>
        <form className='user-form' onSubmit={handleModificarRuta}>
          <select 
            className='user-input'
            value={rutaModificar.id}
            onChange={(e) => {
              const ruta = rutas.find(r => r.id === e.target.value);
              if (ruta) {
                setRutaModificar({
                  id: ruta.id,
                  fecha: ruta.fecha,
                  horaInicio: ruta.horaInicio,
                  horaLlegada: ruta.horaLlegada
                });
              }
            }}
            required
          >
            <option value="">Seleccione una ruta</option>
            {rutas.map((ruta) => (
              <option key={ruta.id} value={ruta.id}>
                {ruta.id} - {`${ruta.asignacion.conductor.nombre} ${ruta.asignacion.conductor.apellido}`}
                
              </option>
            ))}
          </select>
          <input 
            className='user-input' 
            type="date" 
            value={rutaModificar.fecha}
            onChange={(e) => setRutaModificar({...rutaModificar, fecha: e.target.value})}
            required
          />
          <input 
            className='user-input' 
            type="time" 
            value={rutaModificar.horaInicio}
            onChange={(e) => setRutaModificar({...rutaModificar, horaInicio: e.target.value})}
            required
          />
          <input 
            className='user-input' 
            type="time" 
            value={rutaModificar.horaLlegada}
            onChange={(e) => setRutaModificar({...rutaModificar, horaLlegada: e.target.value})}
            required
          />
          <button className='user-button' type="submit">Modificar Ruta</button>
        </form>
      </section>

      <section className='user-section'>
        <h2 className='user-title'>Eliminar Ruta</h2>
        <form className='user-form' onSubmit={(e) => e.preventDefault()}>
          <select 
            className='user-input'
            value={rutaEliminar}
            onChange={(e) => setRutaEliminar(e.target.value)}
            required
          >
            <option value="">Seleccione una ruta</option>
            {rutas.map((ruta) => (
              <option key={ruta.id} value={ruta.id}>
                {ruta.id} - {ruta.fecha}
              </option>
            ))}
          </select>
          <button 
            className='user-button' 
            onClick={handleEliminarRuta}
            disabled={!rutaEliminar}
          >
            Eliminar Ruta
          </button>
        </form>
      </section>
    </div>
  );
};

export default GestionRutas;