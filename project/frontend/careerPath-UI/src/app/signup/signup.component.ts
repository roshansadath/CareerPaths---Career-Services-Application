import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginService } from '../services/login/login.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  // Property to track loading state
  isLoading: boolean = false;

  // Form group for the signup form
  signupForm: FormGroup;

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    // Create the signup form using FormBuilder
    this.signupForm = this.formBuilder.group({
      username: '',
      name: '',
      email: '',
      password: '',
      userType: ''
    });
  }

  ngOnInit(): void {
    // Component initialization logic
  }

  // Submit signup data to the server
  submitSignupData() {
    // Output the form values to the console (for testing)
    console.log(this.signupForm.value);

    // Set loading state to true
    this.isLoading = true;

    // Send signup data to the service and subscribe to the response
    this.loginService.sendSignupData(this.signupForm.value).subscribe({
      next: response => {
        // On successful signup response
        this.isLoading = false;

        // Display a snackbar with a success message
        this.snackBar.open('Account Created!', 'Dismiss', {
          duration: 2000,
        });

        // Navigate to the login page
        this.router.navigate(['/login']);
      },
      error: err => {
        // On signup error
        this.isLoading = false;

        // Display a snackbar with an error message
        this.snackBar.open(err, 'Dismiss', {
          duration: 2000,
        });
      }
    });
  }
}
