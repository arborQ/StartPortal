import { CurrentUserService } from './current-user.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  constructor(private router: Router, private currentUserService: CurrentUserService) {}
  $isAuthorized = this.currentUserService.$isAuthorized;

  onSignOut() {
    this.currentUserService.clearCurrentUser();
    this.router.navigateByUrl('/authorize/sign-in');
  }
}
