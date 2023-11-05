import React from "react";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import { DateRangePickerProps } from "../../Interface/DateRangePickerProps.interface";
import Button from "@mui/material/Button";

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}) => {
  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
    console.log("Start Date:", date);
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
    console.log("End Date:", date);
  };

  const resetDateRange = () => {
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <div>
      <Heading>Select your Date Range</Heading>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePickerWithMargin
          label="Start Date"
          value={startDate}
          onChange={handleStartDateChange as any}
        />
        <DatePickerWithMargin
          label="End Date"
          value={endDate}
          onChange={handleEndDateChange as any}
        />
        <ResetButton
          variant="outlined"
          color="primary"
          onClick={resetDateRange}
        >
          Reset Dates
        </ResetButton>
      </LocalizationProvider>
    </div>
  );
};

export default DateRangePicker;

const Heading = styled(Typography)`
  font-size: 24px;
  font-weight: bold;
  margin: 20px;
`;

const DatePickerWithMargin = styled(DatePicker)<DatePickerProps<Date | null>>`
  margin-right: 20px;
  margin-left: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const ResetButton = styled(Button)`
  margin: 20px;
`;
