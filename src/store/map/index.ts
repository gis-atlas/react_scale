import { createSlice } from '@reduxjs/toolkit';

export const mapSlice = createSlice({
  name: 'user',
  initialState: {
    mapStyle: 'mapbox://styles/mapbox/satellite-streets-v12',
  },
  reducers: {
    setMapStyle: (state, action) => {
      state.mapStyle = action.payload;
    },
  },
  extraReducers(builder) {},
});

export const { setMapStyle } = mapSlice.actions;
export default mapSlice.reducer;
