export interface Size {
  width: number;
  height: number;
}

export interface Position {
  x: number;
  y: number;
}

export type MoveArrowsKeys =
  | "ArrowLeft"
  | "ArrowRight"
  | "ArrowUp"
  | "ArrowDown";
export type MoveTankFn = (tankCurrentPosition: Position, step?: number) => void;

export type KeyboardListenerFn = () => void;

export interface Tank {
  size: Size;
  position: Position;
  image: boolean;
  moveRight: MoveTankFn;
  moveLeft: MoveTankFn;
  moveUp: MoveTankFn;
  moveDown: MoveTankFn;
  initKeyboardListener: KeyboardListenerFn;
}
