package com.brainware.neuroArt.service;

import com.brainware.neuroArt.controller.dto.openapi.GenerateImageDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;


@Service
@RequiredArgsConstructor
public class OpenApiService {

    @Value("${openaikey}")
    private String openAiKey;
    public static final String OPEN_API_GENERATE_IMAGE_URL = "https://api.openai.com/v1/images/generations";
    private final RestTemplate restTemplate;

    public String generateImage(String prompt) {
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.AUTHORIZATION, "Bearer " + openAiKey);
        headers.setContentType(MediaType.APPLICATION_JSON);

        GenerateImageDto generateImageDto = new GenerateImageDto(prompt);

        URI uri = UriComponentsBuilder.fromHttpUrl(OPEN_API_GENERATE_IMAGE_URL)
                .build()
                .toUri();

        HttpEntity<GenerateImageDto> requestEntity = new HttpEntity<>(generateImageDto, headers);

        ResponseEntity<String> response = restTemplate.exchange(uri, HttpMethod.POST, requestEntity, String.class);

        if (!response.getStatusCode().isSameCodeAs(HttpStatus.OK)) {
            throw new IllegalArgumentException("OpenAPI is not available right now");
        }
        return response.getBody();
    }
}
