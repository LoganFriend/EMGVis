import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-streaming";

class LineChart extends React.Component {
  constructor(props) {
    super(props);

    this.linechart = (
      <Line
        data={{
          datasets: [
            {
              label: "Dataset 1",
              borderColor: "rgb(139,0,139)",
              backgroundColor: "rgba(123,104,238, 0.5)",
              lineTension: 0,
              borderDash: [8, 4]
            }
          ]
        }}
        options={{
          scales: {
            xAxes: [
              {
                type: "realtime",
                realtime: {
                  delay: 2000
                }
              }
            ]
          }
        }}
      />
    );

    window.ipcRenderer.on("datastream", (event, arg) => {
      this.linechart.props.data.datasets.forEach(function(dataset) {
        dataset.data.push({
          x: Date.now(),
          y: arg
        });
      });
    });
  }
  render() {
    return this.linechart;
  }
}

export default LineChart;