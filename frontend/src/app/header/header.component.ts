import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  username: string | null = null;
  constructor(private router: Router,private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.username = user.username;
      }
    });
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
  logout(): void {
    this.authService.logout();
  }
  goBack(): void {
    this.router.navigate(['/']); // Redirection vers la page d'accueil, ou utilisez window.history.back()
  }

}