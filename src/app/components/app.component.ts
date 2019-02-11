import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../services';
import { User } from '../models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ABSG';
  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    //this.authenticationService.currentUserSubject.subscribe(x => console.log(x));
  }

}
