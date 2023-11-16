package com.brainware.neuroArt.controller.dto;

import com.brainware.neuroArt.model.Image;

import java.util.List;

public record CollectionDTO(String description, List<Image> images) {
}
