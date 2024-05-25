import axios from "axios";

const URL = "http://localhost:4433/taikhoan";

export const listTaiKhoan = () => axios.get(URL + '/danh-sach');

export const getTaiKhoanById = (customerId) => axios.get(URL + '/' + customerId);

export const login = (loginData) => axios.post(URL + '/login', loginData);

export const createAccount = async (accountData) => axios.post(URL + '/create', accountData);

export const getDSShipper = async() => axios.get(URL + '/dsTaiKhoanLaShipper')

export const updateTKShipper = (id, tenChuTaiKhoan, tenTaiKhoan, matKhau, sdt, email, soTaiKhoan, tenNganHang) =>  
    axios.get(`${URL}/updateSP/${id}/${tenChuTaiKhoan}/${tenTaiKhoan}/${matKhau}/${sdt}/${email}/${soTaiKhoan}/${tenNganHang}`);
