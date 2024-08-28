package com.example.backApp.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "criteres")
public class Criteres {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "hasklaxon", nullable = false)
    private boolean hasklaxon;

    @Column(name = "hasExtincteur", nullable = false)
    private boolean hasExtincteur;

    @Column(name = "hasEclairage", nullable = true)
    private boolean hasEclairage;

    @Column(name = "hasCarrosserie", nullable = true)
    private boolean hasCarrosserie;

    @Column(name = "hasVitres", nullable = true)
    private boolean hasVitres;

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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
