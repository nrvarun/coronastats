import React from "react";

import "./sass/main.scss";
import Summary from "./components/Summary";
import DailyCases from "./components/DailyCases/DailyCases";
import StateWise from "./components/StateWise/StateWise";

function App() {
  return (
    <section className="content-w mt-4 mt-md-5">
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-lg-12 mb-3 mb-md-5">
            <Summary />
          </div>
          <div className="col-sm-6 col-lg-12">
            <div className="row">
              <div className="col-12 mb-4 mb-md-5">
                <DailyCases />
              </div>
              <div className="col-12 mb-4 mb-md-5">
                <StateWise />
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-2"></div>
        </div>
      </div>
    </section>
  );
}

export default App;
