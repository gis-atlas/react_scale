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
    thunkApi.dispatch(getPhoto());
    return result.data;
  }
);

export const getPhoto = createAsyncThunk('user/getPhoto', async () => {
  const result = await UserAPI.getPhoto();
  return result.data;
});

export const updatePhoto = createAsyncThunk(
  'user/updatePhoto',
  async (photo: any, thunkApi) => {
    await UserAPI.updatePhoto(photo);
    thunkApi.dispatch(getPhoto());
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: '',
    isLoggedIn: Boolean(localStorage.getItem('isLoggedIn')) || false,
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
  reducers: {
    logout: (state) => {
      localStorage.clear();
      state.accessToken = '';
      state.isLoggedIn = false;
      state.refreshToken = '';
      state.user = {
        role: '',
        email: '',
        name: '',
        birthday: '',
        telegram: '',
        city: '',
        photo: '',
      };
      state.id = '';
    },
  },
  extraReducers(builder) {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      const { accessToken, refreshToken, id } = action.payload;
      state.isLoggedIn = true;
      state.id = id;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      return state;
    });
    builder.addCase(getProfileData.fulfilled, (state, action) => {
      return { ...state, user: action.payload };
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

export const { logout } = userSlice.actions;
export default userSlice.reducer;
