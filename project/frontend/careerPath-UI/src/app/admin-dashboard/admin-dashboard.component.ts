import { Component } from '@angular/core';
import { StudentService } from '../services/student/student.service';
import { Router } from '@angular/router';
import { EmployerService } from '../services/employer/employer.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  isLoading: boolean = false;
  constructor(private studentService: StudentService,
    private router: Router,
    private snackBar: MatSnackBar,    
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
    this.isLoading = true;
    this.studentService.getAllJobPostingListData().subscribe({
      next: response=> {
        this.isLoading = false;
        this.jobPosting = response;
      }, error: err => {
      console.log(err);
      this.isLoading = false;
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
    this.isLoading = true;
    this.employerService.deleteJobPosting(id).subscribe({
      next: response=> {
        this.isLoading = false;
        this.snackBar.open('Job Posting Deleted!', 'Dismiss', {
          duration: 2000, // Set the duration (in milliseconds) for how long the snackbar will be displayed
        });
        this.getJobPostings();
      }, error: err => {
      console.log(err);
      this.snackBar.open(err, 'Dismiss', {
        duration: 2000, // Set the duration (in milliseconds) for how long the snackbar will be displayed
      });
      this.isLoading = false;
    }
    });
  }

}
