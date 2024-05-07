import React, { useEffect } from "react";
import * as echarts from "echarts";

export default function MyChart2() {
  function getDataFromStartOfYear(year) {
    var currentDate = new Date();
    var currentYear = year || currentDate.getFullYear();
    var currentMonth = currentDate.getMonth() + 1;
    var currentDay = currentDate.getDate();
    var date = +echarts.number.parseDate(currentYear + "-01-01");
    var today = +echarts.number.parseDate(
      currentDate.getFullYear() + "-" + currentMonth + "-" + currentDay
    );
    var dayTime = 3600 * 24 * 1000;
    var data = [];
    for (var time = date; time <= today; time += dayTime) {
      data.push([
        echarts.format.formatTime("yyyy-MM-dd", time),
        Math.floor(Math.random() * 1000),
      ]);
    }
    return data;
  }

  useEffect(() => {
    var myChart = echarts.init(document.getElementById("main5"));
    myChart.setOption({
      // title: {
      //   top: 0,
      //   left: "center",
      //   text: "2024 Y",
      // },
      tooltip: {},
      visualMap: {
        min: 0,
        max: 1000,
        calculable: true,
        orient: "vertical",
        left: "right",
        top: "center",
        type: "piecewise",
        textStyle: {
          color: "#FFF",
        },
        color: ["#08302d", "#22202059"],
      },
      calendar: {
        left: "center",
        cellSize: [20, "auto"],
        bottom: 0,
        top: 50,
        orient: "vertical",
        range: "2024",
        dayLabel: {
          color: "#FFF",
          margin: 5,
        },
        yearLabel: { show: true },
        monthLabel: {
          color: "#FFF",
        },
      },
      series: [
        {
          type: "heatmap",
          color: "#FFF",
          coordinateSystem: "calendar",
          data: getDataFromStartOfYear(2024),
          itemStyle: {
            borderRadius: [3, 3, 3, 3],
            borderColor: "#3b3636",
            borderWidth: 1,
            // padding: [2, 2, 2, 2],
            // margin: [2, 2, 2, 2],
          },
        },
      ],
    });
  }, []);

  const styleChart = {
    height: "100%",
    width: "100%",
  };
  return <div id="main5" style={styleChart}></div>;
}
