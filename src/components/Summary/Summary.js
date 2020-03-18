import React, { Component } from "react";

import { data } from "../../data";
import axios from "axios";

class Summary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kerala: 0,
      tamilnadu: 0,
      karnataka: 0,
      maharashtra: 0,
      totalCases: 0,
      htmlPath: "https://covidout.in/"
    };
  }

  componentDidMount() {
    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

    axios.get("http://localhost:3001/").then(res => this.setData(res));
  }

  setData = res => {
    console.log(res);
    /**
     * State wise data
     */

    const data = res.data;

    const totalCases = data.length;

    console.log(data);

    const tamilnadu = data.filter(
      data => data.state.toLowerCase() === "tamilnadu"
    );
    const kerala = data.filter(data => data.state.toLowerCase() === "kerala");
    const maharashtra = data.filter(
      data => data.state.toLowerCase() === "maharashtra"
    );
    const karnataka = data.filter(
      data => data.state.toLowerCase() === "karnataka"
    );

    console.log(
      "tamilnadu : " + tamilnadu.length,
      "kerala : " + kerala.length,
      "maharashtra : " + maharashtra.length
    );

    /**
     * City wise data
     */
    const chennai = data.filter(data => data.city.toLowerCase() === "chennai");
    const bangalore = data.filter(
      data => data.city.toLowerCase() === "bangalore"
    );
    const mumbai = data.filter(data => data.city.toLowerCase() === "mumbai");

    console.log(
      "chennai : " + chennai.length,
      "bangalore : " + bangalore.length,
      "mumbai : " + mumbai.length
    );

    this.setState({
      kerala: kerala.length,
      tamilnadu: tamilnadu.length,
      maharashtra: maharashtra.length,
      karnataka: karnataka.length,
      totalCases
    });
  };

  render() {
    const {
      kerala,
      maharashtra,
      tamilnadu,
      karnataka,
      totalCases
    } = this.state;

    return (
      <div>
        <h4>Total cases : {totalCases}</h4>
        <ul className="data-list">
          <li>
            Kerala: <strong>{kerala}</strong>
          </li>
          <li>
            Tamilnadu: <strong>{tamilnadu}</strong>
          </li>
          <li>
            Karnataka: <strong>{karnataka}</strong>
          </li>
          <li>
            Maharashtra: <strong>{maharashtra}</strong>
          </li>
        </ul>
      </div>
    );
  }
}

export default Summary;
