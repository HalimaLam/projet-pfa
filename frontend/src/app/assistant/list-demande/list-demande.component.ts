import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { NgConfirmService } from 'ng-confirm-box';
import { NgToastService } from 'ng-angular-popup';
import { DemandesService } from '../../services/demandes.service';
import { DemandeInterface } from '../../models/demande-interface';
import { RequestFormComponent } from '../../request-form/request-form.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-list-demande',
  templateUrl: './list-demande.component.html',
  styleUrls: ['./list-demande.component.scss']
})
export class ListDemandeComponent implements OnInit {

  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  public demandes: DemandeInterface[] = []; // Assurez-vous que demandes est initialisé
  dataSource: MatTableDataSource<DemandeInterface> = new MatTableDataSource(this.demandes);

  displayedColumns: string[] = ['id','username', 'entite', 'familleEngin', 'quantite', 'etat', 'action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private apiService: DemandesService,
    private router: Router,
    private confirmService: NgConfirmService,
    private toastService: NgToastService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.apiService.getDemandesWithUsernamesForDemandeurs().subscribe(data => {
      this.demandes = data;
      this.dataSource.data = this.demandes; // Met à jour la dataSource
      this.dataSource.paginator = this.paginator; // Lier le paginator à la dataSource
      this.dataSource.sort = this.sort; // Lier le sort à la dataSource
    });
  }
  processRequest(id: number) {
    console.log('ID de la demande sélectionnée:', id);
    const dialogRef = this.dialog.open(RequestFormComponent, {
      width: '500px',
      data: { id: id } // Passer l'ID au dialog
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Traitez les données du formulaire si nécessaire
    });
  }
  
  onSelectDemande(id: number) {
    this.apiService.setDemandeId(id); // Stocker l'ID de la demande sélectionnée
  }
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  logElementState(element: DemandeInterface) {
    console.log('État de la demande:', element.etat);
  }
}
