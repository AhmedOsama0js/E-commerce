import React, { useEffect } from "react";
import * as echarts from "echarts";

export default function MainDashChart() {
  useEffect(() => {
    var myChart = echarts.init(document.getElementById("main"));

    myChart.setOption({
      color: "#fff",
      tooltip: {
        // show:false,
        trigger: "axis",
        padding: 2,
        textStyle: {
          fontSize: 10,
        },
        axisPointer: {
          type: "line",
          lineStyle: {
            color: "#ccc",
            opacity: 0.5,
          },
        },
        backgroundColor: "rgba(0,0,0,0.5)",
        borderWidth: 0,
      },
      grid: {
        left: "3%",
        right: "3%",
        bottom: "10%",
        top: "10%",
        containLabel: true,
        show: false,
      },

      fontSize: 14,
      xAxis: {
        boundaryGap: ["5%", "5%"],
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        axisLine: {
          lineStyle: {
            color: "#fff",
          },
        },
      },

      yAxis: {
        type: "value",
        boundaryGap: ["2%", "2%"],
        axisLabel: {
          formatter: function (value, index) {
            return value + "k";
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: ["#aaa", "#ddd"],
            width: 0.5,
            type: "dashed",
            opacity: 0.5,
          },
        },
        axisLine: {
          // onZero: false,
          lineStyle: {
            color: "#fff",
          },
        },
      },
      series: [
        {
          data: [300, 200, 800, 400, 600, 400, 900],
          type: "line",
          smooth: true,
          lineStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#aaa",
              },
              {
                offset: 1,
                color: "#ccc",
              },
            ]),
            width: 2,
            type: "dashed",
          },
          label: {
            show: true,
            position: "top",
            formatter: "{c}",
            fontSize: 15,
            color: "#fff",
          },
          symbolSize: 8,
          showSymbol: true,
          legendHoverLink: false,
          // areaStyle: {
          //   // shadowOffsetY: 5,
          //   opacity: 0,
          //   // color: new echarts.graphic.LinearGradient(0, 0, 0, 0.5, [
          //   //   {
          //   //     offset: 1,
          //   //     color: "#00968835",
          //   //   },
          //   //   {
          //   //     offset: 0,
          //   //     color: "#ffff",
          //   //   },
          //   // ]),
          // },
        },
      ],
    });
  }, []);

  const styleChart = {
    height: "100%",
    width: "100%",
  };

  return <div id="main" style={styleChart}></div>;
}
