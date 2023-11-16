package com.brainware.neuroArt.mapper;

import com.brainware.neuroArt.controller.dto.ClientDTO;
import com.brainware.neuroArt.controller.dto.ImageDTO;
import com.brainware.neuroArt.controller.dto.UrlAndIdDto;
import com.brainware.neuroArt.model.Client;
import com.brainware.neuroArt.model.Collection;
import com.brainware.neuroArt.model.Image;

import java.util.Map;

public class Mapper {

    public static Image mapToImage(UrlAndIdDto urlAndIdDto, ImageDTO imageDTO) {
        if (urlAndIdDto == null || imageDTO == null) {
            return null;
        }
        Image image = new Image();
        image.setTitle(imageDTO.title());
        image.setPrompt(imageDTO.prompt());
        image.setDescription(imageDTO.description());
        image.setId(urlAndIdDto.id());
        image.setUrl(urlAndIdDto.url());
        return image;
    }

    public static ClientDTO mapToClientDTO(Map<String, Object> claims, Client client) {
        return new ClientDTO(client.getUsername(), client.getCollectionList().stream().map(Collection::toDTO).toList(),
                claims.get("email").toString(),
                claims.get("picture").toString());
    }
}
