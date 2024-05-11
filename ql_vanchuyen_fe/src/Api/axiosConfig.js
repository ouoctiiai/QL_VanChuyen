import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:4433/vandon/danh-sach';

export const listVanDon = () => axios.get(REST_API_BASE_URL);