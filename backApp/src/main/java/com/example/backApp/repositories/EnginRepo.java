package com.example.backApp.repositories;

import com.example.backApp.entities.Engin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EnginRepo extends JpaRepository<Engin, Long> {

}
