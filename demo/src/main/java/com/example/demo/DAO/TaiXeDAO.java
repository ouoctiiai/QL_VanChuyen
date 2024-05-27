package com.example.demo.DAO;

import com.example.demo.POJO.*;
import com.mongodb.client.MongoCollection;
import org.bson.Document;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.*;


@Service
public class TaiXeDAO {

    private final Connection connection;
    public TaiXeDAO() {
        connection = new Connection("VanDon");
    }

    public List<ThongTinTaiXe> danhSachTaiXe() throws ParseException {
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
                tt.setLuongTaiXe(tinhTongLuongCuaTaiXe(tt.getMaTaiXe()));
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

    public int tinhTongTaiXe() throws ParseException {
        List<ThongTinTaiXe> danhSachTaiXe = danhSachTaiXe();
        Set<String> tx = new HashSet<>();
        for (ThongTinTaiXe taiXe : danhSachTaiXe) {
            tx.add(taiXe.getMaTaiXe());
        }
        return tx.size();
    }



    public Integer tinhTongTienDaNhanCuaTaiXe(String id) throws ParseException {
        PhieuChiDAO dao = new PhieuChiDAO();
        Integer s = 0;
        List<PhieuChiPOJO> ls = dao.lichSuChiChoTaiXe(id);
        for (PhieuChiPOJO p : ls) {
            s += p.getTongTien();
        }
        return s;
    }

    public Integer tinhTongLuongCuaTaiXe(String id) throws ParseException {
        VanDonDAO vd = new VanDonDAO();
        Integer luong = 0;
        List<VanDonPOJO> ls = vd.lichSuDonCuaTaiXe(id);
        for (VanDonPOJO vd1 : ls) {
            PhiVanChuyen p = vd1.getPhiVanChuyen();
            luong += p.getLuongShipperTheoDon();
        }

        luong -= tinhTongTienDaNhanCuaTaiXe(id);
        return luong;
    }
}
