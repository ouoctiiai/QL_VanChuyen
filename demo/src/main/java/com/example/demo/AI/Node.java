package com.example.demo.AI;

import com.example.demo.DAO.KhoDAO;
import com.example.demo.POJO.KhoPOJO;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class Node implements Comparable<Node> {
    private final String name;

    private Double distance = Double.MAX_VALUE;
    private List<Node> shortestPath = new LinkedList<>();
    private Map<Node, Double> adjacentNodes = new HashMap<>();

    public Node(String name) {
        this.name = name;
    }

    public Node(){
        name = "";
    }

    public String getName() {
        return name;
    }

    public void setDistance(Double distance) {
        this.distance = distance;
    }

    public Double getDistance() {
        return distance;
    }

    public void setAdjacentNodes(Map<Node, Double> adjacentNodes) {
        this.adjacentNodes = adjacentNodes;
    }

    public Map<Node, Double> getAdjacentNodes() {
        return adjacentNodes;
    }

    public void setShortestPath(List<Node> shortestPath) {
        this.shortestPath = shortestPath;
    }

    public List<Node> getShortestPath() {
        return shortestPath;
    }

    public void addAdjacentNode(Node node, Double weight) {
        adjacentNodes.put(node, weight);
    }

    @Override
    public int compareTo(Node node)
    {
        return Double.compare(this.distance, node.getDistance());
    }

}

