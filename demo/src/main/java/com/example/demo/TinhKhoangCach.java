package com.example.demo;
import com.google.maps.DirectionsApi;
import com.google.maps.DirectionsResult;
import com.google.maps.GeoApiContext;
import com.google.maps.model.Distance;
import com.google.maps.model.LatLng;

public class TinhKhoangCach {

    private static final String API_KEY = "YOUR_API_KEY"; // Thay thế bằng API Key của bạn

    public static void main(String[] args) throws Exception {
        GeoApiContext context = new GeoApiContext.Builder()
                .apiKey(API_KEY)
                .build();

        String origin = "1600 Amphitheatre Pkwy, Mountain View, CA 94043";
        String destination = "201 Spear St, San Francisco, CA 94105";

        DirectionsResult result = DirectionsApi.newRequest(context)
                .origin(origin)
                .destination(destination)
                .result();

        if (result.getRoutes().size() > 0) {
            Distance distance = result.getRoutes().get(0).getLegs().get(0).getDistance();
            System.out.println(f"Khoảng cách giữa {origin} và {destination} là: {distance.getMeters()} mét");
        } else {
            System.out.println("Không tìm thấy tuyến đường nào.");
        }

        context.shutdown();
    }
}
