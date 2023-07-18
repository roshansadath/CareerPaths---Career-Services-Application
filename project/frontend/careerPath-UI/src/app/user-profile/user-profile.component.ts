import { Component } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { StudentService } from '../services/student/student.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
name: string = 'John Doe';
username: string = 'Joe123';
email: string = 'joe@gmail.com';
role: string = 'Student';

tempInternalData: boolean = false;

ngOnInit(){
  this.tempInternalData = this.studentService.getInternalDataValue()
  if(this.tempInternalData){
    let candidateData: any;
    candidateData = this.studentService.candidateDetails;
    this.name = candidateData.name;
    this.username = candidateData.username;
    this.email = candidateData.email;
    this.role = candidateData.role;
  }
  else{
    this.getUserDetails();
  }
}

constructor(private userService: UserService,
  private studentService: StudentService){

}

ngOnDestroy(){
  this.studentService.setInternalDataValue(false);
  this.tempInternalData = false;
}

getUserDetails(){
  this.userService.getUserData()
  .subscribe({
    next: response=> {
      this.name = response.name;
      this.email = response.email;
      this.username = response.username;
      this.role = response.role;
    }, error: err => {
    console.log(err);
  }
  });
}

uploadFileUpdated(file: any){
  console.log(file);
}

}
