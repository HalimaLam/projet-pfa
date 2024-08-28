package com.example.backApp.DTO;

public class TraitementDemandeRequest {
    private String nomFamille;
    private String type;
    private boolean hasklaxon;
    private boolean hasExtincteur;
    private boolean hasEclairage;
    private boolean hasCarrosserie;
    private boolean hasVitres;


    public String getNomFamille() {
        return nomFamille;
    }

    public void setNomFamille(String nomFamille) {
        this.nomFamille = nomFamille;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public boolean isHasCarrosserie() {
        return hasCarrosserie;
    }

    public void setHasCarrosserie(boolean hasCarrosserie) {
        this.hasCarrosserie = hasCarrosserie;
    }

    public boolean isHasEclairage() {
        return hasEclairage;
    }

    public void setHasEclairage(boolean hasEclairage) {
        this.hasEclairage = hasEclairage;
    }

    public boolean isHasExtincteur() {
        return hasExtincteur;
    }

    public void setHasExtincteur(boolean hasExtincteur) {
        this.hasExtincteur = hasExtincteur;
    }

    public boolean isHasklaxon() {
        return hasklaxon;
    }

    public void setHasklaxon(boolean hasklaxon) {
        this.hasklaxon = hasklaxon;
    }

    public boolean isHasVitres() {
        return hasVitres;
    }

    public void setHasVitres(boolean hasVitres) {
        this.hasVitres = hasVitres;
    }
}
