import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from '../../store/app.reducers';
import { loadUser } from '../../store/actions';
import { UserState } from '../../store/reducers';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  userDetail$: Observable<UserState>;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _store: Store<AppState>
  ) {
    this.userDetail$ = new Observable();
  }

  ngOnInit(): void {
    this.userDetail$ = this._store.select('userDetail');

    this._activatedRoute.params.subscribe(({ id }) =>
      this._store.dispatch(loadUser({ id }))
    );
  }
}
