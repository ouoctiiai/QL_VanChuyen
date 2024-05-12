import axios from "axios";


const REST_API_BASE_URL_KHO = 'http://localhost:4433/kho';

export const listKho = () => axios.get(REST_API_BASE_URL_KHO + '/danh-sach');

export const getKhoById = (khoId) => axios.get(REST_API_BASE_URL_KHO + '/' + khoId);
