package com.example.demo.POJO;

import org.bson.types.ObjectId;

public class PhiVanChuyen {
    private Integer phiCoDinh;
    private Integer vat;
    private Integer phiNang;
    private Integer phiHa;
    private Integer phiCoc;
    private Integer thuongShipper;
    private Integer phiKhac;
    private Integer tongPhi;
    private Integer luongShipperTheoDon;


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

    public Integer getLuongShipperTheoDon(){return luongShipperTheoDon;}

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

    public void setLuongShipperTheoDon(){
        this.luongShipperTheoDon = tinhLuongTheoDon();
    }

    public Integer tinhLuongTheoDon()
    {
        Integer phi = this.tongPhi * 35 / 100;
        if(this.thuongShipper != null)
        {
            phi += this.thuongShipper;
        }
        return  phi;
    }

}
