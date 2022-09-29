import { Component } from '@angular/core';
import { FormGroup, UntypedFormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms'
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

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
  }, {validator: confirmationValidator})

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
    const email = this.registrationForm.value["email"]
    const password = this.registrationForm.value["password"]
    this.authService.register(email, password)
      .subscribe({
      next: () => {
        this.loading = false
        this.registrationForm.reset()
        this.router.navigate(['/events'])
      }, error: () => {
        this.loading = false
      }
    })
  }

  get password() { return this.registrationForm.get('password')}
  get confirmation() { return this.registrationForm.get('confirmation')}

  onPasswordInput() {
    if (this.registrationForm.hasError('passwordMismatch')) {
      this.confirmation.setErrors([{'passwordMismatch': true}])
    } else {
      this.confirmation.setErrors(null)
    }
  }
}

export const confirmationValidator: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null =>  {
  if (formGroup.get('password').value === formGroup.get('confirmation').value){
    return null
  } else {
    return {passwordMismatch: true}
  } 
}
  
