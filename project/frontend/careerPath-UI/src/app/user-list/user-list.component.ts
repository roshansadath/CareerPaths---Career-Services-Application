import { Component } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  ngOnInit(){
    this.getAllUsers();
  }

  constructor(private userService: UserService,
    private router: Router){}
  userList: any;
  empty= '';

  getAllUsers(){
    this.userService.getAllUsers().subscribe({
      next: response=> {
        this.userList = response;
      }, error: err => {
      console.log(err);
    }
    });
  }

  handleDetailClick(id: any){
    
    let foundObject = this.userList.find((obj: { userId: number; }) => obj.userId === id);

    this.router.navigate(['/user/detail']);
    this.userService.updateUserDetail(foundObject);
    
  }

  handleRemoveClick(id: any){
    this.userService.removeUser(id).subscribe({
      next: response=> {
        // this.userList = response;
        window.alert('User Deleted!');
        this.getAllUsers();
      }, error: err => {
      console.log(err);
    }
    });
  }

  

}
