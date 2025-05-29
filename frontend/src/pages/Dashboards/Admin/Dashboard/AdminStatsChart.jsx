import React from "react";
import { Pie, Line } from "react-chartjs-2";
import "chart.js/auto";

function AdminStatsChart({ stats }) {
  const piedata = {
    labels: ["Total Orders", "Total Products", "Total Reviews", "Total Users"],
    datasets: [
      {
        data: [
          stats?.totalorders,
          stats?.totalProducts,
          stats?.totalReview,
          stats?.totalusers,
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      animateRotate: true,
      animateScale: true,
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.raw || 0;
            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  // Line chart data
  const earningData = new Array(12).fill(0);

  stats?.monthlyEarnings?.forEach((item) => {
    const index = item.month - 1;
    earningData[index] = item.earning;
  });

  const linedata = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Monthly Earnings",
        data: earningData,
        fill: false,
        backgroundColor: "#36A2EB",
        borderColor: "#36A2EB",
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="mt-12 space-y-12">
      <h2 className="text-xl font-semibold mb-4">Admin Stats Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* pie chart */}
        <div className="max-h-96 md:h-96 w-full">
          <Pie data={piedata} options={chartOptions} />
        </div>

        {/* line chart */}
        <div className="max-h-96 md:h-96 w-full">
          <Line data={linedata} options={chartOptions} />
        </div>
      </div>
      <div>
        <p className="text-center font-[Shojumaru] text-xl text-gray-800">
          Made with <span className="text-red-500">♥</span> by{" "}
          <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent font-bold">
  Harsh Sharma
</span>

        </p>
      </div>
    </div>
  );
}

export default AdminStatsChart;
