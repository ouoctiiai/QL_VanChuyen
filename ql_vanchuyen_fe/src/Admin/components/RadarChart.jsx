import React, { useEffect, useState } from "react";
import { ResponsiveRadar } from '@nivo/radar';
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { getChiPhiNhienLieuData, getChiPhiThietBiData, getChiPhiXeData, getLuongShipperData, getLuongTaiXeData } from "../../Api/DataPhieuChi";

const RadarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState([]);
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const chiPhiXeResponse = await getChiPhiXeData();
        const chiPhiNhienLieuResponse = await getChiPhiNhienLieuData();
        const chiPhiThietBiResponse = await getChiPhiThietBiData();
        const luongShipperResponse = await getLuongShipperData();
        const luongTaiXeResponse = await getLuongTaiXeData();

        const combinedData = [
          { loaiPhieuChi: "Chi phí xe", data: chiPhiXeResponse.data[0] },
          { loaiPhieuChi: "Chi phí nhiên liệu", data: chiPhiNhienLieuResponse.data[0] },
          { loaiPhieuChi: "Chi phí thiết bị", data: chiPhiThietBiResponse.data[0] },
          { loaiPhieuChi: "Trả lương Shipper", data: luongShipperResponse.data[0] },
          { loaiPhieuChi: "Trả lương Tài Xế", data: luongTaiXeResponse.data[0] }
        ];

        const radarData = [];
        const allYears = new Set();

        combinedData.forEach(item => {
          const radarItem = { loaiPhieuChi: item.loaiPhieuChi };
          Object.keys(item.data).forEach(year => {
            radarItem[year] = item.data[year];
            allYears.add(year);
          });
          radarData.push(radarItem);
        });

        setData(radarData);
        setKeys(Array.from(allYears).sort((a, b) => a - b));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <ResponsiveRadar
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
      keys={keys}
      indexBy="loaiPhieuChi"
      valueFormat="~d"
      margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
      borderColor={{ from: 'color' }}
      gridLabelOffset={15}
      dotSize={10}
      dotColor={{ theme: 'background' }}
      dotBorderWidth={2}
      colors={{ scheme: 'nivo' }}
      blendMode="multiply"
      motionConfig="wobbly"
      legends={[
        {
          anchor: 'top-left',
          direction: 'column',
          translateX: -50,
          translateY: -40,
          itemWidth: 80,
          itemHeight: 20,
          itemTextColor: '#999',
          symbolSize: 12,
          symbolShape: 'circle',
          effects: [
            {
              on: 'hover',
              style: {
                itemTextColor: '#000',
              },
            },
          ],
        },
      ]}
    />
  );
};

export default RadarChart;
