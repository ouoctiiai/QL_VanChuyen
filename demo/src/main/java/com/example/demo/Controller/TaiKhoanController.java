package com.example.demo.Controller;

import com.example.demo.DAO.ShipperDAO;
import com.example.demo.DAO.TaiKhoanDAO;
import com.example.demo.POJO.TaiKhoanPOJO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/taikhoan")
public class TaiKhoanController {
    @Autowired
    private TaiKhoanDAO taiKhoanService;
    private ShipperDAO shipperService;

    @GetMapping("/danh-sach")
    public ResponseEntity dsTaiKhoan(Model model) {
        List<TaiKhoanPOJO> dstk = taiKhoanService.layTatCaTaiKhoan();
        return new ResponseEntity<>(dstk, HttpStatus.OK);
    }

//    @GetMapping("/tongShipper")
//    public ResponseEntity<Integer> tinhTongShipper() {
//        int tongShipper = shipperService.tinhTongShipper(dsTaiKhoan());
//        return new ResponseEntity<>(tinhTongShipper(), HttpStatus.OK);
//    }
}
