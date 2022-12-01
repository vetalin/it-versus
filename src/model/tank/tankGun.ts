import { TANK_GUN_HEIGHT, TANK_GUN_WIDTH, TANK_TOWER_HEIGHT } from "./const";
import { Position, Size, TankGun } from "./interface";

export const getTankGun = (
  tankTowerSize: Size,
  tankTowerPosition: Position
): TankGun => {
  const size: Size = { width: TANK_GUN_WIDTH, height: TANK_GUN_HEIGHT };
  const position: Position = {
    x: tankTowerPosition.x + tankTowerSize.width / 2 - TANK_GUN_WIDTH / 2,
    y: tankTowerPosition.y - TANK_GUN_HEIGHT + TANK_TOWER_HEIGHT / 2,
  };

  return {
    size,
    position,
  };
};
