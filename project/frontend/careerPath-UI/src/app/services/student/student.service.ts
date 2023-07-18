import { HttpClient } from '@angular/common/http';
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
    return this.http.get(`${APIUrl}/student/postings`);
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
}
