package com.example.demo.DAO;

import com.example.demo.POJO.PhieuChiPOJO;
import com.example.demo.POJO.ThongTinShipper;
import com.example.demo.POJO.ThongTinTaiXe;
import com.example.demo.POJO.VanDonPOJO;
import com.mongodb.BasicDBObject;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Updates;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Repository;

import java.text.ParseException;
import java.util.*;
import java.util.logging.Logger;

@Repository
public class PhieuChiDAO {

    private Connection connection;
    public PhieuChiDAO() {
        connection = new Connection("PhieuChi");
    }


    public List<PhieuChiPOJO> loadDanhSachPhieuChi() throws ParseException {
        List<PhieuChiPOJO> danhSachPhieuChi = new ArrayList<>();
        MongoCollection<Document> collection = connection.getCollection();

        for (Document doc : collection.find()) {
            PhieuChiPOJO pc = convertToPhieuChiPOJO(doc);
            danhSachPhieuChi.add(pc);
        }
        return danhSachPhieuChi;
    }

    public List<PhieuChiPOJO> lichSuChiChoShipper(String id) throws ParseException {
        List<PhieuChiPOJO> ds = new ArrayList<>();
        List<PhieuChiPOJO> dsPC = loadDanhSachPhieuChi();
        for(PhieuChiPOJO pc : dsPC){
            ThongTinShipper tt = pc.getThongTinShipper();
            if(tt != null){
                if(java.util.Objects.equals(tt.getMaShipper(), id))
                {
                    ds.add(pc);
                }
            }
        }
        return ds;
    }


    public PhieuChiPOJO convertToPhieuChiPOJO(Document doc) throws ParseException {
        PhieuChiPOJO phieuChi = new PhieuChiPOJO();
        phieuChi.setId(doc.getObjectId("_id").toString());
        phieuChi.setLoaiPhieuChi(doc.getString("LoaiPhieuChi"));
        phieuChi.setThoiGianLap(doc.getDate("ThoiGianLap"));
        phieuChi.setTongTien(doc.getInteger("TongTien"));
        convertToThongTinShipper(doc, phieuChi);
        convertToThongTinTaiXe(doc, phieuChi);
        return phieuChi;
    }

    // Phương thức trợ giúp để chuyển đổi document lồng nhau thành ThongTinShipper
    public void convertToThongTinShipper(Document doc, PhieuChiPOJO phieuChi) {
        Document ttsp = doc.get("ThongTinShipper", Document.class);
        if (ttsp != null) {
            ThongTinShipper tt = new ThongTinShipper();
            tt.setMaShipper(ttsp.getString("MaShipper"));
            tt.setTenShipper(ttsp.getString("TenShipper"));
            phieuChi.setThongTinShipper(tt);
        }
    }

    // Phương thức trợ giúp để chuyển đổi document lồng nhau thành ThongTinTaiXe
    public void convertToThongTinTaiXe(Document doc, PhieuChiPOJO phieuChi) {
        Document tttx = doc.get("ThongTinTaiXe", Document.class);
        if (tttx != null) {
            ThongTinTaiXe tt = new ThongTinTaiXe();
            tt.setMaTaiXe(tttx.getString("MaTaiXe"));
            tt.setTenTaiXe(tttx.getString("TenTaiXe"));
            phieuChi.setThongTinTaiXe(tt);
        }
    }

    // Phương thức để thêm một đối tượng PhieuChiPOJO mới vào cơ sở dữ liệu
    public void themPhieuChi(PhieuChiPOJO phieuChiPOJO) {
        MongoCollection<Document> collection = connection.getCollection();
        Document phieuChiDoc = new Document();
        phieuChiDoc.append("LoaiPhieuChi", phieuChiPOJO.getLoaiPhieuChi());
        phieuChiDoc.append("TongTien", phieuChiPOJO.getTongTien());
        phieuChiDoc.append("ThoiGianLap", phieuChiPOJO.getThoiGianLap());

        // Nếu loại là "Trả lương Shipper", thêm thông tin shipper vào document
        if ("Trả lương Shipper".equals(phieuChiPOJO.getLoaiPhieuChi())) {
            ThongTinShipper shipper = phieuChiPOJO.getThongTinShipper();
            if (shipper != null) {
                Document ttsp = new Document();
                ttsp.append("MaShipper", shipper.getMaShipper());
                ttsp.append("TenShipper", shipper.getTenShipper());
                phieuChiDoc.append("ThongTinShipper", ttsp);
            }
        }

        // Nếu loại là "Trả lương Tài Xế", thêm thông tin tài xế vào document
        if ("Trả lương Tài Xế".equals(phieuChiPOJO.getLoaiPhieuChi())) {
            ThongTinTaiXe taiXe = phieuChiPOJO.getThongTinTaiXe();
            if (taiXe != null) {
                Document tttx = new Document();
                tttx.append("MaTaiXe", taiXe.getMaTaiXe());
                tttx.append("TenTaiXe", taiXe.getTenTaiXe());
                phieuChiDoc.append("ThongTinTaiXe", tttx);
            }
        }
        collection.insertOne(phieuChiDoc);
    }

    public List<Map<Integer, Integer>> tinhTongChiPhiXeTheoNam() throws ParseException {
        List<Map<Integer, Integer>> danhSachTongTien = new ArrayList<>();
        Map<Integer, Integer> tongTienTheoNam = new HashMap<>();

        // Lấy danh sách phiếu chi có loại là "Chi phí xe"
        List<PhieuChiPOJO> danhSachPhieuChi = new ArrayList<>();
        MongoCollection<Document> collection = connection.getCollection();
        MongoCursor<Document> cursor = collection.find(Filters.eq("LoaiPhieuChi", "Chi phí xe")).iterator();
        try {
            while (cursor.hasNext()) {
                Document doc = cursor.next();
                PhieuChiPOJO pc = convertToPhieuChiPOJO(doc);
                danhSachPhieuChi.add(pc);
            }
        } catch (ParseException e) {
            throw new RuntimeException(e);
        } finally {
            cursor.close();
        }

        // Tính tổng chi phí xe theo từng năm
        for (PhieuChiPOJO pc : danhSachPhieuChi) {
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(pc.getThoiGianLap());
            int nam = calendar.get(Calendar.YEAR);
            int tongTien = pc.getTongTien();

            if (tongTienTheoNam.containsKey(nam)) {
                // Nếu đã có tổng số tiền của năm đó, cộng thêm vào
                int tongTienHienTai = tongTienTheoNam.get(nam);
                tongTienTheoNam.put(nam, tongTienHienTai + tongTien);
            } else {
                // Nếu chưa có, thêm vào Map
                tongTienTheoNam.put(nam, tongTien);
            }
        }

        // Chuyển đổi Map thành danh sách các Map và thêm vào danh sách tổng tiền
        danhSachTongTien.add(tongTienTheoNam);

        return danhSachTongTien;
    }

    public List<Map<Integer, Integer>> tinhTongChiPhiNhienLieuTheoNam() throws ParseException {
        List<Map<Integer, Integer>> danhSachTongTien = new ArrayList<>();
        Map<Integer, Integer> tongTienTheoNam = new HashMap<>();

        List<PhieuChiPOJO> danhSachPhieuChi = new ArrayList<>();
        MongoCollection<Document> collection = connection.getCollection();
        MongoCursor<Document> cursor = collection.find(Filters.eq("LoaiPhieuChi", "Chi phí nhiên liệu")).iterator();
        try {
            while (cursor.hasNext()) {
                Document doc = cursor.next();
                PhieuChiPOJO pc = convertToPhieuChiPOJO(doc);
                danhSachPhieuChi.add(pc);
            }
        } catch (ParseException e) {
            throw new RuntimeException(e);
        } finally {
            cursor.close();
        }

        for (PhieuChiPOJO pc : danhSachPhieuChi) {
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(pc.getThoiGianLap());
            int nam = calendar.get(Calendar.YEAR);
            int tongTien = pc.getTongTien();

            if (tongTienTheoNam.containsKey(nam)) {
                // Nếu đã có tổng số tiền của năm đó, cộng thêm vào
                int tongTienHienTai = tongTienTheoNam.get(nam);
                tongTienTheoNam.put(nam, tongTienHienTai + tongTien);
            } else {
                // Nếu chưa có, thêm vào Map
                tongTienTheoNam.put(nam, tongTien);
            }
        }

        // Chuyển đổi Map thành danh sách các Map và thêm vào danh sách tổng tiền
        danhSachTongTien.add(tongTienTheoNam);

        return danhSachTongTien;
    }

    public List<Map<Integer, Integer>> tinhTongChiPhiThietBiTheoNam() throws ParseException {
        List<Map<Integer, Integer>> danhSachTongTien = new ArrayList<>();
        Map<Integer, Integer> tongTienTheoNam = new HashMap<>();

        List<PhieuChiPOJO> danhSachPhieuChi = new ArrayList<>();
        MongoCollection<Document> collection = connection.getCollection();
        MongoCursor<Document> cursor = collection.find(Filters.eq("LoaiPhieuChi", "Chi phí thiết bị")).iterator();
        try {
            while (cursor.hasNext()) {
                Document doc = cursor.next();
                PhieuChiPOJO pc = convertToPhieuChiPOJO(doc);
                danhSachPhieuChi.add(pc);
            }
        } catch (ParseException e) {
            throw new RuntimeException(e);
        } finally {
            cursor.close();
        }

        for (PhieuChiPOJO pc : danhSachPhieuChi) {
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(pc.getThoiGianLap());
            int nam = calendar.get(Calendar.YEAR);
            int tongTien = pc.getTongTien();

            if (tongTienTheoNam.containsKey(nam)) {
                // Nếu đã có tổng số tiền của năm đó, cộng thêm vào
                int tongTienHienTai = tongTienTheoNam.get(nam);
                tongTienTheoNam.put(nam, tongTienHienTai + tongTien);
            } else {
                // Nếu chưa có, thêm vào Map
                tongTienTheoNam.put(nam, tongTien);
            }
        }

        // Chuyển đổi Map thành danh sách các Map và thêm vào danh sách tổng tiền
        danhSachTongTien.add(tongTienTheoNam);

        return danhSachTongTien;
    }

    public List<Map<Integer, Integer>> tinhTongLuongShipperTheoNam() throws ParseException {
        List<Map<Integer, Integer>> danhSachTongTien = new ArrayList<>();
        Map<Integer, Integer> tongTienTheoNam = new HashMap<>();

        List<PhieuChiPOJO> danhSachPhieuChi = new ArrayList<>();
        MongoCollection<Document> collection = connection.getCollection();
        MongoCursor<Document> cursor = collection.find(Filters.eq("LoaiPhieuChi", "Trả lương Shipper")).iterator();
        try {
            while (cursor.hasNext()) {
                Document doc = cursor.next();
                PhieuChiPOJO pc = convertToPhieuChiPOJO(doc);
                danhSachPhieuChi.add(pc);
            }
        } catch (ParseException e) {
            throw new RuntimeException(e);
        } finally {
            cursor.close();
        }

        for (PhieuChiPOJO pc : danhSachPhieuChi) {
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(pc.getThoiGianLap());
            int nam = calendar.get(Calendar.YEAR);
            int tongTien = pc.getTongTien();

            if (tongTienTheoNam.containsKey(nam)) {
                // Nếu đã có tổng số tiền của năm đó, cộng thêm vào
                int tongTienHienTai = tongTienTheoNam.get(nam);
                tongTienTheoNam.put(nam, tongTienHienTai + tongTien);
            } else {
                // Nếu chưa có, thêm vào Map
                tongTienTheoNam.put(nam, tongTien);
            }
        }

        // Chuyển đổi Map thành danh sách các Map và thêm vào danh sách tổng tiền
        danhSachTongTien.add(tongTienTheoNam);

        return danhSachTongTien;
    }

    public List<Map<Integer, Integer>> tinhTongLuongTXTheoNam() throws ParseException {
        List<Map<Integer, Integer>> danhSachTongTien = new ArrayList<>();
        Map<Integer, Integer> tongTienTheoNam = new HashMap<>();

        List<PhieuChiPOJO> danhSachPhieuChi = new ArrayList<>();
        MongoCollection<Document> collection = connection.getCollection();
        MongoCursor<Document> cursor = collection.find(Filters.eq("LoaiPhieuChi", "Trả lương Tài Xế")).iterator();
        try {
            while (cursor.hasNext()) {
                Document doc = cursor.next();
                PhieuChiPOJO pc = convertToPhieuChiPOJO(doc);
                danhSachPhieuChi.add(pc);
            }
        } catch (ParseException e) {
            throw new RuntimeException(e);
        } finally {
            cursor.close();
        }

        for (PhieuChiPOJO pc : danhSachPhieuChi) {
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(pc.getThoiGianLap());
            int nam = calendar.get(Calendar.YEAR);
            int tongTien = pc.getTongTien();

            if (tongTienTheoNam.containsKey(nam)) {
                // Nếu đã có tổng số tiền của năm đó, cộng thêm vào
                int tongTienHienTai = tongTienTheoNam.get(nam);
                tongTienTheoNam.put(nam, tongTienHienTai + tongTien);
            } else {
                // Nếu chưa có, thêm vào Map
                tongTienTheoNam.put(nam, tongTien);
            }
        }

        // Chuyển đổi Map thành danh sách các Map và thêm vào danh sách tổng tiền
        danhSachTongTien.add(tongTienTheoNam);

        return danhSachTongTien;
    }


}
