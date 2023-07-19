import { Component } from '@angular/core';
import { EmployerService } from '../services/employer/employer.service';
import { StudentService } from '../services/student/student.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-job-posting-detail',
  templateUrl: './job-posting-detail.component.html',
  styleUrls: ['./job-posting-detail.component.css']
})
export class JobPostingDetailComponent {

  ngOnInit(){
    this.role = this.userService.getRole();
    this.setJobPostingDetailData();
    if(this.role == 'student'){
      this.getAllJobsApplied();
    }
    else{
      this.getStudentList();
    }
  }
  constructor(private employerService: EmployerService,
    private studentService: StudentService,
    private router: Router,
    private userService: UserService){

  }
  jobTitle: string = 'QA';
  jobDesc: string = 'lorem ipsum';
  nameOfTeam: string = 'QA Team';
  payRange: string = '21000';

  postId: number = -1;
  JobApplicationStudentData: any = [];

  role: string = '';
  applied: boolean = false;

  empty: string = '';

  candidateList = [
    { userId: 1, name: 'C1', username: 'C!!!!', email: 'C@gmail.com', role: 'student', status: 'Pending'},
    { userId: 2, name: 'C2', username: 'C!!!!', email: 'C@gmail.com', role: 'student', status: 'Pending'},
    { userId: 3, name: 'C3', username: 'C!!!!', email: 'C@gmail.com', role: 'student', status: 'Pending'},
    { userId: 4, name: 'C4', username: 'C!!!!', email: 'C@gmail.com', role: 'student', status: 'Pending'},
    { userId: 5, name: 'C5', username: 'C!!!!', email: 'C@gmail.com', role: 'student', status: 'Pending'},

  ];

  setJobPostingDetailData(){
    let data = this.employerService.getJobDetail();
    this.jobTitle = data.job_designation;
    this.jobDesc = data.job_description;
    this.nameOfTeam = data.name_of_the_team;
    this.payRange = data.pay_range;
    this.postId = data.postId;
  }


  candidateDetails(candidate: any){
    console.log(candidate)
    this.studentService.setStudentDetails(candidate);
    this.router.navigate(['/profile']);
  }

  applyForJob(){
    let data = {
      status: 'Pending',
      postId: this.postId
    }
    this.studentService.applyForJob(data).subscribe({
      next: response=> {
        window.alert("Applied");
        this.router.navigate(['/dashboard']);
      }, error: err => {
      console.log(err);
    }
    });
  }

  getAllJobsApplied(){
    this.studentService.getAllAppliedJobs().subscribe({
      next: response=> {
        console.log(response);
        let data: any;
        data = response;
        const foundObject = data.find((obj: { postId: number; }) => obj.postId === this.postId);
        console.log(foundObject);
        if(foundObject != undefined){
          this.applied = true;
        }
        else{
          this.applied = false;
        }

      }, error: err => {
      console.log(err);
    }
    })
  }

  handleRejectClick(id: any) {
    // console.log('Child clicked with ID:', id);
    let applicationId = -1;
    for(let i = 0 ; i < this.JobApplicationStudentData.length  ; i++){
      console.log(this.postId + ' ' + id);
      console.log(this.JobApplicationStudentData[i].postId + ' ' + this.JobApplicationStudentData[i].userId);
      if(Number(this.JobApplicationStudentData[i].postId) == this.postId && Number(this.JobApplicationStudentData[i].userId) == id){
        applicationId = this.JobApplicationStudentData[i].applicationId;
        break;
      }
    }
    // console.log(applicationId);
    // Do something with the ID in the parent component
    let body = {
      status: 'Reject',
      postId: this.postId,
      userId: id
    }
    this.employerService.rejectCandidate(applicationId, body).subscribe({
      next: response=> {
        window.alert('Candidate Rejected!');
        this.getStudentList()
      }, error: err => {
      console.log(err);
    }
    })
  }

  handleInviteClick(id: any){
    console.log('Child invite clicked with ID:', id);
    let applicationId = -1;
    // console.log(this.JobApplicationStudentData);
    // console.log(this.postId);
    for(let i = 0 ; i < this.JobApplicationStudentData.length  ; i++){
      if(this.JobApplicationStudentData[i].postId == this.postId && this.JobApplicationStudentData[i].userId == id){
        applicationId = this.JobApplicationStudentData[i].applicationId;
        break;
      }
    }
    let body = {
      status: 'Invite',
      postId: this.postId,
      userId: id
    }
    this.employerService.inviteCandidate(applicationId, body).subscribe({
      next: response=> {
        window.alert('Candidate Invited for Interview!');
        this.getStudentList()
      }, error: err => {
      console.log(err);
    }
    })
  }

  handleDetailClick(id: any){
    
    let foundObject = this.candidateList.find((obj: { userId: number; }) => obj.userId === id);
    this.candidateDetails(foundObject);
    // console.log('Child detail clicked with ID:', id);
  }


  getStudentList(){
    console.log("POPOPOPOP");
    this.studentService.getStudentListOnJobPostings(this.postId).subscribe({
      next: response=> {
        // console.log(response);
        // this.candidateList = response;
        this.JobApplicationStudentData = response; // Assuming the response is an array of student data
      this.candidateList = [];
      // Loop over the student data
      for (let i = 0; i < this.JobApplicationStudentData.length; i++) {
        let student = this.JobApplicationStudentData[i].User;
        student.status = this.JobApplicationStudentData[i].status;
        // Perform operations on each student
        console.log(student);
        this.candidateList.push(student);
      }

      }, error: err => {
      console.log(err);
    }
    })
  }


  
}
