type Point = {
  x: number;
  y: number;
};

type Edge = [Point, Point];

type Vector = {
  x: number;
  y: number;
};

type Polygon = Array<Point>;

export function getVectorLength(vector: Vector): number {
  return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
}

export function dotProduct(v0: Vector, v1: Vector): number {
  return v0.x * v1.x + v0.y * v1.y;
}

/**
 * Get projected point P' of P on a segment
 * @return projected point p.
 */
export function getProjectedPointOnSegment(segment: Edge, point: Point): Point {
  // get dot product of e1, e2
  const e1: Vector = toVector(...segment);
  const e2: Vector = toVector(segment[0], point);
  const valDp = dotProduct(e1, e2);
  // get length of vectors
  const lenLineE1 = getVectorLength(e1);
  const lenLineE2 = getVectorLength(e2);
  const cos = valDp / (lenLineE1 * lenLineE2);
  // length of v1P'
  const projLenOfLine = cos * lenLineE2;
  return {
    x: segment[0].x + (projLenOfLine * e1.x) / lenLineE1,
    y: segment[0].y + (projLenOfLine * e1.y) / lenLineE1,
  };
}

export function isProjectionOnSegment(point: Point, segment: Edge): boolean {
  const e1 = toVector(...segment);
  const dp = dotProduct(toVector(point, segment[1]), e1);
  const max = e1.x * e1.x + e1.y * e1.y;
  return dp >= 0 && dp <= max;
}

/**
 * Convert a polygon a list of edges
 * @param polygon
 */
export function toEdgeList(polygon: Polygon): Array<Edge> {
  const result: Array<Edge> = [];
  for (let i = 0; i < polygon.length; i++) {
    const pointA = polygon[i];
    const pointB = polygon[i === polygon.length - 1 ? 0 : i + 1];
    result.push([pointA, pointB]);
  }
  return result;
}

export function toVector(A: Point, B: Point): Vector {
  return {
    x: B.x - A.x,
    y: B.y - A.y,
  };
}

/**
 * Return the cumulated rotation around a point of another point
 * which is translating on a polygon edge.
 * The returned value is floored to deal with javscript float number imprecision.
 * So if the absolute value winding number is lower than 1, it
 * means that the rotation is null.
 * @param polygon
 * @param point
 */
export function getWindingNumber(polygon: Polygon, point: Point): number {
  const angles = [];
  let result: number = 0;
  for (let index = 0; index < polygon.length; index++) {
    const vertex = polygon[index];
    const nextVertex =
      index === polygon.length - 1 ? polygon[0] : polygon[index + 1];
    // Get the angle between the previous vertex, the point and the current vertex
    const angle = getAngle(vertex, point, nextVertex);
    angles.push(angle);
    result += angle;
  }
  return Math.floor(result);
}

/**
 * Calculates the signed (counter/clockwize) angle ABC (in radian).
 * @param A
 * @param B
 * @param C
 */
export function getAngle(A: Point, B: Point, C: Point): number {
  const v0 = { x: A.x - B.x, y: A.y - B.y };
  const v1 = { x: C.x - B.x, y: C.y - B.y };
  const angle = Math.atan2(v1.y, v1.x) - Math.atan2(v0.y, v0.x);
  // Special case, the angle cross over the complete circle
  return round(
    Math.abs(angle) > Math.PI
      ? angle < 0
        ? angle + 2 * Math.PI
        : angle - 2 * Math.PI
      : angle
  );
}

/**
 * Return true if a point lies on a segment
 * @param segment
 * @param point
 */
export function isPointOnSegment(segment: Edge, point: Point): boolean {
  const distAP = getDistance(segment[0], point);
  const distBP = getDistance(segment[1], point);
  const distAB = getDistance(segment[0], segment[1]);
  return distAB === distAP + distBP;
}

export function getDistance(A: Point, B: Point): number {
  return Math.sqrt((A.x - B.x) * (A.x - B.x) + (A.y - B.y) * (A.y - B.y));
}

/**
 * Workaround javascript imprecision
 */
export function round(number: number) {
  return Math.round((number + Number.EPSILON) * 100) / 100;
}
