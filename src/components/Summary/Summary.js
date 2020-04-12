import React, { Component } from "react";

import dayjs from "dayjs";
import axios from "axios";

class Summary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      total: 0,
      active: 0,
      death: 0,
      recovered: 0,
    };
  }

  componentDidMount() {
    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

    axios.get("https://v1.api.covindia.com/general").then((res) => {
      this.setData(res);
    });
  }

  setData = (res) => {
    const { deathTotal, infectedTotal, lastUpdatedTime, totalCured } = res.data;

    this.setState({
      date: lastUpdatedTime,
      total: infectedTotal + totalCured,
      active: infectedTotal,
      death: deathTotal,
      recovered: totalCured,
    });
  };

  render() {
    const { total, active, recovered, death, date } = this.state;

    return (
      <div className="row">
        <div className="col-12 mb-3">
          <p className="text-xl fnt-w-600">
            COVID-19 India Summary
            <span className="mx-2 text-lg darkblue">
              {`( As of ${dayjs(date, "DD/MM/YYY HH:mm").format(
                "DD MMM YYYY - HH:mm"
              )} )`}
            </span>
          </p>
        </div>
        <div className="col-sm-6 col-lg-3">
          <div className="content-card">
            <p className="content-card__title">Confirmed</p>
            <p className="content-card__count red">{total}</p>
          </div>
        </div>
        <div className="col-sm-6 col-lg-3">
          <div className="content-card">
            <p className="content-card__title">Active</p>
            <p className="content-card__count orange">{active}</p>
          </div>
        </div>
        <div className="col-sm-6 col-lg-3">
          <div className="content-card">
            <p className="content-card__title">Recovered</p>
            <p className="content-card__count green">{recovered}</p>
          </div>
        </div>
        <div className="col-sm-6 col-lg-3">
          <div className="content-card">
            <p className="content-card__title">Death</p>
            <p className="content-card__count lightblue">{death}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Summary;
