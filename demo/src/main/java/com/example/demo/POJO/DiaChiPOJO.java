package com.example.demo.POJO;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.web.context.annotation.ApplicationScope;

import java.util.Date;
import java.util.List;

@Document(collection = "DiaChi")
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategy.UpperCamelCaseStrategy.class)
public class DiaChiPOJO {
    @Id
    private String idDiaChi;
    private String name;
    private String type;
    private List<QuanHuyen> quanHuyenList;

    public String getIdDiaChi() {
        return idDiaChi;
    }

    public void setIdDiaChi(String idDiaChi) {
        this.idDiaChi = idDiaChi;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<QuanHuyen> getQuanHuyen() {
        return quanHuyenList;
    }

    public void setQuanHuyen(List<QuanHuyen> quanHuyen) {
        this.quanHuyenList = quanHuyen;
    }

    @JsonNaming(PropertyNamingStrategy.UpperCamelCaseStrategy.class)
    public static class QuanHuyen{
        public String maQuanHuyen;
        public String tenQuanHuyen;
        public String typeQuanHuyen;
        public List<PhuongXa> phuongXaList;

        public List<PhuongXa> getPhuongXaList() {
            return phuongXaList;
        }

        public void setPhuongXaList(List<PhuongXa> phuongXaList) {
            this.phuongXaList = phuongXaList;
        }

        public String getMaQuanHuyen() {
            return maQuanHuyen;
        }

        public void setMaQuanHuyen(String maQuanHuyen) {
            this.maQuanHuyen = maQuanHuyen;
        }

        public String getTenQuanHuyen() {
            return tenQuanHuyen;
        }

        public void setTenQuanHuyen(String tenQuanHuyen) {
            this.tenQuanHuyen = tenQuanHuyen;
        }

        public String getTypeQuanHuyen() {
            return typeQuanHuyen;
        }

        public void setTypeQuanHuyen(String typeQuanHuyen) {
            this.typeQuanHuyen = typeQuanHuyen;
        }

        public QuanHuyen(String maQuanHuyen, String tenQuanHuyen, String typeQuanHuyen) {
            this.typeQuanHuyen = typeQuanHuyen;
            this.maQuanHuyen = maQuanHuyen;
            this.tenQuanHuyen = tenQuanHuyen;
        }

        public QuanHuyen(){}

        public static class PhuongXa{
            public String maPhuongXa;
            public String tenPhuongXa;
            public String typePhuongXa;

            public String getMaPhuongXa() {
                return maPhuongXa;
            }

            public void setMaPhuongXa(String maPhuongXa) {
                this.maPhuongXa = maPhuongXa;
            }

            public String getTenPhuongXa() {
                return tenPhuongXa;
            }

            public void setTenPhuongXa(String tenPhuongXa) {
                this.tenPhuongXa = tenPhuongXa;
            }

            public PhuongXa(String maPhuongXa, String tenPhuongXa, String typePhuongXa) {
                this.maPhuongXa = maPhuongXa;
                this.tenPhuongXa = tenPhuongXa;
                this.typePhuongXa = typePhuongXa;
            }

            public PhuongXa(){}
        }
    }
}
