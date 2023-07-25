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

  camera(0, -500, -600, 0,0,0,0,1,0)
  push();
  texture(sun);
  rotateY(frameCount)
  sphere(80)
  pop();
  pointLight(255, 255, 255, 0, 0, 0);

  rotateY(-frameCount/2)
  translate(250, 0, 0)
  push();

  texture(earth)
 
  rotateY(frameCount * 2)
  sphere(50)
  pop();
 
}