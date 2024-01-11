import React, { useEffect, useState } from "react";
import ModalBox from "./ModalBox";
import styles from "./SwapBox.module.css";
import { TOKENS, TokenPriceData } from "./constants";
import { SwapInputBox } from "./components/swap/SwapInputBox";

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
  const [usd1, setUsd1] = useState(0); // 각 1토큰 별 달러 가격
  const [usd2, setUsd2] = useState(0);
  const [exchangeValue1, setExchangeValue1] = useState(0);
  const [exchangeValue2, setExchangeValue2] = useState(0);
  const [tokenServerData, setTokenServerData] = useState<TokenPriceData>();
  const tokenValue = Boolean(tokenValue1 || tokenValue2);

  const getUsdRate = async (
    tokens: {
      name: string;
      id: string;
    }[]
  ) => {
    const idsQuery = ""
      .concat(...tokens.map(({ name, id }) => `${id},`))
      .slice(0, -1);
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?vs_currencies=USD&ids=${idsQuery}`
    );
    return response.json();
  };

  useEffect(() => {
    const fetchUsdRate = async () => {
      const data = await getUsdRate(TOKENS);
      setTokenServerData(data);
    };
    fetchUsdRate();
  }, []);

  useEffect(() => {
    if (tokenServerData) {
      const token1 = TOKENS.find(({ name, id }) => name === tokenName1);
      if (token1 && token1.id in tokenServerData) {
        setUsd1(tokenServerData[token1.id].usd);
        // 여기서 price를 사용하세요.
      }
      const token2 = TOKENS.find(({ name, id }) => name === tokenName2);
      if (token2 && token2.id in tokenServerData) {
        setUsd2(tokenServerData[token2.id].usd);
        // 여기서 price를 사용하세요.
      }
    }
  }, [tokenServerData, tokenName1, tokenName2]);

  // modal 여닫는 함수
  const openModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    setModalOpen(true);
    setTokenBtnValue(e.currentTarget.className);
    setSwapBoxDisplay("none");
  };

  const closeModal = () => {
    setModalOpen(false);
    setSwapBoxDisplay("flex");
  };

  useEffect(() => {
    setTokenValue2((usd1 / (usd2 || 1)) * tokenValue1);
  }, [tokenValue1]);

  useEffect(() => {
    setTokenValue1((usd2 / (usd1 || 1)) * tokenValue2);
  }, [tokenValue2]);

  // input 토큰 가격 입력 시 실행되는 함수
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(usd1, usd2);
    if (e.target.name === tokenName1) {
      setTokenValue1(parseFloat(e.target.value));
      setExchangeValue1(Number(e.target.value) * usd1);
      console.log(tokenValue2);
    } else if (e.target.name === tokenName2) {
      setTokenValue1(parseFloat(e.target.value));
      setExchangeValue2(Number(e.target.value) * usd2);
    }
  };

  useEffect(() => {
    setExchangeValue2(exchangeValue1);
  }, [exchangeValue1]);

  useEffect(() => {
    setExchangeValue1(exchangeValue2);
  }, [exchangeValue2]);

  //모달창 내에서 보여줄 최근 선택 토큰 리스트
  const handleTokenClick = (tokenName: string) => {
    const oldTokens = recentTokens;

    for (let i = 0; i < oldTokens.length; i++) {
      if (oldTokens[i] === tokenName) {
        oldTokens.splice(i, 1);
        break;
      }
    }

    const newTokens = [...oldTokens, tokenName];
    if (newTokens.length > 7) {
      newTokens.shift();
    }
    setRecentTokens(newTokens);
    localStorage.setItem("tokens", JSON.stringify(recentTokens));

    //토큰 목록 선택시 토큰 버튼 변경 기능
    if (tokenBtnValue.includes("tokenBtn1")) {
      setTokenName1(tokenName);
    } else if (tokenBtnValue.includes("tokenBtn2")) {
      setTokenName2(tokenName);
    }
    closeModal();
  };

  return (
    <>
      <div className={styles.swapBox} style={{ display: swapBoxDisplay }}>
        <SwapInputBox
          tokenValue={tokenValue1}
          onChange={handleChange}
          onClick={openModal}
          tokenName={tokenName1}
          tokenBtn="tokenBtn1"
          exchangeValue={exchangeValue1}
        />
        <SwapInputBox
          tokenValue={tokenValue2}
          onChange={handleChange}
          onClick={openModal}
          tokenName={tokenName2}
          tokenBtn="tokenBtn2"
          exchangeValue={exchangeValue2}
        />

        <div className={styles.exchangeRate}>얼마얼마</div>

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
