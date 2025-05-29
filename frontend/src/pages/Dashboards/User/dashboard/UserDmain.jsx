import React from "react";
import UserStats from "./UserStats";
import { useGetUserStatsQuery } from "../../../../redux/Stats/statApi";
import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJs,
  Title,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import DashboardSkelton from "../../../../components/DashboardSkelton";

ChartJs.register(
  Title,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);
function UserDmain() {
  const { user } = useSelector((state) => state.auth);

  const {
    data: stats,
    isLoading,
    isError,
  } = useGetUserStatsQuery(user?.email, {
    skip: !user?.email,
  });
//   console.log("user Stats api", stats);
  if (isLoading)
    return <div className="text-center text-gray-500"><DashboardSkelton/></div>;
  if (!stats) {
    return <div className="text-center text-gray-500">No data available.</div>;
  }
  // const data = {
  //      labels: ["Total Payments",'Total Reviews', 'Total Purchased Products'],
  //      datasets:[{
  //          label: 'User Stats',
  //            data: [
  //    stats.totalAmount,
  //     stats.totalReview*100,
  //     stats.totalPurchaseProducts*100
  //   ],
  //           backgroundColor: 'rgba(75, 192, 192, 0.2)',
  //             borderColor:'rgba(75, 192, 192, 1)',
  //             borderWidth: 1,
  //      }]
  // };
  // const options = {
  //     responsive:true,
  //     legend:{
  //         position:'top'
  //     },
  //     tooltip:{
  //         callback:{
  //             label:function(tooltipItem){
  //                 return `${tooltipItem.label}:${tooltipItem.raw}`
  //             }
  //         }

  //     },

  // }
  const maxCount = Math.max(stats.totalReview, stats.totalPurchaseProducts);
  const y2Max = maxCount > 0 ? Math.ceil(maxCount * 1.1) : 10;

  const data = {
    labels: ["Total Payments", "Total Reviews", "Total Purchased Products"],
    datasets: [
      {
        label: "Total Payments",
        data: [stats.totalAmount, null, null],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        yAxisID: "y1",
      },
      {
        label: "Total Reviews",
        data: [null, stats.totalReview, null],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        yAxisID: "y2",
      },
      {
        label: "Total Purchased Products",
        data: [null, null, stats.totalPurchaseProducts],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        yAxisID: "y2",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      y1: {
        type: "linear",
        position: "left",
        beginAtZero: true,
        title: {
          display: true,
          text: "Payments (₹)",
        },
      },
      y2: {
        type: "linear",
        position: "right",
        beginAtZero: true,
        max: y2Max,
        stepSize: Math.ceil(y2Max / 5),
        title: {
          display: true,
          text: "Counts (Reviews / Purchases)",
        },

        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <div className="p-6">
      <div>
        <h1 className="text-2xl font-semibold mb-4">User Dashboard</h1>
        <p className="text-gray-500">
          Hi, {user?.username}! Welcome to your user dashboard
        </p>
      </div>
      <UserStats stats={stats} />
     
       <div className="mt-6 w-full max-w-4xl mx-auto overflow-x-auto">
        <div className="relative min-w-[300px] h-[300px] sm:h-[400px]">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
}

export default UserDmain;
