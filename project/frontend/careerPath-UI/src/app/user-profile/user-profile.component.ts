import { Component } from '@angular/core';
import { UserService } from '../services/user/user.service';

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

ngOnInit(){
  this.getUserDetails();
}

constructor(private userService: UserService){

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

}
