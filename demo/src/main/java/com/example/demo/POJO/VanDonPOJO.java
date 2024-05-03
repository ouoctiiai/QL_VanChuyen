package com.example.demo.POJO;
import java.util.Date;

public class VanDonPOJO {

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
    private String dienXuatPhat;
    private String diemDen;
    private String tinh;
    private double khoangCach;
    private TuyenDuong tuyenDuong;
    private PhiVanChuyen phiVanChuyen;
    private ThongTinShipper thongTinShipper;
    private String trangThai;

    public VanDonPOJO(){}

    public VanDonPOJO(String id, String maVanDon, Date thoiGianLap, String loaiVanChuyen, String noiTiepNhan,
                      String nguoiThanhToan, ThongTinNguoiGui thongTinNguoiGui, ThongTinNguoiNhan thongTinNguoiNhan,
                      ThongTinTaiXe thongTinTaiXe, ThongTinXe thongTinXe, ThongTinHangHoa thongTinHangHoa,
                      String dienXuatPhat, String diemDen, String tinh, double khoangCach, TuyenDuong tuyenDuong, PhiVanChuyen phiVanChuyen,
                      ThongTinShipper thongTinShipper, String trangThai) {
        this.id = id;
        this.maVanDon = maVanDon;
        this.thoiGianLap = thoiGianLap;
        this.loaiVanChuyen = loaiVanChuyen;
        this.noiTiepNhan = noiTiepNhan;
        this.nguoiThanhToan = nguoiThanhToan;
        this.thongTinNguoiGui = thongTinNguoiGui;
        this.thongTinNguoiNhan = thongTinNguoiNhan;
        this.thongTinTaiXe = thongTinTaiXe;
        this.thongTinXe = thongTinXe;
        this.thongTinHangHoa = thongTinHangHoa;
        this.dienXuatPhat = dienXuatPhat;
        this.diemDen = diemDen;
        this.tinh = tinh;
        this.khoangCach = khoangCach;
        this.tuyenDuong = tuyenDuong;
        this.phiVanChuyen = phiVanChuyen;
        this.thongTinShipper = thongTinShipper;
        this.trangThai = trangThai;
    }

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
        this.dienXuatPhat = vd.dienXuatPhat;
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

    public String getDienXuatPhat() {
        return dienXuatPhat;
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

    public ThongTinShipper getThongTinShipper() {
        return thongTinShipper;
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

    public void setThoiGianLap(Date thoiGianLap) {
        this.thoiGianLap = thoiGianLap;
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

    public void setDienXuatPhat(String dienXuatPhat) {
        this.dienXuatPhat = dienXuatPhat;
    }

    public void setDiemDien(String diemDen){
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


    public class ThongTinNguoiGui {
        private String tenNguoiGui;
        private String sdtNguoiGui;
        private String diaChiNguoiGui;

        public String getTenNguoiGui() {
            return tenNguoiGui;
        }

        public String getSdtNguoiGui() {
            return sdtNguoiGui;
        }

        public String getDiaChiNguoiGui() {
            return diaChiNguoiGui;
        }

        // Setter methods
        public void setTenNguoiGui(String tenNguoiGui) {
            this.tenNguoiGui = tenNguoiGui;
        }

        public void setSdtNguoiGui(String sdtNguoiGui) {
            this.sdtNguoiGui = sdtNguoiGui;
        }

        public void setDiaChiNguoiGui(String diaChiNguoiGui) {
            this.diaChiNguoiGui = diaChiNguoiGui;
        }

    }

    public class ThongTinNguoiNhan {
        private String tenNguoiNhan;
        private String sdtNguoiNhan;
        private String diaChiNguoiNhan;

        public String getTenNguoiNhan() {
            return tenNguoiNhan;
        }

        public String getSdtNguoiNhan() {
            return sdtNguoiNhan;
        }

        public String getDiaChiNguoiNhan() {
            return diaChiNguoiNhan;
        }

        // Setter methods
        public void setTenNguoiNhan(String tenNguoiNhan) {
            this.tenNguoiNhan = tenNguoiNhan;
        }

        public void setSdtNguoiNhan(String sdtNguoiNhan) {
            this.sdtNguoiNhan = sdtNguoiNhan;
        }

        public void setDiaChiNguoiNhan(String diaChiNguoiNhan) {
            this.diaChiNguoiNhan = diaChiNguoiNhan;
        }
    }

    public class ThongTinTaiXe {
        private String maTaiXe;
        private String tenTaiXe;
        private String sdtTaiXe;

        public String getMaTaiXe() {
            return maTaiXe;
        }

        public String getTenTaiXe() {
            return tenTaiXe;
        }

        public String getSdtTaiXe() {
            return sdtTaiXe;
        }

        // Setter methods
        public void setMaTaiXe(String maTaiXe) {
            this.maTaiXe = maTaiXe;
        }

        public void setTenTaiXe(String tenTaiXe) {
            this.tenTaiXe = tenTaiXe;
        }

        public void setSdtTaiXe(String sdtTaiXe) {
            this.sdtTaiXe = sdtTaiXe;
        }

    }

    public class ThongTinXe {
        private String bienSo;
        private String tenXe;
        private String loaiXe;
        private String hangXe;

        public String getBienSo() {
            return bienSo;
        }

        public String getTenXe() {
            return tenXe;
        }

        public String getLoaiXe() {
            return loaiXe;
        }

        public String getHangXe() {
            return hangXe;
        }

        // Setter methods
        public void setBienSo(String bienSo) {
            this.bienSo = bienSo;
        }

        public void setTenXe(String tenXe) {
            this.tenXe = tenXe;
        }

        public void setLoaiXe(String loaiXe) {
            this.loaiXe = loaiXe;
        }

        public void setHangXe(String hangXe) {
            this.hangXe = hangXe;
        }

    }

    public class ThongTinHangHoa {
        private String loaiHang;
        private String tenHang;
        private double trongLuong;
        private KichCo kichCo;
        private int soLuong;

        // Getter methods for ThongTinHangHoa
        public String getLoaiHang() {
            return loaiHang;
        }

        public String getTenHang() {
            return tenHang;
        }

        public double getTrongLuong() {
            return trongLuong;
        }

        public KichCo getKichCo() {
            return kichCo;
        }

        public int getSoLuong() {
            return soLuong;
        }

        // Setter methods for ThongTinHangHoa
        public void setLoaiHang(String loaiHang) {
            this.loaiHang = loaiHang;
        }

        public void setTenHang(String tenHang) {
            this.tenHang = tenHang;
        }

        public void setTrongLuong(double trongLuong) {
            this.trongLuong = trongLuong;
        }

        public void setKichCo(KichCo kichCo) {
            this.kichCo = kichCo;
        }

        public void setSoLuong(int soLuong) {
            this.soLuong = soLuong;
        }

        // Nested class KichCo with its getter and setter methods
        public static class KichCo {
            private double dai;
            private double rong;

            public double getDai() {
                return dai;
            }

            public void setDai(double dai) {
                this.dai = dai;
            }

            public double getRong() {
                return rong;
            }

            public void setRong(double rong) {
                this.rong = rong;
            }
        }
    }

    public class TuyenDuong {
        private String duongDi;
        private double khoangCach;

        // Getter methods
        public String getDuongDi() {
            return duongDi;
        }

        public double getKhoangCach() {
            return khoangCach;
        }

        // Setter methods
        public void setDuongDi(String duongDi) {
            this.duongDi = duongDi;
        }

        public void setKhoangCach(double khoangCach) {
            this.khoangCach = khoangCach;
        }
    }


    public class PhiVanChuyen {
        private double phiCoDinh;
        private double vat;
        private double phiNang;
        private double phiHa;
        private double tongPhi;

        // Getter methods
        public double getPhiCoDinh() {
            return phiCoDinh;
        }

        public double getVat() {
            return vat;
        }

        public double getPhiNang() {
            return phiNang;
        }

        public double getPhiHa() {
            return phiHa;
        }

        public double getTongPhi() {
            return tongPhi;
        }

        // Setter methods
        public void setPhiCoDinh(double phiCoDinh) {
            this.phiCoDinh = phiCoDinh;
        }

        public void setVat(double vat) {
            this.vat = vat;
        }

        public void setPhiNang(double phiNang) {
            this.phiNang = phiNang;
        }

        public void setPhiHa(double phiHa) {
            this.phiHa = phiHa;
        }

        // Consider adding a method to calculate the total cost if needed
        public void tinhTongPhi() {
            tongPhi = phiCoDinh + phiNang + phiHa + (phiCoDinh + phiNang + phiHa) * vat;
        }
    }

    public class ThongTinShipper {
        private String maShipper;
        private String tenShipper;
        private String sdtShipper;

        // Getter methods
        public String getMaShipper() {
            return maShipper;
        }

        public String getTenShipper() {
            return tenShipper;
        }

        public String getSdtShipper() {
            return sdtShipper;
        }

        // Setter methods
        public void setMaShipper(String maShipper) {
            this.maShipper = maShipper;
        }

        public void setTenShipper(String tenShipper) {
            this.tenShipper = tenShipper;
        }

        public void setSdtShipper(String sdtShipper) {
            this.sdtShipper = sdtShipper;
        }
    }

}
