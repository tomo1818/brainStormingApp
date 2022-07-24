import React from 'react';
import { Point } from '../types/twoPoint';
import { calculateControlPoints } from '../utils/calculateControlPoints';
import { calculateDeltas } from '../utils/calculateDeltas';
type ArrowProps = {
  startPoint: Point;
  endPoint: Point;
};

export function Arrow({ startPoint, endPoint }: ArrowProps) {
  // Getting info about SVG canvas
  const canvasStartPoint = {
    x: Math.min(startPoint.x, endPoint.x),
    y: Math.min(startPoint.y, endPoint.y),
  };
  const canvasWidth = Math.abs(endPoint.x - startPoint.x);
  const canvasHeight = Math.abs(endPoint.y - startPoint.y);
  const { absDx, absDy, dx, dy } = calculateDeltas(startPoint, endPoint);
  const { p1, p2, p3, p4 } = calculateControlPoints({
    dx,
    dy,
    absDx,
    absDy,
  });

  return (
    <svg
      width={canvasWidth + 270}
      height={canvasHeight + 270}
      style={{
        transform: `translate(${canvasStartPoint.x}px, ${canvasStartPoint.y}px)`,
        position: 'absolute',
        zIndex: 0,
      }}
    >
      <path
        stroke="blue"
        strokeWidth={5}
        fill="none"
        d={`
          M 
            ${p1.x}, ${p1.y} 
          C 
            ${p2.x}, ${p2.y} 
            ${p3.x}, ${p3.y} 
            ${p4.x}, ${p4.y} 
          `}
      />
    </svg>
  );
}
