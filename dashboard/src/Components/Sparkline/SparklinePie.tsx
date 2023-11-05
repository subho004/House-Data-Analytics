import React from "react";
import ReactApexChart from "react-apexcharts";
import { dataProps } from "../../Interface/Data.interface";
import { Typography, styled } from "@mui/material";

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

const SparklinePie: React.FC<{
  data: dataProps[];
  startDate: Date | null;
  endDate: Date | null;
}> = ({ data, startDate, endDate }) => {
  // Filter data based on the date range
  const filteredData = data.filter((item) => {
    const year = item.arrival_date_year;
    const month = item.arrival_date_month;
    const day = item.arrival_date_day_of_month;

    if (!year || !month || !day) {
      return false; // Skip items with missing date components
    }

    const arrivalDate = new Date(
      `${year}-${month}-${day}`
    ).toLocaleDateString();

    if (arrivalDate) {
      return (
        (!startDate || new Date(arrivalDate) >= startDate) &&
        (!endDate || new Date(arrivalDate) <= endDate)
      );
    }

    return false;
  });

  if (filteredData.length === 0) {
    // Handle the case where there's no data to plot
    return <div>No data to display</div>;
  }

  // Create a map to store daily total babies visitors
  const dailyBabiesVisitorData = new Map<string, number>();

  // Calculate the total number of babies visitors for each day
  for (const item of filteredData) {
    const year = item.arrival_date_year;
    const month = item.arrival_date_month;
    const day = item.arrival_date_day_of_month;

    if (year && month && day) {
      const arrivalDate = new Date(
        `${year}-${month}-${day}`
      ).toLocaleDateString();

      if (arrivalDate) {
        const totalBabiesVisitors = Number(item.babies);

        // For babies
        const currentBabiesTotal = dailyBabiesVisitorData.get(arrivalDate) || 0;
        dailyBabiesVisitorData.set(
          arrivalDate,
          currentBabiesTotal + totalBabiesVisitors
        );
      }
    }
  }

  // Convert the map to an array of data points for babies visitors
  const sparklinePieData = Array.from(
    dailyBabiesVisitorData,
    ([date, total]) => ({
      x: date,
      y: total,
    })
  );

  const chartOptions: Partial<ApexCharts.ApexOptions> = {
    chart: {
      id: "daily-babies-visitors-sparkline-pie",
      type: "pie",
      height: 200,
      sparkline: {
        enabled: true,
      },
    },
    labels: sparklinePieData.map((dataPoint) => dataPoint.x),
  };

  return (
    <div>
      <Heading>Sparkline Pie Chart</Heading>
      <Heading>Total Babies Visitors per Day</Heading>
      <div style={style.chartContainer}>
        <ReactApexChart
          options={chartOptions}
          series={sparklinePieData.map((dataPoint) => dataPoint.y)}
          type="pie"
          height={200}
        />
      </div>
    </div>
  );
};

export default SparklinePie;
