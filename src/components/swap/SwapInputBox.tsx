import React from "react";
import styles from "../../SwapBox.module.css";

export const SwapInputBox: React.FC<{
  tokenValue: string;
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
        type="text"
        name={tokenName}
        value={tokenValue}
        onChange={onChange}
        placeholder="0.0"
      />
      <div className={styles.exchange}>
        $ {parseFloat(exchangeValue.toFixed(10))}
      </div>
      <button className={styles[tokenBtn]} onClick={onClick}>
        {tokenName}
      </button>
    </div>
  );
};
