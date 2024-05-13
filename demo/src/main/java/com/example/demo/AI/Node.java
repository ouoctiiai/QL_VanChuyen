package com.example.demo.AI;

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

    public static void evaluateDistanceAndPath(Node adjacentNode, Double adgeWeight, Node sourceNode)
    {
        Double newDistance = sourceNode.getDistance() + adgeWeight;
        if(newDistance < adjacentNode.getDistance())
        {
            adjacentNode.setDistance(newDistance);
            adjacentNode.setShortestPath(
                    Stream.concat(sourceNode.getShortestPath().stream(), Stream.of(sourceNode)).toList()
            );
        }
    }

    public static void calculateShortestPath(Node source) {
        source.setDistance(0.0);
        Set<Node> settledNodes = new HashSet<>();
        Queue<Node> unsettledNodes = new PriorityQueue<>(Collections.singleton(source));

        while (!unsettledNodes.isEmpty()) {
            Node currentNode = unsettledNodes.poll();

            currentNode.getAdjacentNodes()
                    .entrySet()
                    .stream()
                    .filter(entry -> !settledNodes.contains(entry.getKey()))
                    .forEach(entry -> {
                        evaluateDistanceAndPath(entry.getKey(), entry.getValue(), currentNode);
                        unsettledNodes.add(entry.getKey());
                    });
            settledNodes.add(currentNode);
        }

    }

    public  static void main(String[] args) {
        Node nodeA= new Node("A");
        Node nodeB= new Node("B");
        Node nodeC= new Node("C");
        Node nodeD= new Node("D");
        Node nodeE= new Node("E");
        Node nodeF= new Node("F");

        nodeA.addAdjacentNode(nodeB, 2.0);
        nodeA.addAdjacentNode(nodeC, 4.0);

        nodeB.addAdjacentNode(nodeC, 3.0);
        nodeB.addAdjacentNode(nodeD, 1.0);
        nodeB.addAdjacentNode(nodeE, 5.0);

        nodeC.addAdjacentNode(nodeD, 2.0);

        nodeD.addAdjacentNode(nodeE, 1.0);
        nodeD.addAdjacentNode(nodeF, 4.0);

        nodeE.addAdjacentNode(nodeF, 2.0);

        calculateShortestPath(nodeA);
        printPaths(Arrays.asList(nodeA, nodeB, nodeC, nodeD, nodeE, nodeF));
    }

    private static void printPaths(List<Node> nodes) {
        nodes.forEach(node -> {
            String path = node.getShortestPath().stream()
                    .map(Node::getName)
                    .collect(Collectors.joining(" -> "));
            System.out.println((path.isBlank()
                    ? "%s : %s".formatted(path, node.getName(), node.getDistance())
                    : "%s -> %s : %s".formatted(path, node.getName(), node.getDistance()))
            );
        });
    }

}

