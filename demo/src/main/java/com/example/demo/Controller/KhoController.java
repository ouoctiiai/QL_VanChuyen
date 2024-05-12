package com.example.demo.Controller;
import com.example.demo.DAO.KhoDAO;
import com.example.demo.POJO.KhoPOJO;
import com.example.demo.POJO.VanDonPOJO;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/kho")
public class KhoController {

    @Autowired
    private KhoDAO khoDAO;

    @GetMapping("/danh-sach")
    public ResponseEntity danhSachKho(Model model) {
        List<KhoPOJO> danhSachKho = khoDAO.layTatCaKho();
        return new ResponseEntity<>(danhSachKho, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<KhoPOJO> getKhoById(@PathVariable ObjectId id) {
        KhoPOJO kho = khoDAO.timKhoTheoId(id);
        if (kho != null) {
            return ResponseEntity.ok(kho);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
