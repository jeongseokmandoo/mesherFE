import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import HeaderBox from "./HeaderBox";

test("HeaderBox 컴포넌트가 정상적으로 렌더링 되고, 아이콘 클릭 시 handleClick 함수가 호출되는지 확인", () => {
  const handleClick = jest.fn();
  render(
    <HeaderBox text="테스트" icon="test_icon_url" handleClick={handleClick} />
  );

  // text가 정상적으로 렌더링되는지 확인
  const textElement = screen.getByText("테스트");
  expect(textElement).toBeInTheDocument();

  // icon이 정상적으로 렌더링되는지 확인
  const iconElement = screen.getByAltText("btn");
  expect(iconElement).toBeInTheDocument();
  expect(iconElement.getAttribute("src")).toBe("test_icon_url");

  // icon 클릭 시 handleClick 함수가 호출되는지 확인
  fireEvent.click(iconElement);
  expect(handleClick).toHaveBeenCalledTimes(1);
});
