import { combineReducers } from '@reduxjs/toolkit';

import layer from './layer';
import map from './map';
import project from './project';
import upload from './upload';
import user from './user';

export const rootReducer = combineReducers({
  user,
  project,
  layer,
  upload,
  map,
});

export type RootState = ReturnType<typeof rootReducer>;
