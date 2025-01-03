import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.css']
})
export class PatientInfoComponent implements OnInit{

  user : any;
  patients: any[] = [];

  constructor(private authService:AuthService, private router:Router,private sharedService: SharedService) {}

  ngOnInit(): void {
    this.user = this.sharedService.getUser();

    if(this.user) {
      console.log('patient passed to home:',this.user);
    }

    if(this.user.typeOfUser == 'Doctor' || this.user.typeOfUser == 'SuperAdmin') {
      this.patients = this.sharedService.getPatients();

      console.log("................patienslist",this.patients);
    }
  }
}
