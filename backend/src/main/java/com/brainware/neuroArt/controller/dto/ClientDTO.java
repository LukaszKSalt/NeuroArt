package com.brainware.neuroArt.controller.dto;

import java.util.List;

public record ClientDTO(String username, List<CollectionDTO> collectionList,
                        String email, String picture) {

}
