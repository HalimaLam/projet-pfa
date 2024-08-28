import { Component, OnInit } from '@angular/core';
import { DemandesService } from '../services/demandes.service'; // Assurez-vous que le chemin est correct
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  totalDemandes: number = 0;
  demandesTraitees: number = 0;
  demandesNonTraitees: number = 0;
  userId: number | null = null;
  constructor(private demandeService: DemandesService ,
    private authService: AuthService,) { }

  ngOnInit(): void {
    this.loadDemandesStats();
  }

  loadDemandesStats(): void {
    this.userId = this.authService.getUserId();
    console.log('ID Utilisateur dans DemandesUserComponent:', this.userId);

    if (this.userId !== null) {
      this.demandeService.getDemandesByUser(this.userId).subscribe(
        (data) => {
          this.totalDemandes = data.length;
      this.demandesTraitees = data.filter(d => d.etat === 'Clôturé').length;
      this.demandesNonTraitees = data.filter(d => d.etat !== 'Clôturé').length;
    });
  }
  }
}
