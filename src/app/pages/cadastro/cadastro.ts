import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './cadastro.html',  
  styleUrls: ['./cadastro.css'],
})
export class CadastroComponent {
  nome = '';
  ddd = '';
  telefone = '';
  cep = '';
  logradouro = '';
  bairro = '';
  cidade = '';
  estado = '';
  tipoPessoa = '';
  email = '';
  username = '';
  senha = '';

  isLoading = false;

  estados: string[] = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO',
    'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
    'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  buscarEndereco() {
    const cepLimpo = this.cep.replace(/\D/g, '');

    if (cepLimpo.length === 8) {
      this.http.get(`https://viacep.com.br/ws/${cepLimpo}/json/`)
        .subscribe((dados: any) => {
          if (!dados.erro) {
            this.logradouro = dados.logradouro;
            this.bairro = dados.bairro;
            this.cidade = dados.localidade;
            this.estado = dados.uf;
          } else {
            alert('CEP não encontrado.');
          }
        }, () => {
          alert('Erro ao buscar o CEP.');
        });
    } else {
      alert('CEP inválido. Digite 8 números.');
    }
  }

  cadastrar(event: Event) {
    event.preventDefault();

    if (this.isLoading) return;


    this.isLoading = true;

    console.log({
      nome: this.nome,
      ddd: this.ddd,
      telefone: this.telefone,
      cep: this.cep,
      logradouro: this.logradouro,
      bairro: this.bairro,
      cidade: this.cidade,
      estado: this.estado,
      tipoPessoa: this.tipoPessoa,
      email: this.email,
      username: this.username,
      senha: this.senha
    });

      const dadosCadastro = {
    nome: this.nome,
    email: this.email,
    senha: this.senha
    };


    this.http.post('http://localhost:8080/auth/register', dadosCadastro)
    .subscribe({
      next: (res) => {
        console.log('Cadastro realizado com sucesso:', res);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Erro ao cadastrar:', err);
        alert('Ocorreu um erro ao cadastrar. Verifique os dados e tente novamente.');
      },
      complete: () => {
        this.isLoading = false;
      }
    });


//    this.router.navigate(['/login']);

  }
  constructor(private router: Router,private http: HttpClient)  {}

}
