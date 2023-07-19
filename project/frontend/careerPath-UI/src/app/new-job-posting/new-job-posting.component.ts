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
      payRange: '',
      location: ''
    })
  }

  ngOnInit(): void{

  }

  submitNewFormData(): void{
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
        // if(response.statusCode == 200){
          window.alert("Job Posting Successful!");
        // }
      }, error: err => {
      console.log(err);
    }
    });
  }
}
