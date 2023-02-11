import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ProjectAPI from './api';
import { IProject } from './type';

export const getProjects = createAsyncThunk('project/getProjects', async () => {
  const result = await ProjectAPI.getProjects();
  return result.data;
});

export const getProject = createAsyncThunk(
  'project/getProject',
  async (projectId: number) => {
    const result = await ProjectAPI.getProject(projectId);
    return result.data;
  }
);

export const createProject = createAsyncThunk(
  'project/createProject',
  async (projectName: string) => {
    const result = await ProjectAPI.createProject(projectName);
    return result.data;
  }
);

export const projectSlice = createSlice({
  name: 'user',
  initialState: {
    projects: [] as Array<IProject>,
    project: {} as IProject,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getProjects.fulfilled, (state, action) => {
      state.projects = action.payload;
    });
    builder.addCase(getProject.fulfilled, (state, action) => {
      state.project = action.payload;
    });
    builder.addCase(createProject.fulfilled, (state, action) => {
      state.projects.push(action.payload.newProject);
    });
  },
});

export default projectSlice.reducer;
