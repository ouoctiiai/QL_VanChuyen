package com.example.demo.AI;

import java.util.HashMap;
import java.util.Map;

public class Graph {
    private Map<Node, Map<Node, Double>> adjacencyList;

    public Graph() {
        this.adjacencyList = new HashMap<>();
    }

    public void addNode(Node node) {
        adjacencyList.put(node, new HashMap<>());
    }

    public void addEdge(Node source, Node destination, double weight) {
        adjacencyList.get(source).put(destination, weight);
        adjacencyList.get(destination).put(source, weight); // Undirected graph
    }

    public Map<Node, Map<Node, Double>> getAdjacencyList() {
        return adjacencyList;
    }

}
