import axios from "axios";

const URL = "http://localhost:4433/phieuchi";

export const taoPhieuChi = async (Data) => axios.post(URL + '/taophieuchi', Data);
