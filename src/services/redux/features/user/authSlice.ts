import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'types/User/user';
import { MISA } from 'services/MISA/MISA';

export interface ILoginVariables {
  username: string;
  password: string;
}

export interface IAuthState {
  user: User
}

const initialState: IAuthState = {
  user: {
    username: null,
    displayName: null,
    id: null
  }
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<ILoginVariables>) => {
      MISA.login({
          variables: {
            username: action.payload.username,
            password: action.payload.password,
          }
        })
        .then(data => {
          const userData = data?.data;
          localStorage.setItem('accessToken', JSON.stringify(userData.accessToken));
          localStorage.setItem('refreshToken', JSON.stringify(userData.refreshToken));
          state.user.username = userData.username;
          state.user.id = userData.id;
          state.user.displayName = userData.displayName;
          console.log(localStorage.getItem('refreshToken'));
        })
        .catch(e => {
          console.log(e);
          return e;
        });
    },

    setUser: (state, action: PayloadAction<User>) => {
      state.user = { ...action.payload };
    },

    clearUser: (state) => {
      state.user = null;
    },
  }
});

export const { setUser, clearUser, login } = authSlice.actions;

export default authSlice.reducer;
