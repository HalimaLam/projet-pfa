import { Component } from '@angular/core';
import { Router } from '@angular/router';
export interface Engin {
  photo: string;
  name: string;
}

const ELEMENT_DATA: Engin[] = [
  { photo: 'assets/engin2.jpg', name: 'Elevateurs faibles' },
  { photo: 'assets/engin3.jpg', name: 'Elevateurs moyens' },
  { photo: 'assets/engin4.jpg', name: 'Elevateurs grands' },
  { photo: 'assets/engin1.jpg', name: 'Tracteur industriel' },
  { photo: 'assets/engin5.jpg', name: 'Chargeuses fortes' }
];

@Component({
  selector: 'app-engin-photos',
  templateUrl: './engin-photos.component.html',
  styleUrls: ['./engin-photos.component.scss']
})
export class EnginPhotosComponent {
  constructor(private router: Router) { }
  // Données pour le tableau
  displayedColumns: string[] = ['photo', 'name', 'actions'];
  ELEMENT_DATA: Engin[] = [
    { photo: 'assets/engin2.jpg', name: 'Elevateurs faibles' },
    { photo: 'assets/engin3.jpg', name: 'Elevateurs moyens' },
    { photo: 'assets/engin4.jpg', name: 'Elevateurs grands' },
    { photo: 'assets/engin1.jpg', name: 'Tracteur industriel' },
    { photo: 'assets/engin5.jpg', name: 'Chargeuses fortes' }
  ];

  // État pour afficher toutes les lignes
  dataSource = this.ELEMENT_DATA.slice(0, 2); // Affiche les 2 premières lignes par défaut
  showAll = false;

  toggleViewAll() {
    this.showAll = !this.showAll;
    this.dataSource = this.showAll ? this.ELEMENT_DATA : this.ELEMENT_DATA.slice(0, 2);
  }

  demander(nom: string): void {
    this.router.navigate(['/layout-demande'], { queryParams: { familleEngin: nom } });
  }
}
