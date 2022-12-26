import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import client from '../../services';

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (loginData: object) => {
    const result = await client.post('/api/auth/login', loginData);
    return result.data;
  }
);

export const registerUser = createAsyncThunk('user/registerUser', async () => {
  const result = await client.post('/api/auth/signup', {
    email: 'user@example.com',
    pwd: 'password',
    confirm: 'password',
  });
  return result.data;
});

export const getUserData = createAsyncThunk('user/getUserData', async () => {
  const resultProfileData = await client.get('/api/auth/profile');
  const resultUserData: any = await client.get('/api/auth/users/me');
  const resultUserAccountData = resultUserData.account;
  const result = { ...resultProfileData, ...resultUserAccountData };
  return result.data;
});

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    id: '',
    role: '',
    type: '',
    access: '',
    refresh: '',
    email: '',
    name: '',
    birthday: '',
    telegram: '',
    city: '',
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      const { accessToken, refreshToken, id } = action.payload;
      state.isLoggedIn = true;
      state.id = id;
      state.access = accessToken;
      state.refresh = refreshToken;
      localStorage.setItem('token', accessToken);
      localStorage.setItem('refresh', refreshToken);
      localStorage.setItem('isLoggedIn', 'true');
      return state;
    });
    builder.addCase(getUserData.fulfilled, (state, action) => {
      return { ...state, ...action.payload };
    });
  },
});

export default userSlice.reducer;
