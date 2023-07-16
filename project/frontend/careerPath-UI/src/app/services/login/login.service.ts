import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIUrl } from 'src/app/constants/constant';
 

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class LoginService {

  constructor(private http: HttpClient) { }

  sendLoginData(data: any): Observable<any>{
    console.log(data);
    return this.http.post(`${APIUrl}/login`, data);
  }
}
