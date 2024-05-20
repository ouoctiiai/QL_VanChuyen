package com.example.demo.DAO;

import com.example.demo.POJO.DiaChiPOJO;
import com.example.demo.POJO.KhoPOJO;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import org.bson.Document;
import org.bson.conversions.Bson;
import org.springframework.stereotype.Repository;

import javax.print.Doc;
import java.util.ArrayList;
import java.util.List;

@Repository
public class DiaChiDAO {
    private final Connection connection;

    public DiaChiDAO() {
        connection = new Connection("DiaChi");
    }

    public List<DiaChiPOJO> layTatCaTinhThanh() {
        List<DiaChiPOJO> danhSachtinh = new ArrayList<>();
        MongoCollection<Document> collection = connection.getCollection();
        for (Document doc : collection.find()) {
            DiaChiPOJO dc = convertToDiaChiPOJO(doc);
            danhSachtinh.add(dc);
        }
        return danhSachtinh;
    }

    public List<DiaChiPOJO.QuanHuyen> timQuanHuyenTheoTinh(String maTinh) {
        List<DiaChiPOJO.QuanHuyen> listQuanHuyen = new ArrayList<>();
        MongoCollection<Document> collection = connection.getCollection();
        Bson filter = Filters.eq("idProvince", maTinh);

        for (Document doc : collection.find(filter)) {
            DiaChiPOJO diaChi = convertToDiaChiPOJO(doc);
            List<DiaChiPOJO.QuanHuyen> quanHuyenList = diaChi.getQuanHuyen();
            listQuanHuyen.addAll(quanHuyenList);
        }
        return listQuanHuyen;
    }

    public List<DiaChiPOJO.QuanHuyen.PhuongXa> timPhuongXaTheoQuanHuyen(String maQuanHuyen) {
        List<DiaChiPOJO.QuanHuyen.PhuongXa> listPhuongXa = new ArrayList<>();
        MongoCollection<Document> collection = connection.getCollection();
        Bson filter = Filters.eq("Districts.idDistrict", maQuanHuyen);

        for (Document doc : collection.find(filter)) {
            DiaChiPOJO diaChi = convertToDiaChiPOJO(doc);
            for (DiaChiPOJO.QuanHuyen district : diaChi.getQuanHuyen()) {
                if (district.getMaQuanHuyen().equals(maQuanHuyen)) {
                    listPhuongXa.addAll(district.getPhuongXaList());
                }
            }
        }
        return listPhuongXa;
    }

    // Phương thức để chuyển đổi Document thành DiaChiPOJO
    private DiaChiPOJO convertToDiaChiPOJO(Document doc) {
        DiaChiPOJO dc = new DiaChiPOJO();
        dc.setIdDiaChi(doc.getString("idProvince").toString());
        dc.setName(doc.getString("name"));
        dc.setType(doc.getString("type"));

        // Chuyển đổi danh sách huyện
        List<Document> listQH = doc.getList("Districts", Document.class);
        List<DiaChiPOJO.QuanHuyen> listQuanHuyen = new ArrayList<>();
        for (Document qh : listQH) {
            List<Document> listPX = qh.getList("Communes", Document.class);
            List<DiaChiPOJO.QuanHuyen.PhuongXa> listPhuongXa = new ArrayList<>();
            for (Document px : listPX) {
                DiaChiPOJO.QuanHuyen.PhuongXa phuongxa = new DiaChiPOJO.QuanHuyen.PhuongXa(
                        px.getString("idCommune"),
                        px.getString("name"),
                        px.getString("type")
                );
                listPhuongXa.add(phuongxa);
            }
            DiaChiPOJO.QuanHuyen quanhuyen = new DiaChiPOJO.QuanHuyen(
                    qh.getString("idDistrict"),
                    qh.getString("name"),
                    qh.getString("type")
            );
            quanhuyen.setPhuongXaList(listPhuongXa);
            listQuanHuyen.add(quanhuyen);
        }
        dc.setQuanHuyen(listQuanHuyen);

        return dc;
    }


    // Phương thức để chuyển đổi KhoPOJO thành Document
//    private Document convertToDocument(DiaChiPOJO diaChi) {
//        Document doc = new Document();
//
//        // Chuyển đổi danh sách tỉnh thành
//        List<Document> listTinhThanhDoc = new ArrayList<>();
//        for (DiaChiPOJO.TinhThanh tinhThanh : diaChi.getTinhThanh()) {
//            Document tinhThanhDoc = new Document();
//            tinhThanhDoc.put("maTinhThanh", tinhThanh.getMaTinhThanh());
//            tinhThanhDoc.put("tenTinhThanh", tinhThanh.getTenTinhThanh());
//            listTinhThanhDoc.add(tinhThanhDoc);
//        }
//        doc.put("tinhThanh", listTinhThanhDoc);
//
//        // Chuyển đổi danh sách quận huyện
//        List<Document> listQuanHuyenhDoc = new ArrayList<>();
//        for (DiaChiPOJO.QuanHuyen quanHuyen : diaChi.getQuanHuyen()) {
//            Document quanHuyenDoc = new Document();
//            quanHuyenDoc.put("maTinhThanh", quanHuyen.getMaTinhThanh());
//            quanHuyenDoc.put("maQuanHuyen", quanHuyen.getMaQuanHuyen());
//            quanHuyenDoc.put("tenQuanHuyen", quanHuyen.getTenQuanHuyen());
//            listQuanHuyenhDoc.add(quanHuyenDoc);
//        }
//        doc.put("quanHuyen", listTinhThanhDoc);
//
//        // Chuyển đổi danh sách phường xã
//        List<Document> listPhuongXaDoc = new ArrayList<>();
//        for (DiaChiPOJO.PhuongXa phuongXa : diaChi.getPhuongXa()) {
//            Document phuongXaDoc = new Document();
//            phuongXaDoc.put("maPhuongXa", phuongXa.getMaPhuongXa());
//            phuongXaDoc.put("tenPhuongXa", phuongXa.getTenPhuongXa());
//            listPhuongXaDoc.add(phuongXaDoc);
//        }
//        doc.put("phuongXa", listPhuongXaDoc);
//        return doc;
//
//    }

    // Đóng kết nối cơ sở dữ liệu
    public void dongKetNoi() {
        connection.close();
    }

}
