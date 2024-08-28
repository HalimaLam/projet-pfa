package com.example.backApp.payload.request;

import com.example.backApp.entities.User;

public class DemandeRequest {
    private String entite;
    private String poste;
    private String releaseDate;
    private String shift;
    private String familleEngin;
    private int quantite;
    private String raisonDemande;
    private User user; // Nom d'utilisateur ajouté

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getEntite() {
        return entite;
    }

    public void setEntite(String entite) {
        this.entite = entite;
    }

    public String getFamilleEngin() {
        return familleEngin;
    }

    public void setFamilleEngin(String familleEngin) {
        this.familleEngin = familleEngin;
    }

    public String getPoste() {
        return poste;
    }

    public void setPoste(String poste) {
        this.poste = poste;
    }

    public int getQuantite() {
        return quantite;
    }

    public void setQuantite(int quantite) {
        this.quantite = quantite;
    }

    public String getRaisonDemande() {
        return raisonDemande;
    }

    public void setRaisonDemande(String raisonDemande) {
        this.raisonDemande = raisonDemande;
    }

    public String getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(String releaseDate) {
        this.releaseDate = releaseDate;
    }

    public String getShift() {
        return shift;
    }

    public void setShift(String shift) {
        this.shift = shift;
    }


}

