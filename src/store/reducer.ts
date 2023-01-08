import { combineReducers } from '@reduxjs/toolkit';

import user from './user';
import project from './project';
import layer from './layer';
import map from './map';

export const rootReducer = combineReducers({
  user,
  project,
  layer,
  map,
});

export type RootState = ReturnType<typeof rootReducer>;
