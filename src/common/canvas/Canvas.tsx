import React, { useEffect } from "react";
import { CanvasStyled } from "./Canvas.styled";
import { getTank } from "../../model/tank/tank";

export const Canvas = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    (async () => {
      const canvas = canvasRef.current;
      if (!canvas) {
        return;
      }

      canvas.width = 800;
      canvas.height = 500;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        return;
      }

      const tank = await getTank();
      tank.initKeyboardListener();

      window.setInterval(() => {
        ctx.clearRect(0, 0, 800, 500);

        ctx.rect(
          tank.position.x,
          tank.position.y,
          tank.size.width,
          tank.size.height
        );
        ctx.fillRect(
          tank.position.x,
          tank.position.y,
          tank.size.width,
          tank.size.height
        );
      }, 1000 / 60);
    })();
  }, [canvasRef]);

  return <CanvasStyled ref={canvasRef} />;
};
