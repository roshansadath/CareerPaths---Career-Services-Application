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
  
  ngOnInit() {
    // Component initialization logic
    this.setter = 1;

    // Subscribe to changes in the login service
    this.subscription = this.loginService.changes$.subscribe(() => {
      this.handleChanges();
    });

    // Subscribe to changes in the user service
    this.HeaderSubscription = this.userService.changes$.subscribe((data) => {
      console.log(data);
      this.role = data;
    });
  }

  constructor(
    private router: Router,
    private userService: UserService,
    private loginService: LoginService
  ) {
    // Constructor logic
  }

  logout() {
    // Logout logic
    this.userService.count = 0;
    this.showNavOptions = false;
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    // Unsubscribe from subscriptions to prevent memory leaks
    // this.subscription.unsubscribe();
  }

  handleChanges() {
    // Handle changes from the login service
    this.showNavOptions = true;
    // this.message = 'Changes occurred!';
  }
}
