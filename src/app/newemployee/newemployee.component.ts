import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeesService } from '../employees.service';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-newemployee',
  templateUrl: './newemployee.component.html',
  styleUrls: ['./newemployee.component.css']
})
export class NewemployeeComponent {

id:number=0;
type:any;

constructor( private _activatedRoute:ActivatedRoute, private _employeeService:EmployeesService, private _router:Router){

  _activatedRoute.params.subscribe(
    (data:any)=>{
      console.log(data.id);
      this.id=data.id;

      // Integrating with API

      _employeeService.getEmployees().subscribe(
        (data:any)=>{
          console.log(data);
          this.employeeForm.patchValue(data);
        }
        
      )

    }
  )

  this.employeeForm.get('type')?.valueChanges.subscribe(
    (data:any)=>{
      if(data=='remote'){
        this.employeeForm.addControl('wifibill',new FormControl());
        this.employeeForm.removeControl('transbill')
      }
      else{
        this.employeeForm.addControl('transbill', new FormControl());
        this.employeeForm.removeControl('wifibill');
      }
    }
  )

}

public employeeForm:FormGroup=new FormGroup(
  {
    name: new FormControl(),
    company: new FormControl(),
    role: new FormControl(),
    package: new FormControl(),
    dob: new FormControl(),

    address: new FormGroup({
      addressline: new FormControl(),
      city: new FormControl(),
      state: new FormControl(),
      pincode:new FormControl()

    }),

    type: new FormControl(),
    details: new FormArray([])
  });

  get detailsFormArray(){
    return this.employeeForm.get('details') as FormArray
  }

  moredetails(){
    this.detailsFormArray.push(
      new FormGroup({
        hike: new FormControl(),
        workMode: new FormControl(),
        travelBill: new FormControl(),
      })
    )
  }

  delete(i:number){
    this.detailsFormArray.removeAt(i)
  }

 
 
  create(){

  console.log(this.employeeForm.value);
  this._employeeService.createEmployees(this.employeeForm.value).subscribe((data:any)=>{
    console.log(data);
    alert("New Employee Created Successfully..!😎");

    this._router.navigateByUrl("/dashboard/employees")
  },(error:any)=>{
    alert("Internal Server Error")
  })
}

}
