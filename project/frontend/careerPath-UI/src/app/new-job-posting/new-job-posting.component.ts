import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployerService } from '../services/employer/employer.service';

@Component({
  selector: 'app-new-job-posting',
  templateUrl: './new-job-posting.component.html',
  styleUrls: ['./new-job-posting.component.css']
})
export class NewJobPostingComponent {

  jobPostingForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private employeeService: EmployerService){
    this.jobPostingForm = this.formBuilder.group({
      jobTitle: '',
      jobDesc: '',
      nameOfTeam: '',
      payRange: ''
    })
  }

  ngOnInit(): void{

  }

  submitNewFormData(): void{
    this.employeeService.postNewJobData(this.jobPostingForm.value)
    .subscribe({
      next: response=> {
        if(response.statusCode == 200){
          window.alert("Job Posting Successful!");
        }
      }, error: err => {
      console.log(err);
    }
    });
  }
}
