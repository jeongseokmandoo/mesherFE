import React, { useState } from "react";
import ModalBox from "./ModalBox";
import styles from "./SwapBox.module.css";

const SwapInputBox: React.FC<{
  tokenValue: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  tokenName: string;
  tokenBtn: string;
}> = ({ tokenValue, onChange, onClick, tokenName, tokenBtn }) => {
  return (
    <div className={styles.inputBox}>
      <input
        type="text"
        value={tokenValue}
        onChange={onChange}
        placeholder="금액"
      />
      <div className={styles.exchange}>1212</div>
      <button className={styles[tokenBtn]} onClick={onClick}>
        {tokenName}
      </button>
    </div>
  );
};

const SwapBtn: React.FC<{ tokenValue: boolean }> = ({ tokenValue }) => {
  return tokenValue ? (
    <div className={styles.swapBtn} style={{ backgroundColor: "blue" }}>
      스왑
    </div>
  ) : (
    <div
      className={styles.swapBtn}
      style={{ backgroundColor: "rgb(30, 29, 46)" }}
    >
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
  const tokenValue = Boolean(tokenValue1 || tokenValue2);

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
          onClick={openModal}
          tokenName={tokenName1}
          tokenBtn="tokenBtn1"
        />
        <SwapInputBox
          tokenValue={tokenValue2}
          onChange={(e) => setTokenValue2(parseFloat(e.target.value))}
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
