import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../common/canvas/const";
import { TANK_HEIGHT, TANK_SPEED, TANK_WIDTH } from "./const";
import { MoveArrowsKeys, MoveTankFn, Tank } from "./interface";
import { getTankTower } from "./tankTower";

export const moveTank =
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
    tank.tower = getTankTower(tank.size, tankCurrentPosition);
  };
