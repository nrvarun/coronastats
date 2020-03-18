import React from "react";

import "./App.css";

import Summary from "./components/Summary";

function App() {
  const logo =
    "https://images.newscientist.com/wp-content/uploads/2020/02/11165812/c0481846-wuhan_novel_coronavirus_illustration-spl.jpg";

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Summary />
      </header>
    </div>
  );
}

export default App;
