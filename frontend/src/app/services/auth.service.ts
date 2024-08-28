import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { LoginResponse } from '../models/login-response.model';
 // Import de l'interface
/*export interface LoginResponse {
  token: string;
  username: string;
  email: string;
  roles: string[];
}*/

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<LoginResponse | null> = new BehaviorSubject<LoginResponse | null>(null);

  public get currentUser$(): Observable<LoginResponse | null> {
    return this.currentUserSubject.asObservable();}

    constructor(private http: HttpClient, private router: Router) {
      // Charger l'utilisateur actuel depuis localStorage au démarrage
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        this.currentUserSubject.next(JSON.parse(storedUser));
      }
    }
  
   // auth.service.ts
   login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(AUTH_API + 'signin', { username, password }, httpOptions)
      .pipe(tap(response => {
        console.log('Réponse de connexion:', response);
  
        // Stockez la réponse complète dans le localStorage
        localStorage.setItem('currentUser', JSON.stringify(response)); 
        console.log('Utilisateur stocké dans localStorage:', localStorage.getItem('currentUser'));
  
        this.currentUserSubject.next(response);
  
        // Redirection en fonction du rôle
        if (response.roles.includes('ROLE_DEMANDEUR')) {
          this.router.navigate(['/layout']);
        } else if (response.roles.includes('ROLE_ASSISTANT')) {
          this.router.navigate(['/list-demande']);
        } else {
          this.router.navigate(['/']);
        }
      }));
  }
  
  
  
  
  

  getUser(): any {
    const user = localStorage.getItem('currentUser');
    console.log('Utilisateur récupéré depuis localStorage:', user);
    if (user) {
      const parsedUser = JSON.parse(user);
      console.log('Utilisateur parsé:', parsedUser); // Affiche l'utilisateur parsé
      return parsedUser;
    }
    return null;
  }
  
  

  getUserId(): number | null {
    const user = this.getUser();
    console.log('Utilisateur extrait de getUser:', user);
    if (user && user.userId) {
      console.log('ID Utilisateur extrait:', user.userId);
      return user.userId;
    } else {
      console.log('Aucun ID utilisateur trouvé dans getUserId()');
      return null;
    }
  }
  
  



  register(user: User): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password,
      roles: user.roles , // Ajouter le rôle ici
    }, httpOptions);
  }
  logout(): void {
    // Supprimer le jeton et les informations de l'utilisateur
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);

    // Redirection vers la page de connexion ou accueil
    this.router.navigate(['/login']);
  }
  
}
