import { useState } from "react";
import { Line } from "react-chartjs-2";
import classes from "./chart.module.css";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
} from "chart.js";
ChartJS.register(
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler
);
const Chart = () => {
  const [data, setData] = useState({
    labels: [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Online Transaction",
        data: [15, 20, 30, 42, 51, 82, 31, 59, 61, 73, 91, 58],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        tension: 0.4,
        fill: true,
        pointStyle: "rect",
        pointBorderColor: "blue",
        pointBackgroundColor: "#fff",
        showLine: true,
      },
      {
        label: "Offline Transaction",
        data: [5, 12, 18, 28, 36, 45, 59, 67, 73, 82, 90, 100],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        tension: 0.4,
        fill: true,
        pointStyle: "circle",
        pointBorderColor: "red",
        pointBackgroundColor: "#fff",
        showLine: true,
      },
    ],
  });

  const options = {
    scales: {
      y: {
        ticks: {
          // Divide the Y-axis into 5 sections
          stepSize: 20, // Adjust this value to control the number of sections
          beginAtZero: true, // Start the Y-axis from zero
        },
      },
      x: {
        beginAtZero: true, // Start the X-axis at 0
        max: 6, // Set the maximum value for the X-axis
        stepSize: 2, // Set the interval between tick marks on the X-axis
      },
    },
  };

  return (
    <div className={classes.map_container}>
      <div className={classes.chart_content}>
        <div>
          <p className={classes.amount}>₹2,73,500</p>
          <p className={classes.category}>Today’s Transactions</p>
        </div>
        <div className={classes.month}>
          <p className={classes.amount}>₹2,73,500</p>
          <p className={classes.category}>Total this Month</p>
        </div>
      </div>
      <Line className={classes.chart_data} data={data} options={options} />
    </div>
  );
};

export default Chart;
