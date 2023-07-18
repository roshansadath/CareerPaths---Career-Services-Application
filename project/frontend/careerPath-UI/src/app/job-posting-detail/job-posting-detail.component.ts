import { Component } from '@angular/core';
import { EmployerService } from '../services/employer/employer.service';
import { StudentService } from '../services/student/student.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-job-posting-detail',
  templateUrl: './job-posting-detail.component.html',
  styleUrls: ['./job-posting-detail.component.css']
})
export class JobPostingDetailComponent {

  ngOnInit(){
    this.role = this.userService.getRole();
  }
  constructor(private employerService: EmployerService,
    private studentService: StudentService,
    private router: Router,
    private userService: UserService){

  }
  jobTitle: string = 'QA';
  jobDesc: string = 'lorem ipsum';
  nameOfTeam: string = 'QA Team';
  payRange: string = '21000';

  role: string = '';

  empty: string = '';

  candidateList = [
    { name: 'C1', username: 'C!!!!', email: 'C@gmail.com', role: 'student'},
    { name: 'C2', username: 'C!!!!', email: 'C@gmail.com', role: 'student'},
    { name: 'C3', username: 'C!!!!', email: 'C@gmail.com', role: 'student'},
    { name: 'C4', username: 'C!!!!', email: 'C@gmail.com', role: 'student'},
    { name: 'C5', username: 'C!!!!', email: 'C@gmail.com', role: 'student'},

  ]


  candidateDetails(candidate: any){
    console.log(candidate)
    this.studentService.setStudentDetails(candidate);
    this.router.navigate(['/profile']);
  }

  
}
