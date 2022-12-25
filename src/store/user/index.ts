import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import client from '../../services';

export const getUserData = createAsyncThunk('user/getUserData', async () => {
  console.log('asdfgsgdfsdd');
  const result = await client.get('/api/profile');
  console.log(result);
  return result.data;
});

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: '',
    birthday: '',
    telegram: '',
    city: '',
  },
  reducers: {},
});

export default userSlice.reducer;
