package com.brainware.neuroArt;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories
public class NeuroArtApplication {

	public static void main(String[] args) {
		SpringApplication.run(NeuroArtApplication.class, args);
	}
}
