import { Component } from '@angular/core';
import { EmployeesService } from '../employees.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent {

  employees:any=[];
  constructor(private _employeesService:EmployeesService){
    this.pageload();
  }

pageload(){
  this._employeesService.getEmployees().subscribe(
    (data:any)=>{
      this.employees=data;
      console.log(this.employees);
    }
  )
}

keyword:string="";

filter(){

  this._employeesService.getFilteredEmployees(this.keyword).subscribe(
    (data:any)=>{
      this.employees=data;
      console.log(this.employees);
    },(err:any)=>{
      alert("Internal Server Error");
    }
  )
}

columnname:string="";

order:string="";

sort( ){

  this._employeesService.getSortedEmployees(this.columnname, this.order).subscribe(
    (data:any)=>{
      this.employees=data;
      console.log(this.employees);
    }, (err:any)=>{
      alert("Internal Server Error");
    }
  )
}

limit:number=0;

page:number=0;

pagination(){
  this._employeesService.getPaginatedEmployees(this.limit, this.page).subscribe(
    (data:any)=>{ 
      this.employees=data;
      console.log(this.employees);
    }, (err:any)=>{
      alert("Internal Server Error");
    }
  )
}

delete(id:number){
  if(confirm("Are you sure to delete this record?")==true){
    this._employeesService.deleteEmployees(id).subscribe(
      (data:any)=>{
        alert("Internal Server Error")
      }
    )
  } else {
    alert("You have Cancelled..!")
  }
}

}
