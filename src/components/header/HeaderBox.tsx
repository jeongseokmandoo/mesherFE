import React from "react";
import styles from "./HeaderBox.module.css";

const HeaderBox: React.FC<{
  text: string;
  icon: string;
  handleClick: () => void;
}> = ({ text, icon, handleClick }) => {
  return (
    <div className={styles.headerbox}>
      <p>{text}</p>
      <div className={styles.btn}>
        <img src={icon} onClick={handleClick} alt="btn" />
      </div>
    </div>
  );
};

export default HeaderBox;
