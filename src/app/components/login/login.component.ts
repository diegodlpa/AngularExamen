import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserInfo } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  constructor(private loginservicio: LoginService, private router: Router, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      email: '',
      password: '',
    });
  }
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  inicar()
  {
    console.log(this.formGroup.value);
    
    let userInfo: UserInfo = Object.assign({}, this.formGroup.value);
   this.loginservicio.login(userInfo).subscribe(token => this.recibirToken(token),
   error => this.manejarError(error) )
    
  }
  recibirToken(token) {
    localStorage.setItem('token', token.token);
    localStorage.setItem('tokenExpiration', token.expiration);
    this.router.navigate([""]);
  }
  manejarError(error) {
    if (error && error.error) {
      alert(error.error[""]);
    }
  }
   logout() {
    this.loginservicio.logout();
    this.router.navigate(['/']);
  }
  estaLogueado()
  {
    return this.loginservicio.estaLogueado();
  }
}
