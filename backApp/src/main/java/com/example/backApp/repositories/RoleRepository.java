package com.example.backApp.repositories;
import java.util.Optional;

import com.example.backApp.entities.ERole;
import com.example.backApp.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}