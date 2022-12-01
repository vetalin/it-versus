import {
  KeyboardListenerFn,
  MoveDownFn,
  MoveLeftFn,
  MoveRightFn,
  MoveUpFn,
  Position,
  Size,
  Tank,
} from "./interface";

export const getTank = async (): Promise<Tank> => {
  const size: Size = { width: 50, height: 50 };
  const position: Position = { x: 10, y: 10 };

  // const imageSrc = require('../../../assets/tank.png');
  // const image = new Image(size.width, size.height);
  // image.src = imageSrc;

  // const imageBitmap = await createImageBitmap(image, position.x, position.y, size.width, size.height);

  const moveRight: MoveRightFn = (
    tankCurrentPosition: Position,
    step: number
  ): void => {
    tankCurrentPosition.x += step;
  };
  const moveLeft: MoveLeftFn = (
    tankCurrentPosition: Position,
    step: number
  ): void => {
    tankCurrentPosition.x -= step;
    if (tankCurrentPosition.x < 0) {
      tankCurrentPosition.x = 0;
    }
  };
  const moveUp: MoveUpFn = (
    tankCurrentPosition: Position,
    step: number
  ): void => {
    tankCurrentPosition.y -= step;
    if (tankCurrentPosition.y < 0) {
      tankCurrentPosition.y = 0;
    }
  };
  const moveDown: MoveDownFn = (
    tankCurrentPosition: Position,
    step: number
  ): void => {
    tankCurrentPosition.y += step;
  };

  const initKeyboardListener: KeyboardListenerFn = (): void => {
    document.addEventListener("keydown", (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        moveRight(position, 10);
      }

      if (event.key === "ArrowLeft") {
        moveLeft(position, 10);
      }

      if (event.key === "ArrowUp") {
        moveUp(position, 10);
      }

      if (event.key === "ArrowDown") {
        moveDown(position, 10);
      }
    });
  };

  return {
    image: true,
    size,
    position,
    moveRight,
    moveLeft,
    moveUp,
    moveDown,
    initKeyboardListener,
  };
};
