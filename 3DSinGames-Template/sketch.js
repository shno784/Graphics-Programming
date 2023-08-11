//I wrote this Code

//Store location of each confetti
var confLocs = [];
//Store initial angle of each confetti
var confTheta = [];
function setup() {
  createCanvas(900, 800, WEBGL);

  for (var i = 0; i < 200; i++) {
    //Push 200 3d vectors into confLocs
    confLocs.push(
      createVector(random(-500, 500), random(-800, 0), random(-500, 500))
    );
    //Push random angle to confTheta
    confTheta.push(random(0, 360));
  }
}

function draw() {
  background(125);
  angleMode(DEGREES);
  //Calculate angle and locations to rotate camera in a circle around the grid
  var angle = frameCount * 0.3;
  var xLoc = cos(angle) * 1300;
  var zLoc = sin(angle) * 1300;

  //Place camera at location
  camera(xLoc, -1000, zLoc, 0, 0, 0, 0, 1, 0);

  //Nested loop of boxes from -400 to 400
  for (var x = -400; x < 400; x += 50) {
    for (var z = -400; z < 400; z += 50) {
      //translate and show each box
      push();

      normalMaterial();
      stroke(0);
      strokeWeight(2);
      translate(x, 0, z);

      //Find the distance of each box from the center of the coordinate system
      var distance = dist(0, 0, 0, x, 0, z);
      //Modulate value from 100 to 300
      var length = map(sin(distance + frameCount * 2), -1, 1, 100, 300);
      //Add the lenght to the height of the boxes
      box(50, length, 50);
      pop();
    }
  }
  normalMaterial();
  confetti(confLocs, confTheta);
}

function confetti(confLocs, confTheta) {
  for (var i = 0; i < confLocs.length; i++) {
    var confLoc = confLocs[i];
    push();
    translate(confLoc.x, confLoc.y, confLoc.z);
    rotateX(confTheta[i]);
    plane(15, 15);
    pop();
    //Add to the y postiion to move the confetti downwards
    confLoc.y++;
    //Add to the theta to rotate the confetti
    confTheta[i] += 10;
    if (confLoc.y > 0) {
      confLoc.y = -800;
    }
  }
}

//End of writing this code