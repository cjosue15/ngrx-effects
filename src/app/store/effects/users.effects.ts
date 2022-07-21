import { Injectable } from '@angular/core';

import {
  Actions,
  createEffect,
  CreateEffectMetadata,
  ofType,
} from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { mergeMap, map, Observable, catchError, of } from 'rxjs';

import { loadUsers } from '../actions';
import { UserService } from '../../services/user.service';
import { loadUsersSuccess, loadUsersError } from '../actions/users.actions';

@Injectable()
export class UsersEffectService {
  loadUsers$: Observable<Action> & CreateEffectMetadata;

  constructor(private _actions$: Actions, private _userService: UserService) {
    this.loadUsers$ = createEffect(() =>
      this._actions$.pipe(
        ofType(loadUsers),
        mergeMap(() =>
          this._userService.getUsers().pipe(
            map((users) => loadUsersSuccess({ users })),
            catchError((error) =>
              of(
                loadUsersError({
                  payload: {
                    code: error.status,
                    message: error.message,
                    name: error.name,
                    url: error.url,
                  },
                })
              )
            )
          )
        )
      )
    );
  }
}
