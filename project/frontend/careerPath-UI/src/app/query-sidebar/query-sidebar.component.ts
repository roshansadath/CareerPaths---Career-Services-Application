import { Component, Input } from '@angular/core';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-query-sidebar',
  templateUrl: './query-sidebar.component.html',
  styleUrls: ['./query-sidebar.component.css']
})
export class QuerySidebarComponent {
  constructor(private userService: UserService){}
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
        window.alert('Query Posted!');
      }, error: err => {
      console.log(err);
    }
    });
    // console.log(this.desc);
  }
}
