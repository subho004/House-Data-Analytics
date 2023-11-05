import React from "react";
import ReactApexChart from "react-apexcharts";
import { dataProps } from "../../Interface/Data.interface";
import { Typography, styled } from "@mui/material";

const Sparkline: React.FC<{
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

  const dailyAdultVisitorData = new Map<string, number>();
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
        const totalAdultVisitors = Number(item.adults);
        const totalChildrenVisitors = Number(item.children);

        const currentAdultTotal = dailyAdultVisitorData.get(arrivalDate) || 0;
        dailyAdultVisitorData.set(
          arrivalDate,
          currentAdultTotal + totalAdultVisitors
        );

        const currentChildrenTotal =
          dailyChildrenVisitorData.get(arrivalDate) || 0;
        dailyChildrenVisitorData.set(
          arrivalDate,
          currentChildrenTotal + totalChildrenVisitors
        );
      }
    }
  }

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
    <div style={{ display: "flex" }}>
      <div>
        <div style={style.chartContainer}>
          <Heading>Sparkline Chart - Total Visitors per Day (Adults)</Heading>
          <ReactApexChart
            options={chartOptions}
            series={[{ data: sparklineAdultData }]}
            type="line"
            height={100}
          />
        </div>
      </div>
      <div>
        <div style={style.chartContainer}>
          <Heading>Sparkline Chart - Total Visitors per Day (Children)</Heading>
          <ReactApexChart
            options={chartOptions}
            series={[{ data: sparklineChildrenData }]}
            type="line"
            height={100}
          />
        </div>
      </div>
    </div>
  );
};

export default Sparkline;

const style = {
  chartContainer: {
    margin: "20px",
    width: "100%",
  },
};

const Heading = styled(Typography)`
  font-size: 24px;
  font-weight: bold;
  margin: 20px;
`;
