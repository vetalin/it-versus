import { Tank } from "../model/tank/interface";

export const thenCheckPosition = (tank: Tank, x: number, y: number) => {
  expect(tank.position.x).toBe(x);
  expect(tank.position.y).toBe(y);
};

export const whenPushKey = (
  key: "ArrowLeft" | "ArrowRight" | "ArrowUp" | "ArrowDown" | "Space"
) => {
  document.dispatchEvent(new KeyboardEvent("keydown", { key }));
};
