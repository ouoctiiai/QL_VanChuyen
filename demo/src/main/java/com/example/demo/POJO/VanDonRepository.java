package com.example.demo.POJO;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface VanDonRepository extends MongoRepository<VanDonPOJO, ObjectId> {
}
