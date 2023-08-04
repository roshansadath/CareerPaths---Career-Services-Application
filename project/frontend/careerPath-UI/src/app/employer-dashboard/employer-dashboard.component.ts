import { Component } from '@angular/core';
import { EmployerService } from '../services/employer/employer.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-employer-dashboard',
  templateUrl: './employer-dashboard.component.html',
  styleUrls: ['./employer-dashboard.component.css']
})
export class EmployerDashboardComponent {
  searchTerm: string = '';
  isLoading: boolean = false;
  ngOnInit(){
    this.getJobPostings();
  }

  constructor(private employerService: EmployerService,
    private router: Router,
    private snackBar: MatSnackBar){

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
    this.isLoading = true;
    this.employerService.getJobPostingListData().subscribe({
      next: response=> {
        this.isLoading = false;
        this.jobPosting = response;
      }, error: err => {
      console.log(err);
      this.isLoading = false;
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
      this.isLoading = true;
      this.employerService.deleteJobPosting(job.postId).subscribe({
            next: response=> {
              this.isLoading = false;
              this.snackBar.open('Job Posting Deleted!', 'Dismiss', {
                duration: 2000, // Set the duration (in milliseconds) for how long the snackbar will be displayed
              });
              this.getJobPostings();
            }, error: err => {
            console.log(err);
            this.isLoading = false;
            this.snackBar.open(err, 'Dismiss', {
              duration: 2000, // Set the duration (in milliseconds) for how long the snackbar will be displayed
            });
          }
          });
    }
    
  }
}
