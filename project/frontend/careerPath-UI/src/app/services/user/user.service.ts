import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { APIUrl } from 'src/app/constants/constant';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  role: string = '';
  count: number = 0;

  private roleSubject = new Subject<string>();
  changes$ = this.roleSubject.asObservable();

  userDetailSubject = new Subject<string>();
  userDetailChanges$ = this.userDetailSubject.asObservable();

  userData: any;

  notifyChanges(role: string) {
    this.roleSubject.next(role);
  }

  updateUserDetail(data: any){
    console.log('HELLOO');
    this.userData = data;
    this.userDetailSubject.next(data);
  }

  setRole(role: string){
    this.notifyChanges(role);
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

  getAllUsers(): Observable<any>{
    return this.http.get(`${APIUrl}/user/getalluser`);
  }

  removeUser(id: number): Observable<any>{
    return this.http.delete(`${APIUrl}/user/${id}`);
  }

  openCV(cvFileName: any): Observable<any>{
    return this.http.get(`${APIUrl}/upload/viewcv/${cvFileName}`);
  }

  getAllQueryData(postId: any): Observable<any>{
    return this.http.get(`${APIUrl}/querypost/jobpost/${postId}`);
  }

  postQuery(data: any): Observable<any>{
    const token = localStorage.getItem('userToken');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.post(`${APIUrl}/querypost`, data, {headers: headers});
  }
}
