import { combineReducers } from '@reduxjs/toolkit';

import layer from './layer';
import map from './map';
import newMap from './newMap';
import project from './project';
import upload from './upload';
import user from './user';

export const rootReducer = combineReducers({
  user,
  project,
  layer,
  map,
  upload,
  newMap,
});

export type RootState = ReturnType<typeof rootReducer>;
