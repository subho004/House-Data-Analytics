import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import DateRangePicker from "../DateRangePicker/DateRangePicker";
import { data } from "../../Data/Data";
import TimeSeries from "../TimeSeries/TimeSeries";
import ColumnChart from "../ColumnChart/ColumnChart";

function Dashboard() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
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
    </StyledContainer>
  );
}

export default Dashboard;

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
