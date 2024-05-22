import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:4433/vandon';

export const listVanDon = () => axios.get(REST_API_BASE_URL + '/danh-sach');

export const getVanDonById = (employeeId) => axios.get(REST_API_BASE_URL + '/' + employeeId);

export const listTaiXe = () => axios.get(REST_API_BASE_URL + '/dsTaiXe');

export const listXe = () => axios.get(REST_API_BASE_URL + '/dsXe');

export const listNoiTinh = () => axios.get(REST_API_BASE_URL + '/dsDonNoiTinh');

export const listNgoaiTinh = () => axios.get(REST_API_BASE_URL + '/dsDonLienTinh');
