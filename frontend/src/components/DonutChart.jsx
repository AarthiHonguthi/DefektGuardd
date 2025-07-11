// components/DonutChart.jsx
import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

const DonutChart = ({ damaged, intact }) => {
  const data = [
    { label: 'Damaged', value: damaged, color: '#dc2626' },
    { label: 'Intact', value: intact, color: '#16a34a' },
  ];

  return (
    <PieChart
      series={[
        {
          innerRadius: 40,
          outerRadius: 70,
          data,
          arcLabel: 'value',
        },
      ]}
      width={150}
      height={150}
      margin={{ right: 10 }}
      slotProps={{ legend: { hidden: true } }}
    />
  );
};

export default DonutChart;
