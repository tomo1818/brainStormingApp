import React from 'react';
import { Point } from '../types/twoPoint';

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

  return (
    <svg
      width={canvasWidth}
      height={canvasHeight}
      style={{
        transform: `translate(${canvasStartPoint.x}px, ${canvasStartPoint.y}px)`,
        position: 'absolute',
        zIndex: -1,
      }}
    >
      <line
        stroke="#aaa"
        strokeWidth={1}
        x1={startPoint.x - canvasStartPoint.x}
        y1={startPoint.y - canvasStartPoint.y}
        x2={endPoint.x - canvasStartPoint.x}
        y2={endPoint.y - canvasStartPoint.y}
      />
    </svg>
  );
}
