import { Component } from '@angular/core';
import { EmployerService } from '../services/employer/employer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employer-dashboard',
  templateUrl: './employer-dashboard.component.html',
  styleUrls: ['./employer-dashboard.component.css']
})
export class EmployerDashboardComponent {
  searchTerm: string = '';
  ngOnInit(){
    this.getJobPostings();
  }

  constructor(private employerService: EmployerService,
    private router: Router){

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
    this.employerService.getJobPostingListData().subscribe({
      next: response=> {
        this.jobPosting = response;
      }, error: err => {
      console.log(err);
    }
    });
  }

  openJobDetail(job: any){
    console.log(job);
    this.employerService.setJobDetail(job);
    this.router.navigate(['/dashboard/posting']);
  }

  deletePost(job: any){
    console.log(job);
    const result = window.confirm('Are you sure you want to delete this Post?');
    if(result){
      this.employerService.deleteJobPosting(job.postId).subscribe({
            next: response=> {
              // window.alert('Job Posting Deleted!');
              this.getJobPostings();
            }, error: err => {
            console.log(err);
          }
          });
    }
    
  }
}
