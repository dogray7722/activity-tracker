import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  registerForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', Validators.email],
    password: ['', Validators.required],
    confirmation: ['', Validators.required]
  })

  onSubmitLogin() {
    console.log(this.loginForm.value)
  }

  onSubmitRegister() {
    console.log(this.registerForm.value)
  }

}
