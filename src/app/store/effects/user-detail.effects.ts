import { Injectable } from '@angular/core';

import {
  Actions,
  createEffect,
  CreateEffectMetadata,
  ofType,
} from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { mergeMap, map, Observable, catchError, of } from 'rxjs';

import { loadUser, loadUserError, loadUserSuccess } from '../actions';
import { UserService } from '../../services/user.service';

@Injectable()
export class UserEffect {
  loadUser$: Observable<Action> & CreateEffectMetadata;

  constructor(private _actions$: Actions, private _userService: UserService) {
    this.loadUser$ = createEffect(() =>
      this._actions$.pipe(
        ofType(loadUser),
        mergeMap((action) =>
          this._userService.getUserById(action.id).pipe(
            map((user) => loadUserSuccess({ user })),
            catchError((error) =>
              of(
                loadUserError({
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
