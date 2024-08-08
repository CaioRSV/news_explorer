'use client';

import React, {useState, useEffect} from 'react';

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

import  { Data } from '../../utils/Data';

import PieChart from "../components/PieChart";

Chart.register(CategoryScale);


export default function Home() {
  const [chartData, setChartData] = useState({
    labels: Data.map((data) => data.year), 
    datasets: [
      {
        label: "Users Gained ",
        data: Data.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0"
        ],
        borderColor: "black",
        borderWidth: 2
      }
    ]
  });

  return (
    <main className="w-full h-full bg-red-300">
      <div>
      <div className="App">
          <PieChart chartData={chartData} />
      </div>
      </div>
    </main>
  );
}
