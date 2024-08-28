package com.example.backApp.repositories;



import java.util.List;
import java.util.Optional;

import com.example.backApp.entities.ERole;
import com.example.backApp.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;



@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

    List<User> findByRolesName(@Param("role") ERole role);
}

