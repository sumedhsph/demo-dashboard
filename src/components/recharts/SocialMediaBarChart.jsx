import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import socialMediaData from "../../data/socialMediData";

function SocialMediaBarChart() {
  const platformTotals = {};
  socialMediaData.forEach((item) => {
    if (!platformTotals[item.platform]) {
      platformTotals[item.platform] = {
        name: item.platform,
        likes: 0,
        shares: 0,
        comments: 0,
      };
    }
    platformTotals[item.platform].likes += item.likes;
    platformTotals[item.platform].shares += item.shares;
    platformTotals[item.platform].comments += item.comments;
  });
  const chartData = Object.values(platformTotals);

  //console.log("chartData>>>", chartData);

  return (
    <div className="chart-container">
      <h2>Social Media Metrics - Recharts BarChart</h2>
      {chartData && (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              tick={{ fill: "#5D0404" }}
              tickLine={{ stroke: "#4169E1" }}
            />
            <YAxis
              tick={{ fill: "#228B22" }}
              tickLine={{ stroke: "#FF0000" }}
            />
            <Tooltip />
            <Legend />
            <Bar dataKey="likes" stackId="a" fill="#E73C64" name="Likes" />
            <Bar dataKey="shares" stackId="a" fill="#3C4DE7" name="Shares" />
            <Bar
              dataKey="comments"
              stackId="a"
              fill="#AE4CE4"
              name="Comments"
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default SocialMediaBarChart;
