package com.example.backApp.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

@Entity
@Table(name = "engin")
public class Engin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nomfamille", nullable = false)
    private String nomfamille;

    @Column(name = "type", nullable = false)
    private String type;


    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "criteres_id", referencedColumnName = "id")
    private Criteres criteres;

    public Criteres getCriteres() {
        return criteres;
    }

    public void setCriteres(Criteres criteres) {
        this.criteres = criteres;
    }

    // Getters et Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomfamille() {
        return nomfamille;
    }

    public void setNomfamille(String nomfamille) {
        this.nomfamille = nomfamille;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
