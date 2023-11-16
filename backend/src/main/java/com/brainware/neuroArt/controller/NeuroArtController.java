package com.brainware.neuroArt.controller;

import com.brainware.neuroArt.controller.dto.ClientDTO;
import com.brainware.neuroArt.controller.dto.ImageDTO;
import com.brainware.neuroArt.model.Client;
import com.brainware.neuroArt.model.Collection;
import com.brainware.neuroArt.model.Image;
import com.brainware.neuroArt.service.NeuroArtService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import static com.brainware.neuroArt.mapper.Mapper.mapToClientDTO;

@RestController
@AllArgsConstructor
public class NeuroArtController {

    NeuroArtService neuroArtService;

    @GetMapping("/check")
    public ResponseEntity<String> getList() {
        return new ResponseEntity<>("Hey!", HttpStatus.OK);
    }

    @PostMapping("/generate")
    public ResponseEntity<String> generateImage(@RequestBody String prompt) {
        String imageUrl;
        try {
            imageUrl = neuroArtService.getImageUrl(prompt);
        } catch (ExecutionException | InterruptedException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR , "Something went wrong");
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
        return new ResponseEntity<>(imageUrl, HttpStatus.OK);
    }

    @GetMapping("/collection/{id}")
    public ResponseEntity<Collection> getCollection(@PathVariable String id) {
        Collection collection = neuroArtService.getCollectionByImageId(id);
        if (collection == null){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Collection with given image id not found!");
        }
        return new ResponseEntity<>(collection, HttpStatus.OK);
    }

    @GetMapping("/image/{id}")
    public ResponseEntity<Image> getImage(@PathVariable String id) {
        Image image = neuroArtService.getImage(id);
        if (image == null){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Image with given id not found!");
        }
        return new ResponseEntity<>(image, HttpStatus.OK);
    }

    @PostMapping("/image")
    public ResponseEntity<Image> saveImage(@RequestBody ImageDTO imageDTO) {
        return new ResponseEntity<>(neuroArtService.saveImage(imageDTO, getClaims()), HttpStatus.CREATED);
    }

    @DeleteMapping("/image/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteImage(@PathVariable String id) {
        if (id == null || id.isEmpty() || id.isBlank()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Provided id has to be valid");
        }
        neuroArtService.deleteImage(id, getClaims());
    }
    
    @GetMapping("/gallery")
    public ResponseEntity<List<Image>> getGallery() {
        return new ResponseEntity<>(neuroArtService.getAllImages(), HttpStatus.OK);
    }

    @PostMapping("/user")
    public ResponseEntity<ClientDTO> getUser() {
        Map<String, Object> claims = getClaims();
        Client client = neuroArtService.getClient(claims.get("sub").toString());
        if (client == null) {
            client = neuroArtService.createClient(claims);
        }
        ClientDTO clientDTO = mapToClientDTO(claims, client);
        return new ResponseEntity<>(clientDTO, HttpStatus.OK);
    }

    private Map<String, Object> getClaims() {
        return ((Jwt)SecurityContextHolder
                .getContext().getAuthentication().getPrincipal())
                .getClaims();
    }
}
