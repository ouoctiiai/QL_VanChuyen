package com.example.demo.DAO;

import com.example.demo.POJO.KhoPOJO;
import com.example.demo.POJO.TaiKhoanPOJO;
import com.example.demo.POJO.VanDonPOJO;
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
    private TaiKhoanService taiKhoanService;

    @GetMapping("/danh-sach")
    public ResponseEntity dsTaiKhoan(Model model) {
        List<TaiKhoanPOJO> dstk = taiKhoanService.layTatCaTaiKhoan();
        return new ResponseEntity<>(dstk, HttpStatus.OK);
    }
}
