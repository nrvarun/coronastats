import React, { Component } from "react";

import Chart from "react-apexcharts";
import axios from "axios";

class DailyCases extends Component {
  state = {
    options: {
      chart: {
        id: "daily-cases",
        dropShadow: {
          enabled: true,
          opacity: 0.3,
          blur: 5,
          left: -7,
          top: 22,
        },
      },
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
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

    axios.get("https://v1.api.covindia.com/daily-dates").then((res) => {
      this.setData(res);
    });
  }

  setData = (res) => {
    const { data } = res;
    const casesCount = Object.values(data).slice(15, data.length);
    const dates = Object.keys(data).slice(15, data.length);

    this.setState({
      options: {
        ...this.state.options,
        xaxis: {
          type: "date",
          categories: dates,
        },
      },
      series: [
        {
          name: "cases",
          data: casesCount,
        },
      ],
    });
  };

  render() {
    return (
      <div>
        <p className="text-xl fnt-w-600">Daily new cases</p>
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="line"
          width={"100%"}
          height={400}
        />
      </div>
    );
  }
}

export default DailyCases;
