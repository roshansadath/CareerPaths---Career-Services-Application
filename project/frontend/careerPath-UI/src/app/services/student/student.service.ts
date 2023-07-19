import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIUrl } from 'src/app/constants/constant';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  candidateDetails = {};
  private internalDataCall: boolean = false;


  getAllJobPostingListData(): Observable<any>{
    return this.http.get(`${APIUrl}/job_post/alljobpost`);
  }

  setInternalDataValue(val: boolean){
    this.internalDataCall = val;
  }

  getInternalDataValue(){
    return this.internalDataCall;
  }

  setStudentDetails(candidate: any){
    this.candidateDetails = candidate;
    this.setInternalDataValue(true);
  }

  uploadFile(formData: any): Observable<any>{
    return this.http.post(`${APIUrl}/file/upload`, formData);
  }

  applyForJob(data: any){
    const token = localStorage.getItem('userToken');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.post(`${APIUrl}/job_application`,data ,{ headers: headers });
  }

  getAllAppliedJobs(){
    const token = localStorage.getItem('userToken');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get(`${APIUrl}/job_application` ,{ headers: headers });
  }

}
