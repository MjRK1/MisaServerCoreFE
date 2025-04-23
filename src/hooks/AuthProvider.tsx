import React from 'react';
import { createContext, ReactNode, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MISA } from 'services/MISA/MISA';
import { User } from 'types/User/user';
import { message } from 'antd';


export const AuthContext = createContext<{
  user: User | null,
  setUser?: React.Dispatch<React.SetStateAction<User | null>>,
  accessToken: string | null,
  refreshToken: string | null,
  login?: (username: string, password: string) => Promise<Error>,
  logout?: () => void,
  register?: (username: string, password: string, displayName: string) => Promise<Error>,
  refreshAccessToken?: (token: string | null) => Promise<any>,
  }>({
  user: null,
  accessToken: null,
  refreshToken: null,
});

const AuthProvider = (
  { children }: { children: ReactNode }
) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken'));
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const login = (username: string, password: string) => {
    messageApi.open({
      type: 'loading',
      content: 'Вход в систему...',
      key: 'loading'
    });
    return MISA.login({variables: { username, password }})
      .then((data => {
        setTimeout(() => messageApi.destroy('loading'), 0);
        messageApi.open({
          type: 'success',
          content: 'Добро пожаловать!',
          duration: 1.5
        });
        const userData = data?.data;
        const newUser = {
          username: userData?.username,
          displayName: userData?.displayName,
          id: userData?.id,
          roles: userData?.roles
        };
        setUser({ ...newUser });
        setAccessToken(userData?.accessToken);
        setRefreshToken(userData.refreshToken);
        localStorage.setItem('accessToken', userData?.accessToken);
        localStorage.setItem('refreshToken', userData?.refreshToken);
        navigate('/home');
        return data;
      }))
      .catch((err) => {
        return err.response?.data;
      });
  };

  const register = (
    username: string,
    password: string,
    displayName: string
  ) => {
    return MISA.register({
      variables: { username, password, displayName }
    })
      .then(async () => {
        await login(username, password);
      })
      .catch(async (err) => {
        return err.response?.data;
      });
  };

  const logout = () => {
    messageApi.open({
      type: 'loading',
      content: 'Выход из профиля',
      key: 'loading',
    });
    MISA.logout({
      token: accessToken,
    })
      .then(() => {
        setTimeout(() => messageApi.destroy('loading'), 0);
        setUser(null);
        setAccessToken(null);
        setRefreshToken(null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        navigate('/auth');
      })
      .catch((err) => {
        messageApi.open({
          type: 'error',
          content: err.data.message,
        });
      });
  };

  const refreshAccessToken = (token: string | null) => {
    return MISA.refresh({token})
      .then(data => {
        const newAccessToken = data?.data?.accessToken;
        setAccessToken(newAccessToken);
        localStorage.setItem('accessToken', newAccessToken);
      })
      .catch((e)=> {
        setRefreshToken(null);
        localStorage.removeItem('refreshToken');
        navigate('/auth');
        return e;
      });
  };


  return (
    <>
      {contextHolder}
      <AuthContext.Provider
        value={{
          accessToken,
          refreshToken,
          user,
          setUser,
          logout,
          login,
          register,
          refreshAccessToken
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
