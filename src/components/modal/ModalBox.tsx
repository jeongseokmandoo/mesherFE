import React, { useEffect, useState } from "react";
import HeaderBox from "../header/HeaderBox";
import xIcon from "../../assets/icons8-x-50.png";
import styles from "./ModalBox.module.css";
import { TOKENS } from "../../constants";

const RecentTokenList: React.FC<{ recentTokenList: string[] }> = ({
  recentTokenList,
}) => {
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
      <div className={styles.tokenName}>{token.name}</div>
      <div className={styles.tokenId}>{token.id}</div>
    </div>
  );
};

const TokenList: React.FC<{
  tokens: { name: string; id: string }[];
  handleTokenClick: (tokenName: string) => void;
}> = ({ tokens, handleTokenClick }) => {
  return (
    <>
      <div className={styles.tokenList}>
        {tokens.map((token: { name: string; id: string }) => (
          <TokenBox
            key={token.id}
            token={token}
            handleTokenClick={handleTokenClick}
          />
        ))}
      </div>
      <div
        className={styles.tokenManageBtn}
        onClick={() => {
          alert("준비 중입니다");
        }}
      >
        토큰 목록 관리
      </div>
    </>
  );
};

const ModalBox: React.FC<{
  modalOpen: boolean;
  closeModal: () => void;
  handleTokenClick: (tokenName: string) => void;
  recentTokenList: string[];
}> = ({ modalOpen, closeModal, handleTokenClick, recentTokenList }) => {
  const [tokenValue, setTokenValue] = useState("");
  const [filteredTokens, setFilteredTokens] = useState(TOKENS);

  useEffect(() => {
    const result = TOKENS.filter((token) =>
      token.name.toLowerCase().includes(tokenValue.toLowerCase())
    );
    setFilteredTokens(result);
  }, [tokenValue]);

  return modalOpen ? (
    <div className={styles.modalBox}>
      <HeaderBox text="토큰 선택" icon={xIcon} handleClick={closeModal} />
      <input
        type="text"
        value={tokenValue}
        onChange={(e) => setTokenValue(e.target.value)}
        placeholder="이름 검색 또는 주소 붙여넣기"
      />
      <RecentTokenList recentTokenList={recentTokenList} />
      <TokenList tokens={filteredTokens} handleTokenClick={handleTokenClick} />
    </div>
  ) : null;
};

export default ModalBox;
