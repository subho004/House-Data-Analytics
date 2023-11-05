import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import DateRangePicker from "../DateRangePicker/DateRangePicker";
import TimeSeries from "../TimeSeries/TimeSeries";
import ColumnChart from "../ColumnChart/ColumnChart";
import Sparkline from "../Sparkline/Sparkline";
import SparklineRadar from "../Sparkline/SparklineRadar";
import SparklinePolar from "../Sparkline/SparklinePolar";
import SparklinePie from "../Sparkline/SparklinePie";
import axios from "axios";

function Dashboard() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/data").then((response) => {
      setData(response.data);
    });
  }, []);
  return (
    <StyledContainer>
      <Heading>Dashboard</Heading>
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      <TimeSeries data={data} startDate={startDate} endDate={endDate} />
      <ColumnChart data={data} startDate={startDate} endDate={endDate} />
      <Sparkline data={data} startDate={startDate} endDate={endDate} />
      <HorizontalContainer>
        <SparklineRadar data={data} startDate={startDate} endDate={endDate} />
        <SparklinePolar data={data} startDate={startDate} endDate={endDate} />
        <SparklinePie data={data} startDate={startDate} endDate={endDate} />
      </HorizontalContainer>
    </StyledContainer>
  );
}

const Heading = styled(Typography)`
  font-size: 24px;
  font-weight: bold;
  margin: 20px;
`;

const StyledContainer = styled("div")`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  max-height: 100vh;
  overflow: auto;
  scrollbar-width: thin;
  scrollbar-color: blue;
`;

const HorizontalContainer = styled("div")`
  display: flex;
  flex-direction: row;
`;

export default Dashboard;
