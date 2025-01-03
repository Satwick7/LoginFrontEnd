import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,AfterViewInit,OnDestroy{
  User : any; // for User name in nav bar
  userFound:any;
  private userSubscription!: Subscription;
  @ViewChild('') exampleInput!: ElementRef;

  constructor(private authService:AuthService, private router:Router,private sharedService: SharedService) {}

  ngOnInit(): void {
  
    this.userSubscription = this.sharedService.customer$.subscribe((user) => {
      this.User = user; // Update user state
      if(this.User) {
      this.userFound = true;
    }
    else {
      this.userFound = false;
    }
    });

    if(localStorage.getItem('access_token')) {
      // console.log(this.authService.loadCurrentUser())
      this.sharedService.setUser(this.authService.loadCurrentUser());
    }

    this.User = this.sharedService.getUser();
    console.log(this.User)

    if (!this.User) {
      console.error('User data not found!');
      this.router.navigateByUrl('/login'); // Redirect to login if no user data
    } else {
      console.log('User passed to home:', this.User);
      this.router.navigateByUrl('/home');
    }

    
  }

  ngAfterViewInit(): void {
    // Access and set value for exampleInput after the view initializes
    if (this.User && this.exampleInput) {
      this.exampleInput.nativeElement.value = this.User.firstName; // Set value after view initializes
    }
  }

  logOut() {
    this.authService.removeToken();
    this.router.navigateByUrl('/login');
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
