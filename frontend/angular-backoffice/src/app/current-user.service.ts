import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { CurrentUser } from './models/current-user';
import { map } from 'rxjs/operators';
const userStorageKey = 'currentUser';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  private currentUserSubject: BehaviorSubject<CurrentUser>;
  public currentUser: Observable<CurrentUser>;
  public $isAuthorized: Observable<boolean>;

  constructor() {
    this.currentUserSubject = new BehaviorSubject<CurrentUser>(JSON.parse(localStorage.getItem(userStorageKey)));
    this.currentUser = this.currentUserSubject.asObservable();
    this.$isAuthorized = this.currentUser.pipe(map(u => !!u));
  }

  setCurrentUser(user: CurrentUser) {
    localStorage.setItem(userStorageKey, JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  clearCurrentUser() {
    localStorage.removeItem(userStorageKey);
    this.currentUserSubject.next(null);
  }
}
