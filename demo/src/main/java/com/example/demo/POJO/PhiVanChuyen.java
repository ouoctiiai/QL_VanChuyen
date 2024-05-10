package com.example.demo.POJO;

public class PhiVanChuyen {
    private Integer phiCoDinh;
    private Integer vat;
    private Integer phiNang;
    private Integer phiHa;
    private Integer phiCoc;
    private Integer thuongShipper;
    private Integer phiKhac;
    private Integer tongPhi;


    // Getter methods
    public Integer getPhiCoDinh() {
        return phiCoDinh;
    }

    public Integer getVat() {
        return vat;
    }

    public Integer getPhiNang() {
        return phiNang;
    }

    public Integer getPhiHa() {
        return phiHa;
    }

    public Integer getTongPhi() {
        return tongPhi;
    }

    public Integer getPhiCoc() {return phiCoc;}

    public Integer getPhiKhac() {
        return phiKhac;
    }

    public Integer getThuongShipper() {
        return thuongShipper;
    }

    // Setter methods
    public void setPhiCoDinh(Integer phiCoDinh) {
        this.phiCoDinh = phiCoDinh;
    }

    public void setVat(Integer vat) {
        this.vat = vat;
    }

    public void setPhiNang(Integer phiNang) {
        this.phiNang = phiNang;
    }

    public void setPhiHa(Integer phiHa) {
        this.phiHa = phiHa;
    }

    public void setTongPhi(Integer tongPhi) { this.tongPhi = tongPhi; }

    public void setPhiCoc(Integer phiCoc) { this.phiCoc = phiCoc; }

    public void setPhiKhac(Integer phiKhac) {this.phiKhac = phiKhac; }

    public void setThuongShipper(Integer thuongShipper) {this.thuongShipper = thuongShipper; }


    // Consider adding a method to calculate the total cost if needed
    public void tinhTongPhi() {
        tongPhi = phiCoDinh + phiNang + phiHa + (phiCoDinh + phiNang + phiHa) * vat;
    }
}
