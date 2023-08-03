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
  ngOnInit(){
    this.getJobPostings();
  }
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

  isModalOpen = false;

  modalData: any;
  showModal(data: any) {
    this.isModalOpen = true;
    this.modalData = data;
  }


  getJobPostings(){
    this.studentService.getAllJobPostingListData().subscribe({
      next: response=> {
        this.jobPosting = response;
        this.getAllJobStatus();
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

  getAllJobStatus(){
    this.studentService.getAllAppliedJobs().subscribe({
      next: response=> {
        console.log(response);
        let data: any;
        data = response;
        for(let i = 0 ; i < data.length ; i++){
          if(data[i].status == 'Reject' || data[i].status == 'Invite'){
            // if(data.length > 0){
              this.showModal(data);
              break;
            // }
          }
        }

      }, error: err => {
      console.log(err);
    }
    })
  }

  closeDialog(){
    this.isModalOpen = false;
  }
}
