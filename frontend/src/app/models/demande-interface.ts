export interface DemandeInterface {
    
    id:number;
    entite:String;
    poste:String;
    releaseDate:String;
    shift:String;
    familleEngin:String;
    quantite:number;
    raisonDemande:String;
    etat:String;
    user: {
        username: string;  
      };
}
