package com.brainware.neuroArt.service;

import com.brainware.neuroArt.controller.dto.UrlAndIdDto;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

import static com.brainware.neuroArt.utils.ObjectMapperUtils.toJsonTree;

@Service
@RequiredArgsConstructor
public class ImgBBService {

    @Value("${imgbbkey}")
    private String imgBBKey;
    public static final String IMGBB_UPLOAD_URL = "https://api.imgbb.com/1/upload?expiration=2700000&key=";
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public UrlAndIdDto fetchPermanentUrl(String temporaryUrl) {
        String responseBody = upload(temporaryUrl);
        JsonNode jsonTree = toJsonTree(objectMapper, responseBody,
                "Something went wrong with fetching permanent url");
        String id = jsonTree.get("data").get("id").asText();
        String url = jsonTree.get("data").get("display_url").asText();
        return new UrlAndIdDto(url, id);
    }

    private String upload(String temporaryUrl) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        MultiValueMap<String, Object> map = new LinkedMultiValueMap<>();
        map.add("image", temporaryUrl);

        URI uri = UriComponentsBuilder.fromHttpUrl(IMGBB_UPLOAD_URL + imgBBKey)
                .build()
                .toUri();

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(map, headers);

        ResponseEntity<String> response = restTemplate.exchange(uri, HttpMethod.POST, requestEntity, String.class);
        if (!response.getStatusCode().isSameCodeAs(HttpStatus.OK)) {
            throw new IllegalArgumentException("error response from ImgBB");
        }
        return response.getBody();
    }
}
