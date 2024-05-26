package com.example.demo.Controller;

import com.example.demo.DAO.TaiKhoanDAO;
import com.example.demo.POJO.TaiKhoanPOJO;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;

@RestController
@RequestMapping("/taikhoan")
@CrossOrigin(origins = "http://localhost:3000")
public class TaiKhoanController {
    @Autowired
    private TaiKhoanDAO taiKhoanService;

    @GetMapping("/danh-sach")
    public ResponseEntity dsTaiKhoan(Model model) throws ParseException {
        List<TaiKhoanPOJO> dstk = taiKhoanService.layTatCaTaiKhoan();
        return new ResponseEntity<>(dstk, HttpStatus.OK);
    }

    @GetMapping("/dsTaiKhoanLaShipper")
    public ResponseEntity dsTaiKhoanLaShipper(Model model) throws ParseException {
        List<TaiKhoanPOJO> ds = taiKhoanService.danhSachTaiKhoanLaShipper();
        return new ResponseEntity<>(ds, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaiKhoanPOJO> getTaiKhoanById(@PathVariable ObjectId id) throws ParseException {
        TaiKhoanPOJO taiKhoan = taiKhoanService.timTaiKhoanTheoId(id);
        if (taiKhoan != null){
            return ResponseEntity.ok(taiKhoan);
        }else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<TaiKhoanPOJO> login(@RequestBody TaiKhoanPOJO loginRequest) throws ParseException {
        System.out.println("Received login request: " + loginRequest);
        TaiKhoanPOJO user = taiKhoanService.timTaiKhoanTheoTenTaiKhoan(loginRequest.getTenTaiKhoan());
//        if(user != null && user.getMatKhau().equals(loginRequest.getMatKhau())){
//            return ResponseEntity.ok(user);
//        }else {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//        }
        if (user != null) {
            System.out.println("Found user: " + user);
            if (user.getMatKhau().equals(loginRequest.getMatKhau())) {
                System.out.println("Login successful for user: " + user.getId());
                return ResponseEntity.ok(user);
            } else {
                System.out.println("Incorrect password for user: " + user.getId());
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } else {
            System.out.println("User not found for username: " + loginRequest.getTenTaiKhoan());  // In ra log nếu không tìm thấy user
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/create")
    public ResponseEntity<TaiKhoanPOJO> taoTaiKhoan(@RequestBody TaiKhoanPOJO taiKhoan){
        boolean check = taiKhoanService.themTaiKhoanMoi(taiKhoan);
        System.out.println(check);
        if(check){
            System.out.println(taiKhoan.getTenTaiKhoan());
            return ResponseEntity.ok(taiKhoan);
        }
        else{
            System.out.println("Loi");

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();}
    }

    @PostMapping("/register")
    public ResponseEntity<TaiKhoanPOJO> createUserCustomer(@RequestBody TaiKhoanPOJO taiKhoanKhachHang){
        TaiKhoanPOJO taiKhoanKH = taiKhoanService.themTaiKhoanKhachHang(taiKhoanKhachHang);
        return ResponseEntity.ok(taiKhoanKH);
    }

    @PostMapping("/update-profile-customer/{id}/{sdt}/{email}/{cccd}/{dc}/{tennh}/{stk}")
    public ResponseEntity updateProfileCustomer(@PathVariable ObjectId id, @PathVariable String sdt, @PathVariable String email, @PathVariable String cccd, @PathVariable String dc, @PathVariable String tennh, @PathVariable String stk){
        TaiKhoanPOJO taiKhoanPOJO = taiKhoanService.updateUserCustomerInfo(id, sdt, email, cccd, dc, tennh, stk);
        return ResponseEntity.ok(taiKhoanPOJO);
    }

    @PostMapping("/updateSP/{id}/{tenChuTK}/{tenTK}/{mk}/{sdt}/{email}/{stk}/{tennh}")
    public ResponseEntity updateTrangThaiDaGiao(@PathVariable ObjectId id, @PathVariable String tenChuTK, @PathVariable String tenTK, @PathVariable String mk, @PathVariable String sdt, @PathVariable String email, @PathVariable String stk, @PathVariable String tennh) throws Exception {
        TaiKhoanPOJO vd = taiKhoanService.updateTaiKhoanShipper(id, tenChuTK, tenTK, mk, sdt, email, stk, tennh);
        if (vd != null) {
            return ResponseEntity.ok(vd);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


}
