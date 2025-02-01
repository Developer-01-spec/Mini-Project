import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './authentication.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { EmployeesComponent } from './employees/employees.component';
import { LoginComponent } from './login/login.component';
import { NewemployeeComponent } from './newemployee/newemployee.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:"login",component:LoginComponent},
  
  {path:"dashboard", canActivate:[AuthenticationGuard],component:DashboardComponent, children:[
    {path:"home",component:HomeComponent},
    {path:"employees",component:EmployeesComponent},
    {path:"newemployee",component:NewemployeeComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
