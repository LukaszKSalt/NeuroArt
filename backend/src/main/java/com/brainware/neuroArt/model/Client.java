package com.brainware.neuroArt.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "client")
@Data
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String sub;
    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL)
    private List<Collection> collectionList = new ArrayList<>();

}
