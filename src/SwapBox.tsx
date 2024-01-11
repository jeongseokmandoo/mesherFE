import React, { useEffect, useState } from "react";
import ModalBox from "./ModalBox";
import styles from "./SwapBox.module.css";
import { TOKENS, TokenPriceData } from "./constants";
import { SwapInputBox } from "./components/swap/SwapInputBox";
import HeaderBox from "./HeaderBox";
import settingIcon from "./assets/icons8-settings-50.png";

const SwapBtn: React.FC<{ tokenValue: boolean }> = ({ tokenValue }) => {
  return tokenValue ? (
    <div
      className={styles.swapBtn}
      style={{ backgroundColor: "#3A70DA" }}
      onClick={() => {
        alert("준비 중입니다");
      }}
    >
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
  const [tokenValue1, setTokenValue1] = useState("");
  const [tokenName2, setTokenName2] = useState("USDC");
  const [tokenValue2, setTokenValue2] = useState("");
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
  const [exchangeContent, setExchangeContent] = useState("");

  const handleMainClick = () => alert("준비 중입니다");

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

  // input 토큰 가격 입력 시 실행되는 함수
  const handleChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputVal = e.target.value;

    // 숫자와 . 이외의 문자를 제거
    inputVal = inputVal.replace(/[^0-9.]/g, "");

    while (
      inputVal.charAt(0) === "0" &&
      inputVal.charAt(1) !== "." &&
      inputVal.length > 1
    ) {
      inputVal = inputVal.slice(1);
    }

    // "."이 두 번 이상 포함된 경우 무시
    if ((inputVal.match(/\./g) || []).length > 1) {
      return;
    }

    // 소수점 10번째 자리까지만 허용
    const decimalIndex = inputVal.indexOf(".");
    if (decimalIndex !== -1 && inputVal.length > decimalIndex + 11) {
      inputVal = inputVal.slice(0, decimalIndex + 11);
    }

    console.log(inputVal);
    if (inputVal !== "") {
      const tokenVal1 = parseFloat(inputVal);
      console.log(tokenVal1);
      setTokenValue1(inputVal);
      const tokenVal2 = (usd1 / (usd2 || 1)) * tokenVal1;
      const deciIndex = String(tokenVal1).indexOf(".");
      if (deciIndex !== -1 && String(tokenVal2).length > deciIndex + 11) {
        setTokenValue2(String(tokenVal2).slice(0, deciIndex + 11));
      } else {
        setTokenValue2(String(tokenVal2));
      }
      setExchangeValue1(tokenVal1 * usd1);
      setExchangeContent(
        `1 ${tokenName2} = ${tokenVal1 / tokenVal2} ${tokenName1} ($${usd2})`
      );
    } else {
      setTokenValue1("0");
      setTokenValue2("0");
      setExchangeValue1(0);
      setExchangeContent("");
    }
  };

  const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputVal = e.target.value;

    // 숫자와 . 이외의 문자를 제거
    inputVal = inputVal.replace(/[^0-9.]/g, "");

    while (
      inputVal.charAt(0) === "0" &&
      inputVal.charAt(1) !== "." &&
      inputVal.length > 1
    ) {
      inputVal = inputVal.slice(1);
    }
    console.log(inputVal);

    // "."이 두 번 이상 포함된 경우 무시
    if ((inputVal.match(/\./g) || []).length > 1) {
      return;
    }

    // 소수점 10번째 자리까지만 허용
    const decimalIndex = inputVal.indexOf(".");
    if (decimalIndex !== -1 && inputVal.length > decimalIndex + 11) {
      inputVal = inputVal.slice(0, decimalIndex + 11);
    }

    if (inputVal !== "") {
      const tokenVal2 = parseFloat(inputVal);
      setTokenValue2(inputVal);
      const tokenVal1 = (usd1 / (usd2 || 1)) * tokenVal2;
      const deciIndex = String(tokenVal1).indexOf(".");
      if (deciIndex !== -1 && String(tokenVal1).length > deciIndex + 11) {
        setTokenValue1(String(tokenVal1).slice(0, deciIndex + 11));
      } else {
        setTokenValue1(String(tokenVal1));
      }
      setExchangeValue1(tokenVal2 * usd2);
      setExchangeContent(
        `1 ${tokenName1} = ${tokenVal2 / tokenVal1} ${tokenName2} ($${usd1})`
      );
    } else {
      setTokenValue2("0");
      setTokenValue1("0");
      setExchangeValue2(0);
      setExchangeContent("");
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
    setTokenValue1("0");
    setTokenValue2("0");
    setExchangeValue1(0);
    setExchangeValue2(0);
    setExchangeContent("");
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
        <HeaderBox
          text="스왑"
          icon={settingIcon}
          handleClick={handleMainClick}
        />
        <SwapInputBox
          tokenValue={tokenValue1}
          onChange={handleChange1}
          onClick={openModal}
          tokenName={tokenName1}
          tokenBtn="tokenBtn1"
          exchangeValue={exchangeValue1}
        />
        <SwapInputBox
          tokenValue={tokenValue2}
          onChange={handleChange2}
          onClick={openModal}
          tokenName={tokenName2}
          tokenBtn="tokenBtn2"
          exchangeValue={exchangeValue2}
        />

        <div className={styles.exchangeRate}>{exchangeContent}</div>

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
