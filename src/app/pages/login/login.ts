import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',  
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  username = '';
  senha = '';
  constructor(private router: Router) {}

  login(event: Event) {
    event.preventDefault();
    if (this.username && this.senha) this.router.navigate(['/home']);
    else alert('Preencha Login e senha');
  }
}
