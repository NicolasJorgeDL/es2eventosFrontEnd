import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cadastro.html',  
  styleUrls: ['./cadastro.css'],
})
export class CadastroComponent {
  nome = '';
  email = '';
  senha = '';
  tipoPessoa = '';
  username = '';
  telefone = '';
  endereco = '';

  constructor(private router: Router) {}

  cadastrar(event: Event) {
    event.preventDefault();
    if (this.nome && this.email && this.senha) {
      alert('Cadastro simulado!');
      this.router.navigate(['/login']);
    } else {
      alert('Preencha todos os campos');
    }
  }
}
