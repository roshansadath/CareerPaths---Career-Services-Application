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
  // Initialize user list on component initialization
  ngOnInit() {
    this.getAllUsers();
  }

  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  // Property to hold the list of users
  userList: any;
  
  // Property to display when userList is empty
  empty = '';

  // Property to track loading state
  isLoading: boolean = false;

  // Fetch all users from the server
  getAllUsers() {
    this.isLoading = true;

    // Get user data from the service and subscribe to the response
    this.userService.getAllUsers().subscribe({
      next: response => {
        // On successful response
        this.isLoading = false;
        this.userList = response;
      },
      error: err => {
        // On error
        console.log(err);
        this.isLoading = false;
      }
    });
  }

  // Handle click on user details
  handleDetailClick(id: any) {
    // Find the clicked user from the userList
    let foundObject = this.userList.find(
      (obj: { userId: number }) => obj.userId === id
    );

    // Navigate to user detail page and update the user detail in service
    this.router.navigate(['/user/detail']);
    this.userService.updateUserDetail(foundObject);
  }

  // Handle click to remove user
  handleRemoveClick(id: any) {
    this.isLoading = true;

    // Send request to remove user and subscribe to the response
    this.userService.removeUser(id).subscribe({
      next: response => {
        // On successful removal
        this.isLoading = false;

        // Display a snackbar with a success message
        this.snackBar.open('User Deleted!', 'Dismiss', {
          duration: 2000,
        });

        // Fetch updated user list
        this.getAllUsers();
      },
      error: err => {
        // On error
        console.log(err);
        this.isLoading = false;
      }
    });
  }
}
