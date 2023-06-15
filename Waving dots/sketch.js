
function setup()
{
    createCanvas(500, 500);
    background(255);
  angleMode(DEGREES);
}

function draw()
{
    background(255);

    var noOfDots = 20;
    var size = width/noOfDots;

    for (var x = 0; x < noOfDots; x++)
    {
      for (var y = 0; y < noOfDots; y++)
      {
        // your code here
        //Calculations for ellipses
        let circW = x * (size) + 10;
        let circH = y * (size) + 10;

        // Map the x and y values from noOfDots -1 to 0 and 255 which returns a noise value
        var noiseX = map(x, 0, noOfDots -1, 0, 255);
        var noiseY = map(y, 0, noOfDots -1, 0, 255);

      // Map the result of the noise which will be between 0 and 1 to 0 and 255 for colour
      var r = map(noise(noiseX), 0, 1, 0, 255);
      var g = map(noise(noiseY), 0, 1, 0, 255);
      var b = map(noise(noiseX, noiseY), 0, 1, 0, 255);

      //Store the value in col
      var col = color(r,g,b)

      // Set the fill color for the ellipse
      fill(red, green, blue);
      wave(circW, circH, size/2, col); // replace params with the necessary parameters
        
      }
    }
}


function wave(x, y, size, color) {

  var period = 60;
  var amplitude = 1;
  var frequency = 0.1;
  var phase = 0;
  var angle = frameCount * 0.1
  var let = x+y

  var loc = amplitude * sin(angle * let * frequency + phase)

  translate(loc,loc)
  fill(color);
  ellipse(x , y, size);

}

