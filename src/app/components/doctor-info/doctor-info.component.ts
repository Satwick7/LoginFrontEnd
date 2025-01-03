import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-doctor-info',
  templateUrl: './doctor-info.component.html',
  styleUrls: ['./doctor-info.component.css']
})
export class DoctorInfoComponent implements OnInit{

  user : any;
  doctors: any[] = [];

  constructor(private authService:AuthService, private router:Router,private sharedService: SharedService) {}

  ngOnInit(): void {
    this.user = this.sharedService.getUser();

    if(this.user) {
      console.log('patient passed to home:',this.user);
    }

    if(this.user.typeOfUser == 'Patient' || this.user.typeOfUser == 'SuperAdmin') {
      this.doctors = this.sharedService.getDoctors();

      console.log("................patienslist",this.doctors);
    }
  }

}
