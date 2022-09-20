import { Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms'
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/services/snack-bar-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loading = false

  constructor(private fb: UntypedFormBuilder,
              private authService: AuthService,
              private router: Router) {}

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
    this.loading = true
    const email = this.loginForm.value["email"]
    const password = this.loginForm.value["password"]
    this.authService.login(email, password)
      .subscribe({
        next: () => {
          this.loginForm.reset()
          this.loading = false
          this.router.navigate(['/events'])
        }, error: () => {
          this.loading = false
        }
    })
  }

  onSubmitRegister() {
    this.loading = true
    if (this.registrationForm.value["password"] !== this.registrationForm.value["confirmation"]) {
      //todo handle this as a validation error
      alert("Passwords do not match!")
      this.loading = false
      return
    } else {
      this.loading = true
      const email = this.registrationForm.value["email"]
      const password = this.registrationForm.value["password"]
      this.authService.register(email, password)
        .subscribe({
        next: () => {
          this.registrationForm.reset()
          this.router.navigate(['/events'])
        }, error: () => {
          this.loading = false
        }
      })
    }
  }
}
