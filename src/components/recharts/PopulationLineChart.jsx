import React from 'react'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Rectangle,
    ResponsiveContainer,
  } from "recharts";
import useFetchCountryData from '../../hooks/useFetchCountryData';

  
const formatToMillion = (value) => {
    if (!value) return "0M";
    const million = value / 1000000; // 1 Million = 1,000,000
    return `${million.toFixed(1)}M`;
  };
  const formatCountryName = (name) => {
    return name ? name.slice(0, 3) : "";
  };
function PopulationLineChart() {
    const { data, error, loading } = useFetchCountryData();
  const chartData = data
    ? data
        .map((country) => ({
          name: country.name.common,
          population: country.population || 0,
        }))
        .sort((a, b) => b.population - a.population)
        .slice(0, 10)
    : [];
 // console.log(chartData);
  const CustomTooltip = ({ active, payload}) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ backgroundColor: "#fff", color:"#333",padding: "2px", border: "1px solid #ccc" }}>
          <p><strong>Country:</strong> {payload[0].payload.name}</p>
          <p><strong>Population:</strong> {formatToMillion(payload[0].payload.population)}</p>
        </div>
      );
    }
    return null;
  };
  return (
    <div className="chart-container">
        <h2>Top 10 Most Populous Countries - Recharts LineChart</h2>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {chartData && (
          <ResponsiveContainer width={"100%"} height={300}>
            <LineChart
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tickFormatter={formatCountryName} tick={{ fill: '#000000' }}/>
              <YAxis tickFormatter={formatToMillion} tick={{ fill: '#000000' }}/>
              <Tooltip content={<CustomTooltip />} />
              <Line
                name="Population"
                dataKey="population"
                stroke="#E4080A"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
  )
}

export default PopulationLineChart
