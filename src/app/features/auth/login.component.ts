import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-form">
      <h2>Вход</h2>
      <form (ngSubmit)="onSubmit()">
        <input [(ngModel)]="username" name="username" placeholder="Логин" required />
        <input [(ngModel)]="password" name="password" type="password" placeholder="Пароль" required />
        <button type="submit">Войти</button>
      </form>
    </div>
  `,
  styles: [`
    .login-form {
      max-width: 300px;
      margin: 100px auto;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    input {
      padding: 8px;
      font-size: 16px;
    }

    button {
      padding: 10px;
      font-size: 16px;
    }
  `]
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private auth: AuthService) {}

  onSubmit() {
    this.auth.login(this.username, this.password);
  }
}
