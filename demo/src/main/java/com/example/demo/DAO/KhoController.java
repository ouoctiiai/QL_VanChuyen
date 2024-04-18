package com.example.demo.DAO;

import com.example.demo.DAO.KhoDAO;
import com.example.demo.POJO.KhoPOJO;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Controller
public class KhoController {
    private final KhoDAO khoDAO;

    public KhoController(KhoDAO khoDAO) {
        this.khoDAO = khoDAO;
    }

    // Hiển thị danh sách tất cả các kho
    @GetMapping("/kho")
    public String danhSachKho(Model model) {
        List<KhoPOJO> danhSachKho = khoDAO.layTatCaKho();
        model.addAttribute("danhSachKho", danhSachKho);
        return "danhSachKho";
    }

    // Hiển thị chi tiết của một kho cụ thể
    @GetMapping("/kho/{id}")
    public String chiTietKho(@PathVariable String id, Model model) {
        KhoPOJO kho = khoDAO.timKhoTheoId(id);
        model.addAttribute("kho", kho);
        return "chiTietKho";
    }
}
