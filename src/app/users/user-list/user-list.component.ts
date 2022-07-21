import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users$: Observable<User[]>;
  constructor(private _userService: UserService) {
    this.users$ = new Observable();
  }

  ngOnInit(): void {
    this.users$ = this._userService.getUsers();
  }
}
