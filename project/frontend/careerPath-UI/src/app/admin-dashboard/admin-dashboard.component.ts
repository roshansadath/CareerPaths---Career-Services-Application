import { Component } from '@angular/core';
import { StudentService } from '../services/student/student.service';
import { Router } from '@angular/router';
import { EmployerService } from '../services/employer/employer.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  ngOnInit(){
    this.getJobPostings();
  }
  searchTerm: string = '';
  constructor(private studentService: StudentService,
    private router: Router,
    
    private employerService: EmployerService){

  }
  jobPosting:any;
  /*jobPosting = [
    {title: 'Developer', desc: 'Lorem ipsum dolor sit amet, consectetur adip...', location: 'Montreal', date: '20/07/2023'},
    {title: 'HR', desc: 'Lorem ipsum dolor sit amet, consectetur adip...', location: 'Toronto', date: '20/07/2023'},
    {title: 'Developer', desc: 'Lorem ipsum dolor sit amet, consectetur adip...', location: 'Toronto', date: '22/07/2023'},
    {title: 'QA', desc: 'Lorem ipsum dolor sit amet, consectetur adip...', location: 'Montreal', date: '20/07/2023'},
    {title: 'Developer', desc: 'Lorem ipsum dolor sit amet, consectetur adip...', location: 'Montreal', date: '20/07/2023'},
    {title: 'HR', desc: 'Lorem ipsum dolor sit amet, consectetur adip...', location: 'Toronto', date: '20/07/2023'},
    {title: 'Developer', desc: 'Lorem ipsum dolor sit amet, consectetur adip...', location: 'Toronto', date: '22/07/2023'},
    {title: 'QA', desc: 'Lorem ipsum dolor sit amet, consectetur adip...', location: 'Montreal', date: '20/07/2023'}
  ];*/

  getJobPostings(){
    this.studentService.getAllJobPostingListData().subscribe({
      next: response=> {
        this.jobPosting = response;
      }, error: err => {
      console.log(err);
    }
    });
  }

  openJobDetail(id: any){
    console.log(id);
    let foundObject = this.jobPosting.find((obj: { postId: number; }) => obj.postId === id);
    this.router.navigate(['/dashboard/posting']);
    this.employerService.setJobDetail(foundObject);
    
  }

  handleRemoveClick(id: any){
    this.employerService.deleteJobPosting(id).subscribe({
      next: response=> {
        window.alert('Job Posting Deleted!');
        this.getJobPostings();
      }, error: err => {
      console.log(err);
    }
    });
  }

}
