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

const availablePatents = [
  'ABCH23',
  'DEFB56',
  'GHKF89',
  'JKLK12',
  'MNHC45',
];
const addDriver = (driver) => {
  return Promise.resolve({ ...driver, estado: 'ACTIVO' });
};

const updateDriver = (rut, updates) => {
  return Promise.resolve({ rut, ...updates });
};

const deleteDriver = (rut) => {
  return Promise.resolve({ success: true });
};

const toggleDriverStatus = (rut, newStatus) => {
  return Promise.resolve({ rut, estado: newStatus });
};

const DriverManagement = () => {
  const [drivers, setDrivers] = useState([]);
  const [newDriver, setNewDriver] = useState({ rut: '', nombre: '', apellido: '', numero: '', vehiculo: '' });
  const [updateDriverData, setUpdateDriverData] = useState({ rut: '', nombre: '', apellido: '', numero: '' });
  const [deleteDriverData, setDeleteDriverData] = useState({ rut: '', driverInfo: null });
  const [activateDriverData, setActivateDriverData] = useState({ rut: '', estado: '' });
  const [visibleCount, setVisibleCount] = useState(4); 

  useEffect(() => {
    fetchDrivers().then(setDrivers);
  }, []);

  const handleShowMore = () => {
    setVisibleCount(visibleCount + 4); 
  };

  const handleShowLess = () => {
    setVisibleCount(4); 
  };

  const handleAddDriver = async (e) => {
    e.preventDefault();
    const addedDriver = await addDriver(newDriver);
    setDrivers([...drivers, addedDriver]);
    setNewDriver({ rut: '', nombre: '',  apellido: '', numero: '', vehiculo:''});

  };

  const handleUpdateDriver = async (e) => {
    e.preventDefault();
    if (!updateDriverData.rut) return; 
    const { rut, ...updates } = updateDriverData;
    const updatedDriver = await updateDriver(rut, updates);
    setDrivers(drivers.map(d => d.rut === rut ? { ...d, ...updatedDriver } : d));
    setUpdateDriverData({ rut: '', nombre: '', apellido: '', numero: '' });
  };

  const handleDeleteSearch = async (e) => {
    e.preventDefault();
    const driverInfo = drivers.find(d => d.rut === deleteDriverData.rut);
    if (driverInfo) {
      setDeleteDriverData({ ...deleteDriverData, driverInfo });
    } else {
      setDeleteDriverData({ rut: '', driverInfo: null }); 
    }
  };

  const handleDeleteDriver = async () => {
    await deleteDriver(deleteDriverData.rut);
    setDrivers(drivers.filter(d => d.rut !== deleteDriverData.rut));
    setDeleteDriverData({ rut: '', driverInfo: null });
  };

  const handleActivateSearch = async (e) => {
    e.preventDefault();
    const driver = drivers.find(d => d.rut === activateDriverData.rut);
    if (driver) {
      setActivateDriverData({ ...activateDriverData, estado: driver.estado });
    } else {
      setActivateDriverData({ rut: '', estado: '' });
    }
  };

  const handleToggleStatus = async () => {
    const newStatus = activateDriverData.estado === 'ACTIVO' ? 'NO ACTIVO' : 'ACTIVO';
    const updatedDriver = await toggleDriverStatus(activateDriverData.rut, newStatus);
    setDrivers(drivers.map(d => d.rut === updatedDriver.rut ? { ...d, ...updatedDriver } : d));
    setActivateDriverData({ rut: '', estado: '' });
  };

  
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
  <h2 className='user-title'>AGREGAR CONDUCTORES</h2>
  <form onSubmit={handleAddDriver} className='user-form'>
    <input
      type="text"
      placeholder="RUT"
      value={newDriver.rut}
      onChange={(e) => setNewDriver({ ...newDriver, rut: e.target.value })}
      className='user-input'
      required
    />
    <input
      type="text"
      placeholder="NOMBRE"
      value={newDriver.nombre}
      onChange={(e) => setNewDriver({ ...newDriver, nombre: e.target.value })}
      className='user-input'
      required
    />
    <input
      type="text"
      placeholder="APELLIDO"
      value={newDriver.apellido}
      onChange={(e) => setNewDriver({ ...newDriver, apellido: e.target.value })}
      className='user-input'
      required
    />
    <input
      type="text"
      placeholder="NÚMERO"
      value={newDriver.numero}
      onChange={(e) => setNewDriver({ ...newDriver, numero: e.target.value })}
      className='user-input'
      required
    />
    <select
      value={newDriver.vehiculo}
      onChange={(e) => setNewDriver({ ...newDriver, vehiculo: e.target.value })}
      className='user-select'
      required
    >
      <option value="">Seleccione una patente</option>
      {availablePatents.map((patente) => (
        <option key={patente} value={patente}>
          {patente}
        </option>
      ))}
    </select>
    <button type="submit" className='user-button'>Agregar conductor</button>
  </form>
</div>

      <div className='user-section'>
  <h2 className='user-title'>ACTUALIZAR CONDUCTOR</h2>
  <form onSubmit={handleUpdateDriver} className='user-form'>
    <select
      value={updateDriverData.rut}
      onChange={(e) => {
        const selectedDriver = drivers.find(d => d.rut === e.target.value);
        if (selectedDriver) {
          setUpdateDriverData({
            rut: selectedDriver.rut,
            nombre: selectedDriver.nombre,
            apellido: selectedDriver.apellido,
            numero: selectedDriver.numero
          });
        } else {
          setUpdateDriverData({ rut: '', nombre: '', apellido: '', numero: '' });
        }
      }}
      className='user-select'
      required
    >
      <option value="">Seleccione un RUT</option>
      {drivers.map((driver) => (
        <option key={driver.rut} value={driver.rut}>
          {driver.rut}
        </option>
      ))}
    </select>
    
    <input
      type="text"
      placeholder="NOMBRE"
      value={updateDriverData.nombre}
      onChange={(e) => setUpdateDriverData({ ...updateDriverData, nombre: e.target.value })}
      className='user-input'
      required
    />
    <input
      type="text"
      placeholder="APELLIDO"
      value={updateDriverData.apellido}
      onChange={(e) => setUpdateDriverData({ ...updateDriverData, apellido: e.target.value })}
      className='user-input'
      required
    />
    <input
      type="text"
      placeholder="NÚMERO"
      value={updateDriverData.numero}
      onChange={(e) => setUpdateDriverData({ ...updateDriverData, numero: e.target.value })}
      className='user-input'
      required
    />
    <button type="submit" className='user-button'>Actualizar conductor</button>
  </form>
</div>

<div className='user-section'>
  <h2 className='user-title'>ELIMINAR CONDUCTOR</h2>
  <form onSubmit={handleDeleteSearch} className='user-form'>
    <select
      value={deleteDriverData.rut}
      onChange={(e) => {
        const selectedDriver = drivers.find(d => d.rut === e.target.value);
        setDeleteDriverData({ 
          rut: e.target.value, 
          driverInfo: selectedDriver 
        });
      }}
      className='user-select'
      required
    >
      <option value="">Seleccione un RUT</option>
      {drivers.map((driver) => (
        <option key={driver.rut} value={driver.rut}>
          {driver.rut}
        </option>
      ))}
    </select>
    
  </form>
  {deleteDriverData.driverInfo && (
    <div style={{ marginTop: '20px' }}>
      <p>RUT: {deleteDriverData.driverInfo.rut}</p>
      <p>Nombre: {deleteDriverData.driverInfo.nombre}</p>
      <p>Apellido: {deleteDriverData.driverInfo.apellido}</p>
      <p>Número: {deleteDriverData.driverInfo.numero}</p>
      <p>Estado: {deleteDriverData.driverInfo.estado}</p>
      <button onClick={handleDeleteDriver} className='user-button'>Eliminar conductor</button>
    </div>
  )}
</div>

<div className='user-section'>
  <h2 className='user-title'>ACTIVAR O DESACTIVAR A CONDUCTOR</h2>
  <form onSubmit={handleActivateSearch} className='user-form'>
    <select
      value={activateDriverData.rut}
      onChange={(e) => {
        const selectedDriver = drivers.find(d => d.rut === e.target.value);
        setActivateDriverData({ 
          rut: e.target.value, 
          estado: selectedDriver ? selectedDriver.estado : '' 
        });
      }}
      className='user-select'
      required
    >
      <option value="">Seleccione un RUT</option>
      {drivers.map((driver) => (
        <option key={driver.rut} value={driver.rut}>
          {driver.rut}
        </option>
      ))}
    </select>
   
  </form>
  {activateDriverData.estado && (
    <div style={{ marginTop: '20px' }}>
      <p>Estado actual: {activateDriverData.estado}</p>
      <button onClick={handleToggleStatus} className='user-button'>
        {activateDriverData.estado === 'ACTIVO' ? 'Desactivar' : 'Activar'} conductor
      </button>
    </div>
  )}
</div>
    </div>
  );
};

export default DriverManagement;