import { combineReducers } from '@reduxjs/toolkit';

import user from './user';
import project from './project';
import layer from './layer';

export const rootReducer = combineReducers({
  user,
  project,
  layer,
});

export type RootState = ReturnType<typeof rootReducer>;
