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
  // Form group for the job posting form
  jobPostingForm: FormGroup;
  // Property to track loading state
  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployerService,
    private snackBar: MatSnackBar,
    private router: Router){
    this.jobPostingForm = this.formBuilder.group({
      jobTitle: '',
      jobDesc: '',
      nameOfTeam: '',
      payRange: '',
      location: ''
    });
  }

  ngOnInit(): void {
    // Component initialization logic
  }

  // Submit new job posting data to the server
  submitNewFormData(): void {
    // Set loading state to true
    this.isLoading = true;

    // Output the form values to the console (for testing)
    console.log(this.jobPostingForm.value);

    // Prepare data for new job posting
    let data = {
      job_designation: this.jobPostingForm.value.jobTitle,
      job_description: this.jobPostingForm.value.jobDesc,
      location: this.jobPostingForm.value.location,
      name_of_the_team: this.jobPostingForm.value.nameOfTeam,
      pay_range: this.jobPostingForm.value.payRange
    };

    // Send new job posting data to the service and subscribe to the response
    this.employeeService.postNewJobData(data).subscribe({
      next: response => {
        // On successful job posting response
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
