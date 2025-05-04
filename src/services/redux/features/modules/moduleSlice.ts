import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IModule } from 'types/Modules/modules';

export interface IModuleState {
  modules: IModule[];
}

const initialState: IModuleState = {
  modules: []
};

export const moduleSlice = createSlice({
  name: 'module',
  initialState,
  reducers: {
    setModule: (state, action: PayloadAction<IModule[]>) => {
      state.modules = [...action.payload];
    },
  }
});

export const { setModule } = moduleSlice.actions;

export default moduleSlice.reducer;
