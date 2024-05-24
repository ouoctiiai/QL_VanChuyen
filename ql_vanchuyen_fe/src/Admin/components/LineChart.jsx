import React, { useState, useEffect } from "react";
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { getDoanhThuThang } from "../../Api/DataVanDon";

const LineChart = ({ isCustomLineColors = false, isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [doanhThuThangData, setDoanhThuThangData] = useState([]);

  useEffect(() => {
    fetchDoanhThuThangData();
  }, []);

  const fetchDoanhThuThangData = () => {
    getDoanhThuThang()
      .then(response => {
        if (response && response.data) {
          const formattedData = formatData(response.data);
          setDoanhThuThangData(formattedData);
        } else {
          console.log("Không có dữ liệu doanh thu theo tháng.");
        }
      })
      .catch(error => {
        console.error('Lỗi khi lấy dữ liệu doanh thu theo tháng:', error);
      });
  };

  const formatData = (data) => {
    const groupedData = data.reduce((acc, cur) => {
      const { nam, thang, tongTien } = cur;
      if (!acc[nam]) {
        acc[nam] = [];
      }
      acc[nam].push({ x: `${thang} Tháng`, y: tongTien });
      return acc;
    }, {});

    return Object.keys(groupedData).map(year => ({
      id: `Năm ${year}`,
      data: groupedData[year],
    }));
  };

  return (
    <ResponsiveLine
      data={doanhThuThangData}
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
        tooltip: {
          container: {
            color: colors.primary[500],
          },
        },
      }}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        tickValues: Array.from({ length: 12 }, (_, i) => `${i + 1} Tháng`),
        legend: "Thời gian",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        tickSize: 3,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Tổng tiền",
        legendOffset: -40,
        legendPosition: "middle",
        tickFormat: value => `${value}đ`,
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={8}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default LineChart;
