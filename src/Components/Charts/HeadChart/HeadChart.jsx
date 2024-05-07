import React, { useEffect } from "react";
import * as echarts from "echarts";

export default function HeadChart({ colors, v }) {
  const uniqueId = `main-${Math.random()}`;
  useEffect(() => {
    var myChart = echarts.init(document.getElementById(`main-${uniqueId}`));

    myChart.setOption({
      color: [colors],
      tooltip: {
        trigger: "axis",
        padding: 2,
        textStyle: {
          fontSize: 10,
        },
        axisPointer: {
          type: "none",
        },
        backgroundColor: "rgba(0,0,0,0.5)",
        borderWidth: 0,
      },
      fontSize: 8,
      xAxis: {
        type: "category",
        show: false,
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
        show: false,
      },
      series: [
        {
          data: v,
          type: "line",
          smooth: true,
          showSymbol: false,
          lineStyle: {
            color: colors,
            width: 3,
          },
        },
      ],
    });
  }, [colors, uniqueId, v]);

  const styleChart = {
    height: "100%",
    width: "100%",
  };

  return <div id={`main-${uniqueId}`} style={styleChart}></div>;
}
