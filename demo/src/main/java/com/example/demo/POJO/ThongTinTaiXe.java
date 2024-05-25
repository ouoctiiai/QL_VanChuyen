package com.example.demo.POJO;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ThongTinTaiXe {
    // Setter methods
    private String maTaiXe;
    private String tenTaiXe;
    private String sdtTaiXe;
    private Integer luongTaiXe;

    public void setLuongTaiXe(Integer luongTaiXe){
        this.luongTaiXe = luongTaiXe;
    }
}
