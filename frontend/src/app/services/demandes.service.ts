import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DemandeInterface } from '../models/demande-interface';
import { throwError } from 'rxjs';
import { tap,catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { FormDataService } from '../services/form-data.service';

@Injectable({
  providedIn: 'root'
})
export class DemandesService {
  private urlApi = 'http://localhost:8080/api/demande';
  private baseUrl = 'http://localhost:3000/demandes';
  private demandeIdSource = new BehaviorSubject<number | null>(null);
  constructor(private http: HttpClient,private authService: AuthService,private formDataService: FormDataService) { }

  // Méthode POST
  addRequest(demande: any): Observable<any> {
    const currentUser = this.authService.getUser();

    if (!currentUser || !currentUser.username) {
        console.error('Aucun utilisateur connecté trouvé.');
        return throwError('Utilisateur non connecté.');
    }

    const demandeAvecUser = {
        ...demande,
        user: {
            username: currentUser.username
        }
    };

    console.log('Données envoyées au backend:', demandeAvecUser);

    return this.http.post<any>(`${this.urlApi}/addDemande`, demandeAvecUser)
        .pipe(
            tap(response => {
                // Afficher un message de succès ici
                console.log('Demande ajoutée avec succès:', response);
                alert('Votre demande a été ajoutée avec succès!');
            }),
            catchError(error => {
                console.error('Erreur lors de l\'ajout de la demande:', error);
                return throwError(error);
            })
        );
  }

getDemandes(): Observable<DemandeInterface[]> {
    return this.http.get<DemandeInterface[]>(`${this.baseUrl}`);
  }

  getDemandesWithUsernamesForDemandeurs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.urlApi}/demandeurs`);
  }
  getDemandeId(): number {
    const id = this.formDataService.getCombinedData().id; // Assurez-vous que l'ID est bien récupéré
    console.log('ID récupéré:', id);
    return id;
  }
  
  setDemandeId(id: number) {
    this.demandeIdSource.next(id);
  }


  traiterDemande(dataToSend: any): Observable<any> {
    const id = this.getDemandeId();
    console.log('Données envoyées au backend:', dataToSend);
  
    if (id) {
      // Retourner l'Observable sans appeler subscribe ici
      return this.http.put<any>(`${this.urlApi}/traiter/${id}`, dataToSend)
        .pipe(
          tap(response => {
            console.log('Demande traitée avec succès', response);
          }),
          catchError(error => {
            console.error('Erreur lors du traitement de la demande', error);
            return throwError(error);
          })
        );
    } else {
      console.error('ID de la demande non trouvé');
      return throwError('ID de la demande non trouvé');
    }
  }
  
  // demandes.service.ts
getDemandeById(id: number | null): Observable<any> {
  return this.http.get<any>(`${this.urlApi}/${id}`);
}
updateDemande(id: number, updateData: Partial<DemandeInterface>): Observable<any> {
  return this.http.patch<any>(`${this.urlApi}/update/${id}`, updateData);
}
getDemandesByUser(id: number): Observable<any[]> {
  return this.http.get<any[]>(`${this.urlApi}/user/${id}`);
}
}
