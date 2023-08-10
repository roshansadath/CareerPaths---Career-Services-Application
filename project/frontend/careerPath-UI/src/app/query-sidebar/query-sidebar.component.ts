import { Component, Input } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-query-sidebar',
  templateUrl: './query-sidebar.component.html',
  styleUrls: ['./query-sidebar.component.css']
})
export class QuerySidebarComponent {
  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    // Component initialization logic
    // If the role is admin, get query data
    if (this.role == 'admin') {
      this.getQueryData();
    }
  }

  // Property to control the display of the sidebar
  display: boolean = false;

  // Input properties received from parent component
  @Input() role: string | undefined;
  @Input() postId: number | undefined;

  // Toggle the sidebar display
  toggle() {
    this.display = !this.display;
  }

  // Property to hold query data
  queryData: any;
  // Property to hold query description
  desc: string = '';

  // Get query data from the server
  getQueryData() {
    this.userService.getAllQueryData(this.postId).subscribe({
      next: response => {
        this.queryData = response;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  // Post a new query
  postQuery() {
    // Prepare data for posting query
    let data = {
      description: this.desc,
      postId: this.postId
    };

    // Send query data to the service and subscribe to the response
    this.userService.postQuery(data).subscribe({
      next: response => {
        // Display a snackbar with a success message
        this.snackBar.open('Query Posted!', 'Dismiss', {
          duration: 2000,
        });
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
