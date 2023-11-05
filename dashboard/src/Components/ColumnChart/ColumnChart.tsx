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

interface CountryVisitorData {
  [country: string]: number;
}

const ColumnChart: React.FC<{
  data: dataProps[];
  startDate: Date | null;
  endDate: Date | null;
}> = ({ data, startDate, endDate }) => {
  // Filter data based on the date range
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
    // Handle the case where there's no data to plot
    return <div>No data to display</div>;
  }

  // Calculate the total visitors per country
  const countryVisitorData: CountryVisitorData = {};

  for (const item of filteredData) {
    const country = item.country;
    const totalVisitors =
      Number(item.adults) + Number(item.children) + Number(item.babies);

    if (!countryVisitorData[country]) {
      countryVisitorData[country] = totalVisitors;
    } else {
      countryVisitorData[country] += totalVisitors;
    }
  }

  const countryChartData = [];

  for (const [country, totalVisitors] of Object.entries(countryVisitorData)) {
    countryChartData.push({ x: country, y: totalVisitors });
  }

  const chartOptions: Partial<ApexCharts.ApexOptions> = {
    chart: {
      id: "column-chart",
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        columnWidth: "50%",
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "12px",
        fontWeight: "bold",
        colors: ["#333"], // Label text color
      },
      offsetY: -20, // Adjust the label's vertical position
    },
    xaxis: {
      type: "category",
    },
  };

  return (
    <div>
      <Heading>Column Chart - Total Visitors per Country</Heading>
      <div style={style.chartContainer}>
        <ReactApexChart
          options={chartOptions}
          series={[
            {
              name: "Total Visitors",
              data: countryChartData,
            },
          ]}
          type="bar"
          height={350}
        />
      </div>
    </div>
  );
};

export default ColumnChart;
