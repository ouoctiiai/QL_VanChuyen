import axios from "axios";

const URL = "http://localhost:4433/taikhoan";

export const listTaiKhoan = () => axios.get(URL + '/danh-sach');

export const getTaiKhoanById = (customerId) => axios.get(URL + '/' + customerId);

export const login = (loginData) => axios.post(URL + '/login', loginData);

export const createAccount = async () => axios.post(URL + '/create');

export const createAccountCustomer = (taiKhoanMoi) => axios.post(URL + '/register', taiKhoanMoi);

