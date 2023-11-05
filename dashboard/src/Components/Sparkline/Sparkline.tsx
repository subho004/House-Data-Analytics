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

const Sparkline: React.FC<{
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

  // Create maps to store daily visitor totals for adults and children
  const dailyAdultVisitorData = new Map<string, number>();
  const dailyChildrenVisitorData = new Map<string, number>();

  // Calculate the total number of visitors for each day for adults and children
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
        const totalChildrenVisitors = Number(item.children);

        // For adults
        const currentAdultTotal = dailyAdultVisitorData.get(arrivalDate) || 0;
        dailyAdultVisitorData.set(
          arrivalDate,
          currentAdultTotal + totalAdultVisitors
        );

        // For children
        const currentChildrenTotal =
          dailyChildrenVisitorData.get(arrivalDate) || 0;
        dailyChildrenVisitorData.set(
          arrivalDate,
          currentChildrenTotal + totalChildrenVisitors
        );
      }
    }
  }

  // Convert the maps to arrays of data points for adults and children
  const sparklineAdultData = Array.from(
    dailyAdultVisitorData,
    ([date, total]) => ({
      x: date,
      y: total,
    })
  );

  const sparklineChildrenData = Array.from(
    dailyChildrenVisitorData,
    ([date, total]) => ({
      x: date,
      y: total,
    })
  );

  const chartOptions: Partial<ApexCharts.ApexOptions> = {
    chart: {
      id: "daily-visitors-sparkline",
      type: "line",
      height: 100,
      sparkline: {
        enabled: true,
      },
    },
  };

  return (
    <div>
      <Heading>Sparkline Chart - Total Visitors per Day (Adults)</Heading>
      <div style={style.chartContainer}>
        <ReactApexChart
          options={chartOptions}
          series={[{ data: sparklineAdultData }]}
          type="line"
          height={100}
        />
      </div>
      <Heading>Sparkline Chart - Total Visitors per Day (Children)</Heading>
      <div style={style.chartContainer}>
        <ReactApexChart
          options={chartOptions}
          series={[{ data: sparklineChildrenData }]}
          type="line"
          height={100}
        />
      </div>
    </div>
  );
};

export default Sparkline;
