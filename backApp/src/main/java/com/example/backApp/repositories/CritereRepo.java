package com.example.backApp.repositories;

import com.example.backApp.entities.Criteres;
import com.example.backApp.entities.Demande;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CritereRepo extends JpaRepository<Criteres,Long> {

}
