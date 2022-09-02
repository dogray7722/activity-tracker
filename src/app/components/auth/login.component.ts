import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private authService: AuthService) { }

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
    if (this.registrationForm.value["password"] !== this.registrationForm.value["confirmation"]) {
      //more to snackbar once service is built
      alert("Passwords do not match!")
      return
    } else {
      const email = this.registrationForm.value["email"]
      const password = this.registrationForm.value["password"]
      this.authService.register(email, password).subscribe({
        next: resData => {
          console.log("responseData", resData)
        },
        error: (error) => {
          console.log(error)
        }
      })
      this.registrationForm.reset()
    }
  }
}
