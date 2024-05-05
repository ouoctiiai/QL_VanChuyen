package com.example.demo.DAO;
import com.example.demo.POJO.KhoPOJO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/kho")
public class KhoController {

    @Autowired
    private KhoDAO KhoDAO;

    @GetMapping("/danh-sach")
    public ResponseEntity danhSachKho(Model model) {
        List<KhoPOJO> danhSachKho = KhoDAO.layTatCaKho();
//        model.addAttribute("danhSachKho", danhSachKho);
//        return "danhSachKho"; // Assuming the view template name is "danh-sach-kho.html"
        return new ResponseEntity<>(danhSachKho, HttpStatus.OK);
    }
}
