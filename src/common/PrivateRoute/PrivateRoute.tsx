import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from 'hooks/AuthProvider';
import { MISA } from 'services/MISA/MISA';

export const PrivateRoute = () => {
  const { accessToken, refreshToken } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    MISA.getMe({token: accessToken})
      .then(() => {
        setIsLoggedIn(true);
      })
      .catch(() => {
        setIsLoggedIn(false);
      });
  }, []);

  if (!accessToken || !refreshToken || !isLoggedIn) return <Navigate to="/login" />;
  return <Outlet />;
};
