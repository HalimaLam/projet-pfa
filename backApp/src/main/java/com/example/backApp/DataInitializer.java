package com.example.backApp;

import com.example.backApp.entities.ERole;
import com.example.backApp.entities.Role;
import com.example.backApp.repositories.RoleRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public void run(String... args) throws Exception {
        if (roleRepository.findAll().isEmpty()) {
            roleRepository.save(new Role(ERole.ROLE_ADMIN));
            roleRepository.save(new Role(ERole.ROLE_DEMANDEUR));
            roleRepository.save(new Role(ERole.ROLE_ASSISTANT));
        }
    }
}
