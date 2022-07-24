import { Point } from '../types/twoPoint';

export const calculateControlPoints = ({
  absDx,
  absDy,
  dx,
  dy,
}: {
    absDx: number;
    absDy: number;
    dx: number;
    dy: number;
  }): {
    p1: Point;
    p2: Point;
    p3: Point;
    p4: Point;
  } => {
  let startPointX = 0;
  let startPointY = 0;
  let endPointX = absDx;
  let endPointY = absDy;
  if (dx < 0) [startPointX, endPointX] = [endPointX, startPointX];
  if (dy < 0) [startPointY, endPointY] = [endPointY, startPointY];

  const fixedLineInflectionConstant = 340;

  const p1 = {
    x: startPointX,
    y: startPointY,
  };
  const p2 = {
    x: startPointX + fixedLineInflectionConstant,
    y: startPointY,
  };
  const p3 = {
    x: endPointX - fixedLineInflectionConstant,
    y: endPointY,
  };
  const p4 = {
    x: endPointX,
    y: endPointY,
  };

  return {
    p1, p2, p3, p4,
  };
};
