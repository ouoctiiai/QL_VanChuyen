import axios from "axios";

const URL = "http://localhost:4433/phieuchi";

export const taoPhieuChi = async (Data) => axios.post(URL + '/taophieuchi', Data);

export const listPhieuChi = () => axios.get(URL + '/danhsachphieuchi');

export const getChiPhiXeData = () => axios.get(URL + '/pc_chiphixe');

export const getChiPhiNhienLieuData = () => axios.get(URL + '/pc_chiphinhienlieu');

export const getChiPhiThietBiData = () => axios.get(URL + '/pc_chiphithietbi');

export const getLuongShipperData = () => axios.get(URL + '/pc_luongshipper');

export const getLuongTaiXeData = () => axios.get(URL + '/pc_luongtaixe');

export const getPhieuChiNam = () => axios.get(URL + '/phieuchinam');