// src/app/services/shared.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private userSubject = new BehaviorSubject<any>(null); // BehaviorSubject for user state
  customer$ = this.userSubject.asObservable();

  private userdata: any;
  private doctorsData: any[] = [];
  private patientsData: any[] = [];

  setUser(user: any): void {
    this.userdata = user;
    this.userSubject.next(user);
  }

  setPatients( patients: any[]) {
    this.patientsData = patients;
  }

  setDoctors( doctors: any[]) {
    this.doctorsData = doctors;
  }

  getUser(): any {
    return this.userdata;
  }

  getPatients(): any[] {
    return this.patientsData;
  }

  getDoctors(): any[] {
    return this.doctorsData;
  }
}
