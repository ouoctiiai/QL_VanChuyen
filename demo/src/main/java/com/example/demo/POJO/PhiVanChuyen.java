package com.example.demo.POJO;

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
