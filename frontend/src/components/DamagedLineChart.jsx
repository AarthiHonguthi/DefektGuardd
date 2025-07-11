import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

const DamagedLineChart = ({
  labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  displayData = [],
  label = "Data",
  color = "#1976d2", // Default MUI primary color
}) => {
  return (
    <LineChart
      xAxis={[{ data: labels, scaleType: "point" }]}
      
      series={[
        {
          curve: "linear",
          data: displayData,
          label,
          color,
        },
      ]}
      height={150}
      legend={{ hidden: false }}
    />
  );
};

export default DamagedLineChart;
