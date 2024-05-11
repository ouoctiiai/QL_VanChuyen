package com.example.demo.Controller;

import com.example.demo.DAO.VanDonDAO;
import com.example.demo.POJO.VanDonPOJO;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/vandon")
public class VanDonCotroller {
    @Autowired
    private VanDonDAO vanDonService;

    @GetMapping("/danh-sach")
    public ResponseEntity ds(Model model) {
        List<VanDonPOJO> dsvd = vanDonService.allVanDon();
        return new ResponseEntity<>(dsvd, HttpStatus.OK);
    }

    @GetMapping("/dsDonNoiTinh")
    public ResponseEntity dsDonNoiTinh(Model model) {
        List<VanDonPOJO> dsvd = vanDonService.danhSachDonNoiTinh();
        return new ResponseEntity<>(dsvd, HttpStatus.OK);
    }

    @GetMapping("/dsDonLienTinh")
    public ResponseEntity dsDonLienTinh(Model model) {
        List<VanDonPOJO> dsvd = vanDonService.danhSachDonLienTinh();
        return new ResponseEntity<>(dsvd, HttpStatus.OK);
    }
}
