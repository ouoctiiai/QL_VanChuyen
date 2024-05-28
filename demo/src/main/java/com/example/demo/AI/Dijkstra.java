package com.example.demo.AI;

import com.example.demo.DAO.KhoDAO;
import com.example.demo.POJO.KhoPOJO;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class Dijkstra {

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

    public static void calculateShortestPath(Node source)
    {
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

    public static Double findDistance(String diemBD, String diemKT)
    {
        KhoDAO khoDAO = new KhoDAO();
        List<KhoPOJO> danhSachKho = khoDAO.layTatCaKho();
        List<Node> danhSachNode = new ArrayList<>();
        for (KhoPOJO kho : danhSachKho) {
            Node node = new Node(kho.getTinh());
            danhSachNode.add(node);
        }

        for (Node node : danhSachNode) {
            KhoPOJO k = khoDAO.timKhoTheoTinh(node.getName());
            List<KhoPOJO.KhoLanCan> khoLanCans = k.getKhoLanCan();
            for(KhoPOJO.KhoLanCan klc : khoLanCans)
            {
                KhoPOJO khoTheoTinh = khoDAO.timKhoTheoMaKho(klc.getMaKho());
                Node kholc = findNodeByName(danhSachNode, khoTheoTinh.getTinh());
                node.addAdjacentNode(kholc , klc.getKhoangCach());
            }
        }

        Node x = new Node();
        Node y = new Node();

        for (Node node : danhSachNode) {
            if(Objects.equals(node.getName(), diemBD))
            {
                x = node;
            }
            if(Objects.equals(node.getName(), diemKT))
            {
                y = node;
            }
        }

        calculateShortestPath(x);
        return y.getDistance();
    }

    public static String findShortedPath(String diemBD, String diemKT)
    {
        KhoDAO khoDAO = new KhoDAO();
        List<KhoPOJO> danhSachKho = khoDAO.layTatCaKho();
        List<Node> danhSachNode = new ArrayList<>();
        for (KhoPOJO kho : danhSachKho) {
            Node node = new Node(kho.getTinh());
            danhSachNode.add(node);
        }

        for (Node node : danhSachNode) {
            KhoPOJO k = khoDAO.timKhoTheoTinh(node.getName());
            List<KhoPOJO.KhoLanCan> khoLanCans = k.getKhoLanCan();
            for(KhoPOJO.KhoLanCan klc : khoLanCans)
            {
                KhoPOJO khoTheoTinh = khoDAO.timKhoTheoMaKho(klc.getMaKho());
                Node kholc = findNodeByName(danhSachNode, khoTheoTinh.getTinh());
                node.addAdjacentNode(kholc , klc.getKhoangCach());
            }
        }

        Node x = new Node();
        Node y = new Node();

        for (Node node : danhSachNode) {
            if(Objects.equals(node.getName(), diemBD))
            {
                x = node;
            }
            if(Objects.equals(node.getName(), diemKT))
            {
                y = node;
            }
        }

        calculateShortestPath(x);
        return findPath(y);
    }

    public static void main(String[] args) {
        System.out.println(findDistance("Hà Nội", "Bình Định"));
        System.out.println(findShortedPath("Hà Nội", "Bình Định"));
    }

    private static Node findNodeByName(List<Node> nodes, String name)
    {
        Node node = new Node();
        for (Node i : nodes){
            if(Objects.equals(i.getName(), name))
            {
                node = i;
            }
        }
        return node;
    }

    private static String findPath(Node node)
    {
        String path = node.getShortestPath().stream()
                .map(Node::getName)
                .collect(Collectors.joining(", "));

        path += ", " + node.getName();
        return path;
    }

}
