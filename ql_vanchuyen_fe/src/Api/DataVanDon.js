import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:4433/vandon';

export const listVanDon = () => axios.get(REST_API_BASE_URL + '/danh-sach');

export const getVanDonById = (employeeId) => axios.get(REST_API_BASE_URL + '/' + employeeId);

export const listTaiXe = () => axios.get(REST_API_BASE_URL + '/dsTaiXe');

export const listXe = () => axios.get(REST_API_BASE_URL + '/dsXe');

export const listNoiTinh = () => axios.get(REST_API_BASE_URL + '/dsDonNoiTinh');

export const listNgoaiTinh = () => axios.get(REST_API_BASE_URL + '/dsDonLienTinh');

export const tinhKhoangCachLienTinh = (dc1, dc2) => axios.get(`${REST_API_BASE_URL}/khoangCach/${dc1}/${dc2}`);

export const get10RecentOrders = () => axios.get(REST_API_BASE_URL + '/10donGanNhat');

export const getTongTaiXe = () => axios.get(REST_API_BASE_URL + '/tongTaiXe');

export const getTongXe = () => axios.get(REST_API_BASE_URL + '/tongXe');

export const getTongDonHangThanhCong = () => axios.get(REST_API_BASE_URL + '/tongDonHangThanhCong');

export const getTongDonHang = () => axios.get(REST_API_BASE_URL + '/tongDonHang');

export const createOrder = (dataOrder) => axios.post(REST_API_BASE_URL + '/create-order', dataOrder);

export const tinhPhiVat = (phiCoDinh, phiCoc, phiNang, phiHa, phiKhac) => 
    axios.get(`${REST_API_BASE_URL}/phiVAT/${phiCoDinh}/${phiCoc}/${phiNang}/${phiHa}/${phiKhac}`);

export const tinhTongPhi = (phiCoDinh, phiVAT, phiCoc, phiNang, phiHa, phiThuong, phiKhac, khoangCach, khoiLuong, chieuDai, chieuRong, loaiHang, loaiVanChuyen) =>  
    axios.get(`${REST_API_BASE_URL}/tongPhi/${phiCoDinh}/${phiVAT}/${phiCoc}/${phiNang}/${phiHa}/${phiThuong}/${phiKhac}/${khoangCach}/${khoiLuong}/${chieuDai}/${chieuRong}/${loaiHang}/${loaiVanChuyen}`);

export const getTongDonHangDaHuy = () => axios.get(REST_API_BASE_URL + '/tongDonHangDaHuy');

export const getTongDonHangChoGiao = () => axios.get(REST_API_BASE_URL + '/tongDonHangChoGiao');

export const getTongDonHangDangGiao = () => axios.get(REST_API_BASE_URL + '/tongDonHangDangGiao');

export const getTongDonHangChoXN = () => axios.get(REST_API_BASE_URL + '/tongDonHangChoXacNhan');

export const themDonHang = (vanDonMoi) => axios.post(REST_API_BASE_URL + '/themDonHang', vanDonMoi);

export const getDoanhThuNam = () => axios.get(REST_API_BASE_URL + '/doanh-thu-theo-nam');

export const getDoanhThuThang = () => axios.get(REST_API_BASE_URL + '/doanh-thu-theo-thang');

export const listDonChoTheoTinh = (tinh) => axios.get(REST_API_BASE_URL + '/danh-sach-don-cho-giao-theo-tinh/' + tinh);

export const lichSuDonCuaShipper = (maShipper) => axios.get(REST_API_BASE_URL + '/danh-sach-don-da-giao-cua-shipper/' + maShipper);

export const listTheoTrangThai = (tt) => axios.get(REST_API_BASE_URL + '/ds' + '/' + tt);

export const updateTrangThai = (id) => axios.post(REST_API_BASE_URL + '/update' + '/' + id);

export const getTongDonCuaShipper = (maShipper) => axios.get(REST_API_BASE_URL + '/tongDonCuaShipper/' + maShipper);

export const getTongDonDaGiaoCuaShipper = (maShipper) => axios.get(REST_API_BASE_URL + '/TongDonDaGiaoCuaShipper/' + maShipper);

export const getTongDonDangGiaoCuaShipper = (maShipper) => axios.get(REST_API_BASE_URL + '/TongDonDangGiaoCuaShipper/' + maShipper);

export const getTongSoDonCuaShipperTrongThang = (maShipper) => axios.get(REST_API_BASE_URL + '/TongSoDonCuaShipperTrongThang/' + maShipper);

export const getTongSoDonCuaShipperTrongNgay = (maShipper) => axios.get(REST_API_BASE_URL + '/TongSoDonCuaShipperTrongNgay/' + maShipper);