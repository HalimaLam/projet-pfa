package com.example.backApp.services;

import com.example.backApp.entities.Criteres;
import com.example.backApp.repositories.CritereRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class CritereService {

    @Autowired
    private CritereRepo critereRepo;

    public Criteres saveCriteres(Criteres criteres) {
        return critereRepo.save(criteres);
    }
}
