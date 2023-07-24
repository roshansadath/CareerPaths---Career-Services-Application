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
    this.loginService.sendSignupData(this.signupForm.value)
    .subscribe({
      next: response=> {
        window.alert('Account Created!');
        this.router.navigate(['/login']);
      }, error: err => {
      // console.log(err);
      // window.alert('Account Created!');
      // this.router.navigate(['/login']);
      // this.router.navigate(['/profile']);
    }
    });  
  }
}
