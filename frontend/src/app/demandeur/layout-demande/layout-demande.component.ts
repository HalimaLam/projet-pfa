import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-demande',
  templateUrl: './layout-demande.component.html',
  styleUrl: './layout-demande.component.scss'
})
export class LayoutDemandeComponent {
  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
