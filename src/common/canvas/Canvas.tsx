import React, { useEffect } from "react";
import { CanvasStyled } from "./Canvas.styled";
import { getTank } from "../../model/tank/tank";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./const";
import { getCanvas } from "../../model/canvas/canvas";

export const Canvas = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    getCanvas(canvasRef.current);
  }, [canvasRef]);

  return <CanvasStyled ref={canvasRef} />;
};
