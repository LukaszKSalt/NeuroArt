package com.brainware.neuroArt.utils;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;

public class ObjectMapperUtils {
    public static JsonNode toJsonTree(ObjectMapper objectMapper, String responseBody, String errorMessage) {
        JsonNode jsonTree;
        try {
            jsonTree = objectMapper.readTree(responseBody);
        } catch (IOException e) {
            throw new IllegalArgumentException(errorMessage);
        }
        return jsonTree;
    }
}
