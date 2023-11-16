package com.brainware.neuroArt.model.repository;

import com.brainware.neuroArt.model.Collection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CollectionRepository extends JpaRepository<Collection, Long> {
    @Query("SELECT c FROM Collection c JOIN c.images i WHERE i.id = :imageId")
    Collection findCollectionByImageId(@Param("imageId") String imageId);
}