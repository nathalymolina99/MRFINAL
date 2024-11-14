import React, { useContext,useState } from 'react';
import { AuthContext } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import '../../App.css'
import Logo from '../logo';
import Perfil from '../pasajero/perfilPasajero'
import Asignacion from '../pasajero/asignacionesPasajero'
import Incidencias from './incidenciasPasajero';

const ControlPanel = () => {

    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
      setAuth(null);
      navigate('/'); 
    };  
    const [activeTab, setActiveTab] = useState('Asignacion');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
    const navItems = ['Perfil','Asignacion', 'Incidencias'];
  
    const renderContent = () => {
      switch(activeTab) {
         case 'Perfil':
           return <Perfil />;
         case 'Asignacion':
           return <Asignacion />;
        case 'Incidencias':
        return <Incidencias />;
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