import React, { useEffect, useState } from "react";
import "./App.css";
import settingIcon from "./assets/Setting_Icon.png";
import xIcon from "./assets/X_Icon.png";

interface HeaderBoxProps {
  text: string;
  icon: string;
  handleClick: () => void;
}

export const HeaderBox: React.FC<HeaderBoxProps> = ({
  text,
  icon,
  handleClick,
}) => {
  //여기에 location의 값에 따라서, handleClick 함수를 다르게 하고 싶다
  //만약에 main이면 alert창(아직 준비 중입니다.) 이 뜨게 하고 싶고
  //만약에 modal이면 SwapBox 컴포넌트에 있는 modalOpen 값을 false로 바꾸고 싶은데
  //다른 코드를 수정해서라도 가능한 방법이 있을까
  return (
    <div>
      <p>{text}</p>
      <div
        className="btn"
        onClick={handleClick}
        style={{ backgroundImage: `url(${icon})` }}
      ></div>
    </div>
  );
};

const SwapBtn: React.FC<{ tokenValue: boolean }> = (tokenValue) => {
  return tokenValue.tokenValue ? (
    <div>스왑</div>
  ) : (
    <div>금액을 입력하세요.</div>
  );
};

const SwapBox: React.FC<{}> = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [tokenName1, setTokenName1] = useState("ETH");
  const [tokenValue1, setTokenValue1] = useState(0.0);
  const [tokenName2, setTokenName2] = useState("USDC");
  const [tokenValue2, setTokenValue2] = useState(0.0);
  const tokenValue = Boolean(tokenValue1 || tokenValue2);
  let tokenBtnValue = "";

  const openModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    setModalOpen(true);
    tokenBtnValue = e.currentTarget.className;
  };

  const closeModal = () => setModalOpen(false);

  return (
    <>
      <div>
        <input
          type="text"
          value={tokenValue1}
          onChange={(e) => setTokenValue1(parseFloat(e.target.value))}
          placeholder="금액"
        />
        <div></div>
        <button className="tokenBtn1" onClick={openModal}>
          {tokenName1}
        </button>
      </div>
      <div>
        <input
          type="text"
          value={tokenValue2}
          onChange={(e) => setTokenValue2(parseFloat(e.target.value))}
          placeholder="금액"
        />
        <div></div>
        <button className="tokenBtn2" onClick={openModal}>
          {tokenName2}
        </button>
      </div>
      <Modal
        modalOpen={modalOpen}
        tokenBtnValue={tokenBtnValue}
        closeModal={closeModal}
      />
      <SwapBtn tokenValue={tokenValue} />
    </>
  );
};

const Modal: React.FC<{
  modalOpen: boolean;
  tokenBtnValue: string;
  closeModal: () => void;
}> = ({ modalOpen, tokenBtnValue, closeModal }) => {
  return modalOpen ? (
    <div className="modalBox">
      <HeaderBox text="토큰 선택" icon={xIcon} handleClick={closeModal} />
    </div>
  ) : null;
};

function App() {
  fetch(
    "https://api.coingecko.com/api/v3/simple/price?vs_currencies=USD&ids=ethereum"
  )
    .then((response) => response.json())
    .then((data) => console.log(data));

  const handleMainClick = () => alert("아직 준비 중입니다.");

  return (
    <div>
      <HeaderBox text="스왑" icon={settingIcon} handleClick={handleMainClick} />
      <SwapBox />
    </div>
  );
}

export default App;
