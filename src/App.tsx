import React from "react";
import "./App.css";
import settingIcon from "./assets/icons8-settings-50.png";
import HeaderBox from "./HeaderBox";
import SwapBox from "./SwapBox";

function App() {
  const handleMainClick = () => alert("아직 준비 중입니다.");

  return (
    <div className="container">
      <HeaderBox text="스왑" icon={settingIcon} handleClick={handleMainClick} />
      <SwapBox />
    </div>
  );
}

export default App;
