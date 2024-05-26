import axios from "axios";

const URL = "http://localhost:4433/taikhoan";

export const listTaiKhoan = () => axios.get(URL + '/danh-sach');

export const getTaiKhoanById = (customerId) => axios.get(URL + '/' + customerId);

export const login = (loginData) => axios.post(URL + '/login', loginData);

export const createAccountCustomer = (taiKhoanMoi) => axios.post(URL + '/register', taiKhoanMoi);

export const updateProfileCustomerInfo = (id, sdt, email, cccd, dc, tennh, stk) => axios.post(`${URL}/update-profile-customer/${id}/${sdt}/${email}/${cccd}/${dc}/${tennh}/${stk}`);

export const createAccount = async (accountData) => axios.post(URL + '/create', accountData);

export const getDSShipper = async() => axios.get(URL + '/dsTaiKhoanLaShipper')

export const updateTKShipper = (id, tenChuTaiKhoan, tenTaiKhoan, matKhau, sdt, email, soTaiKhoan, tenNganHang) =>  
    axios.post(`${URL}/updateSP/${id}/${tenChuTaiKhoan}/${tenTaiKhoan}/${matKhau}/${sdt}/${email}/${soTaiKhoan}/${tenNganHang}`);
