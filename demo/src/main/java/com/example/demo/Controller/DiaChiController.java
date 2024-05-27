package com.example.demo.Controller;

import ch.qos.logback.core.model.Model;
import com.example.demo.DAO.DiaChiDAO;
import com.example.demo.POJO.DiaChiPOJO;
import com.example.demo.POJO.VanDonPOJO;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/diachi")
public class DiaChiController {
    @Autowired
    private DiaChiDAO diaChiDAO;

    @GetMapping("/tinhthanh")
    public ResponseEntity tinhThanh(Model model) {
        List<DiaChiPOJO> dsTinhThanh = diaChiDAO.layTatCaTinhThanh();
        return new ResponseEntity<>(dsTinhThanh, HttpStatus.OK);
    }

    @GetMapping("/quanhuyen/{id}")
    public ResponseEntity quanHuyen(@PathVariable String id) {
        List<DiaChiPOJO.QuanHuyen> dsQuanHuyen = diaChiDAO.timQuanHuyenTheoTinh(id);
        if (dsQuanHuyen != null) {
            return ResponseEntity.ok(dsQuanHuyen);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/phuongxa/{id}")
    public ResponseEntity phuongXa(@PathVariable String id) {
        List<DiaChiPOJO.QuanHuyen.PhuongXa> dsPhuongXa = diaChiDAO.timPhuongXaTheoQuanHuyen(id);
        if (dsPhuongXa != null) {
            return ResponseEntity.ok(dsPhuongXa);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/dsTinhDonNoiTinh")
    public ResponseEntity dsTinhDonNoiTinh(Model model) {
        List<DiaChiPOJO> dsTinhThanh = diaChiDAO.dsTinhDonNoiTinh();
        return new ResponseEntity<>(dsTinhThanh, HttpStatus.OK);
    }


}
