import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  // Utilisation de BehaviorSubject pour gérer les données
  private familleData = new BehaviorSubject<{ [id: number]: any }>({});
  private criteresData = new BehaviorSubject<any>({});
  private demandeId: number | null = null; // Assurez-vous que l'ID est bien initialisé

  // Méthode pour stocker les données de famille
  setFamilleData(formData: any, id: number): void {
    const currentData = this.familleData.value;
    currentData[id] = {
      ...formData
    };
    this.familleData.next(currentData);
    this.demandeId = id;

    console.log('Updated familleData:', this.familleData.value);
    console.log('Updated demandeId:', this.demandeId);
  }

  // Méthode pour stocker les critères
  setCriteresData(data: any) {
    this.criteresData.next(data);
    console.log('Updated criteresData:', this.criteresData.value);
  }

  // Méthode pour récupérer les données combinées
  getCombinedData() {
    const famille = this.familleData.value[this.demandeId || 0]; // Assurez-vous que vous récupérez les bonnes données
    return {
      ...famille,
      ...this.criteresData.value,
      id: this.demandeId
    };
  }
}
