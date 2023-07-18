import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginService } from '../services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private loginService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router){
      this.signupForm = this.formBuilder.group({
        signupName: '',
        signupUsername: '',
        signupEmail: '',
        signupPassword: '',
        role: ''
      });
    }


  ngOnInit(): void{

  }

  submitSignupData(){
    console.log(this.signupForm.value);
    this.loginService.sendSignupData(this.signupForm.value)
    .subscribe({
      next: response=> {

      }, error: err => {
      console.log(err);
      this.router.navigate(['/profile']);
    }
    });  
  }
}
