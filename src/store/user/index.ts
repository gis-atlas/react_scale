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
  console.log(result);
  return result.data;
});

export const getUserData = createAsyncThunk('user/getUserData', async () => {
  console.log('asdfgsgdfsdd');
  const result = await client.get('/api/auth/profile');
  console.log(result);
  return result.data;
});

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
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
      state.isLoggedIn = true;
      const { email, accessToken, refreshToken, id, role, type } =
        action.payload;
      state.id = id;
      state.email = email;
      state.access = accessToken;
      state.refresh = refreshToken;
      state.role = role;
      state.type = type;
    });
  },
});

export default userSlice.reducer;
