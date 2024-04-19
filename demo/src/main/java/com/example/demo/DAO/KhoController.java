package com.example.demo.DAO;
import com.example.demo.POJO.KhoPOJO;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/kho")
public class KhoController {

    private KhoDAO KhoDAO;

    @GetMapping("/danh-sach")
    public String danhSachKho(Model model) {
        List<KhoPOJO> danhSachKho = KhoDAO.layTatCaKho();
        model.addAttribute("danhSachKho", danhSachKho);
        return "danh-sach-kho"; // Assuming the view template name is "danh-sach-kho.html"
    }
}
