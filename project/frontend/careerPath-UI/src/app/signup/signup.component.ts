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
  isLoading: boolean = false;
  signupForm: FormGroup;

  constructor(private loginService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar){
      this.signupForm = this.formBuilder.group({
        username: '',
        name: '',
        email: '',
        password: '',
        userType: ''
      });
    }


  ngOnInit(): void{

  }

  submitSignupData(){
    console.log(this.signupForm.value);
    this.isLoading = true;
    this.loginService.sendSignupData(this.signupForm.value)
    .subscribe({
      next: response=> {
        this.isLoading = false;
        this.snackBar.open('Account Created!', 'Dismiss', {
          duration: 2000, // Set the duration (in milliseconds) for how long the snackbar will be displayed
        });
        this.router.navigate(['/login']);
      }, error: err => {
      // console.log(err);
      this.isLoading = false;
      this.snackBar.open(err, 'Dismiss', {
        duration: 2000, // Set the duration (in milliseconds) for how long the snackbar will be displayed
      });
    }
    });  
  }
}
