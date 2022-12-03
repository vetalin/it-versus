export interface Size {
  width: number;
  height: number;
}

export interface Position {
  x: number;
  y: number;
}

export type ComputeBulletPosition = (gun: TankGun, bullet: Bullet) => Position;

export interface Bullet {
  size: Size;
  position: Position;
  visible: boolean;
  fireStartTime: number;
  getBulletPostionAfterFire: ComputeBulletPosition;
}

export type MoveArrowsKeys =
  | "ArrowLeft"
  | "ArrowRight"
  | "ArrowUp"
  | "ArrowDown";
export type MoveTankFn = (tank: Tank, step?: number) => void;

export type KeyboardListenerFn = () => void;

export interface Tank {
  bullet: Bullet;
  size: Size;
  position: Position;
  image: boolean;
  tower: TankTower;
  moveRight: MoveTankFn;
  moveLeft: MoveTankFn;
  moveUp: MoveTankFn;
  moveDown: MoveTankFn;
}

export interface TankWithActions {
  tank: Tank;
  initKeyboardListener: KeyboardListenerFn;
  tankGameLoop: () => void;
}

export interface TankTower {
  size: Size;
  position: Position;
  gun: TankGun;
  angle: number;
  getAngle: (start: number) => number;
}

export interface TankGun {
  size: Size;
  position: Position;
}
