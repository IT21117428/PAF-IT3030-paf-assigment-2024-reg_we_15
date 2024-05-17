package com.example.fitnessserverapi.repository;

import com.example.fitnessserverapi.model.ShareWork;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ShareRepository extends MongoRepository<ShareWork, String> {

}
