import { Point } from '../types/twoPoint';

export const calculateDeltas = (
  startPoint: Point,
  endPoint: Point,
): {
    dx: number,
    dy: number,
    absDx: number,
    absDy: number,
} => {
  const dx = endPoint.x - startPoint.x;
  const dy = endPoint.y - startPoint.y;
  const absDx = Math.abs(dx);
  const absDy = Math.abs(dy);

  return {
    dx, dy, absDx, absDy,
  };
};
