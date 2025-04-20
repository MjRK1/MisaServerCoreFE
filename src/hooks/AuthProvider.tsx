import React from 'react';
import { createContext, ReactNode, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MISA } from 'services/MISA/MISA';
import { User } from 'types/User/user';


export const AuthContext = createContext<
  {
    user: User | null,
    accessToken: string | null,
    refreshToken: string | null,
    login?: (username: string, password: string) => void,
    logout?: (accessToken: string) => void
  }
>({
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
  const navigate = useNavigate();

  const login = (username: string, password: string) => {
    MISA.login({variables: { username, password }})
      .then((data => {
        const userData = data?.data;
        const newUser = {
          username: userData?.username,
          displayName: userData?.displayName,
          id: userData?.id,
        };
        setUser({ ...newUser });
        setAccessToken(userData?.accessToken);
        setRefreshToken(userData.refreshToken);
        localStorage.setItem('accessToken', userData?.accessToken);
        localStorage.setItem('refreshToken', userData?.refreshToken);
        navigate('/home');
      }))
      .catch((err) => {
        console.log(err);
      });
  };

  const logout = () => {
    MISA.logout({
      token: accessToken,
    })
      .then((data) => {
        console.log(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const refreshAccessToken = (token: string) => {
    MISA.refresh({token})
      .then(data => {
        const newAccessToken = data?.data?.accessToken;
        setAccessToken(newAccessToken);
        localStorage.setItem('accessToken', newAccessToken);
      })
      .catch(()=> {
        setRefreshToken(null);
        localStorage.removeItem('refreshToken');
      });
  };


  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, user, logout, login}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
