import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  user : any;

  displayMsg: string = '';
  isDataUpdated: boolean = false;

  constructor(private authService:AuthService, private router:Router,private sharedService: SharedService) {}

  ngOnInit(): void {
    this.user = this.sharedService.getUser();

    if(this.user) {
      console.log('user passed to profile:',this.user);
    }
  }

  EditedForm = new FormGroup({
     firstname: new FormControl("",
        [Validators.required,
        Validators.minLength(2),
        Validators.pattern("[a-zA-Z].*")
      ]),
    lastname: new FormControl("",
      [Validators.required,
      Validators.minLength(2),
      Validators.pattern("[a-zA-Z].*")
    ]),
    mobile: new FormControl("",[Validators.required,Validators.pattern("[0-9]*"),Validators.minLength(10),Validators.maxLength(10)]),
    gender: new FormControl("",[Validators.required]),
  })

  SaveChanges() {

    const EditedUser = {
      FirstName: this.EditedForm.value.firstname!,
      LastName: this.EditedForm.value.lastname!,
      Mobile: this.EditedForm.value.mobile!,
      Gender: this.EditedForm.value.gender!
    }

    this.authService.UserEdit(EditedUser,this.user.email).subscribe(res => {
      console.log('res......',res);
      if(res == 'Data Updated') {
        this.displayMsg = 'Data Updated Successfully!';
        this.isDataUpdated = true;
      }
      else{
        this.displayMsg = 'Data Not Updated';
        this.isDataUpdated = false;
      }
    })
  }
}
