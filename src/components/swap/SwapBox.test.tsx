import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import SwapBox from "./SwapBox";

describe("SwapBox", () => {
  //초기 렌더링을 확인하는 테스트
  test("renders SwapBox component", () => {
    render(<SwapBox />);
    screen.debug();
  });

  // tokenName1과 tokenName2이 잘 변경되는지 확인하는 테스트
  test("updates token names on click", async () => {
    render(<SwapBox />);

    const tokenBtn1 = screen.getByText("tokenBtn1");
    const tokenBtn2 = screen.getByText("tokenBtn2");

    fireEvent.click(tokenBtn1);
    fireEvent.click(tokenBtn2);

    await waitFor(() => {
      expect(screen.getByText("tokenName1")).toBeInTheDocument();
      expect(screen.getByText("tokenName2")).toBeInTheDocument();
    });
  });

  // tokenValue가 잘 변경되는지 확인하는 테스트
  test("updates token values on change", async () => {
    render(<SwapBox />);

    const input1 = screen.getByRole("textbox", { name: /tokenValue1/i });
    const input2 = screen.getByRole("textbox", { name: /tokenValue2/i });

    fireEvent.change(input1, { target: { value: "10" } });
    fireEvent.change(input2, { target: { value: "20" } });

    expect(input1).toBe("10");
    expect(input2).toBe("20");
  });

  // 모달이 올바르게 작동하는지 확인하는 테스트
  test("handle modal open/close", async () => {
    render(<SwapBox />);

    const openModalBtn = screen.getByRole("button", { name: /openModal/i });
    const closeModalBtn = screen.getByRole("button", { name: /closeModal/i });

    fireEvent.click(openModalBtn);

    await waitFor(() => {
      expect(screen.getByText("ModalBox")).toBeInTheDocument();
    });

    fireEvent.click(closeModalBtn);

    await waitFor(() => {
      expect(screen.queryByText("ModalBox")).not.toBeInTheDocument();
    });
  });
});
