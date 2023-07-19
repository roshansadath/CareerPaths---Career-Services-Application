import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIUrl } from 'src/app/constants/constant';
import { Subject } from 'rxjs';
 

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class LoginService {

  constructor(private http: HttpClient) { }

  private changesSubject = new Subject<void>();
  changes$ = this.changesSubject.asObservable();

  notifyChanges() {
    this.changesSubject.next();
  }

  sendLoginData(data: any): Observable<any>{
    console.log(data);
    // let formData = JSON.stringify(data);
    return this.http.post(`${APIUrl}/login`, data);
  }

  sendSignupData(data: any): Observable<any>{
    console.log(data);
    // let formData = JSON.stringify(data);
    return this.http.post(`${APIUrl}/user`, data);
  }
}
