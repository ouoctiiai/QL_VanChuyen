package com.example.demo.DAO;

import com.example.demo.POJO.ThongTinXe;
import com.example.demo.POJO.VanDonPOJO;
import com.mongodb.client.MongoCollection;
import org.bson.Document;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;


@Service
public class XeDAO {

    private final Connection connection;
    public XeDAO() {
        connection = new Connection("VanDon");
    }

    public List<ThongTinXe> danhSachXe() {
        MongoCollection<Document> collection = connection.getCollection();
        List<ThongTinXe> lsXe = new ArrayList<>();
        VanDonDAO vandon = new VanDonDAO();
        List<VanDonPOJO> lsVanDon = vandon.danhSachDonLienTinh();
        for(VanDonPOJO v : lsVanDon)
        {
            ThongTinXe tt = v.getThongTinXe();
            if(!kiemTraXeTonTai(tt,lsXe))
            {
                lsXe.add(tt);
            }
        }
        return lsXe;
    }

    public boolean kiemTraXeTonTai(ThongTinXe tx, List<ThongTinXe> lsTX)
    {
        for (ThongTinXe i : lsTX)
        {
            if(Objects.equals(i.getBienSo(), tx.getBienSo()))
            {
                return true;
            }
        }
        return false;
    }

    public int tinhTongXe() {
        List<ThongTinXe> danhSachXe = danhSachXe();
        return danhSachXe.size();
    }
}
