package com.example.demo.DAO;

import com.example.demo.POJO.TaiKhoanPOJO;
import com.example.demo.POJO.ThongTinTaiKhoan;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import org.bson.Document;
import org.bson.conversions.Bson;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Repository
public class TaiKhoanDAO {
    private Connection connection;

    public TaiKhoanDAO() {
        connection = new Connection("TaiKhoan");
    }

    public List<TaiKhoanPOJO> layTatCaTaiKhoan() {
        List<TaiKhoanPOJO> danhSachTK = new ArrayList<>();
        MongoCollection<Document> collection = connection.getCollection();
        for (Document doc : collection.find()) {
            TaiKhoanPOJO tk = convertToTaiKhoanPOJO(doc);
            danhSachTK.add(tk);
        }
        return danhSachTK;
    }


    public boolean themTaiKhoanMoi(TaiKhoanPOJO taiKhoanMoi) {
        try {
            MongoCollection<Document> collection = connection.getCollection();
            Document doc = new Document();
            doc.append("LoaiTaiKhoan", taiKhoanMoi.getLoaiTaiKhoan());
            doc.append("TenTaiKhoan", taiKhoanMoi.getTenTaiKhoan());
            doc.append("TenChuTaiKhoan", taiKhoanMoi.getTenChuTaiKhoan());
            doc.append("SDT", taiKhoanMoi.getSdt());
            doc.append("Email", taiKhoanMoi.getEmail());
            doc.append("SoCCCD", taiKhoanMoi.getSoCCCD());
            doc.append("MatKhau", taiKhoanMoi.getMatKhau());
            doc.append("DiaChi", taiKhoanMoi.getDiaChi());
            doc.append("MaShipper", "Ma tu dong");
//        doc.append("TongTienCong", taiKhoanMoi.getTongTienCong());

            ThongTinTaiKhoan tt = taiKhoanMoi.getThongTinTaiKhoan();
            if (tt != null) {
                Document ttttk = new Document();
                ttttk.append("TenNganHang", tt.getTenNganHang());
                ttttk.append("SoTaiKhoan", tt.getSoTaiKhoan());
                doc.append("TKNganHang", ttttk);
            }

            collection.insertOne(doc);
            return true;
        } catch (Exception ex) {
            return false;
        }
    }

    public TaiKhoanPOJO timTaiKhoanTheoId(ObjectId id) {
        MongoCollection<Document> collection = connection.getCollection();
        Bson filter = Filters.eq("_id", id);
        Document doc = collection.find(filter).first();
        return convertToTaiKhoanPOJO(doc);
    }

    public TaiKhoanPOJO timTaiKhoanTheoTenTaiKhoan(String tenTaiKhoan){
        MongoCollection<Document> collection = connection.getCollection();
        Bson filter = Filters.eq("TenTaiKhoan", tenTaiKhoan);
        Document doc = collection.find(filter).first();
        return doc != null ? convertToTaiKhoanPOJO(doc) : null;
    }

    // Phương thức để chuyển đổi Document thành KhoPOJO
    private TaiKhoanPOJO convertToTaiKhoanPOJO(Document doc) {
        TaiKhoanPOJO tk = new TaiKhoanPOJO();
        tk.setId(doc.getObjectId("_id").toString());
        tk.setLoaiTaiKhoan(doc.getString("LoaiTaiKhoan"));
        tk.setTenTaiKhoan(doc.getString("TenTaiKhoan"));
        tk.setTenChuTaiKhoan(doc.getString("TenChuTaiKhoan"));
        tk.setSdt(doc.getString("SDT"));
        tk.setEmail(doc.getString("Email"));
        tk.setSoCCCD(doc.getString("SoCCCD"));
        tk.setMatKhau(doc.getString("MatKhau"));
        tk.setDiaChi(doc.getString("DiaChi"));
        tk.setMaShipper(doc.getString("MaShipper"));
        tk.setTongTienCong(doc.getInteger("TongTienCong"));

        Document ttttk = doc.getEmbedded(Collections.singletonList("TKNganHang"), Document.class);
        if (ttttk != null) {
            ThongTinTaiKhoan tt = new ThongTinTaiKhoan();
            tt.setTenNganHang(ttttk.getString("TenNganHang"));
            tt.setSoTaiKhoan(ttttk.getString("SoTaiKhoan"));
            tk.setThongTinTaiKhoan(tt);
        }
        return tk;
    }

    // Đóng kết nối cơ sở dữ liệu
    public void dongKetNoi() {
        connection.close();
    }

}
