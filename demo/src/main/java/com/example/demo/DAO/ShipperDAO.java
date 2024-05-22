package com.example.demo.DAO;

import com.example.demo.POJO.ThongTinShipper;
import com.example.demo.POJO.TaiKhoanPOJO;
import com.mongodb.client.MongoCollection;
import org.bson.Document;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ShipperDAO {

    private final Connection connection;

    public ShipperDAO() {
        connection = new Connection("TaiKhoan");
    }

    public int tinhTongShipper(List<TaiKhoanPOJO> danhSachTaiKhoan) {
        int tongShipper = 0;
        for (TaiKhoanPOJO taiKhoan : danhSachTaiKhoan) {
            if ("Shipper".equals(taiKhoan.getLoaiTaiKhoan())) {
                tongShipper++;
            }
        }
        return tongShipper;
    }


}
