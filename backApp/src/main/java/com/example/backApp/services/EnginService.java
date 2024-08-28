package com.example.backApp.services;

import com.example.backApp.entities.Engin;
import com.example.backApp.repositories.EnginRepo;
import com.example.backApp.repositories.EnginRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EnginService {

    @Autowired
    private EnginRepo enginRepository;

    public Optional<Engin> findById(Long id) {
        return enginRepository.findById(id);
    }

    public void saveEngin(Engin engin) {
        enginRepository.save(engin);
    }

    public void deleteEngin(Long id) {
        enginRepository.deleteById(id);
    }

    // Autres méthodes si nécessaire
}
