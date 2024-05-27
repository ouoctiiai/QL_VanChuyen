import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:4433/diachi'

export const listTinhThanh = () => axios.get(REST_API_BASE_URL + '/tinhthanh');

export const listQuanHuyenTheoTinhThanh = (idTinhThanh) => axios.get(REST_API_BASE_URL + '/quanhuyen/' + idTinhThanh);

export const listPhuongXaTheoQuanHuyen = (idQuanHuyen) => axios.get(REST_API_BASE_URL + '/phuongxa/' + idQuanHuyen)

export const dsTinhDonNoiTinh = () => axios.get(REST_API_BASE_URL + '/dsTinhDonNoiTinh');