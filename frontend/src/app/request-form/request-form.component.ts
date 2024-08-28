import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormDataService } from '../services/form-data.service';
@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.scss']
})
export class RequestFormComponent {
  form: FormGroup;
  familles = [
    { name: 'Elevateur faible', image: 'assets/engin2.jpg' },
    { name: 'Elevateur moyen', image: 'assets/engin3.jpg' },
    { name: 'Elevateur grand', image: 'assets/engin4.jpg' },
    { name: 'Chargeuse forte', image: 'assets/engin1.jpg' },
    { name: 'Tracteur indistruel', image: 'assets/engin5.jpg' },
    // Ajoutez d'autres familles d'engins ici
  ];
  engins: string[] = ['Engin 1', 'Engin 2','Engin 3']; 

  constructor(
    public dialogRef: MatDialogRef<RequestFormComponent>,
    private fb: FormBuilder,
    private router: Router,
    private formDataService: FormDataService,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
    
  ) {
    console.log('ID reçu dans le dialog:', data.id);
    this.form = this.fb.group({
      nomFamille: ['', Validators.required],
      type: ['', Validators.required]
    });

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Form Data Before Submission:', this.form.value); // Log des données du formulaire avant la soumission
      console.log('ID au moment de la soumission:', this.data.id); // Log de l'ID au moment de la soumission
      this.submitFamille(); // Stocker les données dans familleData
      console.log('Data after submitFamille call:', this.formDataService.getCombinedData()); // Log des données après l'appel de submitFamille
      this.router.navigate(['/controle-engins']); // Naviguer vers une autre route
      this.dialogRef.close(); // Fermer le dialogue
    } else {
      this.form.markAllAsTouched(); // Marquer tous les champs comme touchés pour afficher les erreurs
      console.log('Form is invalid. Please correct the errors and try again.');
    }
  }
  
  submitFamille() {
    if (this.form.valid) {
      // Appel au service avec les données du formulaire et l'Id
      this.formDataService.setFamilleData(this.form.value, this.data.id);
  
      console.log('Data stored in familleData:', this.formDataService.getCombinedData()); // Log des données stockées
      console.log('ID utilisé pour stocker les données:', this.data.id); // Log de l'ID utilisé pour stocker les données
    }
  }
  

}
