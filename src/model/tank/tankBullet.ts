import {
  TANK_BULLET_HEIGHT,
  TANK_BULLET_SPEED,
  TANK_BULLET_WIDTH,
} from "./const";
import { Bullet, ComputeBulletPosition, Position, TankGun } from "./interface";

export const getBullet = (gun: TankGun): Bullet => {
  const getBulletPostionAfterFire: ComputeBulletPosition = (
    gun: TankGun,
    bullet: Bullet
  ): Position => {
    const diffByTime = (): number => {
      return (Date.now() - bullet.fireStartTime) * TANK_BULLET_SPEED;
    };

    return {
      x: gun.position.x,
      y: gun.position.y - TANK_BULLET_HEIGHT - diffByTime(),
    };
  };

  const bulletSize = {
    width: TANK_BULLET_WIDTH,
    height: TANK_BULLET_HEIGHT,
  };

  const bulletPosition = {
    x: -10,
    y: -10,
  };

  const bullet = {
    size: bulletSize,
    visible: false,
    position: bulletPosition,
    fireStartTime: 0,
    getBulletPostionAfterFire,
  };

  return bullet;
};
