import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  repeatPass:string = 'none';

  displayMsg: string = '';
  isAccountCreated: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
      
  }

  registerForm = new FormGroup({
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
    issue: new FormControl("",[Validators.required]),
    age: new FormControl("",[Validators.required,Validators.pattern("^[0-9]+$"),Validators.minLength(1),Validators.maxLength(3)]),
    gender: new FormControl("",[Validators.required]),
    pwd: new FormControl("",[Validators.required,Validators.minLength(6),Validators.maxLength(15)]),
    rpwd: new FormControl("")
  })


  registerSubmited() {
    if(this.PWD.value == this.RPWD.value) {
      console.log(this.registerForm.valid);
      this.repeatPass = 'none'

      const user = {
        FirstName: this.registerForm.value.firstname!,
        LastName: this.registerForm.value.lastname!,
        Email: this.registerForm.value.email!,
        Mobile: this.registerForm.value.mobile!,
        Gender: this.registerForm.value.gender!,
        Pwd: this.registerForm.value.pwd!
      };

      const patient = {
        Issue: this.registerForm.value.issue!,
        Age: this.registerForm.value.age!
      };

      this.authService.registerUser(user,patient).subscribe(res => {
         if(res == 'Success') {
          this.displayMsg = 'Account Created Successfully!';
          this.isAccountCreated = true;

          this.registerForm.reset();

          this.repeatPass = 'none';
         }
         else if(res == 'Already Exist') {
          this.displayMsg = 'Account Already Exist. Try Another Email';
          this.isAccountCreated = false;

          this.registerForm.reset();

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
    return this.registerForm.get("firstname") as FormControl;
  }

  get LastName():FormControl {
    return this.registerForm.get("lastname") as FormControl;
  }

  get Email():FormControl {
    return this.registerForm.get("email") as FormControl;
  }

  get Issue():FormControl {
    return this.registerForm.get("issue") as FormControl;
  }

  get Age():FormControl {
    return this.registerForm.get("age") as FormControl;
  }

  get Mobile():FormControl {
    return this.registerForm.get("mobile") as FormControl;
  }

  get Gender():FormControl {
    return this.registerForm.get("gender") as FormControl;
  }

  get PWD():FormControl {
    return this.registerForm.get("pwd") as FormControl;
  }

  get RPWD():FormControl {
    return this.registerForm.get("rpwd") as FormControl;
  }
}
