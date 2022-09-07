// Import stylesheets
import './style.css';

// Write TypeScript code!
var canvas = document.getElementById('myCanvas')! as HTMLCanvasElement;
// appDiv.innerHTML = `<h1>TypeScript Starter</h1>`;

var ctx = canvas.getContext('2d')!;
canvas.width = 400;
canvas.height = 500;

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

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

render();
