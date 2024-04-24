package com.example.demo;
import com.google.maps.*;
import com.google.maps.model.Distance;
import com.google.maps.model.DistanceMatrix;
import com.google.maps.model.LatLng;
import com.google.maps.model.TravelMode;
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



public class TinhKhoangCach {

    // Bán kính Trái Đất tính theo km
    private static final double EARTH_RADIUS = 6371.0;

    // Phương pháp tính khoảng cách giữa hai điểm dựa trên công thức Haversine
    public static double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        // Chuyển đổi tọa độ từ độ sang radian
        double lat1Rad = Math.toRadians(lat1);
        double lon1Rad = Math.toRadians(lon1);
        double lat2Rad = Math.toRadians(lat2);
        double lon2Rad = Math.toRadians(lon2);

        // Chênh lệch kinh độ và vĩ độ
        double dLat = lat2Rad - lat1Rad;
        double dLon = lon2Rad - lon1Rad;

        // Công thức Haversine
        double a = Math.pow(Math.sin(dLat / 2), 2) +
                Math.cos(lat1Rad) * Math.cos(lat2Rad) *
                        Math.pow(Math.sin(dLon / 2), 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        // Tính khoảng cách bằng bán kính Trái Đất
        double distance = EARTH_RADIUS * c;

        return distance;
    }

    public static void main(String[] args) {
        // Ví dụ về tính khoảng cách giữa hai địa điểm
        double lat1 = 10.762622; // Vĩ độ của địa điểm 1 (ví dụ: Thành phố Hồ Chí Minh)
        double lon1 = 106.660172; // Kinh độ của địa điểm 1 (ví dụ: Thành phố Hồ Chí Minh)
        double lat2 = 21.028511; // Vĩ độ của địa điểm 2 (ví dụ: Hà Nội)
        double lon2 = 105.854187; // Kinh độ của địa điểm 2 (ví dụ: Hà Nội)

        // Tính khoảng cách giữa hai địa điểm
        double distance = calculateDistance(lat1, lon1, lat2, lon2);
        System.out.println("Khoảng cách giữa hai địa điểm là: " + distance + " km");
    }
}


