function setup() {
  createCanvas(500, 500);
  background(255);
  angleMode(DEGREES);
}

function draw() {
  background(255);

  var noOfDots = 20;
  var size = width / noOfDots;

  for (var x = 0; x < noOfDots; x++) {
    for (var y = 0; y < noOfDots; y++) {
      //I wrote this code

      //Calculations for ellipses
      let circX = x * (size / 2);
      let circY = y * (size / 2);

      // Map the x and y values from noOfDots -1 to 0 and 255 which returns a noise value
      var noiseX = map(x, 0, noOfDots - 1, 0, 255);
      var noiseY = map(y, 0, noOfDots - 1, 0, 255);

      // Map the result of the noise which will be between 0 and 1 to 0 and 255 for colour
      var r = map(noise(noiseX), 0, 1, 0, 255);
      var g = map(noise(noiseY), 0, 1, 0, 10);
      var b = map(noise(noiseX, noiseY), 0, 1, 0, 50);

      //Store the value in col
      var col = color(r, g, b);
      // Set the fill color for the ellipse
      fill(red, green, blue);
      wave(circX, circY, size / 2, col); // replace params with the necessary parameters
    }
  }
}

function wave(x, y, size, color) {
  //Sum of x and y value for each dot
  var dot = x + y;
  var radius = 20;
  var angle = frameCount * 5;
  //Map the mouse to make it smaller
  var mouseMapX = map(mouseX, 0, width, 0, 2);
  var phase = 1 + mouseMapX;

  //Calculate locX and locY so each dot rotates in a circular motion.
  var locX = x + cos(angle + dot * phase) * radius;
  var locY = y + sin(angle + dot * phase) * radius;

  push();
  translate(x, y);
  fill(color);
  ellipse(locX, locY, size);
  pop();
}

//End of writing this code
