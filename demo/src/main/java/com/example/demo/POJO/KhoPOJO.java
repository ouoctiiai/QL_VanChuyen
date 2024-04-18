package com.example.demo.POJO;

import java.util.List;

public class KhoPOJO {
    private String id;           // ID của kho
    private String maKho;        // Mã kho
    private String diaChi;       // Địa chỉ của kho
    private String tinh;         // Tỉnh của kho
    private String khuVuc;       // Khu vực của kho
    private String loaiKho;      // Loại kho
    private String sdt;          // Số điện thoại của kho

    // Kho lân cận là một mảng các kho xung quanh bao gồm thông tin mã kho và khoảng cách giữa chúng
    private List<KhoLanCan> khoLanCan;

    // Getter và Setter cho các trường
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getMaKho() {
        return maKho;
    }

    public void setMaKho(String maKho) {
        this.maKho = maKho;
    }

    public String getDiaChi() {
        return diaChi;
    }

    public void setDiaChi(String diaChi) {
        this.diaChi = diaChi;
    }

    public String getTinh() {
        return tinh;
    }

    public void setTinh(String tinh) {
        this.tinh = tinh;
    }

    public String getKhuVuc() {
        return khuVuc;
    }

    public void setKhuVuc(String khuVuc) {
        this.khuVuc = khuVuc;
    }

    public String getLoaiKho() {
        return loaiKho;
    }

    public void setLoaiKho(String loaiKho) {
        this.loaiKho = loaiKho;
    }

    public String getSdt() {
        return sdt;
    }

    public void setSdt(String sdt) {
        this.sdt = sdt;
    }

    public List<KhoLanCan> getKhoLanCan() {
        return khoLanCan;
    }

    public void setKhoLanCan(List<KhoLanCan> khoLanCan) {
        this.khoLanCan = khoLanCan;
    }

    // Class KhoLanCan là lớp con để đại diện cho thông tin mã kho và khoảng cách giữa chúng
    public static class KhoLanCan {
        private String maKho;    // Mã kho lân cận
        private double khoangCach;  // Khoảng cách giữa kho hiện tại và kho lân cận

        // Constructor
        public KhoLanCan(String maKho, double khoangCach) {
            this.maKho = maKho;
            this.khoangCach = khoangCach;
        }

        // Getter và Setter
        public String getMaKho() {
            return maKho;
        }

        public void setMaKho(String maKho) {
            this.maKho = maKho;
        }

        public double getKhoangCach() {
            return khoangCach;
        }

        public void setKhoangCach(double khoangCach) {
            this.khoangCach = khoangCach;
        }
    }
}
