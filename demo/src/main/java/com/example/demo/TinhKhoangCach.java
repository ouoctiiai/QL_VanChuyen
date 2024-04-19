package com.example.demo;
import com.google.maps.*;
import com.google.maps.model.Distance;
import com.google.maps.model.DistanceMatrix;
import com.google.maps.model.LatLng;
import com.google.maps.model.TravelMode;

public class TinhKhoangCach {

    private static final String API_KEY = "YOUR_API_KEY"; // Thay thế bằng API Key của bạn

    public static void main(String[] args) throws Exception {
        GeoApiContext context = new GeoApiContext.Builder()
                .apiKey(API_KEY)
                .build();

        String origin = "1600 Amphitheatre Pkwy, Mountain View, CA 94043";
        String destination = "201 Spear St, San Francisco, CA 94105";

        DistanceMatrixApiRequest req = DistanceMatrixApi.newRequest(new GeoApiContext.Builder()
                .apiKey(API_KEY)
                .build());

        DistanceMatrix query = req.origins(origin)
                .destinations(destination)
                .mode(TravelMode.DRIVING)
                .avoid(DirectionsApi.RouteRestriction.TOLLS)
                .language("en-US")
                .awaitIgnoreError();

        if (query != null && query.rows.length > 0)
        {
            System.out.println("Khoảng cách giữa {origin} và {destination} là: {distance.getMeters()} mét");
        } else
        {
            System.out.println("Không tìm thấy tuyến đường nào.");
        }

        context.shutdown();
    }
}
