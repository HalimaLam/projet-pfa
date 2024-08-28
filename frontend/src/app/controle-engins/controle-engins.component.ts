import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormDataService } from '../services/form-data.service';
import { Location } from '@angular/common';
import { DemandesService } from '../services/demandes.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-controle-engin',
  templateUrl: './controle-engins.component.html',
  styleUrls: ['./controle-engins.component.scss']
})
export class ControleEnginsComponent implements OnInit {
  controleForm!: FormGroup;
  criteres: string[] = ['Klaxon', 'Extincteur', 'Éclairage', 'Carrosserie', 'Vitres'];

  constructor(
    private apiService: DemandesService,
    private fb: FormBuilder,
    private router: Router,
    private location: Location,
    private formDataService: FormDataService
  ) {}

  ngOnInit(): void {
    // Initialiser le formulaire avec des noms de contrôles explicites
    this.controleForm = this.fb.group({
      Klaxon: ['', Validators.required],
      Extincteur: ['', Validators.required],
      Éclairage: ['', Validators.required],
      Carrosserie: ['', Validators.required],
      Vitres: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.controleForm.valid) {
      const formData = this.controleForm.value;
      const combinedData = this.formDataService.getCombinedData();
      console.log('Données combinées:', combinedData);
      // Convertir les réponses des critères en booléens
      const dataToSend = {
        nomFamille: combinedData.nomFamille,
        type: combinedData.type,
        hasKlaxon: formData.Klaxon === 'oui',
        hasExtincteur: formData.Extincteur === 'oui',
        hasEclairage: formData.Éclairage === 'oui',
        hasCarrosserie: formData.Carrosserie === 'oui',
        hasVitres: formData.Vitres === 'oui'
      };
      console.log('Données envoyées au backend:', dataToSend);
      this.apiService.traiterDemande(dataToSend).subscribe({
        next: (response) => {
          console.log('Backend response:', response);
         
        },
        error: (err) => {
          console.error('Error during request:', err);
        }
      });
    } else {
      this.controleForm.markAllAsTouched();
      console.log('Form is invalid. Please correct the errors and try again.');
    }
    this.goBack(); 
  }
  

  goBack(): void {
    this.location.back();
  }

  submitCriteres() {
    if (this.controleForm.valid) {
      this.formDataService.setCriteresData(this.controleForm.value);
    }
  }


  
}
