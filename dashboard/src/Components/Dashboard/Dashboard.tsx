import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import DateRangePicker from "../DateRangePicker/DateRangePicker";

function Dashboard() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  return (
    <div>
      <Heading>Dashboard</Heading>
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
    </div>
  );
}

export default Dashboard;

const Heading = styled(Typography)`
  font-size: 24px;
  font-weight: bold;
  margin: 20px;
`;
