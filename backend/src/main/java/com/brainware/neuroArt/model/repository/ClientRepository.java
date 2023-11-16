package com.brainware.neuroArt.model.repository;

import com.brainware.neuroArt.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {
    Client findClientBySub(String sub);
}
