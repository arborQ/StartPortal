import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { SignInService } from '../sign-in.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.less']
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private signInService: SignInService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      login: new FormControl('admin', Validators.required),
      password: new FormControl('admin', Validators.required),
    });
  }

  onLoginFormSubmited(): void {
    const login = this.loginForm.get('login').value;
    const password = this.loginForm.get('password').value;

    this.signInService
      .signIn(login, password)
      .toPromise()
      .finally(() => {
        alert('done');
      });
  }
}
