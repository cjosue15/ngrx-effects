import { createReducer, on } from '@ngrx/store';
import { loadUsersError, loadUsersSuccess, loadUsers } from '../actions';

import { User } from '../../models/user.model';
import { ErrorApi } from '../../models/error.model';

export interface UsersState {
  users: User[];
  loaded: boolean;
  loading: boolean;
  error: ErrorApi | null;
}

const usersInitialState: UsersState = {
  users: [],
  loaded: false,
  loading: false,
  error: null,
};

export const usersReducer = createReducer(
  usersInitialState,
  on(loadUsers, (state) => ({ ...state, loading: true })),
  on(loadUsersSuccess, (state, { users }) => ({
    ...state,
    loading: false,
    loaded: true,
    users: [...users],
  })),
  on(loadUsersError, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { ...payload },
  }))
);
