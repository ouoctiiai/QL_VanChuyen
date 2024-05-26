package com.example.demo.Controller;

import com.example.demo.DAO.TaiXeDAO;
import com.example.demo.DAO.VanDonDAO;
import com.example.demo.DAO.XeDAO;
import com.example.demo.POJO.*;
import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@AllArgsConstructor
@RestController
@RequestMapping("/vandon")
public class VanDonCotroller {
    @Autowired
    private VanDonDAO vanDonService;
    private TaiXeDAO taiXeService;
    private XeDAO xeService;
    private VanDonRepository vanDonRepository;

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

    @PostMapping("/create-order")
    public ResponseEntity<VanDonPOJO> createOrder(@RequestBody VanDonPOJO vanDonPOJO) {
        VanDonPOJO newVanDon = vanDonService.themDonHang(vanDonPOJO);
        return ResponseEntity.ok(newVanDon);
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

    @GetMapping("/tongDonHangDaHuy")
    public ResponseEntity<Integer> tinhTongDonHangDaHuy() {
        int tongDonHangDaHuy = vanDonService.tinhTongSoDonHangDaHuy();
        return new ResponseEntity<>(tongDonHangDaHuy, HttpStatus.OK);
    }

    @GetMapping("/tongDonHangChoGiao")
    public ResponseEntity<Integer> tinhTongDonHangChoGiao() {
        int tongDonHangChoGiao = vanDonService.tinhTongSoDonHangChoGiao();
        return new ResponseEntity<>(tongDonHangChoGiao, HttpStatus.OK);
    }

    @GetMapping("/tongDonHangChoXacNhan")
    public ResponseEntity<Integer> tinhTongDonHangChoXN() {
        int tongDonHangChoXN = vanDonService.tinhTongSoDonHangChoXN();
        return new ResponseEntity<>(tongDonHangChoXN, HttpStatus.OK);
    }

    @GetMapping("/tongDonHangDangGiao")
    public ResponseEntity<Integer> tinhTongDonHangDangGiao() {
        int tongDonHangDangGiao = vanDonService.tinhTongSoDonHangDangGiao();
        return new ResponseEntity<>(tongDonHangDangGiao, HttpStatus.OK);
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

    @GetMapping("/phiVAT/{phiCoDinh}/{phiCoc}/{phiNang}/{phiHa}/{phiKhac}")
    public ResponseEntity<Integer> tinhPhiVat(@PathVariable int phiCoDinh, @PathVariable int phiCoc, @PathVariable int phiNang, @PathVariable int phiHa, @PathVariable int phiKhac) {
        int phiVat = vanDonService.tinhPhiVAT(phiCoDinh, phiCoc, phiNang, phiHa, phiKhac);
        return ResponseEntity.ok(phiVat);
    }

    @GetMapping("/tongPhi/{phiCoDinh}/{phiVAT}/{phiCoc}/{phiNang}/{phiHa}/{phiThuong}/{phiKhac}/{khoangCach}/{khoiLuong}/{chieuDai}/{chieuRong}/{loaiHang}/{loaiVanChuyen}")
    public ResponseEntity<Integer> tinhTongPhi(@PathVariable int phiCoDinh, @PathVariable int phiVAT, @PathVariable int phiCoc, @PathVariable int phiNang, @PathVariable int phiHa, @PathVariable int phiThuong, @PathVariable int phiKhac, @PathVariable double khoangCach, @PathVariable double khoiLuong, @PathVariable double chieuDai, @PathVariable double chieuRong, @PathVariable String loaiHang, @PathVariable String loaiVanChuyen) {
        int tongPhi = vanDonService.tinhTongPhi(phiCoDinh, phiVAT, phiCoc, phiNang, phiHa, phiThuong, phiKhac, khoangCach, khoiLuong, chieuDai, chieuRong, loaiHang, loaiVanChuyen);
        return ResponseEntity.ok(tongPhi);
    }

    @PostMapping("/themDonHang")
    public ResponseEntity<VanDonPOJO> themDonHang(@RequestBody VanDonPOJO vanDonPOJO) {
        VanDonPOJO newVanDon = vanDonService.themDonHang(vanDonPOJO);
        return ResponseEntity.ok(newVanDon);
    }

    @GetMapping("/doanh-thu-theo-thang")
    public ResponseEntity<List<Map<String, Object>>> getDoanhThuTheoThang() {
        List<Map<String, Object>> doanhThuTheoThangList = vanDonService.tinhDoanhThuTheoThang();
        return new ResponseEntity<>(doanhThuTheoThangList, HttpStatus.OK);
    }

    @GetMapping("/doanh-thu-theo-nam")
    public ResponseEntity<List<Map<Integer, Integer>>> getDoanhThuTheoNam() {
        try {
            List<Map<Integer, Integer>> tongTienTheoNam = vanDonService.tinhDoanhThuTheoNam();
            return ResponseEntity.ok(tongTienTheoNam);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("danh-sach-don-cho-giao-theo-tinh/{tinh}")
    public ResponseEntity<List<VanDonPOJO>> dsDonChoGiao(@PathVariable String tinh) {
        List<VanDonPOJO> dsvd = vanDonService.danhSachDonNoiTinhChuaGiaoTheoTinh(tinh);
        return new ResponseEntity<>(dsvd, HttpStatus.OK);
    }

    @GetMapping("danh-sach-don-da-giao-cua-shipper/{masp}")
    public ResponseEntity<List<VanDonPOJO>> dsDonCuaShipper(@PathVariable String masp) {
        List<VanDonPOJO> dsvd = vanDonService.lichSuDonCuaShipper(masp);
        return new ResponseEntity<>(dsvd, HttpStatus.OK);
    }

    @GetMapping("/ds/{id}")
    public ResponseEntity quanHuyen(@PathVariable String id) {
        List<VanDonPOJO> ds = vanDonService.dsDonTheoTrangThai(id);
        if (ds != null) {
            return ResponseEntity.ok(ds);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/update/{id}")
    public ResponseEntity updateTrangThai(@PathVariable ObjectId id) {
        VanDonPOJO vd = vanDonService.updateTrangThai(id);
        if (vd != null) {
            return ResponseEntity.ok(vd);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/updateDangGiao/{id}/{maShipper}/{tenShipper}/{sdt}")
    public ResponseEntity updateTrangThaiDangGiao(@PathVariable ObjectId id, @PathVariable String maShipper,  @PathVariable String tenShipper,  @PathVariable String sdt) throws Exception {
        VanDonPOJO vd = vanDonService.updateTrangThaiDangGiao(id, maShipper, tenShipper, sdt);
        if (vd != null) {
            return ResponseEntity.ok(vd);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/updateDaGiao/{id}")
    public ResponseEntity updateTrangThaiDaGiao(@PathVariable ObjectId id) throws Exception {
        VanDonPOJO vd = vanDonService.updateTrangThaiGiaoThanhCong(id);
        if (vd != null) {
            return ResponseEntity.ok(vd);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/tongDonCuaShipper/{masp}")
    public ResponseEntity<Integer> tinhTongDonCuaShipper(@PathVariable String masp) {
        int tongDonHang = vanDonService.tinhTongSoDonCuaShipper(masp);
        return new ResponseEntity<>(tongDonHang, HttpStatus.OK);
    }

    @GetMapping("/TongDonDaGiaoCuaShipper/{masp}")
    public ResponseEntity<Integer> tinhTongDonDaGiaoCuaShipper(@PathVariable String masp) {
        int tongDonHang = vanDonService.tinhTongSoDonDaGiaoCuaShipper(masp);
        return new ResponseEntity<>(tongDonHang, HttpStatus.OK);
    }

    @GetMapping("/TongDonDangGiaoCuaShipper/{masp}")
    public ResponseEntity<Integer> tinhTongDonDangGiaoCuaShipper(@PathVariable String masp) {
        int tongDonHang = vanDonService.tinhTongSoDonDangGiaoCuaShipper(masp);
        return new ResponseEntity<>(tongDonHang, HttpStatus.OK);
    }

    @GetMapping("/TongSoDonCuaShipperTrongThang/{masp}")
    public ResponseEntity<Integer> tinhTongSoDonCuaShipperTrongThang(@PathVariable String masp) {
        int tongDonHang = vanDonService.tinhTongSoDonCuaShipperTrongThang(masp);
        return new ResponseEntity<>(tongDonHang, HttpStatus.OK);
    }

    @GetMapping("/TongSoDonCuaShipperTrongNgay/{masp}")
    public ResponseEntity<Integer> tinhTongSoDonCuaShipperTrongNgay(@PathVariable String masp) {
        int tongDonHang = vanDonService.tinhTongSoDonCuaShipperTrongNgay(masp);
        return new ResponseEntity<>(tongDonHang, HttpStatus.OK);
    }
}
