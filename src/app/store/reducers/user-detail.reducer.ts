import { createReducer, on } from '@ngrx/store';
import { loadUser, loadUserError, loadUserSuccess } from '../actions';

import { User } from '../../models/user.model';
import { ErrorApi } from '../../models/error.model';

export interface UserState {
  id: string | null;
  user: User | null;
  loaded: boolean;
  loading: boolean;
  error: ErrorApi | null;
}

const userInitialState: UserState = {
  user: null,
  id: null,
  loaded: false,
  loading: false,
  error: null,
};

export const userDetailReducer = createReducer(
  userInitialState,
  on(loadUser, (state, { id }) => ({ ...state, loading: true, id })),
  on(
    loadUserSuccess,
    (state, { user: { id, avatar, email, firstNname, lastName } }) => ({
      ...state,
      error: null,
      loading: false,
      loaded: true,
      user: new User(id, email, firstNname, lastName, avatar),
    })
  ),
  on(loadUserError, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: payload ? { ...payload } : null,
  }))
);
