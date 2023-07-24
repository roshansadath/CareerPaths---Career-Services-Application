import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  constructor(private userService: UserService, private cdr: ChangeDetectorRef){
    
  }
  ngOnInit(){
    
    // this.userService.userDetailChanges$.subscribe((data) => {
      
    //   this.userData = data;
    //   console.log(this.userData);
    //   this.cdr.detectChanges();
    // });

    this.userData = this.userService.userData;
  }
  userData: any | undefined;

  
}
