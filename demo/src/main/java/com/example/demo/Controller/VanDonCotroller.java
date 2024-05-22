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

@CrossOrigin("*")
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

//    @GetMapping("/{maVanDon}")
//    public ResponseEntity<VanDonPOJO> getVanDonByMaVanDon(@PathVariable ObjectId id) {
//        VanDonPOJO vanDon = vanDonService.timVanDonTheoId(id);
//        if (vanDon != null) {
//            return ResponseEntity.ok(vanDon);
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }

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

    @GetMapping("/tongTaiXe")
    public ResponseEntity<Integer> tinhTongTaiXe() {
        int tongTaiXe = taiXeService.tinhTongTaiXe();
        return new ResponseEntity<>(tongTaiXe, HttpStatus.OK);
    }

    @GetMapping("/tongXe")
    public ResponseEntity<Integer> tinhTongXe() {
        int tongXe = xeService.tinhTongXe();
        return new ResponseEntity<>(tongXe, HttpStatus.OK);
    }

    @GetMapping("/tongDonHangThanhCong")
    public ResponseEntity<Integer> tinhTongDonHangThanhCong() {
        int tongDonHangThanhCong = vanDonService.tinhTongSoDonHangThanhCong();
        return new ResponseEntity<>(tongDonHangThanhCong, HttpStatus.OK);
    }

    @GetMapping("/tongDonHang")
    public ResponseEntity<Integer> tinhTongDonHang() {
        int tongDonHang = vanDonService.tinhTongDonHang();
        return new ResponseEntity<>(tongDonHang, HttpStatus.OK);
    }

    @GetMapping("/10donGanNhat")
    public ResponseEntity<List<VanDonPOJO>> get10RecentOrders() {
        List<VanDonPOJO> dsvd = vanDonService.danhSach10DonGanDayNhat();
        return new ResponseEntity<>(dsvd, HttpStatus.OK);
    }
}
