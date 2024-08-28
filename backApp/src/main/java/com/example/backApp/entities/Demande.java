package com.example.backApp.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

@Entity
@Table(name = "demande")
public class Demande {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "entite", nullable = false)
    private String entite;

    @Column(name = "poste", nullable = false)
    private String poste;

    @Column(name = "releaseDate", nullable = false)
    private String releaseDate;

    @Column(name = "shift", nullable = false)
    private String shift;

    @Column(name = "familleEngin", nullable = false)
    private String familleEngin;

    @Column(name = "quantite", nullable = false)
    private int quantite;

    @Column(name = "raisonDemande", nullable = false)
    private String raisonDemande;
    @Column(name = "etat", nullable = false)
    private String etat;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "engin_id")
    private Engin engin;

    public Demande() {
    }

    public Demande(String entite, String familleEngin, String poste, int quantite, String raisonDemande, String releaseDate, String shift) {
        this.entite = entite;
        this.familleEngin = familleEngin;
        this.poste = poste;
        this.quantite = quantite;
        this.raisonDemande = raisonDemande;
        this.releaseDate = releaseDate;
        this.etat = "Pas encore traité";
        this.shift = shift;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getEtat() {
        return etat;
    }

    public void setEtat(String etat) {
        this.etat = etat;
    }

    public Engin getEngin() {
        return engin;
    }

    public void setEngin(Engin engin) {
        this.engin = engin;
    }
}


