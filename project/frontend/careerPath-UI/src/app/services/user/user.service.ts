import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIUrl } from 'src/app/constants/constant';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  role: string = '';

  setRole(role: string){
    this.role = role;
  }

  getRole(){
    return this.role;
  }

  getUserData(): Observable<any>{
    return this.http.get(`${APIUrl}/user/details`);
  }
}
