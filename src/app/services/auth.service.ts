import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private sharedService: SharedService) {}

  currentUser: BehaviorSubject<any> = new BehaviorSubject(null);
  baseServerUrl = 'https://localhost:44360/api/';

  jwtHelperService = new JwtHelperService();

  registerUser(user: any, patient: any) {
    return this.http.post(
      this.baseServerUrl + 'User/CreateUser',
      { user, patient },
      {
        responseType: 'text',
      }
    );
  }

  registerDoctorUser(user: any, doctor: any) {
    return this.http.post(
      this.baseServerUrl + 'User/CreateDoctorUser',
      { user, doctor },
      {
        responseType: 'text',
      }
    );
  }

  loginUser(loginInfo: Array<String>) {
    return this.http.post(
      this.baseServerUrl + 'User/LoginUser',
      {
        Email: loginInfo[0],
        Pwd: loginInfo[1],
      },
      {
        responseType: 'text',
      }
    );
  }

  setToken(token: string) {
    localStorage.setItem('access_token', token);
    this.loadCurrentUser();
  }

  loadCurrentUser() {
    const token = localStorage.getItem('access_token');
    const userInfo =
      token != null ? this.jwtHelperService.decodeToken(token) : null;

    const data = userInfo
      ? {
          id: userInfo.id,
          firstname: userInfo.firstname,
          lastname: userInfo.lastname,
          email: userInfo.email,
          mobile: userInfo.mobile,
          gender: userInfo.gender,
          typeOfUser: userInfo.typeOfUser,
        }
      : null;
    this.currentUser.next(data);

    return data;
  }

  isLoggedin(): boolean {
    return localStorage.getItem('access_token') ? true : false;
  }

  removeToken() {
    localStorage.removeItem('access_token');
    this.sharedService.setUser(null);
  }

  UserEdit(EditedUser : any,Email : any) {
    const token = localStorage.getItem('access_token');
    console.log('>>>>>>>>>>>editeduser',EditedUser);
    console.log('>>>>>>>>>>>email',Email);

    console.log('JWT Token:', token); 
    const headers = {
      'Authorization': `Bearer ${token}` // Set the Authorization header with Bearer token
    };

    return this.http.patch(
      this.baseServerUrl + 'User/EditUser',
      {
        EditedUser,
        Email
      },
      {
        headers,
        responseType:'text',
        withCredentials: true
      }
    )
  }
}
