package com.example.demo.DAO;

import com.example.demo.POJO.*;
import com.mongodb.BasicDBObject;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Updates;
import com.mongodb.client.result.UpdateResult;
import org.bson.Document;
import org.bson.conversions.Bson;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Repository;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static com.mongodb.client.model.Filters.eq;
import java.util.Objects;

@Repository
public class TaiKhoanDAO {
    private Connection connection;

    public TaiKhoanDAO() {
        connection = new Connection("TaiKhoan");
    }

    public List<TaiKhoanPOJO> layTatCaTaiKhoan() throws ParseException {
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

            String maShipperMoi = generateMaShipperMoi(collection);

            Document doc = new Document();
            doc.append("LoaiTaiKhoan", taiKhoanMoi.getLoaiTaiKhoan());
            doc.append("TenTaiKhoan", taiKhoanMoi.getTenTaiKhoan());
            doc.append("MaShipper", maShipperMoi);
            doc.append("TenChuTaiKhoan", taiKhoanMoi.getTenChuTaiKhoan());
            doc.append("SDT", taiKhoanMoi.getSdt());
            doc.append("Email", taiKhoanMoi.getEmail());
            doc.append("SoCCCD", taiKhoanMoi.getSoCCCD());
            doc.append("MatKhau", taiKhoanMoi.getMatKhau());
            doc.append("DiaChi", taiKhoanMoi.getDiaChi());
            doc.append("TongTienCong", "0");

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

    private String generateMaShipperMoi(MongoCollection<Document> collection) {
        Document sort = new Document("MaShipper", -1);
        Document result = collection.find().sort(sort).first();

        if (result == null || result.getString("MaShipper") == null) {
            return "SP00000";
        }

        String lastMaShipper = result.getString("MaShipper");
        int number = Integer.parseInt(lastMaShipper.substring(2)) + 1;
        return String.format("SP%05d", number);
    }

    public TaiKhoanPOJO timTaiKhoanTheoId(ObjectId id) throws ParseException {
        MongoCollection<Document> collection = connection.getCollection();
        Bson filter = eq("_id", id);
        Document doc = collection.find(filter).first();
        return convertToTaiKhoanPOJO(doc);
    }

    public TaiKhoanPOJO timTaiKhoanTheoTenTaiKhoan(String tenTaiKhoan) throws ParseException {
        MongoCollection<Document> collection = connection.getCollection();
        Bson filter = eq("TenTaiKhoan", tenTaiKhoan);
        Document doc = collection.find(filter).first();
        return doc != null ? convertToTaiKhoanPOJO(doc) : null;
    }

    public TaiKhoanPOJO themTaiKhoanKhachHang(TaiKhoanPOJO taiKhoanKhachHang) {
        try {
            Document document = new Document()
                    .append("LoaiTaiKhoan", taiKhoanKhachHang.getLoaiTaiKhoan())
                    .append("TenTaiKhoan", taiKhoanKhachHang.getTenTaiKhoan())
                    .append("TenChuTaiKhoan", taiKhoanKhachHang.getTenChuTaiKhoan())
                    .append("SDT", taiKhoanKhachHang.getSdt())
                    .append("Email", taiKhoanKhachHang.getEmail())
                    .append("MatKhau", taiKhoanKhachHang.getMatKhau());

            if (Optional.ofNullable(taiKhoanKhachHang.getSoCCCD()).isPresent()){
                document.append("SoCCCD", taiKhoanKhachHang.getSoCCCD());
            }

            if (Optional.ofNullable(taiKhoanKhachHang.getDiaChi()).isPresent()){
                document.append("DiaChi", taiKhoanKhachHang.getDiaChi());
            }

            if(Optional.ofNullable(taiKhoanKhachHang.getThongTinTaiKhoan()).isPresent()){
                document.append("TKNganHang", new Document()
                        .append("TenNganHang", taiKhoanKhachHang.getThongTinTaiKhoan().getTenNganHang())
                        .append("SoTaiKhoan", taiKhoanKhachHang.getThongTinTaiKhoan().getSoTaiKhoan()));
            }

            MongoCollection<Document> collection = connection.getCollection();

            collection.insertOne(document);

            return taiKhoanKhachHang;

        }catch (Exception e){
            e.printStackTrace();
            throw new RuntimeException("Lỗi thêm tài khoản", e);
        }
    }

    // Phương thức để chuyển đổi Document thành KhoPOJO
    private TaiKhoanPOJO convertToTaiKhoanPOJO(Document doc) {
    public List<TaiKhoanPOJO> danhSachTaiKhoanLaShipper() throws ParseException {
        List<TaiKhoanPOJO> ds = new ArrayList<>();
        MongoCollection<Document> collection = connection.getCollection();
        BasicDBObject query = new BasicDBObject("LoaiTaiKhoan", "Shipper");

        for (Document doc : collection.find(query)) {
            TaiKhoanPOJO vd = convertToTaiKhoanPOJO(doc);
            ds.add(vd);
        }

        return ds;
    }

    private TaiKhoanPOJO convertToTaiKhoanPOJO(Document doc) throws ParseException {
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
        tk.setTongTienCong(tinhTongLuongCuaShipper(tk));

        Document ttttk = doc.getEmbedded(Collections.singletonList("TKNganHang"), Document.class);
        if (ttttk != null) {
            ThongTinTaiKhoan tt = new ThongTinTaiKhoan();
            tt.setTenNganHang(ttttk.getString("TenNganHang"));
            tt.setSoTaiKhoan(ttttk.getString("SoTaiKhoan"));
            tk.setThongTinTaiKhoan(tt);
        }
        return tk;
    }

    public Integer tinhTongTienDaNhanCuaShipper(TaiKhoanPOJO tk) throws ParseException {
        PhieuChiDAO dao = new PhieuChiDAO();
        Integer s = 0;
        List<PhieuChiPOJO> ls = dao.lichSuChiChoShipper(tk.getMaShipper());
        for(PhieuChiPOJO p : ls)
        {
            s += p.getTongTien();
        }
        return s;
    }

    public Integer tinhTongLuongCuaShipper(TaiKhoanPOJO tk) throws ParseException {
        VanDonDAO vd = new VanDonDAO();
        Integer luong = 0;
        List<VanDonPOJO> ls = vd.lichSuDonCuaShipper(tk.getMaShipper());
        for (VanDonPOJO vd1 : ls) {
            if(Objects.equals(vd1.getTrangThai(), "Giao hàng thành công")) {
                PhiVanChuyen p = vd1.getPhiVanChuyen();
                luong += p.getLuongShipperTheoDon();
            }
        }

        luong -= tinhTongTienDaNhanCuaShipper(tk);
        return luong;
    }

    public TaiKhoanPOJO updateTaiKhoanShipper(ObjectId id, String tenChuTaiKhoan, String tenDangNhap, String matKhau, String sdt, String email, String soTaiKhoan, String tenNganHang) throws Exception {
        try {
            MongoCollection<Document> collection = connection.getCollection();

            Document updateDoc = new Document();
            updateDoc.append("$set", new Document()
                    .append("TenChuTaiKhoan", tenChuTaiKhoan)
                    .append("TenDangNhap", tenDangNhap)
                    .append("MatKhau", matKhau)
                    .append("SDT", sdt)
                    .append("Email", email)
                    .append("ThongTinTaiKhoan.SoTaiKhoan", soTaiKhoan)
                    .append("ThongTinTaiKhoan.TenNganHang", tenNganHang));

            UpdateResult updateResult = collection.updateOne(
                    Filters.eq("_id", id),
                    updateDoc
            );

            if (updateResult.getModifiedCount() > 0) {
                return new TaiKhoanPOJO();
            } else {
                throw new Exception("Update failed for shipper ID: " + id);
            }
        } catch (Exception ex) {
            throw ex;
        }
    }

    public void dongKetNoi() {
        connection.close();
    }

}
