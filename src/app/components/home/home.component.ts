import { Component, OnInit,ViewChild,ElementRef,AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit{
  user: any;
  userName:any;
  @ViewChild('example') exampleInput!: ElementRef;

  constructor(private authService:AuthService, private router:Router,private sharedService: SharedService) {}

  ngOnInit(): void {
    this.user = this.sharedService.getUser(); // Retrieve user data
    if (!this.user) {
      // console.error('User data not found!');
      this.router.navigateByUrl('/login'); // Redirect to login if no user data
    } else {
      console.log('User passed to home:', this.user);
      this.userName = this.user.firstName;
    }
  }
  ngAfterViewInit(): void {
    if (this.user && this.exampleInput) {
      this.exampleInput.nativeElement.value = this.user.firstName; // Set value after view initializes
    }
  }

  
}
