import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { LoadingSpinner } from "../shared/loading-spinner/loading-spinner";

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule, LoadingSpinner],
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
  isLoading: boolean = false;
  error: string = '';

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    const enteredUsername = this.form.value.username!;
    const enteredPassword = this.form.value.password!;

    this.isLoading = true;

    if (this.isLoginMode) {
      this.authService.login(enteredUsername, enteredPassword).subscribe({
        next: (resData) => {
          console.log(resData);
          this.isLoading = false;
        },
        error: (error: Error) => {
          console.log(error);
          this.isLoading = false;
          this.error = error.message
        },
      });
    } else {
      this.authService.signUp(enteredUsername, enteredPassword).subscribe({
        next: (resData) => {
          console.log(resData);
          this.isLoading = false;
        },
        error: (error: Error) => {
          console.log(error);
          this.isLoading = false;
        },
      });
    }

    this.form.reset();
  }
}
