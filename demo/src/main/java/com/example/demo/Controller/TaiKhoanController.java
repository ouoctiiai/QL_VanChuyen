package com.example.demo.Controller;

import com.example.demo.DAO.ShipperDAO;
import com.example.demo.DAO.TaiKhoanDAO;
import com.example.demo.POJO.TaiKhoanPOJO;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/taikhoan")
@CrossOrigin(origins = "http://localhost:3000")
public class TaiKhoanController {
    @Autowired
    private TaiKhoanDAO taiKhoanService;
    private ShipperDAO shipperService;

    @GetMapping("/danh-sach")
    public ResponseEntity dsTaiKhoan(Model model) {
        List<TaiKhoanPOJO> dstk = taiKhoanService.layTatCaTaiKhoan();
        return new ResponseEntity<>(dstk, HttpStatus.OK);
    }

    @GetMapping("/tongShipper")
    public ResponseEntity tinhTongShipper() {
        int tongShipper = shipperService.tinhTongShipper();
        return new ResponseEntity<>(tongShipper, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaiKhoanPOJO> getTaiKhoanById(@PathVariable ObjectId id) {
        TaiKhoanPOJO taiKhoan = taiKhoanService.timTaiKhoanTheoId(id);
        if (taiKhoan != null){
            return ResponseEntity.ok(taiKhoan);
        }else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<TaiKhoanPOJO> login(@RequestBody TaiKhoanPOJO loginRequest){
        System.out.println("Received login request: " + loginRequest);
        TaiKhoanPOJO user = taiKhoanService.timTaiKhoanTheoSDT(loginRequest.getSdt());
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
            System.out.println("User not found for phone number: " + loginRequest.getSdt());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
