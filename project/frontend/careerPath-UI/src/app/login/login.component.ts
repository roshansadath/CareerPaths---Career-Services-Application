import { Component } from '@angular/core';
import { LoginService } from '../services/login/login.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // Property to track loading state
  isLoading: boolean = false;

  // Form group for the login form
  loginForm: FormGroup;
  
  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    // Create the login form using FormBuilder
    this.loginForm = this.formBuilder.group({
      username: '',
      password: '',
    });
  }

  ngOnInit(): void {
    // Component initialization logic
  }

  // Submit login data to the server
  submitLoginData(): void {
    // Output the form values to the console (for testing)
    console.log(this.loginForm.value);

    // Set loading state to true
    this.isLoading = true;

    // Send login data to the service and subscribe to the response
    this.loginService.sendLoginData(this.loginForm.value).subscribe({
      next: response => {
        // On successful login response
        this.isLoading = false;

        // Store the user token in local storage
        localStorage.setItem('userToken', response.token);

        // Emit changes to notify other components
        this.emitChanges();

        // Navigate to the profile page
        this.router.navigate(['/profile']);
      },
      error: err => {
        // On login error
        console.log(err);
        this.isLoading = false;

        // Display a snackbar with an error message
        this.snackBar.open('Username or password incorrect!', 'Dismiss', {
          duration: 2000,
        });
      }
    });  
  }

  // Emit changes using the login service
  emitChanges() {
    this.loginService.notifyChanges();
  }
}
