import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  loginCard = true;

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  loginFormRegister = this.formBuilder.group({
    nome: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(private formBuilder: FormBuilder) {}

  onSubmitLoginForm(): void{
    console.log('Dados do Formulário de Login', this.loginForm.validator)
  }

  onSubmitLoginFormRegister(): void{
    console.log('Dados do Formulário de Registro', this.loginFormRegister.validator)
  }

  }
