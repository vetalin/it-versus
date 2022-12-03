import React from "react";
import { getTank } from "./tank";
import { thenCheckPosition, whenPushKey } from "../../test/helper";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../common/canvas/const";
import {
  TANK_BULLET_HEIGHT,
  TANK_BULLET_WIDTH,
  TANK_GUN_HEIGHT,
  TANK_GUN_WIDTH,
  TANK_HEIGHT,
  TANK_INITIAL_POSITION,
  TANK_SPEED,
  TANK_TOWER_HEIGHT,
  TANK_TOWER_WIDTH,
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
    tank.moveLeft(tank, TANK_SPEED);
    expect(tank.position.x).toBe(TANK_INITIAL_POSITION.x - TANK_SPEED);
    expect(tank.position.y).toBe(TANK_INITIAL_POSITION.y);
  });

  it("Танк должен двигаться вправо, если я нажимаю вправо кнопку", async () => {
    const tank = await getTank();
    expect(tank.position.x).toBe(TANK_INITIAL_POSITION.x);
    expect(tank.position.y).toBe(TANK_INITIAL_POSITION.y);
    tank.moveRight(tank, TANK_SPEED);
    expect(tank.position.x).toBe(TANK_INITIAL_POSITION.x + TANK_SPEED);
    expect(tank.position.y).toBe(TANK_INITIAL_POSITION.y);
  });

  it("Танк должен двигаться вверх, если я нажимаю кнопку вверх", async () => {
    const tank = await getTank();
    expect(tank.position.x).toBe(TANK_INITIAL_POSITION.x);
    expect(tank.position.y).toBe(TANK_INITIAL_POSITION.y);
    tank.moveUp(tank, TANK_SPEED);
    expect(tank.position.x).toBe(TANK_INITIAL_POSITION.x);
    expect(tank.position.y).toBe(TANK_INITIAL_POSITION.y - TANK_SPEED);
  });

  it("Танк должен двигаться вниз, если я нажимаю кнопку вниз", async () => {
    const tank = await getTank();
    expect(tank.position.x).toBe(TANK_INITIAL_POSITION.x);
    expect(tank.position.y).toBe(TANK_INITIAL_POSITION.y);
    tank.moveDown(tank, TANK_SPEED);
    expect(tank.position.x).toBe(TANK_INITIAL_POSITION.x);
    expect(tank.position.y).toBe(TANK_INITIAL_POSITION.y + TANK_SPEED);
  });

  it("Танк не должен выходить за пределы области влево и вверх", async () => {
    const tank = await getTank();
    tank.initKeyboardListener();
    thenCheckPosition(tank, TANK_INITIAL_POSITION.x, TANK_INITIAL_POSITION.y);
    for (let i = 0; i < 100; i++) whenPushKey("ArrowLeft");
    thenCheckPosition(tank, 0, TANK_INITIAL_POSITION.y);
    for (let i = 0; i < 100; i++) whenPushKey("ArrowUp");
    thenCheckPosition(tank, 0, 0);
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

describe("Вот это Поворот корпуса танка", () => {});

describe("Отрисовка башни танка", () => {
  it("Башня должна быть размером 20x20", async () => {
    const tankTower = (await getTank()).tower;
    expect(tankTower.size.height).toBe(TANK_TOWER_HEIGHT);
    expect(tankTower.size.width).toBe(TANK_TOWER_WIDTH);
  });

  it("Башня должна стоять в центре танка", async () => {
    const tankTower = (await getTank()).tower;
    expect(tankTower.position.x).toBe(
      TANK_INITIAL_POSITION.x + (TANK_WIDTH / 2 - TANK_TOWER_WIDTH / 2)
    );
    expect(tankTower.position.y).toBe(
      TANK_INITIAL_POSITION.y + (TANK_HEIGHT / 2 - TANK_TOWER_HEIGHT / 2)
    );
  });

  it("У башни есть пушка и она торчит и она имеет размеры 5x20", async () => {
    const tankTower = (await getTank()).tower;
    expect(tankTower.gun).toBeDefined();

    const gun = tankTower.gun;
    expect(gun.size.height).toBe(TANK_GUN_HEIGHT);
    expect(gun.size.width).toBe(TANK_GUN_WIDTH);

    expect(gun.position.x).toBe(
      tankTower.position.x + TANK_TOWER_WIDTH / 2 - TANK_GUN_WIDTH / 2
    );
    expect(gun.position.y).toBe(
      tankTower.position.y - TANK_GUN_HEIGHT + TANK_TOWER_HEIGHT / 2
    );
  });

  it("Башня и пушка двигается вместе с танком", async () => {
    const tank = await getTank();

    tank.moveDown(tank);

    const newPositionTank = TANK_INITIAL_POSITION.y + TANK_SPEED;
    const newPositionTower =
      newPositionTank + (TANK_HEIGHT / 2 - TANK_TOWER_HEIGHT / 2);
    const newPositionGun =
      newPositionTower - TANK_GUN_HEIGHT + TANK_TOWER_HEIGHT / 2;
    expect(tank.tower.position.y).toBe(newPositionTower);
    expect(tank.tower.gun.position.y).toBe(newPositionGun);
  });
});

describe("Поворот башни танка", () => {});

describe("Отрисовка снаряда", () => {
  it("Размер снаряда как в константах", async () => {
    const tank = await getTank();
    expect(tank.bullet.size.width).toBe(TANK_BULLET_WIDTH);
    expect(tank.bullet.size.height).toBe(TANK_BULLET_HEIGHT);
  });

  it("Снаряд должен появляться по нажатию на пробел", async () => {
    const tank = await getTank();

    expect(tank.bullet.visible).toBe(false);
    whenPushKey("Space");
    expect(tank.bullet.visible).toBe(true);
  });

  it("Снаряд должен лететь вверх", async () => {
    const tank = await getTank();
    whenPushKey("Space");
    expect(tank.bullet.position.x).toBe(tank.tower.gun.position.x);
    expect(tank.bullet.position.y).toBeLessThan(
      tank.tower.gun.position.y - TANK_BULLET_HEIGHT
    );
  });

  it("Снаряд должен исчезать", () => {});
});

describe("Отрисовка врага", () => {});

describe("Попадание снаряда во врага", () => {});

export {};
