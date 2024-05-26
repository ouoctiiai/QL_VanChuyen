package com.example.demo.Controller;

import com.example.demo.DAO.PhieuChiDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import com.example.demo.POJO.PhieuChiPOJO;

import java.text.ParseException;
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
    public ResponseEntity ds(Model model) throws ParseException {
        List<PhieuChiPOJO> danhSachPhieuChi = null;
        try {
            danhSachPhieuChi = phieuChiService.loadDanhSachPhieuChi();
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
        return new ResponseEntity<>(danhSachPhieuChi, HttpStatus.OK);
    }

    @GetMapping("/pc_chiphixe")
    public ResponseEntity<List<Map<Integer, Integer>>> tinhTongTienChiPhiXeTheoNam() {
        try {
            List<Map<Integer, Integer>> tongTienTheoNam = phieuChiService.tinhTongChiPhiXeTheoNam();
            return ResponseEntity.ok(tongTienTheoNam);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/pc_chiphinhienlieu")
    public ResponseEntity<List<Map<Integer, Integer>>> tinhTongTienChiPhiNhienLieuTheoNam() {
        try {
            List<Map<Integer, Integer>> tongTienTheoNam = phieuChiService.tinhTongChiPhiNhienLieuTheoNam();
            return ResponseEntity.ok(tongTienTheoNam);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/pc_chiphithietbi")
    public ResponseEntity<List<Map<Integer, Integer>>> tinhTongTienChiPhiThietBiTheoNam() {
        try {
            List<Map<Integer, Integer>> tongTienTheoNam = phieuChiService.tinhTongChiPhiThietBiTheoNam();
            return ResponseEntity.ok(tongTienTheoNam);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/pc_luongshipper")
    public ResponseEntity<List<Map<Integer, Integer>>> tinhTongTienLuongShipperTheoNam() {
        try {
            List<Map<Integer, Integer>> tongTienTheoNam = phieuChiService.tinhTongLuongShipperTheoNam();
            return ResponseEntity.ok(tongTienTheoNam);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/pc_luongtaixe")
    public ResponseEntity<List<Map<Integer, Integer>>> tinhTongTienLuongTXTheoNam() {
        try {
            List<Map<Integer, Integer>> tongTienTheoNam = phieuChiService.tinhTongLuongTXTheoNam();
            return ResponseEntity.ok(tongTienTheoNam);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/phieuchinam")
    public ResponseEntity<List<Map<Integer, Integer>>> tinhTongTienPhieuChiTheoNam() {
        try {
            List<Map<Integer, Integer>> tongTienTheoNam = phieuChiService.tinhTongPhieuChiTheoNam();
            return ResponseEntity.ok(tongTienTheoNam);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

}
