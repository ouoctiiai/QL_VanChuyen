import axios from "axios";

const URL = "http://localhost:4433/taikhoan";

export const listTaiKhoan = () => axios.get(URL + '/danh-sach');
export const getTaiKhoanById = (customerId) => axios.get(URL + '/' + customerId);
export const login = (loginData) => axios.post(URL + '/login' + loginData);