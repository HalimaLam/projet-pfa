package com.example.backApp.services;

import com.example.backApp.DTO.DemandeDto;
import com.example.backApp.DTO.DemandeWithUsernameDTO;
import com.example.backApp.Exceptions.ResourceNotFoundException;
import com.example.backApp.entities.Demande;
import com.example.backApp.entities.User;
import com.example.backApp.repositories.DemandeRepo;
import com.example.backApp.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.example.backApp.entities.ERole.ROLE_DEMANDEUR;


@Service
@Transactional
public class DemandeService {

    @Autowired
    private DemandeRepo demandeRepo;
    @Autowired
    private UserRepository userRepository;

    public Demande saveDemande(Demande demande) {
        return demandeRepo.save(demande);
    }

    public List<DemandeWithUsernameDTO> getAllDemandesWithUsernamesForDemandeurs() {
        List<User> demandeurs = userRepository.findByRolesName(ROLE_DEMANDEUR);

        // Fetch all demandes associated with these users
        List<Demande> demandes = demandeRepo.findByUserIn(demandeurs);

        return demandes.stream().map(demande -> {
            DemandeWithUsernameDTO dto = new DemandeWithUsernameDTO();
            dto.setId(demande.getId());
            dto.setEntite(demande.getEntite());
            dto.setPoste(demande.getPoste());               // Ajout de poste
            dto.setReleaseDate(demande.getReleaseDate());   // Ajout de releaseDate
            dto.setShift(demande.getShift());               // Ajout de shift
            dto.setFamilleEngin(demande.getFamilleEngin());
            dto.setQuantite(demande.getQuantite());
            dto.setRaisonDemande(demande.getRaisonDemande()); // Ajout de raisonDemande
            dto.setEtat(demande.getEtat());
            dto.setUsername(demande.getUser().getUsername()); // Supposons que la relation est définie
            return dto;
        }).collect(Collectors.toList());
    }

    public Optional<Demande> findDemandeById(Long id) {
        return demandeRepo.findById(id);
    }

    public DemandeDto getDemandeById(Long id) {
        Optional<Demande> optionalDemande = demandeRepo.findById(id);

        // Vérification si la demande existe
        if (optionalDemande.isEmpty()) {
            throw new ResourceNotFoundException("Demande not found with id " + id);
        }

        // Mapping de la demande à DTO
        Demande demande = optionalDemande.get();
        DemandeDto dto = new DemandeDto();
        dto.setId(demande.getId());
        dto.setEntite(demande.getEntite());
        dto.setPoste(demande.getPoste());
        dto.setReleaseDate(demande.getReleaseDate());
        dto.setShift(demande.getShift());
        dto.setFamilleEngin(demande.getFamilleEngin());
        dto.setQuantite(demande.getQuantite());
        dto.setRaisonDemande(demande.getRaisonDemande());
        dto.setEtat(demande.getEtat());
        dto.setUsername(demande.getUser().getUsername());

        return dto;
    }
    public List<DemandeDto> getDemandesByUtilisateur(Long utilisateurId) {
        List<Demande> demandes = demandeRepo.findByUserId(utilisateurId);
        return demandes.stream()
                .map(demande -> {
                    DemandeDto dto = new DemandeDto();
                    dto.setId(demande.getId());
                    dto.setEntite(demande.getEntite());
                    dto.setPoste(demande.getPoste());
                    dto.setReleaseDate(demande.getReleaseDate());
                    dto.setShift(demande.getShift());
                    dto.setFamilleEngin(demande.getFamilleEngin());
                    dto.setQuantite(demande.getQuantite());
                    dto.setRaisonDemande(demande.getRaisonDemande());
                    dto.setEtat(demande.getEtat());
                    dto.setUsername(demande.getUser().getUsername());
                    return dto;
                })
                .collect(Collectors.toList());
    }
}
