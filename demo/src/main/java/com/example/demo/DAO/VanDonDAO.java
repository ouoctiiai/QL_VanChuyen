package com.example.demo.DAO;

import com.example.demo.AI.Dijkstra;
import com.example.demo.POJO.*;
import com.mongodb.BasicDBObject;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Sorts;
import com.mongodb.client.model.Updates;
import com.mongodb.client.result.UpdateResult;
import lombok.SneakyThrows;
import org.bson.Document;
import org.bson.conversions.Bson;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;

@Service
public class VanDonDAO {

    private final Connection connection;
    private java.util.Objects Objects;


    public VanDonDAO() {
        connection = new Connection("VanDon");
    }

    public List<VanDonPOJO> allVanDon() {
        List<VanDonPOJO> dsVanDon = new ArrayList<>();
        MongoCollection<Document> collection = connection.getCollection();
        for (Document doc : collection.find()) {
            VanDonPOJO vd = convertToVanDonPOJO(doc);
            dsVanDon.add(vd);
            double totalShippingFee = tinhPhiVanChyen(vd);
            vd.getPhiVanChuyen().setTongPhi((int)totalShippingFee);
            String id = doc.getObjectId("_id").toString();
            collection.updateOne(Filters.eq("_id", new ObjectId(id)),
                    Updates.set("PhiVanChuyen.TongPhi", vd.getPhiVanChuyen().getTongPhi()));
        }
        return dsVanDon;
    }

    public List<VanDonPOJO> danhSachDonNoiTinh() {
        List<VanDonPOJO> dsVanDon = new ArrayList<>();

        MongoCollection<Document> collection = connection.getCollection();

        BasicDBObject query = new BasicDBObject("LoaiVanChuyen", "Nội tỉnh");

        for (Document doc : collection.find(query)) {
            VanDonPOJO vd = convertToVanDonPOJO(doc);
            dsVanDon.add(vd);
        }

        return dsVanDon;
    }

    public List<VanDonPOJO> danhSachDonLienTinh() {
        List<VanDonPOJO> dsVanDon = new ArrayList<>();

        MongoCollection<Document> collection = connection.getCollection();

        BasicDBObject query = new BasicDBObject("LoaiVanChuyen", "Liên tỉnh");

        for (Document doc : collection.find(query)) {
            VanDonPOJO vd = convertToVanDonPOJO(doc);
            dsVanDon.add(vd);
            double totalShippingFee = tinhPhiVanChyen(vd);
        }

        return dsVanDon;
    }

    public List<VanDonPOJO> danhSachDonNoiTinhChuaGiaoTheoTinh(String tinh) {
        List<VanDonPOJO> dsVanDon = new ArrayList<>();
        List<VanDonPOJO> dsNoiTinh = danhSachDonNoiTinh();
        for (VanDonPOJO vd : dsNoiTinh) {
            if(java.util.Objects.equals(vd.getTrangThai(), "Chờ giao") && java.util.Objects.equals(vd.getTinh(), tinh))
            {
                dsVanDon.add(vd);
            }
        }
        return  dsVanDon;
    }

    public List<VanDonPOJO> danhSach10DonGanDayNhat() {
        List<VanDonPOJO> dsVanDon = new ArrayList<>();

        MongoCollection<Document> collection = connection.getCollection();

        FindIterable<Document> docs = collection.find()
                .sort(Sorts.descending("ThoiGianLap"))
                .limit(10);

        for (Document doc : docs) {
            VanDonPOJO vd = convertToVanDonPOJO(doc);
            dsVanDon.add(vd);
        }

        return dsVanDon;
    }

    public List<VanDonPOJO> lichSuDonCuaShipper(String id){
        List<VanDonPOJO> ds = new ArrayList<>();
        List<VanDonPOJO> dsVanDon = allVanDon();
        for(VanDonPOJO vd : dsVanDon){
            ThongTinShipper tt = vd.getThongTinShipper();
            if(tt != null){
                if(java.util.Objects.equals(tt.getMaShipper(), id))
                {
                    ds.add(vd);
                }
            }
        }
        return ds;
    }

    public List<VanDonPOJO> lichSuDonCuaTaiXe(String id){
        List<VanDonPOJO> ds = new ArrayList<>();
        List<VanDonPOJO> dsVanDon = allVanDon();
        for(VanDonPOJO vd : dsVanDon){
            ThongTinTaiXe tt = vd.getThongTinTaiXe();
            if(tt != null){
                if(java.util.Objects.equals(tt.getMaTaiXe(), id))
                {
                    ds.add(vd);
                }
            }
        }
        return ds;
    }

    public VanDonPOJO timVanDonTheoId(ObjectId id) {
        MongoCollection<Document> collection = connection.getCollection();
        Bson filter = Filters.eq("_id", id);
        Document doc = collection.find(filter).first();
        return convertToVanDonPOJO(doc);
    }

    public double tinhPhiVanChyen(VanDonPOJO vanDon) {
        PhiVanChuyen phiVanChuyen = vanDon.getPhiVanChuyen();
        ThongTinHangHoa thongTinHangHoa = vanDon.getThongTinHangHoa();
        double tongPhi = phiVanChuyen.getPhiCoDinh();
        double khoiLuong = thongTinHangHoa.getTrongLuong();
        KichCo kichCo = thongTinHangHoa.getKichCo();
        String loaiHang = thongTinHangHoa.getLoaiHang();

        if (loaiHang.equalsIgnoreCase("Điện - điện tử"))
            tongPhi += 5000;
        else if (loaiHang.equalsIgnoreCase("Hàng dễ vỡ"))
            tongPhi += 5000;
        else if (loaiHang.equalsIgnoreCase("Thuốc & hóa chất"))
            tongPhi += 10000;

        if(kichCo != null){
            double chieuDai = kichCo.getDai();
            double chieuRong = kichCo.getDai();
            if (chieuDai + chieuRong > 150)
                tongPhi += 10000;
        }

        if(phiVanChuyen.getPhiHa() != null)
        {
            double ha = phiVanChuyen.getPhiHa();
            tongPhi += ha;
        }

        if(phiVanChuyen.getVat() != null)
        {
            double vat = phiVanChuyen.getVat();
            tongPhi += vat;
        }

        if(phiVanChuyen.getPhiNang() != null)
        {
            double nang = phiVanChuyen.getPhiNang();
            tongPhi += nang;
        }

        if(phiVanChuyen.getThuongShipper() != null)
        {
            double thuong = phiVanChuyen.getThuongShipper();
            tongPhi += thuong;
        }

        if(phiVanChuyen.getPhiKhac() != null)
        {
            double khac = phiVanChuyen.getPhiKhac();
            tongPhi += khac;
        }

        if(phiVanChuyen.getPhiCoc() != null)
        {
            double coc = phiVanChuyen.getPhiCoc();
            tongPhi += coc;
        }

        if (vanDon.getLoaiVanChuyen().equalsIgnoreCase("Liên tỉnh") ) {
            TuyenDuong tuyenDuong = vanDon.getTuyenDuong();
            tongPhi += tuyenDuong.getKhoangCach() % 10;

            if (khoiLuong > 50)
                tongPhi += 20000 + 2000 * (khoiLuong - 50);
            else if (khoiLuong > 10)
                tongPhi += 20000;
            else if (khoiLuong > 5)
                tongPhi += 10000;
            else if (khoiLuong > 1)
                tongPhi += 5000;

        } else {
            tongPhi += vanDon.getKhoangCach() % 10 * 2000;
            if (khoiLuong > 50)
                tongPhi += 10000 + 2000 * (khoiLuong - 50);
            else if (khoiLuong > 5)
                tongPhi += 10000;
        }
        return tongPhi;
    }

    public int tinhTongPhi(int phiCoDinh, int phiVAT, int phiCoc, int phiNang, int phiHa, int phiThuong, int phiKhac, double khoangCach, double khoiLuong, double chieuDai, double chieuRong, String loaiHang, String loaiVanChuyen){
        int tongPhi = phiCoDinh + phiVAT + phiCoc + phiNang + phiHa + phiThuong + phiKhac;

        if (loaiHang.equalsIgnoreCase("Điện - điện tử"))
            tongPhi += 5000;
        else if (loaiHang.equalsIgnoreCase("Hàng dễ vỡ"))
            tongPhi += 5000;
        else if (loaiHang.equalsIgnoreCase("Thuốc & hóa chất"))
            tongPhi += 10000;

        if (chieuDai + chieuRong > 150)
            tongPhi += 10000;

        if (loaiVanChuyen.equalsIgnoreCase("Liên tỉnh") ) {
            tongPhi += khoangCach % 10;

            if (khoiLuong > 50)
                tongPhi += 20000 + 2000 * (khoiLuong - 50);
            else if (khoiLuong > 10)
                tongPhi += 20000;
            else if (khoiLuong > 5)
                tongPhi += 10000;
            else if (khoiLuong > 1)
                tongPhi += 5000;

        } else {
            tongPhi += khoangCach % 10 * 2000;
            if (khoiLuong > 50)
                tongPhi += 10000 + 2000 * (khoiLuong - 50);
            else if (khoiLuong > 5)
                tongPhi += 10000;
        }
        return tongPhi;
    }

    public int tinhPhiVAT(int phiCoDinh, int phiCoc, int phiNang, int phiHa, int phiKhac){
        return (int) ((phiCoDinh + phiCoc + phiNang + phiHa + phiKhac) * 0.1);
    }

    public List<Map<String, Object>> tinhDoanhThuTheoNam() {
        List<VanDonPOJO> danhSach = allVanDon();
        Map<Integer, Double> tongDoanhThu1Nam = new HashMap<>();

        for (VanDonPOJO vanDon : danhSach) {
            int nam = vanDon.getThoiGianLap().getYear();
            double tongTien = vanDon.getPhiVanChuyen().getTongPhi();
            tongDoanhThu1Nam.put(nam, tongDoanhThu1Nam.getOrDefault(nam, 0.0) + tongTien);
        }

        List<Map<String, Object>> doanhThuTheoNam = new ArrayList<>();
        for (Map.Entry<Integer, Double> entry : tongDoanhThu1Nam.entrySet()) {
            Map<String, Object> map = new HashMap<>();
            map.put("nam", entry.getKey());
            map.put("tongDoanhThu", entry.getValue());
            doanhThuTheoNam.add(map);
        }

        return doanhThuTheoNam;
    }


    public List<Map<String, Object>> tinhDoanhThuTheoThang() {
        List<VanDonPOJO> danhSach = allVanDon();
        Map<Integer, Map<Integer, Double>> tongTienTheoNamVaThang = new HashMap<>();

        for (VanDonPOJO vanDon : danhSach) {
//            LocalDate thoiGianLap = vanDon.getThoiGianLap();
            LocalDate thoiGianLap = LocalDate.parse(vanDon.getThoiGianLapToString());
            int nam = thoiGianLap.getYear();
            int thang = thoiGianLap.getMonthValue();
            double tongPhi = vanDon.getPhiVanChuyen().getTongPhi();

            tongTienTheoNamVaThang
                    .computeIfAbsent(nam, k -> new HashMap<>())
                    .merge(thang, tongPhi, Double::sum);
        }

        List<Map<String, Object>> doanhThuTheoThang = new ArrayList<>();
        for (Map.Entry<Integer, Map<Integer, Double>> entryNam : tongTienTheoNamVaThang.entrySet()) {
            int nam = entryNam.getKey();
            for (Map.Entry<Integer, Double> entryThang : entryNam.getValue().entrySet()) {
                int thang = entryThang.getKey();
                double tongTien = entryThang.getValue();

                Map<String, Object> map = new HashMap<>();
                map.put("nam", nam);
                map.put("thang", thang);
                map.put("tongTien", tongTien);
                doanhThuTheoThang.add(map);
            }
        }

        return doanhThuTheoThang;
    }

    public int tinhTongSoDonHangThanhCong() {
        int tongSoDonHangThanhCong = 0;

        MongoCollection<Document> collection = connection.getCollection();
        BasicDBObject query = new BasicDBObject("TrangThai", "Giao hàng thành công");

        for (Document doc : collection.find(query)) {
            tongSoDonHangThanhCong++;
        }

        return tongSoDonHangThanhCong;
    }

    public int tinhTongSoDonHangDaHuy() {
        int tongSoDonHangDaHuy = 0;

        MongoCollection<Document> collection = connection.getCollection();
        BasicDBObject query = new BasicDBObject("TrangThai", "Đã hủy");

        for (Document doc : collection.find(query)) {
            tongSoDonHangDaHuy++;
        }

        return tongSoDonHangDaHuy;
    }

    public int tinhTongSoDonHangDangGiao() {
        int tongSoDonHangDangGiao = 0;

        MongoCollection<Document> collection = connection.getCollection();
        BasicDBObject query = new BasicDBObject("TrangThai", "Đang giao");

        for (Document doc : collection.find(query)) {
            tongSoDonHangDangGiao++;
        }

        return tongSoDonHangDangGiao;
    }

    public int tinhTongSoDonHangChoGiao() {
        int tongSoDonHangChoGiao = 0;

        MongoCollection<Document> collection = connection.getCollection();
        BasicDBObject query = new BasicDBObject("TrangThai", "Chờ giao");

        for (Document doc : collection.find(query)) {
            tongSoDonHangChoGiao++;
        }

        return tongSoDonHangChoGiao;
    }

    public int tinhTongSoDonHangChoXN() {
        int tongSoDonHangChoXN = 0;

        MongoCollection<Document> collection = connection.getCollection();
        BasicDBObject query = new BasicDBObject("TrangThai", "Chờ xác nhận");

        for (Document doc : collection.find(query)) {
            tongSoDonHangChoXN++;
        }

        return tongSoDonHangChoXN;
    }

    public int tinhTongDonHang() {
        MongoCollection<Document> collection = connection.getCollection();
        long count = collection.countDocuments();
        return (int) count;
    }

    public List<VanDonPOJO> dsDonTheoTrangThai(String trangThai) {
        List<VanDonPOJO> dsVanDon = new ArrayList<>();
        MongoCollection<Document> collection = connection.getCollection();
        Bson filter = Filters.eq("TrangThai", trangThai);

        for (Document doc : collection.find(filter)) {
            VanDonPOJO vd = convertToVanDonPOJO(doc);
            dsVanDon.add(vd);
        }
        return dsVanDon;
    }

    public int tinhTongSoDonCuaShipper(String id) {
        int s = 0;
        List<VanDonPOJO> dsVanDon = allVanDon();
        for(VanDonPOJO vd : dsVanDon){
            ThongTinShipper tt = vd.getThongTinShipper();
            if(tt != null){
                if(java.util.Objects.equals(tt.getMaShipper(), id))
                {
                    s++;
                }
            }
        }
        return s;
    }

    public int tinhTongSoDonDaGiaoCuaShipper(String id) {
        int s = 0;
        List<VanDonPOJO> dsVanDon = allVanDon();
        for(VanDonPOJO vd : dsVanDon){
            ThongTinShipper tt = vd.getThongTinShipper();
            if(tt != null){
                if(java.util.Objects.equals(tt.getMaShipper(), id))
                {
                    if(java.util.Objects.equals(vd.getTrangThai(), "Giao hàng thành công"))
                    {
                        s++;
                    }
                }
            }
        }
        return s;
    }

    public int tinhTongSoDonDangGiaoCuaShipper(String id) {
        int s = 0;
        List<VanDonPOJO> dsVanDon = allVanDon();
        for(VanDonPOJO vd : dsVanDon){
            ThongTinShipper tt = vd.getThongTinShipper();
            if(tt != null){
                if(java.util.Objects.equals(tt.getMaShipper(), id))
                {
                    if(java.util.Objects.equals(vd.getTrangThai(), "Đang giao"))
                    {
                        s++;
                    }
                }
            }
        }
        return s;
    }

    public int tinhTongSoDonCuaShipperTrongThang(String id) {
        int s = 0;
        List<VanDonPOJO> dsVanDon = allVanDon();
        LocalDate today = LocalDate.now(); // Use LocalDate for current date

        for (VanDonPOJO vd : dsVanDon) {
            ThongTinShipper tt = vd.getThongTinShipper();
            if (tt != null && Objects.equals(tt.getMaShipper(), id)) {
                LocalDate donDate = vd.getThoiGianLap().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
                if (donDate.getMonth() == today.getMonth() && donDate.getYear() == today.getYear()) {
                    s++;
                }
            }
        }
        return s;
    }

    public int tinhTongSoDonCuaShipperTrongNgay(String id) {
        int s = 0;
        List<VanDonPOJO> dsVanDon = allVanDon();
        LocalDate today = LocalDate.now(); // Get today's date

        for (VanDonPOJO vd : dsVanDon) {
            ThongTinShipper tt = vd.getThongTinShipper();
            if (tt != null && Objects.equals(tt.getMaShipper(), id)) {
                // Assuming 'getThoiGianLap' returns a date object
                LocalDate donDate = vd.getThoiGianLap().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
                if (donDate.equals(today)) { // Check if delivery date matches today's date
                    s++;
                }
            }
        }
        return s;
    }

    public Double tinhKhoangCachDonLienTinh(VanDonPOJO vd){
        Double khoangCach = 0.0;
        KhoDAO khodao = new KhoDAO();
        Dijkstra dijkstra = new Dijkstra();
        KhoPOJO k1 = khodao.timKhoTheoTinh(vd.getDiemXuatPhat());
        KhoPOJO k2 = khodao.timKhoTheoTinh(vd.getDiemDen());
        if(!java.util.Objects.equals(k1.getKhuVuc(), k2.getKhuVuc())){
            KhoPOJO kchinh1 = khodao.timKhoChinhTheoKhuVuc(k1.getKhuVuc());
            KhoPOJO kchinh2 = khodao.timKhoChinhTheoKhuVuc(k2.getKhuVuc());
            khoangCach += dijkstra.findDistance(vd.getDiemXuatPhat(), kchinh1.getTinh())
                    + dijkstra.findDistance(kchinh1.getTinh(), kchinh2.getTinh())
                    + dijkstra.findDistance(kchinh2.getTinh(), vd.getDiemDen());

        }
        else {
            khoangCach += dijkstra.findDistance(vd.getDiemXuatPhat(), vd.getDiemDen());
        }
        return khoangCach;
    }

    public Double tinhKhoangCachDonLT(String dc1, String dc2){
        Double khoangCach = 0.0;
        KhoDAO khodao = new KhoDAO();
        Dijkstra dijkstra = new Dijkstra();
        KhoPOJO k1 = khodao.timKhoTheoTinh(dc1);
        KhoPOJO k2 = khodao.timKhoTheoTinh(dc2);
        if(!java.util.Objects.equals(k1.getKhuVuc(), k2.getKhuVuc())){
            KhoPOJO kchinh1 = khodao.timKhoChinhTheoKhuVuc(k1.getKhuVuc());
            KhoPOJO kchinh2 = khodao.timKhoChinhTheoKhuVuc(k2.getKhuVuc());
            khoangCach += dijkstra.findDistance(dc1, kchinh1.getTinh())
                    + dijkstra.findDistance(kchinh1.getTinh(), kchinh2.getTinh())
                    + dijkstra.findDistance(kchinh2.getTinh(), dc2);

        }
        else {
            khoangCach += dijkstra.findDistance(dc1, dc2);
        }
        return khoangCach;
    }

    public String timDuongDiNganNhat(VanDonPOJO vd){
        String path = "";
        KhoDAO khodao = new KhoDAO();
        Dijkstra dijkstra = new Dijkstra();
        KhoPOJO k1 = khodao.timKhoTheoTinh(vd.getDiemXuatPhat());
        KhoPOJO k2 = khodao.timKhoTheoTinh(vd.getDiemDen());
        if(!java.util.Objects.equals(k1.getKhuVuc(), k2.getKhuVuc())){
            KhoPOJO kchinh1 = khodao.timKhoChinhTheoKhuVuc(k1.getKhuVuc());
            KhoPOJO kchinh2 = khodao.timKhoChinhTheoKhuVuc(k2.getKhuVuc());
            if(!java.util.Objects.equals(vd.getDiemXuatPhat(), kchinh1.getTinh()))
            {
                path += dijkstra.findShortedPath(vd.getDiemXuatPhat(), kchinh1.getTinh());
            }
            else path += vd.getDiemXuatPhat();
            if(!java.util.Objects.equals(vd.getDiemDen(), kchinh2.getTinh()))
            {
                path += ", " + dijkstra.findShortedPath(kchinh2.getTinh(), vd.getDiemDen());
            }
            else path += ", " + vd.getDiemDen();
        }
        else {
            path += dijkstra.findShortedPath(vd.getDiemXuatPhat(), vd.getDiemDen());
        }
        return path;
    }

    private String generateMaVanDon() {
        String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        StringBuilder maVanDon = new StringBuilder();
        Random rnd = new Random();
        while (maVanDon.length() < 9) { // Độ dài mã vận đơn là 9 kí tự
            int index = (int) (rnd.nextFloat() * CHARACTERS.length());
            maVanDon.append(CHARACTERS.charAt(index));
        }
        return maVanDon.toString();
    }

    public VanDonPOJO themDonHang(VanDonPOJO vanDonPOJO) {
        try{
            String maVanDon = generateMaVanDon();
            vanDonPOJO.setMaVanDon(maVanDon);

            Date thoiGianLap = new Date();
            vanDonPOJO.setThoiGianLap(thoiGianLap);

            vanDonPOJO.setTrangThai("Chờ xác nhận");

            Document thongTinHH = new Document()
                    .append("LoaiHang", vanDonPOJO.getThongTinHangHoa().getLoaiHang())
                    .append("TenHang", vanDonPOJO.getThongTinHangHoa().getTenHang())
                    .append("TrongLuong", vanDonPOJO.getThongTinHangHoa().getTrongLuong())
                    .append("SoLuong", vanDonPOJO.getThongTinHangHoa().getSoLuong());

            if (Optional.ofNullable(vanDonPOJO.getThongTinHangHoa().getKichCo()).isPresent()) {
                thongTinHH.append("KichCo", new Document()
                        .append("Dai", vanDonPOJO.getThongTinHangHoa().getKichCo().getDai())
                        .append("Rong", vanDonPOJO.getThongTinHangHoa().getKichCo().getRong()));
            }
            // Tạo đối tượng Document từ VanDonPOJO
            Document document = new Document("MaVanDon", vanDonPOJO.getMaVanDon())
                    .append("ThoiGianLap", vanDonPOJO.getThoiGianLap())
                    .append("TrangThai", vanDonPOJO.getTrangThai())
                    .append("LoaiVanChuyen", vanDonPOJO.getLoaiVanChuyen())
                    .append("NoiTiepNhan", vanDonPOJO.getNoiTiepNhan())
                    .append("NguoiThanhToan", vanDonPOJO.getNguoiThanhToan())
                    .append("ThongTinNguoiGui", new Document()
                            .append("TenNguoiGui", vanDonPOJO.getThongTinNguoiGui().getTenNguoiGui())
                            .append("SDTNguoiGui", vanDonPOJO.getThongTinNguoiGui().getSdtNguoiGui())
                            .append("DiaChiNguoiGui", vanDonPOJO.getThongTinNguoiGui().getDiaChiNguoiGui()))
                    .append("ThongTinNguoiNhan", new Document()
                            .append("TenNguoiNhan", vanDonPOJO.getThongTinNguoiNhan().getTenNguoiNhan())
                            .append("SDTNguoiNhan", vanDonPOJO.getThongTinNguoiNhan().getSdtNguoiNhan())
                            .append("DiaChiNguoiNhan", vanDonPOJO.getThongTinNguoiNhan().getDiaChiNguoiNhan()))
                    .append("ThongTinHangHoa", thongTinHH)
                    .append("PhiVanChuyen", new Document()
                            .append("PhiCoDinh", vanDonPOJO.getPhiVanChuyen().getPhiCoDinh())
                            .append("VAT", vanDonPOJO.getPhiVanChuyen().getVat())
                            .append("PhiNang", vanDonPOJO.getPhiVanChuyen().getPhiNang())
                            .append("PhiHa", vanDonPOJO.getPhiVanChuyen().getPhiHa())
                            .append("ThuongShipper", vanDonPOJO.getPhiVanChuyen().getThuongShipper())
                            .append("PhiKhac", vanDonPOJO.getPhiVanChuyen().getPhiKhac())
                            .append("TongPhi", vanDonPOJO.getPhiVanChuyen().getTongPhi()));

            if (Optional.ofNullable(vanDonPOJO.getKhoangCach()).isPresent()) {
                document.append("KhoangCach", vanDonPOJO.getKhoangCach());
            }

            if (Optional.ofNullable(vanDonPOJO.getDiemDen()).isPresent()) {
                document.append("DiemDen", vanDonPOJO.getDiemDen());
            }

            if (Optional.ofNullable(vanDonPOJO.getDiemXuatPhat()).isPresent()) {
                document.append("DiemXuatPhat", vanDonPOJO.getDiemXuatPhat());
            }

            if (Optional.ofNullable(vanDonPOJO.getTuyenDuong()).isPresent()) {
                document.append("TuyenDuong", new Document()
                        .append("DuongDi", vanDonPOJO.getTuyenDuong().getDuongDi())
                        .append("KhoangCach", vanDonPOJO.getTuyenDuong().getKhoangCach()));
            }

            if (Optional.ofNullable(vanDonPOJO.getThongTinTaiXe()).isPresent()) {
                document.append("ThongTinTaiXe", new Document()
                        .append("MaTaiXe", vanDonPOJO.getThongTinTaiXe().getMaTaiXe())
                        .append("TenTaiXe", vanDonPOJO.getThongTinTaiXe().getTenTaiXe())
                        .append("SDTTaiXe", vanDonPOJO.getThongTinTaiXe().getSdtTaiXe()));
            }

            if (Optional.ofNullable(vanDonPOJO.getThongTinXe()).isPresent()) {
                document.append("ThongTinXe", new Document()
                        .append("BienSo", vanDonPOJO.getThongTinXe().getBienSo())
                        .append("TenXe", vanDonPOJO.getThongTinXe().getTenXe())
                        .append("LoaiXe", vanDonPOJO.getThongTinXe().getLoaiXe())
                        .append("HangXe", vanDonPOJO.getThongTinXe().getHangXe()));
            }

            if (Optional.ofNullable(vanDonPOJO.getThongTinShipper()).isPresent()) {
                document.append("ThongTinShipper", new Document()
                        .append("MaShipper", vanDonPOJO.getThongTinShipper().getMaShipper())
                        .append("TenShipper", vanDonPOJO.getThongTinShipper().getTenShipper())
                        .append("SDTShipper", vanDonPOJO.getThongTinShipper().getSdtShipper()));
            }

            MongoCollection<Document> collection = connection.getCollection();
            collection.insertOne(document);

            return vanDonPOJO;
        }catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Lỗi khi thêm đơn hàng", e);
        }

    }

    public VanDonPOJO updateTrangThai(Object id) {
        try {
            MongoCollection<Document> collection = connection.getCollection();
            collection.updateOne(
                    Filters.eq("_id", id),
                    Updates.set("TrangThai", "Chờ giao"));
            return new VanDonPOJO();
        } catch (Exception ex) {
            ex.printStackTrace();
            return null;
        }
    }

    public VanDonPOJO updateTrangThaiGiaoThanhCong(ObjectId id){
        try {
            MongoCollection<Document> collection = connection.getCollection();
            collection.updateOne(
                    Filters.eq("_id", id),
                    Updates.set("TrangThai", "Giao hàng thành công"));
            return new VanDonPOJO();
        } catch (Exception ex) {
            ex.printStackTrace();
            return null;
        }
    }

    public VanDonPOJO updateTrangThaiDangGiao(ObjectId id, String maShipper, String tenShipper, String SDTShipper) throws Exception {
        try {
            MongoCollection<Document> collection = connection.getCollection();

            Document updateDoc = new Document();
            updateDoc.append("$set", new Document()
                    .append("TrangThai", "Đang giao")
                    .append("ThongTinShipper.MaShipper", maShipper)
                    .append("ThongTinShipper.TenShipper", tenShipper)
                    .append("ThongTinShipper.SDTShipper", SDTShipper)
            );
            UpdateResult updateResult = collection.updateOne(
                    Filters.eq("_id", id),
                    updateDoc
            );

            if (updateResult.getModifiedCount() > 0) {
                return new VanDonPOJO();
            } else {
                throw new Exception("Update failed for shipper ID: " + id);
            }
        } catch (Exception ex) {
            throw ex;
        }
    }

//    public VanDonPOJO updateTrangThaiGiaoThanhCong(ObjectId id, ObjectId idShipper){
//        try {
//            MongoCollection<Document> collection = connection.getCollection();
//            TaiKhoanDAO dao = new TaiKhoanDAO();
//            TaiKhoanPOJO tt = dao.timTaiKhoanTheoId(idShipper);
//            collection.updateOne(
//                    Filters.eq("_id", id),
//                    Updates.combine(
//                            Updates.set("TrangThai", "Giao hàng thành công"),
//                            Updates.set("ThongTinShipper", new Document()
//                                    .append("MaShipper", tt.getMaShipper())
//                                    .append("TenShipper", tt.getTenChuTaiKhoan())
//                                    .append("SDTShipper", tt.getSdt())
//                            )
//                    )
//            );
//            return new VanDonPOJO();
//        } catch (Exception ex) {
//            ex.printStackTrace();
//            return null;
//        }
//    }

    public void themDonHangKhachHang(VanDonPOJO vanDonPOJO){
        MongoCollection<Document> collection = connection.getCollection();
        Document doc = new Document()
                .append("maVanDon", vanDonPOJO.getMaVanDon() != null ? vanDonPOJO.getMaVanDon() : null)
                .append("thoiGianLap", vanDonPOJO.getThoiGianLap() != null ? vanDonPOJO.getThoiGianLap() : null)
                .append("loaiVanChuyen", vanDonPOJO.getLoaiVanChuyen() != null ? vanDonPOJO.getLoaiVanChuyen() : null)
                .append("noiTiepNhan", vanDonPOJO.getNoiTiepNhan() != null ? vanDonPOJO.getNoiTiepNhan() : null)
                .append("nguoiThanhToan", vanDonPOJO.getNguoiThanhToan() != null ? vanDonPOJO.getNguoiThanhToan() : null)
                .append("thongTinNguoiGui", vanDonPOJO.getThongTinNguoiGui() != null ? vanDonPOJO.getThongTinNguoiGui() : null)
                .append("thongTinNguoiNhan", vanDonPOJO.getThongTinNguoiNhan() != null ? vanDonPOJO.getThongTinNguoiNhan() : null)
                .append("thongTinTaiXe", vanDonPOJO.getThongTinTaiXe() != null ? vanDonPOJO.getThongTinTaiXe() : null)
                .append("thongTinXe", vanDonPOJO.getThongTinXe() != null ? vanDonPOJO.getThongTinXe() : null)
                .append("thongTinHangHoa", vanDonPOJO.getThongTinHangHoa() != null ? vanDonPOJO.getThongTinHangHoa() : null)
                .append("diemXuatPhat", vanDonPOJO.getDiemXuatPhat() != null ? vanDonPOJO.getDiemXuatPhat() : null)
                .append("diemDen", vanDonPOJO.getDiemDen() != null ? vanDonPOJO.getDiemDen() : null)
                .append("tinh", vanDonPOJO.getTinh() != null ? vanDonPOJO.getTinh() : null)
                .append("khoangCach", vanDonPOJO.getKhoangCach() != null ? vanDonPOJO.getKhoangCach() : null)
                .append("tuyenDuong", vanDonPOJO.getTuyenDuong() != null ? vanDonPOJO.getTuyenDuong() : null)
                .append("phiVanChuyen", vanDonPOJO.getPhiVanChuyen() != null ? vanDonPOJO.getPhiVanChuyen() : null)
                .append("thongTinShipper", vanDonPOJO.getThongTinShipper() != null ? vanDonPOJO.getThongTinShipper() : null)
                .append("trangThai", vanDonPOJO.getTrangThai() != null ? vanDonPOJO.getTrangThai() : null);
        collection.insertOne(doc);
    }

    @SneakyThrows
    public VanDonPOJO convertToVanDonPOJO(Document doc) {
        VanDonPOJO vanDon = new VanDonPOJO();
        vanDon.setId(doc.getObjectId("_id").toString());
        vanDon.setThoiGianLap(doc.getDate("ThoiGianLap"));
        vanDon.setMaVanDon(doc.getString("MaVanDon"));
        vanDon.setLoaiVanChuyen(doc.getString("LoaiVanChuyen"));
        vanDon.setNoiTiepNhan(doc.getString("NoiTiepNhan"));
        vanDon.setNguoiThanhToan(doc.getString("NguoiThanhToan"));
        vanDon.setDiemXuatPhat(doc.getString("DiemXuatPhat"));
        vanDon.setDiemDen(doc.getString("DiemDen"));
        vanDon.setKhoangCach(doc.getDouble("KhoangCach"));
        vanDon.setTinh(doc.getString("Tinh"));
        vanDon.setTrangThai(doc.getString("TrangThai"));

        convertToThongTinNguoiGui(doc, vanDon);
        convertToThongTinNguoiNhan(doc, vanDon);
        convertToPhiVanChuyen(doc, vanDon);
        convertToThongTinShipper(doc, vanDon);
        convertToThongTinTaiXe(doc, vanDon);
        convertToThongTinXe(doc, vanDon);
        convertToThongTuyenDuong(doc, vanDon);
        convertToThongTinHangHoa(doc, vanDon);

        if(vanDon.getThongTinShipper() == null)
        {
            ThongTinShipper ttsp = new ThongTinShipper(null, null, null);
            vanDon.setThongTinShipper(ttsp);
        }

        return vanDon;
    }

    public void convertToThongTinNguoiGui(Document doc, VanDonPOJO vanDon) {
        Document ttng = doc.getEmbedded(Collections.singletonList("ThongTinNguoiGui"), Document.class);
        if (ttng != null) {
            ThongTinNguoiGui tt = new ThongTinNguoiGui();
            tt.setTenNguoiGui(ttng.getString("TenNguoiGui"));
            tt.setSdtNguoiGui(ttng.getString("SDTNguoiGui"));
            tt.setDiaChiNguoiGui(ttng.getString("DiaChiNguoiGui"));
            vanDon.setThongTinNguoiGui(tt);
        }
    }

    public void convertToThongTinNguoiNhan(Document doc, VanDonPOJO vanDon) {
        Document ttnn = doc.getEmbedded(Collections.singletonList("ThongTinNguoiNhan"), Document.class);
        if (ttnn != null) {
            ThongTinNguoiNhan tt = new ThongTinNguoiNhan();
            tt.setTenNguoiNhan(ttnn.getString("TenNguoiNhan"));
            tt.setSdtNguoiNhan(ttnn.getString("SDTNguoiNhan"));
            tt.setDiaChiNguoiNhan(ttnn.getString("DiaChiNguoiNhan"));
            vanDon.setThongTinNguoiNhan(tt);
        }
    }

    public void convertToThongTinTaiXe(Document doc, VanDonPOJO vanDon) {
        Document tttx = doc.get("ThongTinTaiXe", Document.class);
        ThongTinTaiXe tt = null;
        if (tttx != null) {
            tt = new ThongTinTaiXe();
            tt.setMaTaiXe(tttx.getString("MaTaiXe"));
            tt.setTenTaiXe(tttx.getString("TenTaiXe"));
            tt.setSdtTaiXe(tttx.getString("SDTTaiXe"));
            vanDon.setThongTinTaiXe(tt);
        }
    }

    public void convertToThongTinXe(Document doc, VanDonPOJO vanDon) {
        Document ttx = doc.getEmbedded(Collections.singletonList("ThongTinXe"), Document.class);
        if (ttx != null) {
            ThongTinXe tt = new ThongTinXe();
            tt.setTenXe(ttx.getString("TenXe"));
            tt.setLoaiXe(ttx.getString("LoaiXe"));
            tt.setHangXe(ttx.getString("HangXe"));
            tt.setBienSo(ttx.getString("BienSo"));
            vanDon.setThongTinXe(tt);
        }
    }

    public void convertToThongTuyenDuong(Document doc, VanDonPOJO vanDon) {
        Document tuyenduong = doc.getEmbedded(Collections.singletonList("TuyenDuong"), Document.class);
        if (tuyenduong != null) {
            TuyenDuong td = new TuyenDuong();
            td.setDuongDi(tuyenduong.getString("DuongDi"));
            td.setKhoangCach(tuyenduong.getDouble("KhoangCach"));
            vanDon.setTuyenDuong(td);
        }
    }

    public void convertToPhiVanChuyen(Document doc, VanDonPOJO vanDon) {
        Document phi = doc.getEmbedded(Collections.singletonList("PhiVanChuyen"), Document.class);
        if (phi != null) {
            PhiVanChuyen p = new PhiVanChuyen();
            p.setPhiCoDinh(phi.getInteger("PhiCoDinh"));
            p.setVat(phi.getInteger("VAT"));
            p.setPhiHa(phi.getInteger("PhiHa"));
            p.setPhiNang(phi.getInteger("PhiNang"));
            p.setPhiKhac(phi.getInteger("PhiKhac"));
            p.setThuongShipper(phi.getInteger("ThuongShipper"));
            p.setTongPhi(phi.getInteger("TongPhi"));
            p.setPhiCoc(phi.getInteger("PhiCoc"));
            p.setLuongShipperTheoDon();
            vanDon.setPhiVanChuyen(p);
        }
    }

    public void convertToThongTinShipper(Document doc, VanDonPOJO vanDon) {
        Document ttsp = doc.getEmbedded(Collections.singletonList("ThongTinShipper"), Document.class);
        if (ttsp != null) {
            ThongTinShipper tt = new ThongTinShipper();
            tt.setMaShipper(ttsp.getString("MaShipper"));
            tt.setTenShipper(ttsp.getString("TenShipper"));
            tt.setSdtShipper(ttsp.getString("SDTShipper"));
            vanDon.setThongTinShipper(tt);
        }
    }

    public void convertToThongTinHangHoa(Document doc, VanDonPOJO vanDon) {
        Document tthh = doc.getEmbedded(Collections.singletonList("ThongTinHangHoa"), Document.class);
        if (tthh != null) {
            ThongTinHangHoa tt = new ThongTinHangHoa();
            tt.setLoaiHang(tthh.getString("LoaiHang"));
            tt.setTenHang(tthh.getString("TenHang"));

            Object trongLuongValue = tthh.get("TrongLuong");
            if (trongLuongValue != null) {
                tt.setTrongLuong((Double) trongLuongValue);
            } else {
                tt.setTrongLuong(0.0);
            }

            Document kichco = tthh.getEmbedded(Collections.singletonList("KichCo"), Document.class);
            if (kichco != null) {
                KichCo kc = new KichCo();
                kc.setDai(kichco.getDouble("Dai"));
                kc.setRong(kichco.getDouble("Rong"));
                tt.setKichCo(kc);
            }
            tt.setSoLuong(tthh.getInteger("SoLuong"));
            vanDon.setThongTinHangHoa(tt);
        }
    }
}
