package com.example.demo.POJO;

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
}

