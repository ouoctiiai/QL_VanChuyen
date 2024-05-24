package com.example.demo.POJO;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Getter
@Setter
@JsonNaming(PropertyNamingStrategy.UpperCamelCaseStrategy.class)
@Document(collection = "PhieuChi")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PhieuChiPOJO {
    @Id
    private String id;
    private  String loaiPhieuChi;
    private  double tongTien;
    private ThongTinTaiXe thongTinTaiXe;
    private ThongTinShipper thongTinShipper;
    private Date thoiGianLap;


}
