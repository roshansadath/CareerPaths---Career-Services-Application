import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { Subscription } from 'rxjs';
import { LoginService } from '../services/login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  showNavOptions: boolean = false;
  setter = 0;
  private subscription: Subscription | undefined;
  private HeaderSubscription: Subscription | undefined;

  role: string | undefined;
  
  ngOnInit(){
    this.setter = 1;

    this.subscription = this.loginService.changes$.subscribe(() => {
      this.handleChanges();
    });

    this.HeaderSubscription = this.userService.changes$.subscribe((data) => {
      console.log(data);
      this.role = data;
    });
  }
  constructor(private router: Router,
    private userService: UserService,
    private loginService: LoginService){

  }
  logout(){
    this.userService.count = 0;
    this.showNavOptions = false;
    this.router.navigate(['/login']);
    
  }
  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

  handleChanges() {
    this.showNavOptions = true;
    // this.message = 'Changes occurred!';

  }
}
