import { Component } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private router: Router,
    private snackBar: MatSnackBar){}
  userList: any;
  empty= '';
  isLoading: boolean = false;

  getAllUsers(){
    this.isLoading = true;
    this.userService.getAllUsers().subscribe({
      next: response=> {
        this.isLoading = false;
        this.userList = response;
      }, error: err => {
      console.log(err);
      this.isLoading = false;
    }
    });
  }

  handleDetailClick(id: any){
    
    let foundObject = this.userList.find((obj: { userId: number; }) => obj.userId === id);

    this.router.navigate(['/user/detail']);
    this.userService.updateUserDetail(foundObject);
    
  }

  handleRemoveClick(id: any){
    this.isLoading = true;
    this.userService.removeUser(id).subscribe({
      next: response=> {
        this.isLoading = false;
        // this.userList = response;
        this.snackBar.open('User Deleted!', 'Dismiss', {
          duration: 2000, // Set the duration (in milliseconds) for how long the snackbar will be displayed
        });
        this.getAllUsers();
      }, error: err => {
      console.log(err);
      this.isLoading = false;
    }
    });
  }

  

}
