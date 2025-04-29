import React, { useEffect, useState } from 'react';
import { Login } from 'components/Auth/Login';
import { createPortal } from 'react-dom';
import { RegisterModal } from 'components/Auth/RegisterModal';
import { MISA } from 'services/MISA/MISA';
import { useAuth } from 'hooks/AuthProvider';
import { useNavigate } from 'react-router-dom';


export const AuthPage = () => {
  const [registerModalOpen, setRegisterModalOpen] = useState<boolean>(false);
  const {accessToken, refreshToken, refreshAccessToken, setUser} = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    MISA.getMe({token: accessToken})
      .then((data) => {
        const userData = data.data.user;
        if (setUser) setUser({ ...userData});
        navigate('/core/home');
      })
      .catch(async (e) => {
        if (e.name === 'AxiosError') {
          console.log(e);
          navigate('/core/error');
        } else if (['TokenExpiredError', 'JsonWebTokenError'].includes(e?.response?.data?.name)) {
          if (refreshAccessToken) await refreshAccessToken(refreshToken);
        } else {
          navigate('/core/auth');
        }
      });
  }, []);


  return (
    <>
      <div className="auth-page">
        <Login setRegisterModalOpen={setRegisterModalOpen} />
      </div>
      {createPortal(
        <RegisterModal
          isOpen={registerModalOpen}
          setOpen={setRegisterModalOpen}
        />,
        document.body
      )}
    </>
  );
};
