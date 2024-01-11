import React from "react";
import styles from "../../SwapBox.module.css";

export const SwapInputBox: React.FC<{
  tokenValue: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  tokenName: string;
  tokenBtn: string;
  exchangeValue: number;
}> = ({
  tokenValue,
  onChange,
  onClick,
  tokenName,
  tokenBtn,
  exchangeValue,
}) => {
  return (
    <div className={styles.inputBox}>
      <input
        type="number"
        step={0.0000000001}
        name={tokenName}
        value={tokenValue}
        onChange={onChange}
        placeholder="금액"
      />
      <div className={styles.exchange}>$ {exchangeValue}</div>
      <button className={styles[tokenBtn]} onClick={onClick}>
        {tokenName}
      </button>
    </div>
  );
};
