package com.example.demo.POJO;

public class ThongTinHangHoa {
    private String loaiHang;
    private String tenHang;
    private Object trongLuong;
    private KichCo kichCo;
    private int soLuong;

    // Getter methods for ThongTinHangHoa
    public String getLoaiHang() {
        return loaiHang;
    }

    public String getTenHang() {
        return tenHang;
    }

    public String getStringTrongLuong() {
        if (trongLuong instanceof String) {
            return (String) trongLuong;
        } else {
            throw new ClassCastException("Cannot convert weight to String");
        }
    }

    public double getDoubleTrongLuong() {
        if (trongLuong instanceof Double) {
            return (double) trongLuong;
        } else {
            throw new ClassCastException("Cannot convert weight to double");
        }
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

    public void setStringTrongLuong(String value) {
        this.trongLuong = value;
    }

    public void setDoubleTrongLuong(double value) {
        this.trongLuong = value;
    }

    public void setKichCo(KichCo kichCo) {
        this.kichCo = kichCo;
    }

    public void setSoLuong(int soLuong) {
        this.soLuong = soLuong;
    }

    // Nested class KichCo with its getter and setter methods
}

