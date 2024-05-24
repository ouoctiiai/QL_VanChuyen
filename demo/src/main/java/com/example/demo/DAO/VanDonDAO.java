package com.example.demo.DAO;

import com.example.demo.AI.Dijkstra;
import com.example.demo.POJO.*;
import com.mongodb.BasicDBObject;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Sorts;
import com.mongodb.client.model.Updates;
import lombok.SneakyThrows;
import org.bson.Document;
import org.bson.conversions.Bson;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.*;
import java.util.logging.Logger;

@Service
public class VanDonDAO {

    private final Connection connection;
    private java.util.Objects Objects;
//
//    public void capNhatDonLienTinh(KhoPOJO kho) {
//        MongoCollection<Document> collection = connection.getCollection();
//        Bson filter = Filters.eq("id", kho.getId());
//        Document updatedDocument = convertToDocument(kho);
//        collection.replaceOne(filter, updatedDocument);
//    }

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

    private class DoanhThuTheoNam{
        public int nam;
        public double tongTien;

        public DoanhThuTheoNam(){
            nam= 0;
            tongTien = 0;
        }
        public DoanhThuTheoNam(int nam){
            this.nam = nam;
        }
        public DoanhThuTheoNam(int nam, double tongTien){
            this.nam = nam;
            this.tongTien = tongTien;
        }
    }

    public List<Map<String, Object>> tinhDoanhThuTheoNam() {
        List<VanDonPOJO> danhSach = allVanDon();
        Map<Integer, Double> tongTien1Nam = new HashMap<>();

        for (VanDonPOJO vanDon : danhSach) {
            int nam = vanDon.getThoiGianLap().getYear();
            double tongPhi = vanDon.getPhiVanChuyen().getTongPhi();
            tongTien1Nam.put(nam, tongTien1Nam.getOrDefault(nam, 0.0) + tongPhi);
        }

        List<Map<String, Object>> doanhThuTheoNam = new ArrayList<>();
        for (Map.Entry<Integer, Double> entry : tongTien1Nam.entrySet()) {
            Map<String, Object> map = new HashMap<>();
            map.put("nam", entry.getKey());
            map.put("tongTien", entry.getValue());
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

    public VanDonPOJO timVanDonTheoId(ObjectId id) {
        MongoCollection<Document> collection = connection.getCollection();
        Bson filter = Filters.eq("_id", id);
        Document doc = collection.find(filter).first();
        return convertToVanDonPOJO(doc);
    }

//    public VanDonPOJO timVanDonTheoMaVanDon(String maVanDon){
//        MongoCollection<Document> collection = connection.getCollection();
//        Bson filter = Filters.eq("MaVanDon", maVanDon);
//        Document doc = collection.find(filter).first();
//        return convertToVanDonPOJO(doc);
//    }

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
            // Tạo mã vận đơn tự động
            String maVanDon = generateMaVanDon();
            vanDonPOJO.setMaVanDon(maVanDon);

            // Lấy thời gian hiện tại của hệ thống laptop
            Date thoiGianLap = new Date();
            vanDonPOJO.setThoiGianLap(thoiGianLap);

            // Trạng thái mặc định là "đang chờ xác nhận"
            vanDonPOJO.setTrangThai("Đang chờ xác nhận");

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
                            .append("TongPhi", vanDonPOJO.getPhiVanChuyen().getTongPhi()))
                    .append("ThongTinShipper", new Document()
                            .append("MaShipper", vanDonPOJO.getThongTinShipper().getMaShipper())
                            .append("TenShipper", vanDonPOJO.getThongTinShipper().getTenShipper())
                            .append("SDTShipper", vanDonPOJO.getThongTinShipper().getSdtShipper()));

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

            MongoCollection<Document> collection = connection.getCollection();
            collection.insertOne(document);

            return vanDonPOJO;
        }catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Lỗi khi thêm đơn hàng", e);
        }

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

    private Document convertToDocumentVDLienTinh(VanDonPOJO vd) {
        Document doc = new Document();
        doc.put("_id", vd.getId());
        doc.put("MaVanDon", vd.getMaVanDon());
        doc.put("ThoiGianLap", vd.getThoiGianLap());
        doc.put("LoaiVanChuyen", vd.getLoaiVanChuyen());
        doc.put("NoiTiepNhan", vd.getNoiTiepNhan());
        doc.put("NguoiThanhToan", vd.getNguoiThanhToan());
        doc.put("DiemXuatPhat", vd.getDiemXuatPhat());
        doc.put("DiemDen", vd.getDiemXuatPhat());
        doc.put("TrangThai", vd.getTrangThai());

        ThongTinNguoiGui thongTinNguoiGui = vd.getThongTinNguoiGui();
        doc.put("ThongTinNguoiGui.TenNguoiGui", thongTinNguoiGui.getTenNguoiGui());
        doc.put("ThongTinNguoiGui.SDTNguoiGui", thongTinNguoiGui.getSdtNguoiGui());
        doc.put("ThongTinNguoiGui.DiaChiNguoiGui", thongTinNguoiGui.getDiaChiNguoiGui());

        ThongTinNguoiNhan thongTinNguoiNhan = vd.getThongTinNguoiNhan();
        doc.put("ThongTinNguoiGui.TenNguoiNhan", thongTinNguoiNhan.getTenNguoiNhan());
        doc.put("ThongTinNguoiGui.SDTNguoiNhan", thongTinNguoiNhan.getSdtNguoiNhan());
        doc.put("ThongTinNguoiGui.DiaChiNguoiNhan", thongTinNguoiNhan.getDiaChiNguoiNhan());

        ThongTinTaiXe thongTinTaiXe = vd.getThongTinTaiXe();
        doc.put("ThongTinTaiXe.MaTaiXe", thongTinTaiXe.getMaTaiXe());
        doc.put("ThongTinTaiXe.TenTaiXe", thongTinTaiXe.getTenTaiXe());
        doc.put("ThongTinTaiXe.SDTTaiXe", thongTinTaiXe.getSdtTaiXe());

        ThongTinXe thongTinXe = vd.getThongTinXe();
        doc.put("ThongTinXe.BienSo", thongTinXe.getBienSo());
        doc.put("ThongTinXe.TenXe", thongTinXe.getTenXe());
        doc.put("ThongTinXe.LoaiXe", thongTinXe.getLoaiXe());
        doc.put("ThongTinXe.HangXe", thongTinXe.getHangXe());

        ThongTinHangHoa thongTinHangHoa = vd.getThongTinHangHoa();
        doc.put("ThongTinHangHoa.LoaiHang", thongTinHangHoa.getLoaiHang());
        doc.put("ThongTinHangHoa.TenHang", thongTinHangHoa.getTenHang());
        doc.put("ThongTinHangHoa.SoLuong", thongTinHangHoa.getSoLuong());
        doc.put("ThongTinHangHoa.TrongLuong, ", thongTinHangHoa.getTrongLuong());
        KichCo kichCo = thongTinHangHoa.getKichCo();
        doc.put("ThongTinHangHoa.KichCo.Dai", kichCo.getDai());
        doc.put("ThongTinHangHoa.KichCo.Rong", kichCo.getRong());

        TuyenDuong tuyenDuong = vd.getTuyenDuong();
        doc.put("TuyenDuong.DuongDi", tuyenDuong.getDuongDi());
        doc.put("TuyenDuong.KhoangCach", tuyenDuong.getKhoangCach());

        return doc;
    }
}
