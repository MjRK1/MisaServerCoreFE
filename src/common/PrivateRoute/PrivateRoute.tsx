import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from 'hooks/AuthProvider';
import { MISA } from 'services/MISA/MISA';

export const PrivateRoute = () => {
  const { accessToken, refreshToken, setUser, refreshAccessToken } = useAuth();
  const [isError, setIsError] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsError(false);
    MISA.getMe({token: accessToken})
      .then((data) => {
        const userData = data.data.user;
        if (setUser) setUser({ ...userData});
      })
      .catch(async (e) => {
        if (e.response === undefined) {
          setIsError(true);
        } else if (['TokenExpiredError', 'JsonWebTokenError'].includes(e?.response?.data?.name)) {
            if (refreshAccessToken) await refreshAccessToken(refreshToken);
          } else {
            navigate('/core/auth');
          }
      });
  }, []);


  if (!accessToken || !refreshToken) return <Navigate to="/core/auth" />;
  if (isError) return <Navigate to="/core/error" />;
  return (
    <>
      <Outlet />
    </>);
};
