import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import React, { useState, useEffect } from 'react';
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import { getTongDonHangThanhCong } from "./../../../Api/DataVanDon";
import { getTongDonHang } from './../../../Api/DataVanDon';
import { get10RecentOrders } from "./../../../Api/DataVanDon";
import { getTongDonHangChoGiao } from "./../../../Api/DataVanDon";
import { getTongDonHangDangGiao } from "./../../../Api/DataVanDon";
import { getTongDonHangChoXN } from "./../../../Api/DataVanDon";
import { getTongDonHangDaHuy } from "./../../../Api/DataVanDon";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [totalOrders, setTotalOrders] = useState(0);
  const [successfulOrders, setSuccessfulOrders] = useState(0);
  const [recentOrders, setRecentOrders] = useState([]);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [deliveringOrders, setDeliveringOrders] = useState(0);
  const [waitingForConfirmationOrders, setWaitingForConfirmationOrders] = useState(0);
  const [cancelledOrders, setCancelledOrders] = useState(0);

  const successRate1 = totalOrders ? (successfulOrders / totalOrders) * 100 : 0;
  const pendingRate = totalOrders ? (pendingOrders / totalOrders) * 100 : 0;
  const deliveringRate = totalOrders ? (deliveringOrders / totalOrders) * 100 : 0;
  const waitingForConfirmationRate = totalOrders ? (waitingForConfirmationOrders / totalOrders) * 100 : 0;
  const cancelledRate = totalOrders ? (cancelledOrders / totalOrders) * 100 : 0;

  useEffect(() => {
    //Lấy tổng đơn
    const fetchTotalOrders = async () => {
      try {
        const response = await getTongDonHang();
        setTotalOrders(response.data);
      } catch (error) {
        console.error("Error fetching total orders:", error);
      }
    };

    //Lấy đơn đã giao
    const fetchSuccessfulOrders = async () => {
      try {
        const response = await getTongDonHangThanhCong();
        setSuccessfulOrders(response.data);
      } catch (error) {
        console.error("Error fetching successful orders:", error);
      }
    };

    const fetchPendingOrders = async () => {
      try {
        const response = await getTongDonHangChoGiao();
        setPendingOrders(response.data);
      } catch (error) {
        console.error("Error fetching pending orders:", error);
      }
    };

    const fetchDeliveringOrders = async () => {
      try {
        const response = await getTongDonHangDangGiao();
        setDeliveringOrders(response.data);
      } catch (error) {
        console.error("Error fetching delivering orders:", error);
      }
    };

    const fetchWaitingForConfirmationOrders = async () => {
      try {
        const response = await getTongDonHangChoXN();
        setWaitingForConfirmationOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders waiting for confirmation:", error);
      }
    };

    const fetchCancelledOrders = async () => {
      try {
        const response = await getTongDonHangDaHuy();
        setCancelledOrders(response.data);
      } catch (error) {
        console.error("Error fetching cancelled orders:", error);
      }
    };

    //DS 10 đơn gần nhất
    const fetchRecentOrders = async () => {
      try {
        const response = await get10RecentOrders();
        setRecentOrders(response.data);
      } catch (error) {
        console.error("Error fetching recent orders:", error);
      }
    };

    fetchTotalOrders();
    fetchSuccessfulOrders();
    fetchRecentOrders();
    fetchPendingOrders();
    fetchDeliveringOrders();
    fetchWaitingForConfirmationOrders();
    fetchCancelledOrders();
  }, []);


  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={pendingOrders}
            subtitle="Đơn chờ giao"
            progress={pendingRate/100} 
            increase={`${pendingRate.toFixed(2)}%`}
            icon={
              <ShoppingCartIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={deliveringOrders}
            subtitle="Đơn đang giao"
            progress={deliveringRate/100} 
            increase={`${deliveringRate.toFixed(2)}%`}
            icon={
              <ShoppingCartCheckoutIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={waitingForConfirmationOrders}
            subtitle="Chờ xác nhận"
            progress={waitingForConfirmationRate/100} 
            increase={`${waitingForConfirmationRate.toFixed(2)}%`}
            icon={
              <ProductionQuantityLimitsIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={cancelledOrders}
            subtitle="Đơn đã huỷ"
            progress={cancelledRate/100}
            increase={`${cancelledRate.toFixed(2)}%`}
            icon={
              <RemoveShoppingCartIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Doanh thu
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                $59,342.32
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Đơn hàng gần đây
            </Typography>
          </Box>
          {recentOrders.map((order, i) => (
            <Box
              key={`${order.maVanDon}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {order.maVanDon}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {order.loaiVanChuyen}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{order.thoiGianLapToString}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${order.phiVanChuyen.tongPhi}
              </Box>
            </Box>
          ))}
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Đơn giao thành công
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle progress={successRate1 / 100} size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              {successRate1.toFixed(2)}%
            </Typography>
            <Typography>Số đơn đã giao hàng thành công trên tổng số đơn</Typography>
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Sales Quantity
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geography Based Traffic
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
