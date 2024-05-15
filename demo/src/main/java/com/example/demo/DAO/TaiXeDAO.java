package com.example.demo.DAO;

import com.example.demo.POJO.ThongTinTaiXe;
import com.example.demo.POJO.VanDonPOJO;
import com.mongodb.client.MongoCollection;
import org.bson.Document;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class TaiXeDAO {
    private final Connection connection;
    public TaiXeDAO() {
        connection = new Connection("VanDon");
    }
    public List<ThongTinTaiXe> danhSachTaiXe() {
        List<ThongTinTaiXe> dsTaiXe = new ArrayList<>();
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
        return dsTaiXe;
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

}
