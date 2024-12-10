// src/app/services/shared.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private userSubject = new BehaviorSubject<any>(null); // BehaviorSubject for user state
  customer$ = this.userSubject.asObservable();

  private user: any;

  setUser(user: any): void {
    this.user = user;
    this.userSubject.next(user);
  }

  getUser(): any {
    return this.user;
  }
}
