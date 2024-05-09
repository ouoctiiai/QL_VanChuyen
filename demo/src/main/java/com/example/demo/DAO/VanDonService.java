package com.example.demo.DAO;
import com.example.demo.POJO.*;
import com.mongodb.client.MongoCollection;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.bson.types.ObjectId;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class VanDonService {
    private final Connection connection;

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
        vanDon.setTinh(doc.getString("Tinh"));
        vanDon.setTrangThai(doc.getString("TrangThai"));

        // Get the Double value directly
        vanDon.setKhoangCach(doc.getDouble("KhoangCach"));

        // Convert sub-documents to their respective classes
        vanDon.setThongTinNguoiGui(convertToThongTinNguoiGui(doc.getEmbedded(Collections.singletonList("ThongTinNguoiGui"), Document.class)));
        vanDon.setThongTinNguoiNhan(convertToThongTinNguoiNhan(doc.getEmbedded(Collections.singletonList("ThongTinNguoiNhan"), Document.class)));
        vanDon.setThongTinTaiXe(convertToThongTinTaiXe(doc.getEmbedded(Collections.singletonList("ThongTinTaiXe"), Document.class)));
        vanDon.setThongTinXe(convertToThongTinXe(doc.getEmbedded(Collections.singletonList("ThongTinXe"), Document.class)));
        vanDon.setThongTinHangHoa(convertToThongTinHangHoa(doc.getEmbedded(Collections.singletonList("ThongTinHangHoa"), Document.class)));
        vanDon.setTuyenDuong(convertToTuyenDuong(doc.getEmbedded(Collections.singletonList("TuyenDuong"), Document.class)));
        vanDon.setPhiVanChuyen(convertToPhiVanChuyen(doc.getEmbedded(Collections.singletonList("PhiVanChuyen"), Document.class)));
        vanDon.setThongTinShipper(convertToThongTinShipper(doc.getEmbedded(Collections.singletonList("ThongTinShipper"), Document.class)));

        return vanDon;
    }

    private ThongTinNguoiGui convertToThongTinNguoiGui(Document doc) {
        ThongTinNguoiGui thongTinNguoiGui = new ThongTinNguoiGui();

        // Get the String values directly
        thongTinNguoiGui.setTenNguoiGui(doc.getString("TenNguoiGui"));
        thongTinNguoiGui.setSdtNguoiGui(doc.getString("SDTNguoiGui"));
        thongTinNguoiGui.setDiaChiNguoiGui(doc.getString("DiaChiNguoiGui"));

        return thongTinNguoiGui;
    }

    private ThongTinNguoiNhan convertToThongTinNguoiNhan(Document doc) {
        ThongTinNguoiNhan thongTinNguoiNhan = new ThongTinNguoiNhan();

        // Get the String values directly
        thongTinNguoiNhan.setTenNguoiNhan(doc.getString("TenNguoiNhan"));
        thongTinNguoiNhan.setSdtNguoiNhan(doc.getString("SDTNguoiNhan"));
        thongTinNguoiNhan.setDiaChiNguoiNhan(doc.getString("DiaChiNguoiNhan"));

        return thongTinNguoiNhan;
    }

    private ThongTinTaiXe convertToThongTinTaiXe(Document doc) {
        ThongTinTaiXe thongTinTaiXe = new ThongTinTaiXe();

        thongTinTaiXe.setMaTaiXe(doc.getString("MaTaiXe"));
        thongTinTaiXe.setTenTaiXe(doc.getString("TenTaiXe"));
        thongTinTaiXe.setSdtTaiXe(doc.getString("SDTTaiXe"));

        return thongTinTaiXe;
    }

    private ThongTinXe convertToThongTinXe(Document doc) {
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
        thongTinHangHoa.setTrongLuong(doc.getDouble("TrongLuong"));

        // Handle nested document for KichCo
        Document kichCoDoc = doc.getEmbedded(Collections.singletonList("KichCo"), Document.class);
        if (kichCoDoc != null) {
            KichCo kichCo = new KichCo();
            kichCo.setDai(kichCoDoc.getDouble("Dai"));
            kichCo.setRong(kichCoDoc.getDouble("Rong"));
            thongTinHangHoa.setKichCo(kichCo);
        }

        thongTinHangHoa.setSoLuong(doc.getInteger("SoLuong"));

        return thongTinHangHoa;
    }

    private TuyenDuong convertToTuyenDuong(Document doc) {
        TuyenDuong tuyenDuong = new TuyenDuong();

        tuyenDuong.setDuongDi(doc.getString("DuongDi"));
        tuyenDuong.setKhoangCach(doc.getDouble("KhoangCach"));

        return tuyenDuong;
    }

    private PhiVanChuyen convertToPhiVanChuyen(Document doc) {
        PhiVanChuyen phiVanChuyen = new PhiVanChuyen();

        phiVanChuyen.setPhiCoDinh(doc.getDouble("PhiCoDinh"));
        phiVanChuyen.setVat(doc.getDouble("VAT"));
        phiVanChuyen.setPhiNang(doc.getDouble("PhiNang"));
        phiVanChuyen.setPhiHa(doc.getDouble("PhiHa"));
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

    @Autowired
    private VanDonRepository vanDonRepository;
    public List<VanDonPOJO> allVanDons(){
        return vanDonRepository.findAll();
    }
}
