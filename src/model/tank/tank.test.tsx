import React from "react";
import { getTank } from "./tank";
import { thenCheckPosition, whenPushKey } from "../../test/helper";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../common/canvas/const";
import {
  TANK_HEIGHT,
  TANK_INITIAL_POSITION,
  TANK_SPEED,
  TANK_WIDTH,
} from "./const";

describe("Отрисовка и движения коруса танка", () => {
  it("На холсте есть танк", async () => {
    const tank = await getTank();
    expect(tank).toBeTruthy();
  });

  it("У танка есть текстура", async () => {
    const tank = await getTank();
    expect(tank.image).toBeTruthy();
  });

  it("Танк имеет размеры 50x50", async () => {
    const tank = await getTank();
    expect(tank.size.width).toBe(TANK_WIDTH);
    expect(tank.size.height).toBe(TANK_HEIGHT);
  });

  it("Танк имеет координаты 10x10", async () => {
    const tank = await getTank();
    expect(tank.position.x).toBe(TANK_INITIAL_POSITION.x);
    expect(tank.position.y).toBe(TANK_INITIAL_POSITION.y);
  });

  it("Когда я нажимаю клавиши на клавиатуре (влево вправо вверх вниз, то танк двигается)", async () => {
    const tank = await getTank();
    tank.initKeyboardListener();

    thenCheckPosition(tank, TANK_INITIAL_POSITION.x, TANK_INITIAL_POSITION.y);

    whenPushKey("ArrowLeft");
    thenCheckPosition(
      tank,
      TANK_INITIAL_POSITION.x - TANK_SPEED,
      TANK_INITIAL_POSITION.y
    );

    whenPushKey("ArrowDown");
    thenCheckPosition(
      tank,
      TANK_INITIAL_POSITION.x - TANK_SPEED,
      TANK_INITIAL_POSITION.y + TANK_SPEED
    );

    whenPushKey("ArrowRight");
    thenCheckPosition(
      tank,
      TANK_INITIAL_POSITION.x,
      TANK_INITIAL_POSITION.y + TANK_SPEED
    );

    whenPushKey("ArrowUp");
    thenCheckPosition(tank, TANK_INITIAL_POSITION.x, TANK_INITIAL_POSITION.y);
  });

  it("Танк должен двигаться влево, если я нажимаю левую кнопку", async () => {
    const tank = await getTank();
    expect(tank.position.x).toBe(TANK_INITIAL_POSITION.x);
    expect(tank.position.y).toBe(TANK_INITIAL_POSITION.y);
    tank.moveLeft(tank.position, TANK_SPEED);
    expect(tank.position.x).toBe(TANK_INITIAL_POSITION.x - TANK_SPEED);
    expect(tank.position.y).toBe(TANK_INITIAL_POSITION.y);
  });

  it("Танк должен двигаться вправо, если я нажимаю вправо кнопку", async () => {
    const tank = await getTank();
    expect(tank.position.x).toBe(TANK_INITIAL_POSITION.x);
    expect(tank.position.y).toBe(TANK_INITIAL_POSITION.y);
    tank.moveRight(tank.position, TANK_SPEED);
    expect(tank.position.x).toBe(TANK_INITIAL_POSITION.x + TANK_SPEED);
    expect(tank.position.y).toBe(TANK_INITIAL_POSITION.y);
  });

  it("Танк должен двигаться вверх, если я нажимаю кнопку вверх", async () => {
    const tank = await getTank();
    expect(tank.position.x).toBe(TANK_INITIAL_POSITION.x);
    expect(tank.position.y).toBe(TANK_INITIAL_POSITION.y);
    tank.moveUp(tank.position, TANK_SPEED);
    expect(tank.position.x).toBe(TANK_INITIAL_POSITION.x);
    expect(tank.position.y).toBe(TANK_INITIAL_POSITION.y - TANK_SPEED);
  });

  it("Танк должен двигаться вниз, если я нажимаю кнопку вниз", async () => {
    const tank = await getTank();
    expect(tank.position.x).toBe(TANK_INITIAL_POSITION.x);
    expect(tank.position.y).toBe(TANK_INITIAL_POSITION.y);
    tank.moveDown(tank.position, TANK_SPEED);
    expect(tank.position.x).toBe(TANK_INITIAL_POSITION.x);
    expect(tank.position.y).toBe(TANK_INITIAL_POSITION.y + TANK_SPEED);
  });

  it("Танк не должен выходить за пределы области влево и вверх", async () => {
    const tank = await getTank();
    tank.initKeyboardListener();
    thenCheckPosition(tank, TANK_INITIAL_POSITION.x, TANK_INITIAL_POSITION.y);
    whenPushKey("ArrowLeft");
    thenCheckPosition(
      tank,
      TANK_INITIAL_POSITION.x - TANK_SPEED,
      TANK_INITIAL_POSITION.y
    );
    whenPushKey("ArrowLeft");
    thenCheckPosition(
      tank,
      TANK_INITIAL_POSITION.x - TANK_SPEED,
      TANK_INITIAL_POSITION.y
    );
    whenPushKey("ArrowUp");
    whenPushKey("ArrowUp");
    thenCheckPosition(
      tank,
      TANK_INITIAL_POSITION.x - TANK_SPEED,
      TANK_INITIAL_POSITION.y - TANK_SPEED
    );
  });

  it("Танк не должен выходить за пределы области вправо", async () => {
    const tank = await getTank();
    tank.initKeyboardListener();

    thenCheckPosition(tank, TANK_INITIAL_POSITION.x, TANK_INITIAL_POSITION.y);
    for (let i = 0; i < Math.floor(CANVAS_WIDTH / (TANK_SPEED / 2)); i++) {
      whenPushKey("ArrowRight");
    }
    thenCheckPosition(tank, CANVAS_WIDTH - TANK_WIDTH, TANK_INITIAL_POSITION.y);
  });

  it("Танк не должен выходить за пределы области вниз", async () => {
    const tank = await getTank();
    tank.initKeyboardListener();

    thenCheckPosition(tank, TANK_INITIAL_POSITION.x, TANK_INITIAL_POSITION.y);
    for (let i = 0; i < Math.floor(CANVAS_HEIGHT / (TANK_SPEED / 2)); i++) {
      whenPushKey("ArrowDown");
    }
    thenCheckPosition(
      tank,
      TANK_INITIAL_POSITION.x,
      CANVAS_HEIGHT - TANK_HEIGHT
    );
  });
});

export {};
