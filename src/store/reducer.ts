import { combineReducers } from '@reduxjs/toolkit';

import user from './user';
import project from './project';

export const rootReducer = combineReducers({
  user,
  project,
});

export type RootState = ReturnType<typeof rootReducer>;
