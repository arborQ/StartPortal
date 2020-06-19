import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CurrentUserService } from '../current-user.service';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  constructor(private http: HttpClient, private currentUserService: CurrentUserService) { }

  signIn(login: string, password: string): Observable<boolean> {
    return this.http
      .post('/api/authorize/sign-in', { login, password })
      .pipe(map((response) => {
        this.currentUserService.setCurrentUser({ login: 'admin', expire: new Date() });
        return true;
      }));
  }
}
