import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { CurrentUser } from './models/current-user';
const userStorageKey = 'currentUser';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  private currentUserSubject: BehaviorSubject<CurrentUser>;
  public currentUser: Observable<CurrentUser>;
  constructor() {
    this.currentUserSubject = new BehaviorSubject<CurrentUser>(JSON.parse(localStorage.getItem(userStorageKey)));
    this.currentUser = this.currentUserSubject.asObservable();
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
