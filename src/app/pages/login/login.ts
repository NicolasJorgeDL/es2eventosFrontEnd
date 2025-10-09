import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './login.html',  
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  username = '';
  senha = '';
  isLoading = false; // para feedback de carregamento

  constructor(private router: Router, private http: HttpClient) {}

  login(event: Event) {
    event.preventDefault();

    if (!this.username || !this.senha) {
      alert('Preencha login e senha');
      return;
    }

    this.isLoading = true;

    const dadosLogin = {
      email: this.username, // backend espera "email"
      senha: this.senha
    };

    this.http.post('http://localhost:8080/participante/auth/login', dadosLogin)
      .subscribe({
        next: (res: any) => {
          console.log('Login bem-sucedido:', res);
          // Aqui você pode salvar o token, se o backend retornar um JWT
          // localStorage.setItem('token', res.token);
          this.router.navigate(['/home']); // redireciona para página inicial
        },
        error: (err) => {
          console.error('Erro no login:', err);
          alert('Login ou senha inválidos');
        },
        complete: () => {
          this.isLoading = false;
        }
      });
  }
}
