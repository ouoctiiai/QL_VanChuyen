package com.example.demo.POJO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Document(collection = "VanDon")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class VanDonPOJO {
    @Id
    private String id;
    private String maVanDon;
    private Date thoiGianLap;
    private String loaiVanChuyen;
    private String noiTiepNhan;
    private String nguoiThanhToan;
    private ThongTinNguoiGui thongTinNguoiGui;
    private ThongTinNguoiNhan thongTinNguoiNhan;
    private ThongTinTaiXe thongTinTaiXe;
    private ThongTinXe thongTinXe;
    private ThongTinHangHoa thongTinHangHoa;
    private String diemXuatPhat;
    private String diemDen;
    private String tinh;
    private Double khoangCach;
    private TuyenDuong tuyenDuong;
    private PhiVanChuyen phiVanChuyen;
    private ThongTinShipper thongTinShipper;
    private String trangThai;
    private String thoiGianLapToString;

    public VanDonPOJO(VanDonPOJO vd)
    {
        this.id = vd.id;
        this.maVanDon = vd.maVanDon;
        this.thoiGianLap = vd.thoiGianLap;
        this.loaiVanChuyen = vd.loaiVanChuyen;
        this.noiTiepNhan = vd.noiTiepNhan;
        this.nguoiThanhToan = vd.nguoiThanhToan;
        this.thongTinNguoiGui = vd.thongTinNguoiGui;
        this.thongTinNguoiNhan = vd.thongTinNguoiNhan;
        this.thongTinTaiXe = vd.thongTinTaiXe;
        this.thongTinXe = vd.thongTinXe;
        this.thongTinHangHoa = vd.thongTinHangHoa;
        this.diemXuatPhat = vd.diemXuatPhat;
        this.diemDen = vd.diemDen;
        this.tinh = vd.tinh;
        this.khoangCach = vd.khoangCach;
        this.tuyenDuong = vd.tuyenDuong;
        this.phiVanChuyen = vd.phiVanChuyen;
        this.thongTinShipper = vd.thongTinShipper;
        this.trangThai = vd.trangThai;
    }

    public String getId() {
        return id;
    }

    public String getMaVanDon() {
        return maVanDon;
    }

    public Date getThoiGianLap() {
        return thoiGianLap;
    }

    public String getLoaiVanChuyen() {
        return loaiVanChuyen;
    }

    public String getNoiTiepNhan() {
        return noiTiepNhan;
    }

    public String getNguoiThanhToan() {
        return nguoiThanhToan;
    }

    public ThongTinNguoiGui getThongTinNguoiGui() {
        return thongTinNguoiGui;
    }

    public ThongTinNguoiNhan getThongTinNguoiNhan() {
        return thongTinNguoiNhan;
    }

    public ThongTinTaiXe getThongTinTaiXe() {
        return thongTinTaiXe;
    }

    public ThongTinXe getThongTinXe() {
        return thongTinXe;
    }

    public ThongTinHangHoa getThongTinHangHoa() {
        return thongTinHangHoa;
    }

    public String getDiemXuatPhat() {
        return diemXuatPhat;
    }

    public String getDiemDen() {
        return diemDen;
    }

    public String getTinh(){
        return tinh;
    }

    public Double getKhoangCach(){
        return khoangCach;
    }

    public TuyenDuong getTuyenDuong() {
        return tuyenDuong;
    }

    public PhiVanChuyen getPhiVanChuyen() {
        return phiVanChuyen;
    }

    public String getTrangThai() {
        return trangThai;
    }

    // Setters
    public void setId(String id) {
        this.id = id;
    }

    public void setMaVanDon(String maVanDon) {
        this.maVanDon = maVanDon;
    }

    public void setThoiGianLap(Date thoiGianLap) throws ParseException {
        this.thoiGianLap = thoiGianLap;
        this.thoiGianLapToString = getDateFromISO(thoiGianLap);
    }

    public void setLoaiVanChuyen(String loaiVanChuyen) {
        this.loaiVanChuyen = loaiVanChuyen;
    }

    public void setNoiTiepNhan(String noiTiepNhan) {
        this.noiTiepNhan = noiTiepNhan;
    }

    public void setNguoiThanhToan(String nguoiThanhToan) {
        this.nguoiThanhToan = nguoiThanhToan;
    }

    public void setThongTinNguoiGui(ThongTinNguoiGui thongTinNguoiGui) {
        this.thongTinNguoiGui = thongTinNguoiGui;
    }

    public void setThongTinNguoiNhan(ThongTinNguoiNhan thongTinNguoiNhan) {
        this.thongTinNguoiNhan = thongTinNguoiNhan;
    }

    public void setThongTinTaiXe(ThongTinTaiXe thongTinTaiXe) {
        this.thongTinTaiXe = thongTinTaiXe;
    }

    public void setThongTinXe(ThongTinXe thongTinXe) {
        this.thongTinXe = thongTinXe;
    }

    public void setThongTinHangHoa(ThongTinHangHoa thongTinHangHoa) {
        this.thongTinHangHoa = thongTinHangHoa;
    }

    public void setDiemXuatPhat(String diemXuatPhat) {
        this.diemXuatPhat = diemXuatPhat;
    }

    public void setDiemDen(String diemDen){
        this.diemDen = diemDen;
    }

    public void setTinh(String tinh){
        this.tinh = tinh;
    }

    public void setKhoangCach(Double khoangCach){
        this.khoangCach = khoangCach;
    }

    public void setTuyenDuong(TuyenDuong tuyenDuong){
        this.tuyenDuong = tuyenDuong;
    }

    public void setPhiVanChuyen(PhiVanChuyen phiVanChuyen){
        this.phiVanChuyen = phiVanChuyen;
    }

    public void setThongTinShipper(ThongTinShipper thongTinShipper){
        this.thongTinShipper = thongTinShipper;
    }

    public void setTrangThai(String trangThai) {
        this.trangThai = trangThai;
    }

    public static String getDateFromISO(Date isoDate) throws ParseException {
        SimpleDateFormat newFormatter = new SimpleDateFormat("yyyy-MM-dd");
        String formattedDate = newFormatter.format(isoDate);
        return formattedDate;
    }

}



