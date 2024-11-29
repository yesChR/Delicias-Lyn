// RoleGuard.jsx
import { useEffect, useState } from 'react';
// RoleGuard.jsx
import { useAuth } from '../../context/authContext';

const RoleGuard = ({ role, children }) => {
  const { user } = useAuth();  // Obtiene el usuario del contexto

  // Si el rol del usuario no coincide o no está logueado, no renderiza nada
  if (!user || user.rol !== role) {
   
    return null;
  }

  return children; // Renderiza el contenido si el rol coincide
};

export default RoleGuard;
