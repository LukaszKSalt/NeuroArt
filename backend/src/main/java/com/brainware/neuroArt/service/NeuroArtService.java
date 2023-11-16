package com.brainware.neuroArt.service;

import com.brainware.neuroArt.controller.dto.ImageDTO;
import com.brainware.neuroArt.controller.dto.UrlAndIdDto;
import com.brainware.neuroArt.mapper.Mapper;
import com.brainware.neuroArt.model.Client;
import com.brainware.neuroArt.model.Collection;
import com.brainware.neuroArt.model.Image;
import com.brainware.neuroArt.model.repository.ClientRepository;
import com.brainware.neuroArt.model.repository.CollectionRepository;
import com.brainware.neuroArt.model.repository.ImageRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.util.Streamable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import static com.brainware.neuroArt.utils.ObjectMapperUtils.toJsonTree;

@Service
@RequiredArgsConstructor
public class NeuroArtService {

    private final CollectionRepository collectionRepository;
    private final ImageRepository imageRepository;
    private final ClientRepository clientRepository;
    private final ObjectMapper objectMapper;
    private final ImgBBService imgBBService;
    private final OpenApiService openApiService;

    public String getImageUrl(String prompt) throws ExecutionException, InterruptedException {
        if (prompt.isEmpty() || prompt.isBlank()) {
            throw new IllegalArgumentException("Prompt has to be valid");
        }
        String responseBody = openApiService.generateImage(prompt);
        JsonNode jsonTree = toJsonTree(objectMapper, responseBody, "Something went wrong with fetching");
        return jsonTree.get("data").get(0).get("url").asText();
    }

    @Transactional
    public Image saveImage(ImageDTO imageDto, Map<String, Object> claims) {
        UrlAndIdDto urlAndIdDto = imgBBService.fetchPermanentUrl(imageDto.temporaryUrl());
        Image image = Mapper.mapToImage(urlAndIdDto, imageDto);
        image = imageRepository.save(image);
        Client client = clientRepository.findClientBySub(claims.get("sub").toString());
        Collection clientCollection = client.getCollectionList().get(0);
        addImageToCollectionAndSave(clientCollection, image);
        return image;
    }

    @Transactional
    public void deleteImage(String id, Map<String, Object> claims) {
        Client client = clientRepository.findClientBySub(claims.get("sub").toString());
        if (client == null) {
            return;
        }
        List<Collection> collectionList = client.getCollectionList();
        collectionList.get(0).getImages().removeIf(image -> image.getId().equals(id));
        client.setCollectionList(collectionList);
        clientRepository.save(client);
        imageRepository.deleteById(id);
    }
    
    public List<Image> getAllImages() {
        return Streamable.of(imageRepository.findAll()).toList();
    }

    public Client getClient(String sub) {
        return clientRepository.findClientBySub(sub);
    }

    @Transactional
    public Client createClient(Map<String, Object> claims) {
        Client client = new Client();
        client.setSub(claims.get("sub").toString());
        client.setUsername(claims.get("given_name").toString());
        client = clientRepository.save(client);

        Collection collection = new Collection();
        collection.setClient(client);
        collection.setName(client.getUsername());
        collection.setDescription("My first collection");
        collection = collectionRepository.save(collection);

        List<Collection> userCollectionList = client.getCollectionList();
        userCollectionList.add(collection);
        client.setCollectionList(userCollectionList);
        return clientRepository.save(client);
    }

    private void addImageToCollectionAndSave(Collection collection, Image image) {
        collection.getImages().add(image);
        collectionRepository.save(collection);
    }

    public Image getImage(String id) {
        return imageRepository.findById(id).orElse(null);
    }

    public Collection getCollectionByImageId(String id) {
        return collectionRepository.findCollectionByImageId(id);
    }
}
