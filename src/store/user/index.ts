import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import UserAPI from './api';
import { ILogin, IRegister, IProfileUpdate } from './type';

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (loginData: ILogin, thunkApi) => {
    const result = await UserAPI.login(loginData);
    thunkApi.dispatch(getPhoto());
    return result.data;
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (registerData: IRegister) => {
    const result = await UserAPI.register(registerData);
    return result.data;
  }
);

export const getProfileData = createAsyncThunk(
  'user/getProfileData',
  async () => {
    const result = await UserAPI.getProfileData();
    return result.data;
  }
);

export const updateProfileData = createAsyncThunk(
  'user/updateProfileData',
  async (updateData: IProfileUpdate, thunkApi) => {
    const result = await UserAPI.updateProfileData(updateData);
    thunkApi.dispatch(getProfileData());
    return result.data;
  }
);

export const getPhoto = createAsyncThunk('user/getPhoto', async () => {
  const result = await UserAPI.getPhoto();
  return result.data;
});

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: '',
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    accessToken: '',
    refreshToken: '',
    user: {
      role: '',
      email: '',
      name: '',
      birthday: '',
      telegram: '',
      city: '',
      photo: '',
    },
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      const { accessToken, refreshToken, id } = action.payload;
      console.log(action.payload);
      state.isLoggedIn = true;
      state.id = id;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      return state;
    });
    builder.addCase(getProfileData.fulfilled, (state, action) => {
      console.log(action.payload);
      return { ...state, ...action.payload };
    });
    builder.addCase(updateProfileData.fulfilled, (state, action) => {
      console.log(action.payload);
    });
    builder.addCase(getPhoto.fulfilled, (state, action) => {
      state.user.photo = action.payload
        ? URL.createObjectURL(action.payload)
        : '';
    });
  },
});

export default userSlice.reducer;
