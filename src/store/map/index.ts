import { createSlice } from '@reduxjs/toolkit';
import { layers } from '../../data/layers';

export const mapSlice = createSlice({
  name: 'user',
  initialState: {
    layer: layers[0],
  },
  reducers: {
    setLayer: (state, action) => {
      state.layer = action.payload;
    },
  },
  extraReducers(builder) {},
});

export const { setLayer } = mapSlice.actions;
export default mapSlice.reducer;
