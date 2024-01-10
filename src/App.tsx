import React from "react";
import "./App.css";
import settingIcon from "./assets/Setting_Icon.png";
import HeaderBox from "./HeaderBox";
import SwapBox from "./SwapBox";

function App() {
  // fetch(
  //   "https://api.coingecko.com/api/v3/simple/price?vs_currencies=USD&ids=ethereum"
  // )
  //   .then((response) => response.json())
  //   .then((data) => console.log(data));

  const handleMainClick = () => alert("아직 준비 중입니다.");

  return (
    <div className="container">
      <HeaderBox text="스왑" icon={settingIcon} handleClick={handleMainClick} />
      <SwapBox />
    </div>
  );
}

export default App;
