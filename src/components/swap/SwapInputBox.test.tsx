import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { SwapInputBox } from "./SwapInputBox";

describe("SwapInputBox", () => {
  const mockOnChange = jest.fn();
  const mockOnClick = jest.fn();
  const tokenName = "token1";
  const tokenBtn = "tokenBtn1";
  const exchangeValue = 100;

  //초기 렌더링을 확인하는 테스트
  test("renders SwapInputBox component", () => {
    render(
      <SwapInputBox
        tokenValue=""
        onChange={mockOnChange}
        onClick={mockOnClick}
        tokenName={tokenName}
        tokenBtn={tokenBtn}
        exchangeValue={exchangeValue}
      />
    );
    expect(screen.getByPlaceholderText("0.0")).toBeInTheDocument();
    expect(screen.getByText(tokenName)).toBeInTheDocument();
    expect(
      screen.getByText(`$ ${exchangeValue.toFixed(10)}`)
    ).toBeInTheDocument();
  });

  // tokenValue가 잘 변경되는지 확인하는 테스트
  test("updates token values on change", () => {
    render(
      <SwapInputBox
        tokenValue=""
        onChange={mockOnChange}
        onClick={mockOnClick}
        tokenName={tokenName}
        tokenBtn={tokenBtn}
        exchangeValue={exchangeValue}
      />
    );

    const input = screen.getByRole("textbox", { name: /token1/i });
    fireEvent.change(input, { target: { value: "10" } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  // 버튼 클릭 시 onClick이 실행되는지 확인하는 테스트
  test("button click triggers onClick", () => {
    render(
      <SwapInputBox
        tokenValue=""
        onChange={mockOnChange}
        onClick={mockOnClick}
        tokenName={tokenName}
        tokenBtn={tokenBtn}
        exchangeValue={exchangeValue}
      />
    );

    const button = screen.getByRole("button", { name: /token1/i });
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
