import { ActionReducerMap } from '@ngrx/store';

import { usersReducer, UsersState } from './reducers';
import { UserState, userDetailReducer } from './reducers/user-detail.reducer';

export interface AppState {
  users: UsersState;
  userDetail: UserState;
}

export const appReducers: ActionReducerMap<AppState> = {
  users: usersReducer,
  userDetail: userDetailReducer,
};
