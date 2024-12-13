import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private loginAuth: AuthService,
    private router: Router,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    pwd: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15),
    ]),
  });

  isUserValid: boolean = false;

  displayMsg: string = '';

  loginSubmited() {
    this.loginAuth
      .loginUser([this.loginForm.value.email!, this.loginForm.value.pwd!])
      .subscribe((res: any) => {
        if (res == 'Failure') {
          this.isUserValid = false;
          this.displayMsg = 'Login UnSucessFull';

          this.loginForm.reset();
        } else {
          this.isUserValid = true;
          const parsedRes = JSON.parse(res);
          // Assuming res contains both token and user
          const token = parsedRes.token;
          const user = parsedRes.user;
          this.loginAuth.setToken(token);
          this.sharedService.setUser(user); // Pass user to shared service
          console.log('Logged in user:', user);
          // this.router.navigateByUrl('home',{state:{user}});
          this.router.navigate(['home']);
        }
      });
  }

  get Email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get PWD(): FormControl {
    return this.loginForm.get('pwd') as FormControl;
  }
}
