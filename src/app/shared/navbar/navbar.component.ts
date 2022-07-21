import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private _router: Router) {}

  ngOnInit(): void {}

  goUser(id: string | null): void {
    if (!id) return;

    this._router.navigate(['/user', id]);
  }
}
