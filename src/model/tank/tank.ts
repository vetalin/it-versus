import { TANK_HEIGHT, TANK_INITIAL_POSITION, TANK_WIDTH } from "./const";
import {
  KeyboardListenerFn,
  MoveArrowsKeys,
  Position,
  Size,
  Tank,
} from "./interface";
import { moveTank } from "./moveTank";
import { getBullet } from "./tankBullet";
import { getTankTower } from "./tankTower";

export const getTank = async (): Promise<Tank> => {
  const size: Size = { width: TANK_WIDTH, height: TANK_HEIGHT };
  const position: Position = {
    x: TANK_INITIAL_POSITION.x,
    y: TANK_INITIAL_POSITION.y,
  };

  const initKeyboardListener: KeyboardListenerFn = (): void => {
    document.addEventListener("keydown", (event: KeyboardEvent) => {
      moveTank(event.code as MoveArrowsKeys)(tank);
    });

    document.addEventListener("keydown", (event: KeyboardEvent) => {
      if (event.code === "Space") {
        console.log("space");
        tank.bullet.visible = true;
        tank.bullet.fireStartTime = Date.now();
      }
    });
  };

  const tower = getTankTower(size, position);
  const bullet = getBullet(tower.gun);

  const tank = {
    image: true,
    size,
    position,
    moveRight: moveTank("ArrowRight"),
    moveLeft: moveTank("ArrowLeft"),
    moveUp: moveTank("ArrowUp"),
    moveDown: moveTank("ArrowDown"),
    initKeyboardListener,
    tower,
    bullet,
  };

  return tank;
};
