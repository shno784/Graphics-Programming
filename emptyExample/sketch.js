var sun;
var earth;


function preload() {
  sun = loadImage('assets/sun.jpg')
  earth = loadImage('assets/earth.jpg')
};
function setup() {

  createCanvas(900,600, WEBGL);
  angleMode(DEGREES)
  noStroke();
}

function draw() {
  background(0);

  push();
  texture(sun);
  rotateY(frameCount)
  sphere(80)
  pop();

  push();
  texture(earth)
  rotateY(frameCount * -2)
  translate(200, 100, 0)
  sphere(50)
  pop();
 
}