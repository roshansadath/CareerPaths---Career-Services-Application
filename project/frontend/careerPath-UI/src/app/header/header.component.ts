import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  setter = 0;
  ngOnInit(){
    this.setter = 1;
  }
  constructor(private router: Router,
    private userService: UserService){

  }
  logout(){
    this.userService.count = 0;
    this.router.navigate(['/login']);
  }
}
