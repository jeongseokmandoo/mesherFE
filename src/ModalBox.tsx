import React, { useEffect, useState } from "react";
import HeaderBox from "./HeaderBox";
import xIcon from "./assets/X_Icon.png";
import styles from "./ModalBox.module.css";

const RecentTokenList: React.FC<{ recentTokenList: string[] }> = ({
  recentTokenList,
}) => {
  // console.log(recentTokenList);
  const reversedList = [...recentTokenList].reverse();
  return (
    <div className={styles.recentTokenList}>
      {reversedList.map((token: string) => (
        <div className={styles.recentTokenBox} key={token}>
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
      className={styles.tokenBox}
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
    <div className={styles.tokenList}>
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
      <div className={styles.modalBox}>
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

export default ModalBox;
