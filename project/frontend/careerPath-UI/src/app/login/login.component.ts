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
  isLoading: boolean = false;
  loginForm: FormGroup;
  
  constructor(private loginService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar){
      this.loginForm = this.formBuilder.group({
        username: '',
        password: '',
      });
    }


  ngOnInit(): void{

  }

  submitLoginData(): void{
    // let data = '';
    console.log(this.loginForm.value);
    this.isLoading = true;
    this.loginService.sendLoginData(this.loginForm.value)
    .subscribe({
      next: response=> {
        this.isLoading = false;
        localStorage.setItem('userToken', response.token);
        this.emitChanges();
        this.router.navigate(['/profile']);
      }, error: err => {
      console.log(err);
      this.isLoading = false;
      this.snackBar.open('Username or password incorrect!', 'Dismiss', {
        duration: 2000, // Set the duration (in milliseconds) for how long the snackbar will be displayed
      });
    }
    });  
  }
  emitChanges() {
    this.loginService.notifyChanges();
  }
}
