package com.example.demo.Controller;

import com.example.demo.DAO.TaiXeDAO;
import com.example.demo.DAO.VanDonDAO;
import com.example.demo.DAO.XeDAO;
import com.example.demo.POJO.ThongTinTaiXe;
import com.example.demo.POJO.ThongTinXe;
import com.example.demo.POJO.VanDonPOJO;
import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@AllArgsConstructor
@RestController
@RequestMapping("/vandon")
public class VanDonCotroller {
    @Autowired
    private VanDonDAO vanDonService;
    private TaiXeDAO taiXeService;
    private XeDAO xeService;

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


    @GetMapping("/{id}")
    public ResponseEntity<VanDonPOJO> getVanDonById(@PathVariable ObjectId id) {
        VanDonPOJO vanDon = vanDonService.timVanDonTheoId(id);
        if (vanDon != null) {
            return ResponseEntity.ok(vanDon);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/dsTaiXe")
    public ResponseEntity<List<ThongTinTaiXe>> danhSachTaiXe() {
        List<ThongTinTaiXe> dsTaiXe = taiXeService.danhSachTaiXe();
        return new ResponseEntity<>(dsTaiXe, HttpStatus.OK);
    }

    @GetMapping("/dsXe")
    public ResponseEntity<List<ThongTinXe>> danhSachXe() {
        List<ThongTinXe> dsXe = xeService.danhSachXe();
        return new ResponseEntity<>(dsXe, HttpStatus.OK);
    }

    @GetMapping("/khoangCach/{dc1}/{dc2}")
    public ResponseEntity<Double> calculateDistance(@PathVariable String dc1, @PathVariable String dc2) {
        Double khoangCach = vanDonService.tinhKhoangCachDonLT(dc1, dc2);
        return ResponseEntity.ok(khoangCach);
    }
}
