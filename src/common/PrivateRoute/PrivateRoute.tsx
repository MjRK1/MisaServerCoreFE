import React, { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from 'hooks/AuthProvider';
import { MISA } from 'services/MISA/MISA';

export const PrivateRoute = () => {
  const { accessToken, refreshToken, setUser, refreshAccessToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    MISA.getMe({token: accessToken})
      .then((data) => {
        const userData = data.data.user;
        if (setUser) setUser({ ...userData});
      })
      .catch(async (e) => {
        if (['TokenExpiredError', 'JsonWebTokenError'].includes(e.response.data.name)) {
          if (refreshAccessToken) await refreshAccessToken(refreshToken);
        } else {
          navigate('/auth');
        }
      });
  }, []);

  if (!accessToken || !refreshToken) return <Navigate to="/auth" />;
  return <Outlet />;
};
