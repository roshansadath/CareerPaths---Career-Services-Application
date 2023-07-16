import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIUrl } from 'src/app/constants/constant';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {

  constructor(private http: HttpClient) { }

  getJobPostingData(): Observable<any>{
    return this.http.get(`${APIUrl}/employer/postings`);
  }

  postNewJobData(data: any): Observable<any>{
    return this.http.post(`${APIUrl}/employer/post/job`, data);
  }
}
