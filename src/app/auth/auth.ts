import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.sass',
})
export class Auth {
  private authService = inject(AuthService);

  form = new FormGroup({
    username: new FormControl('', {
      validators: [Validators.required, Validators.minLength(4)],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  get usernameIsInvalid() {
    return (
      this.form.controls.username.touched &&
      this.form.controls.username.dirty &&
      this.form.controls.username.invalid
    );
  }

  get passwordIsInvalid() {
    return (
      this.form.controls.password.touched &&
      this.form.controls.password.dirty &&
      this.form.controls.password.invalid
    );
  }

  isLoginMode: boolean = true;

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    const enteredUsername = this.form.value.username!;
    const enteredPassword = this.form.value.password!;
    if (this.isLoginMode) {
      // ...
    } else {
      this.authService.signUp(enteredUsername, enteredPassword).subscribe({
        next: (resData) => console.log(resData),
        error: (error: Error) => console.log(error),
      });
    }

    this.form.reset();
  }
}
