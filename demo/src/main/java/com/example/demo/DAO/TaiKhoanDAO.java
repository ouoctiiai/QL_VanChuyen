package com.example.demo.DAO;
import com.example.demo.POJO.*;
import com.mongodb.client.MongoCollection;
import org.bson.Document;
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
