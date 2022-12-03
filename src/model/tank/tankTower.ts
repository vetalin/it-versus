import { TANK_TOWER_HEIGHT, TANK_TOWER_WIDTH } from "./const";
import { Position, Size, TankTower } from "./interface";
import { getTankGun } from "./tankGun";

export const getTankTower = (
  tankSize: Size,
  tankPosition: Position
): TankTower => {
  const size: Size = { width: TANK_TOWER_WIDTH, height: TANK_TOWER_HEIGHT };
  const position: Position = {
    x: tankPosition.x + tankSize.width / 2 - TANK_TOWER_WIDTH / 2,
    y: tankPosition.y + (tankSize.height / 2 - TANK_TOWER_HEIGHT / 2),
  };

  const getAngle = (startAngleTime: number): number => {
    return Date.now() - startAngleTime + 1;
  };

  return {
    size,
    position,
    gun: getTankGun(size, position),
    angle: 0,
    getAngle,
  };
};
