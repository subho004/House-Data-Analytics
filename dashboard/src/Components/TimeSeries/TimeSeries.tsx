import React from "react";
import ReactApexChart from "react-apexcharts";
import { dataProps } from "../../Interface/Data.interface";
import { Typography, styled } from "@mui/material";

const TimeSeries: React.FC<{
  data: dataProps[];
  startDate: Date | null;
  endDate: Date | null;
}> = ({ data, startDate, endDate }) => {
  const filteredData = data.filter((item) => {
    const arrivalDate = new Date(
      `${item.arrival_date_year}-${item.arrival_date_month}-${item.arrival_date_day_of_month}`
    );
    return (
      (!startDate || arrivalDate >= startDate) &&
      (!endDate || arrivalDate <= endDate)
    );
  });

  if (filteredData.length === 0) {
    return <div>No data to display</div>;
  }

  const dailyDataMap = new Map();

  for (const item of filteredData) {
    const arrivalDate = new Date(
      `${item.arrival_date_year}-${item.arrival_date_month}-${item.arrival_date_day_of_month}`
    ).getTime();

    const totalVisitors =
      Number(item.adults) + Number(item.children) + Number(item.babies);

    if (!dailyDataMap.has(arrivalDate)) {
      dailyDataMap.set(arrivalDate, totalVisitors);
    } else {
      dailyDataMap.set(
        arrivalDate,
        dailyDataMap.get(arrivalDate) + totalVisitors
      );
    }
  }

  const dailyVisitorData = [];

  for (const [arrivalDate, totalVisitors] of dailyDataMap) {
    dailyVisitorData.push({ x: arrivalDate, y: totalVisitors });
  }

  const chartOptions: Partial<ApexCharts.ApexOptions> = {
    chart: {
      id: "zoomable-chart",
      type: "line",
      height: 350,
      zoom: {
        enabled: true,
        type: "x",
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: "pan",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
    },
  };

  return (
    <div>
      <Heading>Time Series Chart</Heading>
      <div style={style.chartContainer}>
        <ReactApexChart
          options={chartOptions}
          series={[
            {
              name: "Daily Visitors",
              data: dailyVisitorData,
            },
          ]}
          type="line"
          height={350}
        />
      </div>
    </div>
  );
};

export default TimeSeries;

const style = {
  chartContainer: {
    margin: "20px",
  },
};

const Heading = styled(Typography)`
  font-size: 24px;
  font-weight: bold;
  margin: 20px;
`;
