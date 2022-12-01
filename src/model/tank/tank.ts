import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../common/canvas/const";
import {
  TANK_HEIGHT,
  TANK_INITIAL_POSITION,
  TANK_SPEED,
  TANK_WIDTH,
} from "./const";
import {
  KeyboardListenerFn,
  MoveArrowsKeys,
  MoveTankFn,
  Position,
  Size,
  Tank,
} from "./interface";
import { getTankTower } from "./tankTower";

export const getTank = async (): Promise<Tank> => {
  const size: Size = { width: TANK_WIDTH, height: TANK_HEIGHT };
  const position: Position = {
    x: TANK_INITIAL_POSITION.x,
    y: TANK_INITIAL_POSITION.y,
  };

  const moveTank =
    (flow: MoveArrowsKeys): MoveTankFn =>
    (tank: Tank, step = TANK_SPEED) => {
      let { position: tankCurrentPosition } = tank;
      switch (flow) {
        case "ArrowLeft":
          tankCurrentPosition.x -= step;
          if (tankCurrentPosition.x < 0) {
            tankCurrentPosition.x = 0;
          }
          break;
        case "ArrowRight":
          tankCurrentPosition.x += step;
          if (tankCurrentPosition.x > CANVAS_WIDTH - TANK_WIDTH) {
            tankCurrentPosition.x = CANVAS_WIDTH - TANK_WIDTH;
          }
          break;
        case "ArrowUp":
          tankCurrentPosition.y -= step;
          if (tankCurrentPosition.y < 0) {
            tankCurrentPosition.y = 0;
          }
          break;
        case "ArrowDown":
          tankCurrentPosition.y += step;
          if (tankCurrentPosition.y > CANVAS_HEIGHT - TANK_HEIGHT) {
            tankCurrentPosition.y = CANVAS_HEIGHT - TANK_HEIGHT;
          }
          break;
      }
      tank.tower = getTankTower(size, tankCurrentPosition);
    };

  const initKeyboardListener: KeyboardListenerFn = (): void => {
    document.addEventListener("keydown", (event: KeyboardEvent) => {
      moveTank(event.key as MoveArrowsKeys)(tank);
    });
  };

  const tank = {
    image: true,
    size,
    position,
    moveRight: moveTank("ArrowRight"),
    moveLeft: moveTank("ArrowLeft"),
    moveUp: moveTank("ArrowUp"),
    moveDown: moveTank("ArrowDown"),
    initKeyboardListener,
    tower: getTankTower(size, position),
  };

  return tank;
};
