package com.example.demo.DAO;

import com.example.demo.POJO.VanDonPOJO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/vandon")
public class VanDonCotroller {
    @Autowired
    private VanDonService vanDonService;
    @GetMapping("/danh-sach")
    public ResponseEntity<List<VanDonPOJO>> getAllVanDon(){
        return new ResponseEntity<List<VanDonPOJO>>(vanDonService.allVanDons(), HttpStatus.OK);
    }
}
