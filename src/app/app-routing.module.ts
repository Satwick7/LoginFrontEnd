import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './services/auth.guard';
import { LaunchPageComponent } from './components/launch-page/launch-page.component';
import { DoctorRegisterComponent } from './components/doctor-register/doctor-register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PatientInfoComponent } from './components/patient-info/patient-info.component';
import { DoctorInfoComponent } from './components/doctor-info/doctor-info.component';

const routes: Routes = [
  {
    path: '',
    component: DoctorRegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'DoctorRegister',
    component: DoctorRegisterComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'patientInfo',
    component: PatientInfoComponent
  },
  {
    path: 'doctorInfo',
    component: DoctorInfoComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate:[authGuard]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
