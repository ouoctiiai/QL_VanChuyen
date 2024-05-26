import { Box } from "@mui/material";
import Header from "../../components/Header";
import RadarChart from "../../components/RadarChart";

const Radar = () => {
  return (
    <Box m="20px">
      <Header title="Thống kê phiếu chi" subtitle="Biểu đồ lưới biểu diễn cho lượng chi tiêu của hệ thống" />
      <Box height="75vh">
        <RadarChart />
      </Box>
    </Box>
  );
};

export default Radar;
