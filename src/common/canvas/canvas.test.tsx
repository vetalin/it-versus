import React from "react";
import { render } from "@testing-library/react";
import { Canvas } from "./Canvas";

describe("Отрисовка канваса", () => {
  beforeEach(() => {
    render(<Canvas />);
  });

  it("На странице есть холст", async () => {
    const canvas = await document.querySelector("canvas");
    expect(canvas).toBeTruthy();
  });

  it("Холст имеет размеры 800x500", async () => {
    const canvas = await document.querySelector("canvas");
    expect(canvas).toHaveStyle("width: 800px");
    expect(canvas).toHaveStyle("height: 500px");
  });
});

export {};
