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
    private  int tongTien;
    private ThongTinTaiXe thongTinTaiXe;
    private ThongTinShipper thongTinShipper;
    private Date thoiGianLap;
    private String thoiGianLapToString;

    public void setThoiGianLap(Date thoiGianLap) throws ParseException {
        this.thoiGianLap = thoiGianLap;
        this.thoiGianLapToString = getDateFromISO(thoiGianLap);
    }

    public static String getDateFromISO(Date isoDate) throws ParseException {
        SimpleDateFormat newFormatter = new SimpleDateFormat("yyyy-MM-dd");
        String formattedDate = newFormatter.format(isoDate);
        return formattedDate;
    }

}
