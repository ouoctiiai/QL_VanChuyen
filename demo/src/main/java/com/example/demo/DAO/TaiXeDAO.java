package com.example.demo.DAO;

import com.example.demo.POJO.ThongTinTaiXe;
import com.example.demo.POJO.VanDonPOJO;
import com.mongodb.client.MongoCollection;
import org.bson.Document;
import org.springframework.stereotype.Service;

import java.util.*;


@Service
public class TaiXeDAO {

    private final Connection connection;
    public TaiXeDAO() {
        connection = new Connection("VanDon");
    }

    public List<ThongTinTaiXe> danhSachTaiXe() {
        MongoCollection<Document> collection = connection.getCollection();
        List<ThongTinTaiXe> lsTaiXe = new ArrayList<>();
        VanDonDAO vandon = new VanDonDAO();
        List<VanDonPOJO> lsVanDon = vandon.danhSachDonLienTinh();
        for(VanDonPOJO v : lsVanDon)
        {
            ThongTinTaiXe tt = v.getThongTinTaiXe();
            if(!kiemTraTaiXeTonTai(tt,lsTaiXe))
            {
                lsTaiXe.add(tt);
            }
        }
        return lsTaiXe;
    }

    public boolean kiemTraTaiXeTonTai(ThongTinTaiXe tx, List<ThongTinTaiXe> lsTX)
    {
        for (ThongTinTaiXe i : lsTX)
        {
            if(Objects.equals(i.getMaTaiXe(), tx.getMaTaiXe()))
            {
                return true;
            }
        }
        return false;
    }

    public int tinhTongTaiXe() {
        List<ThongTinTaiXe> danhSachTaiXe = danhSachTaiXe();
        Set<String> tx = new HashSet<>();
        for (ThongTinTaiXe taiXe : danhSachTaiXe) {
            tx.add(taiXe.getMaTaiXe());
        }
        return tx.size();
    }
}
