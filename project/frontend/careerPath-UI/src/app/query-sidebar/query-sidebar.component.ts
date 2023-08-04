import { Component, Input } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-query-sidebar',
  templateUrl: './query-sidebar.component.html',
  styleUrls: ['./query-sidebar.component.css']
})
export class QuerySidebarComponent {
  constructor(private userService: UserService,
    private snackBar: MatSnackBar){}
  ngOnInit(){
    if(this.role == 'admin'){
      this.getQueryData();
    }
  }
  display: boolean = false;

  @Input() role: string | undefined;
  @Input() postId: number | undefined;

  toggle(){
    this.display = !this.display;
  }

  queryData: any;
  desc: string = '';

  getQueryData(){
    this.userService.getAllQueryData(this.postId).subscribe({
      next: response=> {
        this.queryData = response;
      }, error: err => {
      console.log(err);
    }
    });
  }

  postQuery(){
    let data = {
      description : this.desc,
      postId : this.postId
    }
    this.userService.postQuery(data).subscribe({
      next: response=> {
        // this.queryData = response;
        this.snackBar.open('Query Posted!', 'Dismiss', {
          duration: 2000, // Set the duration (in milliseconds) for how long the snackbar will be displayed
        });
      }, error: err => {
      console.log(err);
    }
    });
    // console.log(this.desc);
  }
}
