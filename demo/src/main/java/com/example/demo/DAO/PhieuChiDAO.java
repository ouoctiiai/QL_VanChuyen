package com.example.demo.DAO;

import com.example.demo.POJO.PhieuChiPOJO;
import com.example.demo.POJO.ThongTinShipper;
import com.example.demo.POJO.ThongTinTaiXe;
import com.mongodb.BasicDBObject;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import org.bson.Document;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public class PhieuChiDAO {

    private Connection connection;
    public PhieuChiDAO() {connection = new Connection("PhieuChi");}


    public List<PhieuChiPOJO> loadDanhSachPhieuChi() {
        List<PhieuChiPOJO> danhSachPhieuChi = new ArrayList<>();

        MongoCollection<Document> collection = connection.getCollection();
        MongoCursor<Document> cursor = collection.find().iterator();

        try {
            while (cursor.hasNext()) {
                Document doc = cursor.next();
                PhieuChiPOJO phieuChi = convertToPhieuChiPOJO(doc);
                danhSachPhieuChi.add(phieuChi);
            }
        } finally {
            cursor.close();
        }

        return danhSachPhieuChi;
    }

    public PhieuChiPOJO convertToPhieuChiPOJO(Document doc) {
        PhieuChiPOJO phieuChi = new PhieuChiPOJO();
        phieuChi.setId(doc.getString("_id"));
        phieuChi.setLoaiPhieuChi(doc.getString("LoaiPhieuChi"));
        phieuChi.setThoiGianLap(doc.getDate("ThoiGianLap"));
        phieuChi.setTongTien(doc.getInteger("TongTien"));
        convertToThongTinShipper(doc, phieuChi);
        convertToThongTinTaiXe(doc, phieuChi);
        return phieuChi;
    }

    public void convertToThongTinShipper(Document doc, PhieuChiPOJO vanDon) {
        Document ttsp = doc.getEmbedded(Collections.singletonList("ThongTinShipper"), Document.class);
        if (ttsp != null) {
            ThongTinShipper tt = new ThongTinShipper();
            tt.setMaShipper(ttsp.getString("MaShipper"));
            tt.setTenShipper(ttsp.getString("TenShipper"));
            tt.setSdtShipper(ttsp.getString("SDTShipper"));
            vanDon.setThongTinShipper(tt);
        }
    }

    public void convertToThongTinTaiXe(Document doc, PhieuChiPOJO vanDon) {
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


    public void themPhieuChi(PhieuChiPOJO phieuChiPOJO) {
        MongoCollection<Document> collection = connection.getCollection();
        Document phieuChiDoc = new Document();
        phieuChiDoc.append("LoaiPhieuChi", phieuChiPOJO.getLoaiPhieuChi());
        phieuChiDoc.append("TongTien", phieuChiPOJO.getTongTien());
        phieuChiDoc.append("ThoiGianLap", phieuChiPOJO.getThoiGianLap());

        // Nếu loại là "Trả lương Shipper", thêm thông tin shipper vào Document
        if ("Trả lương Shipper".equals(phieuChiPOJO.getLoaiPhieuChi())) {
            ThongTinShipper shipper = phieuChiPOJO.getThongTinShipper();
            if (shipper != null) {
                Document ttsp = new Document();
                ttsp.append("MaShipper", shipper.getMaShipper());
                ttsp.append("TenShipper", shipper.getTenShipper());
                phieuChiDoc.append("ThongTinShipper", ttsp);
            }
        }

        // Nếu loại là "Trả lương Tài Xế", thêm thông tin tài xế vào Document
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
    public int tinhTongTienTheoLoaiPhieuChi(String loaiPhieuChi, int nam) {
        int tongTien = 0;

        MongoCollection<Document> collection = connection.getCollection();
        BasicDBObject query = new BasicDBObject("LoaiPhieuChi", loaiPhieuChi);

        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.YEAR, nam);
        Date startDate = calendar.getTime();
        calendar.add(Calendar.YEAR, 1);
        Date endDate = calendar.getTime();

        query.append("ThoiGianLap", new BasicDBObject("$gte", startDate).append("$lt", endDate));

        try (MongoCursor<Document> cursor = collection.find(query).iterator()) {
            while (cursor.hasNext()) {
                Document doc = cursor.next();
                int tien = doc.getInteger("TongTien");
                tongTien += tien;
            }
        }

        return tongTien;
    }

}
