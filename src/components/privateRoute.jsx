import React from 'react';
import { Outlet } from 'react-router-dom';
// import { useContext } from 'react';
// import { Navigate } from 'react-router-dom';
// import { AuthContext } from '../context/authContext';

const PrivateRoute = ({ allowedRoles }) => {
  // const { auth } = useContext(AuthContext);
 
  //descomentarlo para activar la ruta privada

  // if (!auth) {
  //   return <Navigate to="/" replace />;
  // }

  // if (allowedRoles && !allowedRoles.includes(auth.usuario.role)) {
  //   return <Navigate to="/" replace />;
  // }

  return <Outlet />;
};

export default PrivateRoute;
