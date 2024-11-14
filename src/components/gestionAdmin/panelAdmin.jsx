import React, { useContext,useState } from 'react';
import { AuthContext } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import '../../App.css'
import Logo from '../logo';
import Rutas from './gestionRutas'
import Conductor from './gestionConductor'
import Pasajero from './gestionPasajero'
import Incidencias from './gestionIncidencias';
import Asignacion from './gestionAsignaciones'
import Resumen from './resumenadmin'
import Vehiculo from './gestionVehiculo'

const ControlPanel = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
 

  const handleLogout = () => {
    setAuth(null);
    navigate('/'); 
  };
    const [activeTab, setActiveTab] = useState('Resumen');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
    const navItems = ['Resumen','Conductor', 'Pasajero', 'Rutas', 'Incidencias', 'Asignación', 'Vehiculo'];
  
    const renderContent = () => {
      switch(activeTab) {
        case 'Resumen':
          return <Resumen />;
        case 'Conductor':
          return <Conductor />;
        case 'Pasajero':
          return <Pasajero />;
        case 'Rutas':
        return <Rutas />;
        case 'Incidencias':
          return <Incidencias />;
        case 'Asignación':
          return <Asignacion />;
        case 'Vehiculo':
          return <Vehiculo />;
        default:
          return <div>Contenido no encontrado</div>;
      }
    };
  
    return (
      <div>
          <Logo/>
     
          <div className="control-panel-container"> <button
                className="menu-toggle"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                &#9776;
              </button>
              <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                {navItems.map((item) => (
                  <div
                    key={item}
                    className={`nav-item ${activeTab === item ? 'active' : ''}`}
                    onClick={() => setActiveTab(item)}
                  >
                    {item}
                  </div>
                ))}
                <button className="close-session" onClick={handleLogout}>Cerrar Sesión</button>

              </div>
              <div className="content">
                <div className="header">
                  <h1>PANEL DE CONTROL</h1>
                </div>
                {renderContent()}
              </div>
          </div>
      </div>
  );
};
  
  export default ControlPanel;