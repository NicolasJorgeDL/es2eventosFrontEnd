import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-evento',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro-evento.html',
  styleUrl: './cadastro-evento.css'
})
export class CadastroEvento implements OnInit {
  evento = {
    titulo: '',
    dataInicio: '',
    dataTermino: '',
    local: '',
    horarios: '',
    descricao: '',
    palestras: [] as any[]
  };

  novaPalestra = {
    vagas: 0,
    titulo: '',
    data: '',
    hora: '',
    palestrante: null as any
  };

  participantes: any[] = [];
  showModal = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.http.get('http://localhost:8080/participantes')
      .subscribe((res: any) => this.participantes = res);
  }

  abrirModal() {
    this.novaPalestra = { vagas: 0, titulo: '', data: '', hora: '', palestrante: null };
    this.showModal = true;
  }

  fecharModal() {
    this.showModal = false;
  }

  adicionarPalestra() {
    if (!this.novaPalestra.titulo) return alert('Preencha o título da palestra');
    this.evento.palestras.push({ ...this.novaPalestra });
    this.fecharModal();
  }

  removerPalestra(index: number) {
    this.evento.palestras.splice(index, 1);
  }

  cadastrarEvento() {
    console.log('Evento para salvar:', this.evento);
    alert('Evento cadastrado (mock). Depois conectar com backend.');
    
    // estilo do andre
    var eventoAndre = { 
      nomeEvento: this.evento.titulo,
      dataInicio: this.evento.dataInicio,
      dataTermino: this.evento.dataTermino,
      local: this.evento.local,
      descricao: this.evento.descricao,
      site: "https://www.seminariocienciacomputacao2025.com.br"
    };


     this.http.post('http://localhost:8080/eventos', eventoAndre)
      .subscribe({
        next: (res) => {
          console.log('Evento cadastrado com sucesso:', res);
          alert('Evento salvo!');
          this.router.navigate(['/home']); 
        },
        error: (err) => {
          console.error('Erro ao cadastrar:', err);
          alert('Erro ao salvar evento.');
        }
      });

    this.router.navigate(['/home']);
  }
}
