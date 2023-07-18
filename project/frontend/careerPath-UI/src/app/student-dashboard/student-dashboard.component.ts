import { Component } from '@angular/core';
import { StudentService } from '../services/student/student.service';
import { Router } from '@angular/router';
import { EmployerService } from '../services/employer/employer.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent {
  searchTerm: string = '';
  constructor(private studentService: StudentService,
    private router: Router,
    private employerService: EmployerService){

  }
  jobPosting = [
    {title: 'Developer', desc: 'Lorem ipsum dolor sit amet, consectetur adip...', location: 'Montreal', date: '20/07/2023'},
    {title: 'HR', desc: 'Lorem ipsum dolor sit amet, consectetur adip...', location: 'Toronto', date: '20/07/2023'},
    {title: 'Developer', desc: 'Lorem ipsum dolor sit amet, consectetur adip...', location: 'Toronto', date: '22/07/2023'},
    {title: 'QA', desc: 'Lorem ipsum dolor sit amet, consectetur adip...', location: 'Montreal', date: '20/07/2023'},
    {title: 'Developer', desc: 'Lorem ipsum dolor sit amet, consectetur adip...', location: 'Montreal', date: '20/07/2023'},
    {title: 'HR', desc: 'Lorem ipsum dolor sit amet, consectetur adip...', location: 'Toronto', date: '20/07/2023'},
    {title: 'Developer', desc: 'Lorem ipsum dolor sit amet, consectetur adip...', location: 'Toronto', date: '22/07/2023'},
    {title: 'QA', desc: 'Lorem ipsum dolor sit amet, consectetur adip...', location: 'Montreal', date: '20/07/2023'}
  ];

  getJobPostings(){
    this.studentService.getAllJobPostingListData().subscribe({
      next: response=> {
        this.jobPosting = response;
      }, error: err => {
      console.log(err);
    }
    });
  }

  openJobDetail(job: any){
    console.log(job);
    this.employerService.getJobDetail(job);
    this.router.navigate(['/dashboard/posting']);
  }
}
