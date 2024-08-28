import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DemandesService } from '../services/demandes.service';
import { DemandeInterface } from '../models/demande-interface';
import { ChangeDateDialogComponent } from '../change-date-dialog/change-date-dialog.component'; // Assurez-vous que ce composant existe
import { Location } from '@angular/common'; 
@Component({
  selector: 'app-demande-details',
  templateUrl: './demande-details.component.html',
  styleUrls: ['./demande-details.component.scss']
})
export class DemandeDetailsComponent implements OnInit {
  
  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  demande!: DemandeInterface; // Utilisez le point d'exclamation si vous êtes sûr que 'demande' sera défini
  dataSource: MatTableDataSource<DemandeInterface> = new MatTableDataSource<DemandeInterface>([]);
  displayedColumns: string[] = ['id', 'entite', 'familleEngin', 'poste', 'quantite', 'raisonDemande', 'releaseDate', 'shift', 'etat'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private apiService: DemandesService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      this.loadDemande(id);
    });
  }

  loadDemande(id: number): void {
    this.apiService.getDemandeById(id).subscribe(data => {
      this.demande = data;
      this.dataSource.data = [this.demande];
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openChangeDateDialog(element: DemandeInterface): void {
    const dialogRef = this.dialog.open(ChangeDateDialogComponent, {
      width: '300px',
      data: { releaseDate: element.releaseDate }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        element.releaseDate = result;
        this.apiService.updateDemande(element.id, { releaseDate: result }).subscribe(response => {
          this.loadDemande(element.id);
        }, error => {
          console.error('Erreur lors de la mise à jour de la date de sortie', error);
        });
      }
    });
  }
  goBack(): void {
    this.location.back();
  }

}
