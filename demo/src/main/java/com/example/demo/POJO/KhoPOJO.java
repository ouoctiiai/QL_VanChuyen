package com.example.demo.POJO;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "TaiKhoan")
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategy.UpperCamelCaseStrategy.class)
public class KhoPOJO {
    @Id
    private String id;           // ID của kho
    private String MaKho;        // Mã kho
    private String DiaChi;       // Địa chỉ của kho
    private String Tinh;         // Tỉnh của kho
    private String KhuVuc;       // Khu vực của kho
    private String LoaiKho;      // Loại kho
    private String sdt;          // Số điện thoại của kho
    private List<KhoLanCan> khoLanCan;

    // Getter và Setter cho các trường
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getMaKho() {
        return MaKho;
    }

    public void setMaKho(String maKho) {
        this.MaKho = maKho;
    }

    public String getDiaChi() {
        return DiaChi;
    }

    public void setDiaChi(String diaChi) {
        this.DiaChi = diaChi;
    }

    public String getTinh() {
        return Tinh;
    }

    public void setTinh(String tinh) {
        this.Tinh = tinh;
    }

    public String getKhuVuc() {
        return KhuVuc;
    }

    public void setKhuVuc(String khuVuc) {
        this.KhuVuc = khuVuc;
    }

    public String getLoaiKho() {
        return LoaiKho;
    }

    public void setLoaiKho(String loaiKho) {
        this.LoaiKho = loaiKho;
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
    @JsonNaming(PropertyNamingStrategy.UpperCamelCaseStrategy.class)
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
