package com.example.demo.DAO;
import com.example.demo.POJO.*;
import com.mongodb.BasicDBObject;
import com.mongodb.client.MongoCollection;
import org.bson.Document;
import org.springframework.stereotype.Service;


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
        }

        return dsVanDon;
    }

    public VanDonPOJO convertToVanDonPOJO(Document doc) {
        VanDonPOJO vanDon = new VanDonPOJO();

        // Get the ObjectIds and convert them to String using toString()
        vanDon.setId(doc.getObjectId("_id").toString());
        // Get the String values directly
        vanDon.setMaVanDon(doc.getString("MaVanDon"));
        vanDon.setThoiGianLap(doc.getDate("ThoiGianLap"));
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
        Document tttx = doc.getEmbedded(Collections.singletonList("ThongTinTaiXe"), Document.class);
        if (tttx != null) {
            ThongTinTaiXe tt = new ThongTinTaiXe();
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
            if(trongLuongValue != null) {
                tt.setTrongLuong((Double)trongLuongValue);
            }
            else {
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
