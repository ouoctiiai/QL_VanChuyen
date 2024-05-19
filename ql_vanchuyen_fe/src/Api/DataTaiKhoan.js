import axios from "axios";

const URL = "http://localhost:4433/taikhoan";

export const listTaiKhoan = () => axios.get(URL + '/danh-sach');