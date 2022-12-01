export interface Size {
  width: number;
  height: number;
}

export interface Position {
  x: number;
  y: number;
}

export type MoveRightFn = (tankCurrentPosition: Position, step: number) => void;
export type MoveLeftFn = (tankCurrentPosition: Position, step: number) => void;
export type MoveUpFn = (tankCurrentPosition: Position, step: number) => void;
export type MoveDownFn = (tankCurrentPosition: Position, step: number) => void;

export type KeyboardListenerFn = () => void;

export interface Tank {
  size: Size;
  position: Position;
  image: boolean;
  moveRight: MoveRightFn;
  moveLeft: MoveLeftFn;
  moveUp: MoveUpFn;
  moveDown: MoveDownFn;
  initKeyboardListener: KeyboardListenerFn;
}
