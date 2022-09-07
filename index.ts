// Import stylesheets
import './style.css';

// Write TypeScript code!
var canvas = document.getElementById('myCanvas')! as HTMLCanvasElement;
// appDiv.innerHTML = `<h1>TypeScript Starter</h1>`;

interface Point {
  x: number;
  y: number;
}

var ctx = canvas.getContext('2d')!;
canvas.width = 400;
canvas.height = 400;

const polygons = [
  [
    { x: 100, y: 50 },
    { x: 150, y: 150 },
    { x: 50, y: 150 },
  ],
  [
    { x: 300, y: 150 },
    { x: 200, y: 150 },
    { x: 200, y: 50 },
    { x: 300, y: 50 },
  ],
  [
    { x: 50, y: 200 },
    { x: 150, y: 200 },
    { x: 150, y: 300 },
    { x: 100, y: 250 },
    { x: 50, y: 300 },
  ],
  [
    { x: 200, y: 230 },
    { x: 250, y: 200 },
    { x: 300, y: 230 },
    { x: 280, y: 300 },
    { x: 220, y: 300 },
  ],
];

let point: Point | undefined;
var hover = false;

function polygonsRender() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw polygons
  polygons.forEach(function (poly) {
    ctx.fillStyle = 'rgba(255,255,255,.1)';
    ctx.strokeStyle = 'rgba(255,255,255,.3)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    // ctx.moveTo(poly[0].x, poly[0].y);
    poly.forEach(function (vertex) {
      ctx.lineTo(vertex.x, vertex.y);
    });
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Draw the closest point on each polygon
  });

  // Draw the point
  if (point) {
    ctx.beginPath();
    ctx.arc(point.x, point.y, 10, 0, 2 * Math.PI, false);
    ctx.fillStyle = '#000';
    // ctx.fill();
    // ctx.lineWidth = 5;
    ctx.strokeStyle = 'rgba(255,255,255,.3)';
    ctx.stroke();
  }
}

polygonsRender();

function mouseMoveHandler(e: MouseEvent) {
  // Get the current mouse position
  const touchCoords = { x: e.clientX, y: e.clientY };
  const { x: Ox, y: Oy } = (
    e.target as HTMLCanvasElement
  ).getBoundingClientRect();
  point = {
    x: Math.floor(touchCoords.x - Ox),
    y: Math.floor(touchCoords.y - Oy),
  };
  polygonsRender();
}

canvas.onmousemove = function (e) {
  mouseMoveHandler(e);
};

function closestPointInPolygon(poly: Point[], pos: Point): Point {
  // This function should return the closest point to

  // "pos" that is inside the polygon defined by "poly"
  

}
