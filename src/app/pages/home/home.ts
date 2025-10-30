import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  eventos: any[] = [];
  eventoSelecionado: any = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.carregarEventos();
  }

  carregarEventos() {
    this.http.get<any[]>('http://localhost:8080/eventos').subscribe({
      next: (res) => {
        this.eventos = res;
      },
      error: (err) => {
        console.error('Erro ao carregar eventos:', err);
      }
    });
  }

  abrirDetalhes(evento: any) {
    this.http.get(`http://localhost:8080/eventos/${evento.id}`).subscribe({
      next: (res) => {
        this.eventoSelecionado = res;
      },
      error: (err) => {
        console.error('Erro ao buscar evento:', err);
      }
    });
  }

    increverNoEvento(evento: any) {
    this.http.get(`http://localhost:8080/eventos/${evento.id}`).subscribe({
      next: (res) => {
        this.eventoSelecionado = res;
      },
      error: (err) => {
        console.error('Erro ao buscar evento:', err);
      }
    });
  }

  fecharModal() {
    this.eventoSelecionado = null;
  }

  irParaCadastroEvento() {
    this.router.navigate(['/cadastro-evento']);
  }

  irParaPerfil() {
    this.router.navigate(['/perfil']);
  }

  sair() {
    // Aqui tu pode limpar o token depois
    this.router.navigate(['/login']);
  }
}
