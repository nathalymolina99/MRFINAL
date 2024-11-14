import React, { useContext,useState } from 'react';
import { AuthContext } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import '../../App.css'
import Logo from '../logo';
import Perfil from '../conductor/perfilConductor'
import Ruta from '../conductor/verRutaConductor'
import Incidencias from '../conductor/incidenciasConductor'


const ControlPanel = () => {
    const [activeTab, setActiveTab] = useState('Ruta');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
      setAuth(null);
      navigate('/');
    };
  
    const navItems = ['Perfil','Ruta','Incidencias'];
  
    const renderContent = () => {
      switch(activeTab) {
         case 'Perfil':
           return <Perfil />;
         case 'Ruta':
           return <Ruta />;
        
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