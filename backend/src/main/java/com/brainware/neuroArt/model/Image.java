package com.brainware.neuroArt.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "image")
@Data
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Image {

    @Id
    private String id;
    @Column(nullable = false)
    private String url;
    @Column(nullable = false)
    private String prompt;
    @Column(nullable = false)
    private String title;
    private String description;

}
