package com.example.backApp.controllers;

import java.util.*;
import java.util.stream.Collectors;

import com.example.backApp.entities.ERole;
import com.example.backApp.entities.Role;
import com.example.backApp.entities.User;
import com.example.backApp.payload.request.LoginRequest;
import com.example.backApp.payload.request.SignupRequest;
import com.example.backApp.payload.response.LoginResponse;
import com.example.backApp.payload.response.MessageResponse;
import com.example.backApp.repositories.RoleRepository;
import com.example.backApp.repositories.UserRepository;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
//    @Autowired
//    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

//    @Autowired
//    PasswordEncoder encoder;



    //    @PostMapping("/signin")
//    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
//
//        Authentication authentication = authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
//
//        SecurityContextHolder.getContext().setAuthentication(authentication);
//        String jwt = jwtUtils.generateJwtToken(authentication);
//
//        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
//        List<String> roles = userDetails.getAuthorities().stream()
//                .map(item -> item.getAuthority())
//                .collect(Collectors.toList());
//
//        return ResponseEntity.ok(new JwtResponse(jwt,
//                userDetails.getId(),
//                userDetails.getUsername(),
//                userDetails.getEmail(),
//                roles));
//    }
    @PostMapping("/signin")
    public ResponseEntity<LoginResponse> authenticateUser(@RequestBody LoginRequest loginRequest) {
        // Étape 1 : Vérifier les informations d'identification
        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();

        // Rechercher l'utilisateur dans la base de données
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Error: User is not found."));

        // Étape 2 : Récupérer les rôles de l'utilisateur
        Set<Role> roles = user.getRoles();
        List<ERole> roleNames = roles.stream()
                .map(Role::getName)
                .collect(Collectors.toList());

      long userId=user.getId();
        // Étape 3 : Créer la réponse contenant les informations de l'utilisateur
        LoginResponse loginResponse = new LoginResponse(
                username,
                roleNames,
                userId
        );

        return ResponseEntity.ok(loginResponse);
    }



    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        // Vérifiez si le nom d'utilisateur existe déjà
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        // Vérifiez si l'email existe déjà
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        // Créez un nouvel utilisateur
        User user = new User(signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                signUpRequest.getPassword()); // Pas d'encodage du mot de passe

        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_DEMANDEUR)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);
                        break;
                    case "mod":
                        Role modRole = roleRepository.findByName(ERole.ROLE_ASSISTANT)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(modRole);
                        break;
                    default:
                        Role userRole = roleRepository.findByName(ERole.ROLE_DEMANDEUR)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                }
            });
        }

        // Assignez les rôles à l'utilisateur
        user.setRoles(roles);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }
}

