package com.example.demo.Controller;

import com.example.demo.DAO.PhieuChiDAO;
import com.example.demo.DAO.TaiKhoanDAO;
import com.example.demo.POJO.VanDonPOJO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.POJO.PhieuChiPOJO;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/phieuchi")
@CrossOrigin(origins = "http://localhost:3000")
public class PhieuChiController {
    @Autowired
    private PhieuChiDAO phieuChiService;

    @PostMapping("/taophieuchi")
    public ResponseEntity<String> taoPhieuChi(@RequestBody PhieuChiPOJO phieuChiPOJO) {
        try {
            phieuChiService.themPhieuChi(phieuChiPOJO);
            return ResponseEntity.ok("Tạo phiếu thành công!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi: " + e.getMessage());
        }
    }
    @GetMapping("/danhsachphieuchi")
    public ResponseEntity<List<PhieuChiPOJO>> loadDanhSachPhieuChi() {
        try {
            List<PhieuChiPOJO> danhSachPhieuChi = phieuChiService.loadAllPhieuChi();
            return ResponseEntity.ok(danhSachPhieuChi);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

//    @GetMapping("/tongtienphieuchi")
//    public ResponseEntity<Map<Integer, Double>> tinhTongTienTraLuongShipperTheoNam(@RequestParam int nam) {
//        try {
//            List<PhieuChiPOJO> danhSachPhieuChi = phieuChiService.loadDanhSachPhieuChi();
//            Map<Integer, Double> tongTienTheoNam = tinhTongTienTraLuongShipperTheoNam(danhSachPhieuChi);
//            return ResponseEntity.ok(tongTienTheoNam);
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body(null);
//        }
//    }



}
