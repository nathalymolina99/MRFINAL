import React, { useState } from 'react';
import '../../App.css';

const GestionVehiculos = () => {
  const [vehiculos, setVehiculos] = useState([
    { patente: 'ABCD30', marca: 'Toyota', modelo: 'Corolla', año: 2020, conductor: 'Jorge Guerrero' },
    { patente: 'AACD15', marca: 'Honda', modelo: 'Civic', año: 2019, conductor: 'Antonia Gomez' },
    { patente: 'CABD20', marca: 'Ford', modelo: 'Focus', año: 2021, conductor: 'Luis Fernandez' },
    { patente: 'BCFK25', marca: 'Ford', modelo: 'Focus', año: 2020, conductor: 'Mario Fernandez' },
    { patente: 'CHBK10', marca: 'Toyota', modelo: 'Corolla', año: 2022, conductor: 'Tamara Beltran' },
  ]);

  
  const [nuevoVehiculo, setNuevoVehiculo] = useState({ patente: '', marca: '', modelo: '', año: '' });
  const [asignacion, setAsignacion] = useState({ patente: '', conductor: '' });
  const [patenteEliminar, setPatenteEliminar] = useState('');

  const conductores = ['Jorge Guerrero', 'Antonia Gomez', 'Luis Fernandez','Mario Fernandez','Tamara Beltran']; 
  const [visibleCount, setVisibleCount] = useState(4); 

  const handleShowMore = () => {
    setVisibleCount(visibleCount + 4); 
  };

  const handleShowLess = () => {
    setVisibleCount(4); 
  };
  

  const handleIngresarVehiculo = (e) => {
    e.preventDefault();
    setVehiculos([...vehiculos, { ...nuevoVehiculo, conductor: '' }]);
    setNuevoVehiculo({ patente: '', marca: '', modelo: '', año: '' });
  };

  const handleAsignarConductor = (e) => {
    e.preventDefault();
    setVehiculos(vehiculos.map(v => 
      v.patente === asignacion.patente ? { ...v, conductor: asignacion.conductor } : v
    ));
    setAsignacion({ patente: '', conductor: '' });
  };

  const handleEliminarVehiculo = () => {
    setVehiculos(vehiculos.filter(v => v.patente !== patenteEliminar));
    setPatenteEliminar('');
  };

  return (
    <div className='user-container'>
      <section className='user-section'>
        <h2 className='user-title'>Ver Vehículos</h2>
        <table className='user-table'>
          <thead>
            <tr>
              <th className='user-th'>Patente</th>
              <th className='user-th'>Marca</th>
              <th className='user-th'>Modelo</th>
              <th className='user-th'>Año</th>
              <th className='user-th'>Conductor</th>
            </tr>
          </thead>
          <tbody>
            {vehiculos.slice(0, visibleCount).map((vehiculo) => (
              <tr key={vehiculo.patente}>
                <td className='user-td'>{vehiculo.patente}</td>
                <td className='user-td'>{vehiculo.marca}</td>
                <td className='user-td'>{vehiculo.modelo}</td>
                <td className='user-td'>{vehiculo.año}</td>
                <td className='user-td'>{vehiculo.conductor || 'No asignado'}</td>

              </tr>
            ))}
          </tbody>
        </table>

        <ul className='mobile-list'>
          {vehiculos.slice(0, visibleCount).map((vehiculo) => (
            <li key={vehiculo.patente} className='mobile-item'>
              <div className='mobile-item-field'>
                <span className='mobile-item-label'>Patente:</span> {vehiculo.patente}
              </div>
              <div className='mobile-item-field'>
                <span className='mobile-item-label'>Marca:</span> {vehiculo.marca}
              </div>
              <div className='mobile-item-field'>
                <span className='mobile-item-label'>Modelo:</span> {vehiculo.modelo}
              </div>
              <div className='mobile-item-field'>
                <span className='mobile-item-label'>Año:</span> {vehiculo.año}
              </div>
              <div className='mobile-item-field'>
                <span className='mobile-item-label'>Conductor :</span> {vehiculo.conductor || 'No asignado'}
              </div>
            </li>
          ))}
        </ul>
        {vehiculos.length > visibleCount && (
          <button onClick={handleShowMore} className='user-button'>Ver más</button>
        )}
        {visibleCount > 4 && (
          <button onClick={handleShowLess} className='user-button'>Ver menos</button>
        )}
        
      </section>

      <section className='user-section'>
        <h2 className='user-title'>Ingresar Vehículo</h2>
        <form className='user-form' onSubmit={handleIngresarVehiculo}>
          <input 
            className='user-input' 
            type="text" 
            placeholder="PATENTE" 
            value={nuevoVehiculo.patente}
            onChange={(e) => setNuevoVehiculo({...nuevoVehiculo, patente: e.target.value})}
          />
          <input 
            className='user-input' 
            type="text" 
            placeholder="MARCA" 
            value={nuevoVehiculo.marca}
            onChange={(e) => setNuevoVehiculo({...nuevoVehiculo, marca: e.target.value})}
          />
          <input 
            className='user-input' 
            type="text" 
            placeholder="MODELO" 
            value={nuevoVehiculo.modelo}
            onChange={(e) => setNuevoVehiculo({...nuevoVehiculo, modelo: e.target.value})}
          />
          <input 
            className='user-input' 
            type="number" 
            placeholder="AÑO" 
            value={nuevoVehiculo.año}
            onChange={(e) => setNuevoVehiculo({...nuevoVehiculo, año: e.target.value})}
          />
          <button className='user-button' type="submit">Ingresar Vehículo</button>
        </form>
      </section>

      <section className='user-section'>
        <h2 className='user-title'>Asignar Conductor</h2>
        <form className='user-form' onSubmit={handleAsignarConductor}>
          < select 
            className='user-select' 
            value={asignacion.patente}
            onChange={(e) => setAsignacion({...asignacion, patente: e.target.value})}
          >
            <option value="">Seleccione una patente</option>
            {vehiculos.map((vehiculo) => (
              <option key={vehiculo.patente} value={vehiculo.patente}>{vehiculo.patente}</option>
            ))}
          </select>
          <select 
            className='user-select' 
            value={asignacion.conductor}
            onChange={(e) => setAsignacion({...asignacion, conductor: e.target.value})}
          >
            <option value="">Seleccione un conductor</option>
            {conductores.map((conductor) => (
              <option key={conductor} value={conductor}>{conductor}</option>
            ))}
          </select>
          <button className='user-button' type="submit">Asignar Conductor</button>
        </form>
      </section>

      <section className='user-section'>
        <h2 className='user-title'>Eliminar Vehículo</h2>
        <form className='user-form'>
          <select 
            className='user-select' 
            value={patenteEliminar}
            onChange={(e) => setPatenteEliminar(e.target.value)}
          >
            <option value="">Seleccione una patente</option>
            {vehiculos.map((vehiculo) => (
              <option key={vehiculo.patente} value={vehiculo.patente}>{vehiculo.patente}</option>
            ))}
          </select>
          <button className='user-button' type="button" onClick={handleEliminarVehiculo}>Eliminar Vehículo</button>
        </form>
      </section>
    </div>
  );
};

export default GestionVehiculos;