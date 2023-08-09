import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployerService } from '../services/employer/employer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-job-posting',
  templateUrl: './new-job-posting.component.html',
  styleUrls: ['./new-job-posting.component.css']
})
export class NewJobPostingComponent {

  jobPostingForm: FormGroup;
  isLoading: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private employeeService: EmployerService,
    private snackBar: MatSnackBar,
    private router: Router){
    this.jobPostingForm = this.formBuilder.group({
      jobTitle: '',
      jobDesc: '',
      nameOfTeam: '',
      payRange: '',
      location: ''
    })
  }

  ngOnInit(): void{

  }

  submitNewFormData(): void{
    this.isLoading = true;
    console.log(this.jobPostingForm.value);
    let data = {
      job_designation: this.jobPostingForm.value.jobTitle,
      job_description: this.jobPostingForm.value.jobDesc,
      location: this.jobPostingForm.value.location,
      name_of_the_team: this.jobPostingForm.value.nameOfTeam,
      pay_range: this.jobPostingForm.value.payRange
    }
    this.employeeService.postNewJobData(data)
    .subscribe({
      next: response=> {
        this.isLoading = false;
        // if(response.statusCode == 200){
          this.snackBar.open("Job Posting Successful!", 'Dismiss', {
            duration: 2000, // Set the duration (in milliseconds) for how long the snackbar will be displayed
          });
          this.router.navigate(['/dashboard']);
        // }
      }, error: err => {
      // console.log(err);
      this.isLoading = false;
      this.snackBar.open(err, 'Dismiss', {
        duration: 2000, // Set the duration (in milliseconds) for how long the snackbar will be displayed
      });
    }
    });
  }
}
