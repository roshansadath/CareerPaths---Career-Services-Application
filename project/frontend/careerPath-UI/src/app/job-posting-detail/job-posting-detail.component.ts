import { Component } from '@angular/core';
import { EmployerService } from '../services/employer/employer.service';

@Component({
  selector: 'app-job-posting-detail',
  templateUrl: './job-posting-detail.component.html',
  styleUrls: ['./job-posting-detail.component.css']
})
export class JobPostingDetailComponent {

  ngOnInit(){

  }
  constructor(private employerService: EmployerService){

  }
  jobTitle: string = 'QA';
  jobDesc: string = 'lorem ipsum';
  nameOfTeam: string = 'QA Team';
  payRange: string = '21000';

  empty: string = '';

  candidateList = [
    { name: 'C1'},
    { name: 'C2'},
    { name: 'C3'},
    { name: 'C4'},
    { name: 'C5'}
  ]

  
}
