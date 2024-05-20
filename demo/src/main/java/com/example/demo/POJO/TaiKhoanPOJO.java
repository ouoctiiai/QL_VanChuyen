package com.example.demo.POJO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "TaiKhoan")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaiKhoanPOJO {
    @Id
    private String id;
    private String loaiTaiKhoan;
    private String tenTaiKhoan;
    private String tenChuTaiKhoan;
    private String sdt;
    private String email;
    private String soCCCD;
    private String matKhau;
    private String diaChi;
    private ThongTinTaiKhoan thongTinTaiKhoan;
    private String maShipper;
    private Integer tongTienCong;

    // Constructor cho tài khoản khách hàng
    public TaiKhoanPOJO(String loaiTaiKhoan, String tenTaiKhoan, String tenChuTaiKhoan,
                    String sdt, String email, String matKhau, String diaChi,
                        ThongTinTaiKhoan thongTinTaiKhoan) {
        this.loaiTaiKhoan = loaiTaiKhoan;
        this.tenTaiKhoan = tenTaiKhoan;
        this.tenChuTaiKhoan = tenChuTaiKhoan;
        this.sdt = sdt;
        this.email = email;
        this.matKhau = matKhau;
        this.diaChi = diaChi;
        this.thongTinTaiKhoan = thongTinTaiKhoan;
    }

    // Constructor cho tài khoản shipper (có thêm thông tin mã shipper và tổng tiền công)
    public TaiKhoanPOJO(String loaiTaiKhoan, String tenTaiKhoan, String tenChuTaiKhoan,
                    String sdt, String email, String soCCCD, String matKhau, String diaChi,
                    ThongTinTaiKhoan thongTinTaiKhoan, String maShipper, int tongTienCong) {
        this(loaiTaiKhoan, tenTaiKhoan, tenChuTaiKhoan, sdt, email, matKhau, diaChi, thongTinTaiKhoan);
        this.soCCCD = soCCCD;
        this.maShipper = maShipper;
        this.tongTienCong = tongTienCong;
    }



    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLoaiTaiKhoan() {
        return loaiTaiKhoan;
    }

    public void setLoaiTaiKhoan(String loaiTaiKhoan) {
        this.loaiTaiKhoan = loaiTaiKhoan;
    }

    public String getTenTaiKhoan() {
        return tenTaiKhoan;
    }

    public void setTenTaiKhoan(String tenTaiKhoan) {
        this.tenTaiKhoan = tenTaiKhoan;
    }

    public String getTenChuTaiKhoan() {
        return tenChuTaiKhoan;
    }

    public void setTenChuTaiKhoan(String tenChuTaiKhoan) {
        this.tenChuTaiKhoan = tenChuTaiKhoan;
    }

    public String getSdt() {
        return sdt;
    }

    public void setSdt(String sdt) {
        this.sdt = sdt;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSoCCCD() {
        return soCCCD;
    }

    public void setSoCCCD(String soCCCD) {
        this.soCCCD = soCCCD;
    }

    public String getMatKhau() {
        return matKhau;
    }

    public void setMatKhau(String matKhau) {
        this.matKhau = matKhau;
    }

    public String getDiaChi() {
        return diaChi;
    }

    public void setDiaChi(String diaChi) {
        this.diaChi = diaChi;
    }

    public ThongTinTaiKhoan getThongTinTaKhoan() {
        return thongTinTaiKhoan;
    }

    public void setThongTinTaiKhoan(ThongTinTaiKhoan thongTinTaiKhoan) {
        this.thongTinTaiKhoan = thongTinTaiKhoan;
    }

    public String getMaShipper() {
        return maShipper;
    }

    public void setMaShipper(String maShipper) {
        this.maShipper = maShipper;
    }

    public Integer getTongTienCong() {
        return tongTienCong;
    }

    public void setTongTienCong(Integer tongTienCong) {
        this.tongTienCong = tongTienCong;
    }


}
