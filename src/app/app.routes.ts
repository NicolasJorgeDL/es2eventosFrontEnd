import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { CadastroComponent } from './pages/cadastro/cadastro';
import { Home } from './pages/home/home';
import { CadastroEvento } from './pages/cadastro-evento/cadastro-evento';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'home', component: Home },
  { path: 'cadastro-evento', component: CadastroEvento }
];
