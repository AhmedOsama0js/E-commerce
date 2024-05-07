import React, { useEffect } from "react";
import * as echarts from "echarts";

export default function MyChart1() {
  useEffect(() => {
    var myChart = echarts.init(document.getElementById("main"));
    myChart.setOption({
      color: "#08302d",
      tooltip: {
        trigger: "item",
        padding: 7,
        textStyle: {
          fontSize: 12,
          color: "#fff",
        },
        axisPointer: {
          type: "line",
          lineStyle: {
            color: "#fff",
            opacity: 0.5,
          },
        },
        backgroundColor: "rgba(0,0,0,0.5)",
        borderWidth: 0,
      },
      xAxis: {
        axisLine: {
          show: false,
          lineStyle: {
            color: "#FFF",
          },
        },
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
        show: false,
        axisLine: {
          lineStyle: {
            color: "#FFF",
          },
        },

        splitLine: {
          show: false,
        },
      },
      grid: {
        left: "3%",
        right: "3%",
        bottom: "10%",
        top: "10%",
        containLabel: true,
        show: false,
      },
      series: [
        {
          label: {
            show: true,
            position: "top",
            formatter: "{c}",
            fontSize: 15,
            color: "#FFF",
          },
          data: [120, 200, 150, 80, 70, 110, 130],
          type: "bar",
          itemStyle: {
            borderRadius: [20, 20, 0, 0],
            shadowColor: "rgba(0, 0, 0, 0.5)",
            shadowBlur: 2,
            opacity: 0.7,
          },
        },
      ],
      barWidth: 30,
    });
  }, []);

  const styleChart = {
    height: "100%",
    width: "100%",
  };
  return <div id="main" style={styleChart}></div>;
}
