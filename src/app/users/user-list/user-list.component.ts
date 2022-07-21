import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AppState } from '../../store/app.reducers';
import { loadUsers } from '../../store/actions/users.actions';
import { UsersState } from '../../store/reducers/users.reducer';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  userInfo$: Observable<UsersState>;
  constructor(private _store: Store<AppState>) {
    this.userInfo$ = new Observable();
  }

  ngOnInit(): void {
    this.userInfo$ = this._store.select('users');
    this._store.dispatch(loadUsers());
  }
}
