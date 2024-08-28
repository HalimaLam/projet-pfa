import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DemandesService } from '../../services/demandes.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-submit-request',
  templateUrl: './submit-request.component.html',
  styleUrls: ['./submit-request.component.scss']
})
export class SubmitRequestComponent {
 
  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  
  requestForm: FormGroup;
  myArray: any[] = [];
  successMessage: string | null = null; // Ajoutez cette ligne pour le message de succès
  entites: string[] = ['DTC', 'DTV', 'DT'];
  postes: string[] = ['Poste 1', 'Poste 2', 'Poste 3'];
  shifts: string[] = ['Sh 1', 'Sh 2', 'Sh 3'];
  famillesEngins: string[] = ['Elevateurs faible', 'Elevateurs moyenne', 'Elevateurs grande','Chargeuses Forte','Tracteur industriel'];
  

  constructor(private fb: FormBuilder, private demandesService: DemandesService,private route: ActivatedRoute) {
    this.requestForm = this.fb.group({
      entite: ['', Validators.required],
      poste: ['', Validators.required],
      releaseDate: ['', Validators.required],
      shift: ['', Validators.required],
      familleEngin: ['', Validators.required],
      quantite: ['', [Validators.required, Validators.min(1)]],
      raisonDemande: ['', Validators.required]
    });
  }
  postDemande() {
    if (this.requestForm.valid) {
      this.demandesService.addRequest(this.requestForm.value)
        .subscribe(
          (data) => {
            this.myArray = [data, ...this.myArray];
            this.successMessage = "Demande ajoutée avec succès"; // Définit le message de succès
            this.requestForm.reset(); // Réinitialise le formulaire
            setTimeout(() => {
              this.successMessage = null; // Réinitialise le message après 5 secondes
            }, 5000);
          },
          
        );
    } else {
      console.error('Formulaire invalide');
    }
  }

  onReset() {
    this.requestForm.reset(); // Réinitialise le formulaire
  }
}
