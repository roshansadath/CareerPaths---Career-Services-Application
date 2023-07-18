import { Component } from '@angular/core';
import { LoginService } from '../services/login/login.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  
  constructor(private loginService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router){
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
    this.loginService.sendLoginData(this.loginForm.value)
    .subscribe({
      next: response=> {

      }, error: err => {
      console.log(err);
      this.router.navigate(['/profile']);
    }
    });  
  }
}
