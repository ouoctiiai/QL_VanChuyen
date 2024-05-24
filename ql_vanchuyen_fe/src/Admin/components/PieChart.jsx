import React, { useState, useEffect } from "react";
import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import { getTongDonHangThanhCong } from "../../Api/DataVanDon";
import { getTongDonHangChoGiao } from "../../Api/DataVanDon";
import { getTongDonHangChoXN } from "../../Api/DataVanDon";
import { getTongDonHangDaHuy } from "../../Api/DataVanDon";
import { getTongDonHangDangGiao } from "../../Api/DataVanDon";
import { getTongDonHang } from "../../Api/DataVanDon";


const fetchOrderData = async () => {
  try {
    const [
      totalOrdersRes,
      successfulOrdersRes,
      pendingOrdersRes,
      deliveringOrdersRes,
      waitingForConfirmationOrdersRes,
      cancelledOrdersRes
    ] = await Promise.all([
      getTongDonHang(),
      getTongDonHangThanhCong(),
      getTongDonHangChoGiao(),
      getTongDonHangDangGiao(),
      getTongDonHangChoXN(),
      getTongDonHangDaHuy()
    ]);

    return {
      totalOrders: totalOrdersRes.data,
      successfulOrders: successfulOrdersRes.data,
      pendingOrders: pendingOrdersRes.data,
      deliveringOrders: deliveringOrdersRes.data,
      waitingForConfirmationOrders: waitingForConfirmationOrdersRes.data,
      cancelledOrders: cancelledOrdersRes.data
    };
  } catch (error) {
    console.error("Error fetching order data:", error);
    return null;
  }
};

const PieChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const orderData = await fetchOrderData();
      if (orderData) {
        setData([
          { id: "Đơn đã giao", label: "Đơn đã giao", value: orderData.successfulOrders },
          { id: "Đơn đang giao", label: "Đơn đang giao", value: orderData.deliveringOrders },
          { id: "Đơn chờ giao", label: "Đơn chờ giao", value: orderData.pendingOrders },
          { id: "Đơn chờ xác nhận", label: "Đơn chờ xác nhận", value: orderData.waitingForConfirmationOrders },
          { id: "Đơn đã hủy", label: "Đơn đã hủy", value: orderData.cancelledOrders }
        ]);
      }
    };

    fetchData();
  }, []);

  return (
    <ResponsivePie
      data={data}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
      }}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={colors.grey[100]}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      enableArcLabels={false}
      arcLabelsRadiusOffset={0.4}
      arcLabelsSkipAngle={7}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 25,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
};

export default PieChart;
