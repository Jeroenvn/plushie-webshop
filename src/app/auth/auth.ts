import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.sass'
})
export class Auth {

  form = new FormGroup({
    username: new FormControl('', {
      validators: [Validators.required, Validators.minLength(4)]
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)]
    })
  });

  get usernameIsInvalid() {
    return this.form.controls.username.touched && 
      this.form.controls.username.dirty && 
      this.form.controls.username.invalid
  }

  get passwordIsInvalid() {
    return this.form.controls.password.touched && 
      this.form.controls.password.dirty && 
      this.form.controls.password.invalid
  }

  isLoginMode: boolean = true;

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    const enteredUsername = this.form.value.username;
    console.log(enteredUsername);
    this.form.reset();
  }
}
