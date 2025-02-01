import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor( private _httpClient:HttpClient) {}
  getEmployees():Observable<any>{
    return this._httpClient.get("https://6572df5d192318b7db412dfe.mockapi.io/employees")
  }

  getFilteredEmployees(keyword:string):Observable<any>{return this._httpClient.get("https://6572df5d192318b7db412dfe.mockapi.io/employees?filter="+ keyword);
}


getSortedEmployees(columnname:string, order:string):Observable<any>{
  return this._httpClient.get("https://6572df5d192318b7db412dfe.mockapi.io/employees?sortBy=" +columnname + "&order=" + order);
}

getPaginatedEmployees(limit:number, page:number):Observable<any>{

  return this._httpClient.get("https://6572df5d192318b7db412dfe.mockapi.io/employees?limit=" + limit + "&page=" + page)
}

deleteEmployees(id:number){

  return this._httpClient.delete("https://6572df5d192318b7db412dfe.mockapi.io/employees/" + id )
}

createEmployees(data:any){
  return this._httpClient.post("https://6572df5d192318b7db412dfe.mockapi.io/employees",data)
}


}
