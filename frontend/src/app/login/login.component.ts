import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    const { username, password } = this.form;
    this.authService.login(username, password).subscribe(
      data => {
        console.log('Réponse du serveur:', data);
        this.isLoggedIn = true;
        this.isLoginFailed = false;
        this.roles = data.roles;
        
        // Stocker les informations utilisateur dans localStorage
        const user = {
          username: data.username,
          roles: data.roles,
          userId:data.userId
        };
        localStorage.setItem('currentUser', JSON.stringify(user));
  
        console.log('Utilisateur stocké dans localStorage:', localStorage.getItem('currentUser'));
      },
      err => {
        this.errorMessage = err.error.message || 'Login failed';
        this.isLoginFailed = true;
      }
    );
  }
  
  
}
