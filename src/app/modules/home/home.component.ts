import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { AuthRequest } from 'src/app/models/interfacce/user/auth/AuthRequest';
import { CreateUserRequest } from 'src/app/models/interfacce/user/CreateUserRequest';
import { CreateUserResponse } from 'src/app/models/interfacce/user/CreateUserResponse';
import { UserService } from 'src/app/services/user/user.service';

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
  });

  loginFormRegister = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private cookService: CookieService,
    private messageService: MessageService
  ) {}

  onSubmitLoginForm(): void {
    if (this.loginForm.valid) {
      this.userService
        .authUser(this.loginForm.value as AuthRequest)
        .subscribe({
          next: (response) => {
            if (response && response.token) {
              this.cookService.set('USER_INFO', response.token);
              this.loginForm.reset();

              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: `Bem vindo de volta, ${response?.name}!`,
                life: 2000
              });
            }
          },
          error: (err) => {
            console.log(err);
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao fazer login. Verifique suas credenciais.',
              life: 3000
            });
          }
        });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'Preencha todos os campos de login corretamente.',
        life: 3000
      });
    }
  }

  onSubmitLoginFormRegister(): void {
    if (this.loginFormRegister.valid) {
      this.userService
        .createUser(this.loginFormRegister.value as CreateUserRequest)
        .subscribe({
          next: (response) => {
            if (response) {
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Usuário criado com sucesso!',
                life: 2000
              });
              this.loginFormRegister.reset();
              this.loginCard = true;
            }
          },
          error: (err) => {
            console.log(err);
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao criar usuário. Por favor, tente novamente mais tarde.',
              life: 3000
            });
          }
        });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'Preencha todos os campos do formulário de cadastro corretamente.',
        life: 3000
      });
    }
  }
}
