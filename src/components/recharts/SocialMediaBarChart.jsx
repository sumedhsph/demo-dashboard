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
  // डेटा को प्लेटफॉर्म के हिसाब से समेकित करें
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
  const chartData = Object.values(platformTotals); // सिर्फ अनोखे प्लेटफॉर्म का योग

  console.log("chartData>>>", chartData); // डिबगिंग के लिए

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
              tick={{ fill: "#FF4500" }} // XAxis लेबल्स का रंग ऑरेंज
              tickLine={{ stroke: "#4169E1" }} // टिक लाइन नीला
            />
            <YAxis
              tick={{ fill: "#228B22" }} // YAxis लेबल्स का रंग गहरा हरा
              tickLine={{ stroke: "#FF0000" }} // टिक लाइन लाल
            />
            <Tooltip />
            <Legend />
            <Bar dataKey="likes" stackId="a" fill="#8884d8" name="Likes" />
            <Bar dataKey="shares" stackId="a" fill="#82ca9d" name="Shares" />
            <Bar
              dataKey="comments"
              stackId="a"
              fill="#FFC107"
              name="Comments"
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default SocialMediaBarChart;
