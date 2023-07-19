import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIUrl } from 'src/app/constants/constant';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  role: string = '';
  count: number = 0;

  setRole(role: string){
    console.log(this.count);
    if(this.count == 0){
      console.log(role);
      this.role = role;
      this.count++;
      console.log('Called 1');
    }
    console.log('Called 2');
  }

  getRole(){
    console.log(this.role);
    return this.role;
  }

  getUserData(): Observable<any>{
    const token = localStorage.getItem('userToken');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get(`${APIUrl}/user`, {headers: headers});
  }
}
