import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import axios from 'axios';
import PrivateRoute from './components/privateRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Inicio from './components/inicio';
import PanelPasajero from './components/pasajero/panelPasajero';
import PanelConductor from './components/conductor/panelConductor';
import PanelAdmin from './components/gestionAdmin/panelAdmin';



axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Inicio />} />

          <Route element={<PrivateRoute allowedRoles={['admin']} />}>
            <Route path="/admin" element={<PanelAdmin />} />
          </Route>

          <Route element={<PrivateRoute allowedRoles={['conductor']} />}>
            <Route path="/conductor" element={<PanelConductor />} />
          </Route>

          <Route element={<PrivateRoute allowedRoles={['pasajero']} />}>
            <Route path="/pasajero" element={<PanelPasajero />} />
          </Route>

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;