import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ProjectAPI from './api';

export const getProjects = createAsyncThunk('project/getProjects', async () => {
  const result = await ProjectAPI.getProjects();
  return result.data;
});

export const projectSlice = createSlice({
  name: 'user',
  initialState: {
    projects: [],
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getProjects.fulfilled, (state, action) => {
      console.log('projects: ', action.payload);
      state.projects = action.payload;
    });
  },
});

export default projectSlice.reducer;
