package com.example.backApp.controllers;

import com.example.backApp.DTO.DemandeDto;
import com.example.backApp.DTO.DemandeWithUsernameDTO;
import com.example.backApp.DTO.TraitementDemandeRequest;
import com.example.backApp.entities.Criteres;
import com.example.backApp.entities.Demande;
import com.example.backApp.entities.Engin;
import com.example.backApp.entities.User;
import com.example.backApp.payload.request.DemandeRequest;
import com.example.backApp.services.CritereService;
import com.example.backApp.services.DemandeService;
import com.example.backApp.services.EnginService;
import com.example.backApp.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/demande")
public class DemandeController {

    @Autowired
    private DemandeService demandeService;

    @Autowired
    private CritereService criteresService;
    @Autowired
    private EnginService enginService;
    @Autowired
    private UserService userService;
    /*@PostMapping("/addDemande")
    public ResponseEntity<?> createDemande(@RequestBody Demande demande) {
        Demande savedDemande = demandeService.saveDemande(demande);
        return ResponseEntity.ok(savedDemande);
    }*/
    @PostMapping("/addDemande")
    public ResponseEntity<?> addDemande(@RequestBody DemandeRequest demandeRequest) {
        try {


            // Créez un objet Demande à partir des données envoyées
            Demande demande = new Demande();
            demande.setEntite(demandeRequest.getEntite());
            demande.setPoste(demandeRequest.getPoste());
            demande.setReleaseDate(demandeRequest.getReleaseDate());
            demande.setShift(demandeRequest.getShift());
            demande.setFamilleEngin(demandeRequest.getFamilleEngin());
            demande.setQuantite(demandeRequest.getQuantite());
            demande.setRaisonDemande(demandeRequest.getRaisonDemande());

            // Ajouter l'utilisateur connecté à la demande
            String username = demandeRequest.getUser().getUsername();
            Optional<User> user = userService.finduserByUsername(username);
            demande.setUser(user.orElse(null));
            demande.setEtat("Pas encore traité");
            // Enregistrer la demande
            demandeService.saveDemande(demande);
            return ResponseEntity.ok("Demande ajoutée avec succès");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur lors de l'ajout de la demande");
        }
    }






    @GetMapping("/demandeurs")
    public ResponseEntity<List<DemandeWithUsernameDTO>> getDemandesForDemandeurs() {
        List<DemandeWithUsernameDTO> demandes = demandeService.getAllDemandesWithUsernamesForDemandeurs();
        return ResponseEntity.ok(demandes);
    }
    @PutMapping("/traiter/{id}")
    public ResponseEntity<?> traiterDemande(@PathVariable Long id, @RequestBody TraitementDemandeRequest traitementRequest) {
        Optional<Demande> demandeOptional = demandeService.findDemandeById(id);
        if (!demandeOptional.isPresent()) {
            return ResponseEntity.status(404).body("Demande non trouvée");
        }

        Demande demande = demandeOptional.get();

        // Crée un nouvel engin
        Engin engin = new Engin();
        engin.setNomfamille(traitementRequest.getNomFamille());
        engin.setType(traitementRequest.getType());

        // Crée et affecte les critères booléens
        Criteres criteres = new Criteres();
        criteres.setHasklaxon(traitementRequest.isHasklaxon());
        criteres.setHasExtincteur(traitementRequest.isHasExtincteur());
        criteres.setHasEclairage(traitementRequest.isHasEclairage());
        criteres.setHasCarrosserie(traitementRequest.isHasCarrosserie());
        criteres.setHasVitres(traitementRequest.isHasVitres());

        criteresService.saveCriteres(criteres);

        engin.setCriteres(criteres);
        enginService.saveEngin(engin);

        // Affecte l'engin à la demande et clôture la demande
        demande.setEngin(engin);
        demande.setEtat("Clôturé");
        demandeService.saveDemande(demande);

        // Envoyer notification (non montré ici)
        // notificationService.envoyerNotification(...);

        return ResponseEntity.ok("Demande traitée avec succès");
    }

    @GetMapping("/{id}")
    public ResponseEntity<DemandeDto> getDemande(@PathVariable Long id) {
        DemandeDto demande = demandeService.getDemandeById(id);


            return ResponseEntity.ok(demande);
        }

    @GetMapping("/user/{id}")
    public List<DemandeDto> getDemandesByUtilisateur(@PathVariable Long id) {
        return demandeService.getDemandesByUtilisateur(id);
    }
    }




