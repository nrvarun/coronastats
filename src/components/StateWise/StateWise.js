import React, { Component } from "react";

import Chart from "react-apexcharts";
import axios from "axios";

class StateWise extends Component {
  state = {
    options: {
      chart: {
        id: "state-wise",
      },
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "state",
        categories: [],
      },
    },
    series: [
      {
        name: "date",
        data: [],
      },
    ],
  };

  componentDidMount() {
    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

    axios
      .get("https://v1.api.covindia.com/states-affected-numbers")
      .then((res) => {
        this.setData(res);
      });
  }

  setData = (res) => {
    const { data } = res;
    const states = Object.keys(data);
    const count = Object.values(data);

    this.setState({
      options: {
        ...this.state.options,
        xaxis: {
          ...this.state.options.xaxis,
          categories: states,
        },
      },
      series: [
        {
          name: "count",
          data: count,
        },
      ],
    });
  };

  render() {
    return (
      <div className="mb-5">
        <p className="text-xl fnt-w-600">State wise data</p>
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="area"
          width={"100%"}
          height={400}
        />
      </div>
    );
  }
}

export default StateWise;
