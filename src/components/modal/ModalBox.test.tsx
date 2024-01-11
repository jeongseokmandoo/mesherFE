import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ModalBox from "./ModalBox";

test("ModalBox 컴포넌트가 정상적으로 렌더링 되고, 특정 기능들이 정상적으로 작동하는지 확인", () => {
  const handleClose = jest.fn();
  const handleTokenClick = jest.fn();

  render(
    <ModalBox
      modalOpen={true}
      closeModal={handleClose}
      handleTokenClick={handleTokenClick}
      recentTokenList={["ETH", "DAI"]}
    />
  );

  // ModalBox가 정상적으로 렌더링되는지 확인
  const modalElement = screen.getByText("토큰 선택");
  expect(modalElement).toBeInTheDocument();

  // RecentTokenList가 recentTokenList prop에 따라서 잘 렌더링 되는지 확인
  //   const recentTokenElement = screen.getByText("ETH");
  //   expect(recentTokenElement).toBeInTheDocument();

  // input 태그에 "ETH"를 검색했을 때, 잘 출력되는지 확인
  const inputElement =
    screen.getByPlaceholderText("이름 검색 또는 주소 붙여넣기");
  userEvent.type(inputElement, "ETH");
  expect(inputElement).toHaveValue("ETH");

  // TokenList 중 하나를 클릭했을 때 handleClose 함수가 호출되는지 확인
  //   const tokenElement = screen.getByText("ETH");
  //   fireEvent.click(tokenElement);
  //   expect(handleClose).toHaveBeenCalledTimes(1);
});
