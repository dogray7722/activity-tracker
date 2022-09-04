import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { SnackBarService } from 'src/app/services/snack-bar-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private snackBarService: SnackBarService) { }

  ngOnInit(): void {
  }

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  registrationForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmation: ['', [Validators.required, Validators.minLength(6)]]
  })

  onSubmitLogin() {
    console.log(this.loginForm.value)
    this.loginForm.reset()
  }

  onSubmitRegister() {
    this.loading = true
    if (this.registrationForm.value["password"] !== this.registrationForm.value["confirmation"]) {
      //more to snackbar once service is built
      alert("Passwords do not match!")
      this.loading = false
      return
    } else {
      this.loading = true
      const email = this.registrationForm.value["email"]
      const password = this.registrationForm.value["password"]
      this.authService.register(email, password).pipe(
        catchError(error => {
          this.snackBarService.snackBarMessage(false, "registrationError")
          this.loading = false
          return throwError(() => new Error(error))
        })
      ).subscribe({
        next: resData => {
          console.log("responseData", resData)
          this.router.navigate(['/events'])
        }
      })
      this.registrationForm.reset()
      this.loading = false
    }
  }
}
