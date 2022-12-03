import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../common/canvas/const";
import { getTank } from "../tank/tank";

export const getCanvas = async (canvasRef: HTMLCanvasElement | null) => {
  const canvas = canvasRef;
  if (!canvas) {
    return;
  }

  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return;
  }

  const tank = await getTank();
  tank.initKeyboardListener();

  const gameLoop = () => {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    ctx.fillStyle = "black";
    ctx.fillRect(
      tank.position.x,
      tank.position.y,
      tank.size.width,
      tank.size.height
    );

    ctx.fillStyle = "red";
    ctx.fillRect(
      tank.tower.position.x,
      tank.tower.position.y,
      tank.tower.size.width,
      tank.tower.size.height
    );

    ctx.fillStyle = "#888888";
    ctx.fillRect(
      tank.tower.gun.position.x,
      tank.tower.gun.position.y,
      tank.tower.gun.size.width,
      tank.tower.gun.size.height
    );

    if (tank.bullet.visible) {
      ctx.fillStyle = "#000000";
      ctx.fillRect(
        tank.bullet.position.x,
        tank.bullet.position.y,
        tank.bullet.size.width,
        tank.bullet.size.height
      );
    }

    window.requestAnimationFrame(gameLoop);
  };

  window.requestAnimationFrame(gameLoop);
};
