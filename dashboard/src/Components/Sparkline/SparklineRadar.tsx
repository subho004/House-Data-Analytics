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

const SparklineRadar: React.FC<{
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

  // Create a map to store daily total adult visitors
  const dailyAdultVisitorData = new Map<string, number>();

  // Calculate the total number of adult visitors for each day
  for (const item of filteredData) {
    const year = item.arrival_date_year;
    const month = item.arrival_date_month;
    const day = item.arrival_date_day_of_month;

    if (year && month && day) {
      const arrivalDate = new Date(
        `${year}-${month}-${day}`
      ).toLocaleDateString();

      if (arrivalDate) {
        const totalAdultVisitors = Number(item.adults);

        // For adults
        const currentAdultTotal = dailyAdultVisitorData.get(arrivalDate) || 0;
        dailyAdultVisitorData.set(
          arrivalDate,
          currentAdultTotal + totalAdultVisitors
        );
      }
    }
  }

  // Convert the map to an array of data points for adult visitors
  const sparklineRadarData = Array.from(
    dailyAdultVisitorData,
    ([date, total]) => ({
      x: date,
      y: total,
    })
  );

  const chartOptions: Partial<ApexCharts.ApexOptions> = {
    chart: {
      id: "daily-adult-visitors-sparkline-radar",
      type: "radar",
      height: 200,
      sparkline: {
        enabled: true,
      },
    },
    xaxis: {
      categories: sparklineRadarData.map((dataPoint) => dataPoint.x),
    },
  };

  return (
    <div>
      <Heading>Sparkline Radar Chart</Heading>
      <Heading>Total Adult Visitors per Day</Heading>
      <div style={style.chartContainer}>
        <ReactApexChart
          options={chartOptions}
          series={[{ name: "Total Adult Visitors", data: sparklineRadarData }]}
          type="radar"
          height={200}
        />
      </div>
    </div>
  );
};

export default SparklineRadar;
