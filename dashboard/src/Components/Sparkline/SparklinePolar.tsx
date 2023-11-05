import React from "react";
import ReactApexChart from "react-apexcharts";
import { dataProps } from "../../Interface/Data.interface";
import { Typography, styled } from "@mui/material";

const SparklinePolar: React.FC<{
  data: dataProps[];
  startDate: Date | null;
  endDate: Date | null;
}> = ({ data, startDate, endDate }) => {
  const filteredData = data.filter((item) => {
    const year = item.arrival_date_year;
    const month = item.arrival_date_month;
    const day = item.arrival_date_day_of_month;

    if (!year || !month || !day) {
      return false;
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
    return <div>No data to display</div>;
  }
  const dailyChildrenVisitorData = new Map<string, number>();

  for (const item of filteredData) {
    const year = item.arrival_date_year;
    const month = item.arrival_date_month;
    const day = item.arrival_date_day_of_month;

    if (year && month && day) {
      const arrivalDate = new Date(
        `${year}-${month}-${day}`
      ).toLocaleDateString();

      if (arrivalDate) {
        const totalChildrenVisitors = Number(item.children);

        const currentChildrenTotal =
          dailyChildrenVisitorData.get(arrivalDate) || 0;
        dailyChildrenVisitorData.set(
          arrivalDate,
          currentChildrenTotal + totalChildrenVisitors
        );
      }
    }
  }

  const sparklinePolarData = Array.from(
    dailyChildrenVisitorData,
    ([date, total]) => ({
      x: date,
      y: total,
    })
  );

  const chartOptions: Partial<ApexCharts.ApexOptions> = {
    chart: {
      id: "daily-children-visitors-sparkline-polar",
      type: "polarArea",
      height: 200,
      sparkline: {
        enabled: true,
      },
    },
    labels: sparklinePolarData.map((dataPoint) => dataPoint.x),
  };

  return (
    <div>
      <Heading>Sparkline Polar Area Chart</Heading>
      <Heading>Total Children Visitors per Day</Heading>
      <div style={style.chartContainer}>
        <ReactApexChart
          options={chartOptions}
          series={sparklinePolarData.map((dataPoint) => dataPoint.y)}
          type="polarArea"
          height={200}
        />
      </div>
    </div>
  );
};

export default SparklinePolar;

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
