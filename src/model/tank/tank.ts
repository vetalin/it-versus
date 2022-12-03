import { TANK_HEIGHT, TANK_INITIAL_POSITION, TANK_WIDTH } from "./const";
import {
  KeyboardListenerFn,
  MoveArrowsKeys,
  Position,
  Size,
  Tank,
  TankWithActions,
} from "./interface";
import { moveTank } from "./moveTank";
import { getBullet } from "./tankBullet";
import { getTankTower } from "./tankTower";

export const getTank = async (): Promise<TankWithActions> => {
  const size: Size = { width: TANK_WIDTH, height: TANK_HEIGHT };
  const position: Position = {
    x: TANK_INITIAL_POSITION.x,
    y: TANK_INITIAL_POSITION.y,
  };

  const tower = getTankTower(size, position);
  const bullet = getBullet(tower.gun);

  let startRotateTime = 0;

  const tank = {
    image: true,
    size,
    position,
    moveRight: moveTank("ArrowRight"),
    moveLeft: moveTank("ArrowLeft"),
    moveUp: moveTank("ArrowUp"),
    moveDown: moveTank("ArrowDown"),
    tower,
    bullet,
  };

  const initKeyboardListener: KeyboardListenerFn = (): void => {
    document.addEventListener("keydown", (event: KeyboardEvent) => {
      moveTank(event.code as MoveArrowsKeys)(tank);
      if (event.code === "Space") {
        tank.bullet.visible = true;
        tank.bullet.fireStartTime = Date.now();
      }

      if (event.code === "keyD") {
        startRotateTime = Date.now();
      }
    });
  };

  const tankGameLoop = (): void => {
    tank.bullet.position = bullet.getBulletPostionAfterFire(
      tank.tower.gun,
      bullet
    );

    tank.tower.angle = tank.tower.getAngle(startRotateTime);
  };

  return {
    tank,
    tankGameLoop,
    initKeyboardListener,
  };
};
