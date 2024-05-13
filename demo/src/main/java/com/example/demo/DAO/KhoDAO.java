package com.example.demo.DAO;
import com.example.demo.POJO.KhoPOJO;
import com.example.demo.POJO.KhoPOJO.KhoLanCan;
import com.example.demo.POJO.VanDonPOJO;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import org.bson.Document;
import org.bson.conversions.Bson;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class KhoDAO {
    private final Connection connection;

    public KhoDAO() {
        connection = new Connection("Kho");
    }

    // Phương thức để thêm kho mới vào cơ sở dữ liệu
    public void themKho(KhoPOJO kho) {
        MongoCollection<Document> collection = connection.getCollection();
        Document doc = convertToDocument(kho);
        collection.insertOne(doc);
    }

    // Phương thức để cập nhật kho trong cơ sở dữ liệu
    public void capNhatKho(KhoPOJO kho) {
        MongoCollection<Document> collection = connection.getCollection();
        Bson filter = Filters.eq("id", kho.getId());
        Document updatedDocument = convertToDocument(kho);
        collection.replaceOne(filter, updatedDocument);
    }

    // Phương thức để xóa kho khỏi cơ sở dữ liệu
    public void xoaKho(String id) {
        MongoCollection<Document> collection = connection.getCollection();
        Bson filter = Filters.eq("id", id);
        collection.deleteOne(filter);
    }

    // Phương thức để tìm kho theo ID
    public KhoPOJO timKhoTheoId(ObjectId id) {
        MongoCollection<Document> collection = connection.getCollection();
        Bson filter = Filters.eq("_id", id);
        Document doc = collection.find(filter).first();
        return convertToKhoPOJO(doc);
    }

    // Phương thức để tìm kho theo ID
    public KhoPOJO timKhoTheoTinh(String tinh) {
        MongoCollection<Document> collection = connection.getCollection();
        Bson filter = Filters.eq("Tinh", tinh);
        Document doc = collection.find(filter).first();
        return convertToKhoPOJO(doc);
    }

    // Phương thức để lấy danh sách tất cả các kho
    public List<KhoPOJO> layTatCaKho() {
        List<KhoPOJO> danhSachKho = new ArrayList<>();
        MongoCollection<Document> collection = connection.getCollection();
        for (Document doc : collection.find()) {
            KhoPOJO kho = convertToKhoPOJO(doc);
            danhSachKho.add(kho);
        }
        return danhSachKho;
    }

    // Phương thức để chuyển đổi Document thành KhoPOJO
    private KhoPOJO convertToKhoPOJO(Document doc) {
        KhoPOJO kho = new KhoPOJO();
        kho.setId(doc.getObjectId("_id").toString());
        kho.setMaKho(doc.getString("MaKho"));
        kho.setDiaChi(doc.getString("DiaChi"));
        kho.setTinh(doc.getString("Tinh"));
        kho.setKhuVuc(doc.getString("KhuVuc"));
        kho.setLoaiKho(doc.getString("LoaiKho"));
        kho.setSdt(doc.getString("SDT"));

        // Chuyển đổi danh sách kho lân cận
        List<Document> listKhoLanCanDoc = doc.getList("KhoLanCan", Document.class);
        List<KhoLanCan> listKhoLanCan = new ArrayList<>();
        for (Document khoLanCanDoc : listKhoLanCanDoc) {
            KhoLanCan khoLanCan = new KhoLanCan(
                    khoLanCanDoc.getString("MaKho"),
                    khoLanCanDoc.getDouble("KhoangCach")
            );
            listKhoLanCan.add(khoLanCan);
        }
        kho.setKhoLanCan(listKhoLanCan);

        return kho;
    }

    // Phương thức để chuyển đổi KhoPOJO thành Document
    private Document convertToDocument(KhoPOJO kho) {
        Document doc = new Document();
        doc.put("id", kho.getId());
        doc.put("maKho", kho.getMaKho());
        doc.put("diaChi", kho.getDiaChi());
        doc.put("tinh", kho.getTinh());
        doc.put("khuVuc", kho.getKhuVuc());
        doc.put("loaiKho", kho.getLoaiKho());
        doc.put("sdt", kho.getSdt());

        // Chuyển đổi danh sách kho lân cận
        List<Document> listKhoLanCanDoc = new ArrayList<>();
        for (KhoLanCan khoLanCan : kho.getKhoLanCan()) {
            Document khoLanCanDoc = new Document();
            khoLanCanDoc.put("maKho", khoLanCan.getMaKho());
            khoLanCanDoc.put("khoangCach", khoLanCan.getKhoangCach());
            listKhoLanCanDoc.add(khoLanCanDoc);
        }
        doc.put("khoLanCan", listKhoLanCanDoc);

        return doc;
    }

    // Đóng kết nối cơ sở dữ liệu
    public void dongKetNoi() {
        connection.close();
    }
}
