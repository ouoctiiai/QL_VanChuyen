package com.example.demo.POJO;

public class ThongTinTaiKhoan {

    private String tenNganHang;
    private String soTaiKhoan;

    // Constructor with parameters
    public ThongTinTaiKhoan(String tenNganHang, String soTaiKhoan) {
        this.tenNganHang = tenNganHang;
        this.soTaiKhoan = soTaiKhoan;
    }

    public ThongTinTaiKhoan(){}

    // Getter for tenNganHang
    public String getTenNganHang() {
        return tenNganHang;
    }

    // Setter for tenNganHang
    public void setTenNganHang(String tenNganHang) {
        this.tenNganHang = tenNganHang;
    }

    // Getter for soTaiKhoan
    public String getSoTaiKhoan() {
        return soTaiKhoan;
    }

    // Setter for soTaiKhoan
    public void setSoTaiKhoan(String soTaiKhoan) {
        this.soTaiKhoan = soTaiKhoan;
    }
}
