
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
        //Calculations for ellipses
        let circX = x * (size/2);
        let circY = y * (size/2);

        // Map the x and y values from noOfDots -1 to 0 and 255 which returns a noise value
        var noiseX = map(x, 0, noOfDots -1, 0, 255);
        var noiseY = map(y, 0, noOfDots -1, 0, 255);

      // Map the result of the noise which will be between 0 and 1 to 0 and 255 for colour
      var r = map(noise(noiseX), 0, 1, 0, 255);
      var g = map(noise(noiseY), 0, 1, 0, 10);
      var b = map(noise(noiseX, noiseY), 0, 1, 0, 50);

      //Store the value in col
      var col = color(r,g,b)
      // Set the fill color for the ellipse
      fill(red, green, blue);
      wave(circX, circY, size/2, col, x, y); // replace params with the necessary parameters
        
      }
    }
}


function wave(x, y, size, color, tempx, tempy) {

  // var period = mouseX;
  // var amplitude = 1 ;
  // var frequency = 0.5;
  // var phase = 0;
  // var angle = frameCount
   var dot = x+y
  
  var period = 60;
    var amplitude = 10;
    var frequency = 2;
    var phase = 1;
    var angle = map(frameCount, 0, 60, 0, 360)
    var mouseMapX = map(mouseX, 0, width, 0, 50)
    var mouseMapY = map(mouseY, 0, height, 0, 50)

   var locX = x + cos(angle * 0.5 * frequency + dot +( phase + mouseMapX)) * (amplitude+ mouseMapY);
   var locY = y + sin(angle * 0.5 * frequency + dot + ( phase + mouseMapX)) * (amplitude + mouseMapY);

  fill(color);
  ellipse(x +locX, y + locY , size )



  

}

