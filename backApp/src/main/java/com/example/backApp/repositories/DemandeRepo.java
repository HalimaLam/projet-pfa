package com.example.backApp.repositories;

import com.example.backApp.entities.Demande;
import com.example.backApp.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DemandeRepo  extends JpaRepository<Demande,Long> {
    List<Demande> findByUser(User user);

    List<Demande> findByUserIn(List<User> demandeurs);
    Demande findById(long id);
    List<Demande> findByUserId(Long userId);
}

