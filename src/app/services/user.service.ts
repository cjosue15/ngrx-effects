import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { User, userAdapter, UserBackend } from '../models/user.model';

interface ResponseUserList {
  data: UserBackend[];
}

interface ResponseUser {
  data: UserBackend;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _url: string;
  constructor(private _http: HttpClient) {
    this._url = 'https://reqres.in/api';
  }

  getUsers(): Observable<User[]> {
    return this._http
      .get<ResponseUserList>(`${this._url}/users?per_page=20&&delay=3`)
      .pipe(
        map((response: ResponseUserList) =>
          response.data.map((item) => userAdapter(item))
        )
      );
  }

  getUserById(id: string): Observable<User> {
    return this._http
      .get<ResponseUser>(`${this._url}/users/${id}?delay=3`)
      .pipe(map((response: ResponseUser) => userAdapter(response.data)));
  }
}
