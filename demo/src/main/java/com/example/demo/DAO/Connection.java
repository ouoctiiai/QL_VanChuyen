package com.example.demo.DAO;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

import java.util.ArrayList;
import java.util.List;

public class Connection {
    private MongoClient mongoClient;
    private MongoDatabase database;
    private MongoCollection<Document> collection;
    private String uri = "mongodb://localhost:27017"; //"mongodb+srv://bpbn:11220033@cluster0.xumcve1.mongodb.net/";
    private String databaseName = "QL_VanChuyenHH";

    public Connection(String collectionName) {
        mongoClient = MongoClients.create(uri);
        database = mongoClient.getDatabase(databaseName);
        collection = database.getCollection(collectionName);
    }

    public List<Document> loadData() {
        List<Document> data = new ArrayList<>();
        for (Document doc : collection.find()) {
            data.add(doc);
        }
        return data;
    }

    public void close() {
        mongoClient.close();
    }

    public MongoCollection<Document> getCollection() {
        return collection;
    }

    public void setCollection(MongoCollection<Document> collection) {
        this.collection = collection;
    }
}
