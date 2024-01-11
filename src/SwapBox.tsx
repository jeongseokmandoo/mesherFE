import React, { useEffect, useState } from "react";
import ModalBox from "./ModalBox";
import styles from "./SwapBox.module.css";

const SwapInputBox: React.FC<{
  tokenValue: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onExchange: (value: number) => void;
  onUsdChange: (rate: number) => void;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  tokenName: string;
  tokenBtn: string;
}> = ({
  tokenValue,
  onChange,
  onExchange,
  onUsdChange,
  onClick,
  tokenName,
  tokenBtn,
}) => {
  const [exchangeRate, setExchangeRate] = useState(0);
  const [exchangeValue, setExchangeValue] = useState(0);

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

  const getExchangeRate = async (token: string) => {
    // console.log(1);
    let tokenId = "";
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].name === token) {
        tokenId = tokens[i].id;
        break;
      }
      // console.log(tokenId);
    }
    try {
      //   const response = await fetch(
      //     `https://api.coingecko.com/api/v3/simple/price?vs_currencies=USD&ids=${tokenId}`
      //   );
      //   if (!response.ok) {
      //     throw new Error("Network response was not ok");
      //   }
      //   const data = await response.json();
      //   console.log(11);
      //   setExchangeRate(data[tokenId].usd);
    } catch (error) {
      console.error(`Failed to fetch price for ${token}: ${error}`);
      setExchangeRate(0);
    }
  };

  //   useEffect(() => {
  getExchangeRate(tokenName);
  //   }, [tokenName]);

  // 이 안에 getExchageRate 함수를 실행시키려다가, 비동기 함수여서 exchangeRate가 반영이 안되는 문제가 있었음
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    onUsdChange(exchangeRate);
    onExchange(exchangeRate);
    // console.log(Number(e.target.value));
    // console.log(exchangeRate);

    setExchangeValue(Number(e.target.value) * exchangeRate);
  };

  return (
    <div className={styles.inputBox}>
      <input
        type="text"
        value={tokenValue}
        onChange={handleChange}
        placeholder="금액"
      />
      <div className={styles.exchange}>$ {exchangeValue}</div>
      <button className={styles[tokenBtn]} onClick={onClick}>
        {tokenName}
      </button>
    </div>
  );
};

const SwapBtn: React.FC<{ tokenValue: boolean }> = ({ tokenValue }) => {
  return tokenValue ? (
    <div className={styles.swapBtn} style={{ backgroundColor: "#3A70DA" }}>
      스왑
    </div>
  ) : (
    <div className={styles.swapBtn} style={{ backgroundColor: "#1b1d21" }}>
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
  const [swapBoxDisplay, setSwapBoxDisplay] = useState("flex");
  const [usd1, setUsd1] = useState(0);
  const [usd2, setUsd2] = useState(0);
  const tokenValue = Boolean(tokenValue1 || tokenValue2);

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

  const getUsdRate = async (token: string) => {
    let tokenId = "";
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].name === token) {
        tokenId = tokens[i].id;
        break;
      }
    }
    try {
      //   const response = await fetch(
      //     `https://api.coingecko.com/api/v3/simple/price?vs_currencies=USD&ids=${tokenId}`
      //   );
      //   if (!response.ok) {
      //     throw new Error("Network response was not ok");
      //   }
      //   const data = await response.json();
      //   console.log(data[tokenId].usd);
      //   console.log(22);
      //   return data[tokenId].usd;
    } catch (error) {
      console.error(`Failed to fetch price for ${token}: ${error}`);
      return 0;
    }
  };

  const openModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    setModalOpen(true);
    setTokenBtnValue(e.currentTarget.className);
    // console.log(tokenBtnValue);
    setSwapBoxDisplay("none");
  };

  const closeModal = () => {
    setModalOpen(false);
    setSwapBoxDisplay("flex");
  };

  const handleExchange1 = (value: number) => {
    // console.log(value);
    // console.log(myUsd);
    setUsd2(Number(getUsdRate(tokenName2)));
    console.log("usd2", usd2);
    setTokenValue2(value / (usd2 || 1));
  };

  const handleExchange2 = (value: number) => {
    setUsd1(Number(getUsdRate(tokenName1)));
    console.log("usd1", usd1);
    setTokenValue1(value / (usd1 || 1));
  };

  const handleTokenClick = (tokenName: string) => {
    //기존 로컬스토리지 가져오기
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
      <div className={styles.swapBox} style={{ display: swapBoxDisplay }}>
        <SwapInputBox
          tokenValue={tokenValue1}
          onChange={(e) => setTokenValue1(parseFloat(e.target.value))}
          onExchange={handleExchange1}
          onUsdChange={setUsd1}
          onClick={openModal}
          tokenName={tokenName1}
          tokenBtn="tokenBtn1"
        />
        <SwapInputBox
          tokenValue={tokenValue2}
          onChange={(e) => setTokenValue2(parseFloat(e.target.value))}
          onExchange={handleExchange2}
          onUsdChange={setUsd2}
          onClick={openModal}
          tokenName={tokenName2}
          tokenBtn="tokenBtn2"
        />
        <div className={styles.exchangeRate}> 얼마얼마</div>

        <SwapBtn tokenValue={tokenValue} />
      </div>
      <ModalBox
        modalOpen={modalOpen}
        closeModal={closeModal}
        handleTokenClick={handleTokenClick}
        recentTokenList={recentTokens}
      />
    </>
  );
};

export default SwapBox;
