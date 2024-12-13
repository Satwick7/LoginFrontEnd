import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-doctor-register',
  templateUrl: './doctor-register.component.html',
  styleUrls: ['./doctor-register.component.css']
})
export class DoctorRegisterComponent implements OnInit{
  repeatPass:string = 'none';

  displayMsg: string = '';
  isAccountCreated: boolean = false;

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
      
  }

  DoctorRegisterForm = new FormGroup({
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
    email: new FormControl("",[Validators.required,Validators.email]) ,
    mobile: new FormControl("",[Validators.required,Validators.pattern("[0-9]*"),Validators.minLength(10),Validators.maxLength(10)]),
    specialist: new FormControl("",[Validators.required]),
    gender: new FormControl("",[Validators.required]),
    pwd: new FormControl("",[Validators.required,Validators.minLength(6),Validators.maxLength(15)]),
    rpwd: new FormControl("")
  })

  DoctorRegisterSubmited() {
    if(this.PWD.value == this.RPWD.value) {
      console.log(this.DoctorRegisterForm.valid);
      this.repeatPass = 'none'

      const user = {
        FirstName: this.DoctorRegisterForm.value.firstname!,
        LastName: this.DoctorRegisterForm.value.lastname!,
        Email: this.DoctorRegisterForm.value.email!,
        Mobile: this.DoctorRegisterForm.value.mobile!,
        Gender: this.DoctorRegisterForm.value.gender!,
        Pwd: this.DoctorRegisterForm.value.pwd!
      };

      const doctor = {
        Specialist: this.DoctorRegisterForm.value.specialist!
      };

      this.authService.registerDoctorUser(user,doctor).subscribe(res => {
         if(res == 'Success') {
          this.displayMsg = 'Account Created Successfully!';
          this.isAccountCreated = true;

          this.DoctorRegisterForm.reset();

          this.repeatPass = 'none';
         }
         else if(res == 'Already Exist') {
          this.displayMsg = 'Account Already Exist. Try Another Email';
          this.isAccountCreated = false;

          this.DoctorRegisterForm.reset();
         }
         else {
          this.displayMsg = 'Something went Wrong';
          this.isAccountCreated = false;
         }
      })
    }
    else {
      this.repeatPass = 'inline'
    }
  }

  get FirstName():FormControl {
    return this.DoctorRegisterForm.get("firstname") as FormControl;
  }

  get LastName():FormControl {
    return this.DoctorRegisterForm.get("lastname") as FormControl;
  }

  get Email():FormControl {
    return this.DoctorRegisterForm.get("email") as FormControl;
  }

  get Specialist():FormControl {
    return this.DoctorRegisterForm.get("specialist") as FormControl;
  }

  get Mobile():FormControl {
    return this.DoctorRegisterForm.get("mobile") as FormControl;
  }

  get Gender():FormControl {
    return this.DoctorRegisterForm.get("gender") as FormControl;
  }

  get PWD():FormControl {
    return this.DoctorRegisterForm.get("pwd") as FormControl;
  }

  get RPWD():FormControl {
    return this.DoctorRegisterForm.get("rpwd") as FormControl;
  }

}
