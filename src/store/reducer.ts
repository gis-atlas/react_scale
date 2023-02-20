import { combineReducers } from '@reduxjs/toolkit';

import user from './user';
import project from './project';
import layer from './layer';
import map from './map';
import upload from './upload';

export const rootReducer = combineReducers({
  user,
  project,
  layer,
  map,
  upload,
});

export type RootState = ReturnType<typeof rootReducer>;
