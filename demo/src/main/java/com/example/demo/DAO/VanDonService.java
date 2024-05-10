package com.example.demo.DAO;
import com.example.demo.POJO.*;
import com.mongodb.client.MongoCollection;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.bson.types.ObjectId;

import java.util.*;

@Service
public class VanDonService {
    private final Connection connection;
    private java.util.Objects Objects;

    public VanDonService() {
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

        Document ttng = doc.getEmbedded(Collections.singletonList("ThongTinNguoiGui"), Document.class);
        if (ttng != null) {
            ThongTinNguoiGui tt = new ThongTinNguoiGui();
            tt.setTenNguoiGui(ttng.getString("TenNguoiGui"));
            tt.setSdtNguoiGui(ttng.getString("SDTNguoiGui"));
            tt.setDiaChiNguoiGui(ttng.getString("DiaChiNguoiGui"));
            vanDon.setThongTinNguoiGui(tt);
        }

        Document ttnn = doc.getEmbedded(Collections.singletonList("ThongTinNguoiNhan"), Document.class);
        if (ttnn != null) {
            ThongTinNguoiNhan tt = new ThongTinNguoiNhan();
            tt.setTenNguoiNhan(ttnn.getString("TenNguoiNhan"));
            tt.setSdtNguoiNhan(ttnn.getString("SDTNguoiNhan"));
            tt.setDiaChiNguoiNhan(ttnn.getString("DiaChiNguoiNhan"));
            vanDon.setThongTinNguoiNhan(tt);
        }

        Document tttx = doc.getEmbedded(Collections.singletonList("ThongTinTaiXe"), Document.class);
        if (tttx != null) {
            ThongTinTaiXe tt = new ThongTinTaiXe();
            tt.setMaTaiXe(tttx.getString("MaTaiXe"));
            tt.setTenTaiXe(tttx.getString("TenTaiXe"));
            tt.setSdtTaiXe(tttx.getString("SDTTaiXe"));
            vanDon.setThongTinTaiXe(tt);
        }

        return vanDon;
    }

    private ThongTinTaiXe convertToThongTinTaiXe(Document doc) {

        if (doc == null) {
            return null;
        }

        ThongTinTaiXe thongTinTaiXe = new ThongTinTaiXe();

        thongTinTaiXe.setMaTaiXe(doc.getString("MaTaiXe"));
        thongTinTaiXe.setTenTaiXe(doc.getString("TenTaiXe"));
        thongTinTaiXe.setSdtTaiXe(doc.getString("SDTTaiXe"));

        return thongTinTaiXe;
    }

    private ThongTinXe convertToThongTinXe(Document doc) {

        if (doc == null) {
            return null;
        }
        ThongTinXe thongTinXe = new ThongTinXe();

        thongTinXe.setBienSo(doc.getString("BienSo"));
        thongTinXe.setTenXe(doc.getString("TenXe"));
        thongTinXe.setLoaiXe(doc.getString("LoaiXe"));
        thongTinXe.setHangXe(doc.getString("HangXe"));

        return thongTinXe;
    }

    private ThongTinHangHoa convertToThongTinHangHoa(Document doc) {

        ThongTinHangHoa thongTinHangHoa = new ThongTinHangHoa();

        thongTinHangHoa.setLoaiHang(doc.getString("LoaiHang"));
        thongTinHangHoa.setTenHang(doc.getString("TenHang"));

        // Handle nested document for KichCo
        Document kichCoDoc = doc.getEmbedded(Collections.singletonList("KichCo"), Document.class);
        if (kichCoDoc != null) {
            KichCo kichCo = new KichCo();
            kichCo.setDai(Objects.requireNonNullElse(kichCoDoc.getDouble("Dai"), 0.0));
            kichCo.setRong(Objects.requireNonNullElse(kichCoDoc.getDouble("Rong"), 0.0));
            thongTinHangHoa.setKichCo(kichCo);
        }

        thongTinHangHoa.setSoLuong(doc.getInteger("SoLuong"));

        return thongTinHangHoa;
    }

    private TuyenDuong convertToTuyenDuong(Document doc) {
        if (doc == null) {
            return null;
        }
        TuyenDuong tuyenDuong = new TuyenDuong();

        tuyenDuong.setDuongDi(doc.getString("DuongDi"));

        return tuyenDuong;
    }

    private PhiVanChuyen convertToPhiVanChuyen(Document doc) {
        PhiVanChuyen phiVanChuyen = new PhiVanChuyen();

        phiVanChuyen.setPhiCoDinh(Objects.requireNonNullElse(doc.getInteger("PhiCoDinh"), 0));
        phiVanChuyen.setVat(Objects.requireNonNullElse(doc.getInteger("VAT"), 0));
        phiVanChuyen.setPhiNang(Objects.requireNonNullElse(doc.getInteger("PhiNang"), 0));
        phiVanChuyen.setPhiHa(Objects.requireNonNullElse(doc.getInteger("PhiHa"), 0));
        // Consider calculating the total cost if needed (already defined in PhiVanChuyen class)
        // phiVanChuyen.tinhTongPhi();
        return phiVanChuyen;
    }

    private ThongTinShipper convertToThongTinShipper(Document doc) {
        ThongTinShipper thongTinShipper = new ThongTinShipper();

        thongTinShipper.setMaShipper(doc.getString("MaShipper"));
        thongTinShipper.setTenShipper(doc.getString("TenShipper"));
        thongTinShipper.setSdtShipper(doc.getString("SDTShipper"));

        return thongTinShipper;
    }
}
