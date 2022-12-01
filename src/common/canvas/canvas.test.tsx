import React from "react";
import { render } from "@testing-library/react";
import { Canvas } from "./Canvas";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./const";

describe("Отрисовка канваса", () => {
  beforeEach(() => {
    render(<Canvas />);
  });

  it("На странице есть холст", async () => {
    const canvas = await document.querySelector("canvas");
    expect(canvas).toBeTruthy();
  });

  it("Холст имеет размеры как в константах", async () => {
    const canvas = await document.querySelector("canvas");
    expect(canvas).toHaveAttribute("width", CANVAS_WIDTH.toString());
    expect(canvas).toHaveAttribute("height", CANVAS_HEIGHT.toString());
  });
});

export {};
