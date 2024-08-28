import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DemandesService } from '../services/demandes.service';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-total-demandes',
  templateUrl: './total-demandes.component.html',
  styleUrls: ['./total-demandes.component.scss']
})
export class TotalDemandesComponent implements OnInit {
  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  userId: number | null = null;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['entite', 'familleEngin', 'poste', 'quantite', 'raisonDemande', 'releaseDate', 'shift', 'etat', 'action'];
  showAll = false;
  allDemandes: any[] = [];
  limitedDemandes: any[] = [];
  defaultLineCount = 3; // Nombre de lignes à afficher par défaut
  maxLineCount = 10; // Nombre maximum de lignes affichées lors de la bascule en 'View All'

  constructor(
    private demandeService: DemandesService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    console.log('ID Utilisateur dans DemandesUserComponent:', this.userId);

    if (this.userId !== null) {
      this.loadDemandes();
    } else {
      console.error('Utilisateur non connecté ou ID non trouvé');
    }
  }

  loadDemandes(): void {
    this.userId = this.authService.getUserId();
    console.log('ID Utilisateur dans DemandesUserComponent:', this.userId);

    if (this.userId !== null) {
      this.demandeService.getDemandesByUser(this.userId).subscribe(
        (data) => {
          this.allDemandes = data;
          this.limitedDemandes = this.allDemandes.slice(0, this.defaultLineCount);
          this.dataSource.data = this.limitedDemandes;
        },
        (error) => {
          console.error('Erreur lors de la récupération des demandes', error);
        }
      );
    } else {
      console.error('Utilisateur non connecté ou ID non trouvé');
    }
  }

  toggleViewAll(): void {
    this.showAll = !this.showAll;
    if (this.showAll) {
      this.dataSource.data = this.allDemandes.slice(0, this.maxLineCount);
    } else {
      this.dataSource.data = this.limitedDemandes;
    }
  }

  visualiserDemande(demande: any): void {
    // Implémentez la logique pour visualiser une demande ici
  }
}
