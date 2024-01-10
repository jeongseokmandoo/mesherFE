import React, { useEffect, useState } from "react";
import "./App.css";
import settingIcon from "./assets/Setting_Icon.png";
import xIcon from "./assets/X_Icon.png";

export const HeaderBox: React.FC<{
  text: string;
  icon: string;
  handleClick: () => void;
}> = ({ text, icon, handleClick }) => {
  //여기에 location의 값에 따라서, handleClick 함수를 다르게 하고 싶다
  //만약에 main이면 alert창(아직 준비 중입니다.) 이 뜨게 하고 싶고
  //만약에 modal이면 SwapBox 컴포넌트에 있는 modalOpen 값을 false로 바꾸고 싶은데
  //다른 코드를 수정해서라도 가능한 방법이 있을까
  return (
    <div className="headerbox">
      <p>{text}</p>
      <div className="btn">
        <img src={icon} onClick={handleClick} alt="btn" />
      </div>
    </div>
  );
};

const SwapBtn: React.FC<{ tokenValue: boolean }> = (tokenValue) => {
  return tokenValue.tokenValue ? (
    <div className="swapBtn" style={{ backgroundColor: "blue" }}>
      스왑
    </div>
  ) : (
    <div className="swapBtn" style={{ backgroundColor: "rgb(30, 29, 46)" }}>
      금액을 입력하세요.
    </div>
  );
};

const SwapBox: React.FC<{}> = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [tokenName1, setTokenName1] = useState("ETH");
  const [tokenValue1, setTokenValue1] = useState(0.0);
  const [tokenName2, setTokenName2] = useState("USDC");
  const [tokenValue2, setTokenValue2] = useState(0.0);
  const [tokenBtnValue, setTokenBtnValue] = useState("");
  const [recentTokens, setRecentTokens] = useState(
    JSON.parse(localStorage.getItem("tokens") || "[]")
  );
  const tokenValue = Boolean(tokenValue1 || tokenValue2);

  const openModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    setModalOpen(true);
    setTokenBtnValue(e.currentTarget.className);
    // console.log(tokenBtnValue);
  };

  const closeModal = () => setModalOpen(false);

  const handleTokenClick = (tokenName: string) => {
    //기존 로컬스토리지 가져오기
    // const oldTokens = JSON.parse(localStorage.getItem("tokens") || "[]");
    const oldTokens = recentTokens;

    //최근 목록에 있었으면 삭제하기
    for (let i = 0; i < oldTokens.length; i++) {
      if (oldTokens[i] === tokenName) {
        oldTokens.splice(i, 1);
        break;
      }
    }

    //최신 순서 반영한 새로운 배열로 만들고, 8개 이상 일때 오래된 것 삭제
    const newTokens = [...oldTokens, tokenName];
    if (newTokens.length > 7) {
      newTokens.shift();
    }
    setRecentTokens(newTokens);
    localStorage.setItem("tokens", JSON.stringify(recentTokens));

    if (tokenBtnValue === "tokenBtn1") {
      setTokenName1(tokenName);
    } else if (tokenBtnValue === "tokenBtn2") {
      setTokenName2(tokenName);
    }
    closeModal();
  };

  return (
    <>
      <div className="inputBox">
        <input
          type="text"
          value={tokenValue1}
          onChange={(e) => setTokenValue1(parseFloat(e.target.value))}
          placeholder="금액"
        />
        <div className="exchange">1212</div>
        <button className="tokenBtn1" onClick={openModal}>
          {tokenName1}
        </button>
      </div>
      <div className="inputBox">
        <input
          type="text"
          value={tokenValue2}
          onChange={(e) => setTokenValue2(parseFloat(e.target.value))}
          placeholder="금액"
        />
        <div className="exchange">3435</div>
        <button className="tokenBtn2" onClick={openModal}>
          {tokenName2}
        </button>
      </div>
      <div className="exchangeRate"> 얼마얼마</div>
      <ModalBox
        modalOpen={modalOpen}
        closeModal={closeModal}
        handleTokenClick={handleTokenClick}
        recentTokenList={recentTokens}
      />
      <SwapBtn tokenValue={tokenValue} />
    </>
  );
};

const RecentTokenList: React.FC<{ recentTokenList: string[] }> = ({
  recentTokenList,
}) => {
  // console.log(recentTokenList);
  const reversedList = [...recentTokenList].reverse();
  return (
    <div className="recentTokenList">
      {reversedList.map((token: string) => (
        <div className="recentTokenBox" key={token}>
          {token}
        </div>
      ))}
    </div>
  );
};

const TokenBox: React.FC<{
  token: { name: string; id: string };
  handleTokenClick: (tokenName: string) => void;
}> = ({ token, handleTokenClick }) => {
  return (
    <div
      key={token.id}
      className="tokenBox"
      onClick={() => handleTokenClick(token.name)}
    >
      <div>{token.name}</div>
      <div>{token.id}</div>
    </div>
  );
};

const TokenList: React.FC<{
  tokens: { name: string; id: string }[];
  handleTokenClick: (tokenName: string) => void;
}> = ({ tokens, handleTokenClick }) => {
  return (
    <div className="tokenList">
      {tokens.map((token: { name: string; id: string }) => (
        <TokenBox
          key={token.id}
          token={token}
          handleTokenClick={handleTokenClick}
        />
      ))}
    </div>
  );
};

const ModalBox: React.FC<{
  modalOpen: boolean;
  closeModal: () => void;
  handleTokenClick: (tokenName: string) => void;
  recentTokenList: string[];
}> = ({ modalOpen, closeModal, handleTokenClick, recentTokenList }) => {
  // console.log(tokenBtnValue);
  const [tokenValue, setTokenValue] = useState("");
  const tokens: {
    name: string;
    id: string;
  }[] = [
    { name: "ETH", id: "ethereum" },
    { name: "USDT", id: "tether" },
    { name: "USDC", id: "usd-coin" },
    { name: "DAI", id: "dai" },
    { name: "AAVE", id: "aave" },
    { name: "WBTC", id: "bitcoin" },
    { name: "AXS", id: "axie-infinity" },
    { name: "COMP", id: "compound-coin" },
    { name: "CRV", id: "curve-dao-token" },
    { name: "ENS", id: "ethereum-name-service" },
  ];
  const [filteredTokens, setFilteredTokens] = useState(tokens);

  useEffect(() => {
    const result = tokens.filter((token) =>
      token.name.toLowerCase().includes(tokenValue.toLowerCase())
    );
    setFilteredTokens(result);
  }, [tokenValue]);

  return modalOpen ? (
    <>
      <div className="modalBox">
        <HeaderBox text="토큰 선택" icon={xIcon} handleClick={closeModal} />
        <input
          type="text"
          value={tokenValue}
          onChange={(e) => setTokenValue(e.target.value)}
          placeholder="이름 검색 또는 주소 붙여넣기"
        />
        <RecentTokenList recentTokenList={recentTokenList} />
        <TokenList
          tokens={filteredTokens}
          handleTokenClick={handleTokenClick}
        />
      </div>
    </>
  ) : null;
};

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
