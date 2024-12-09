import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  user:any;
  userFound:any;
  private userSubscription!: Subscription;

  constructor(private authService:AuthService, private router:Router,private sharedService: SharedService) {}

  ngOnInit(): void {
    this.user = this.sharedService.getUser(); // Retrieve user data
    if(this.user) {
      this.userFound = true;
    }
    else {
      this.userFound = false;
    }
  }

  logOut() {
    this.authService.removeToken();
    this.router.navigateByUrl('/login');
  }
}
