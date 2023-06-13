
function setup()
{
    createCanvas(500, 500);
    background(255);
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

        let noiseCol = noise(255);
        let mapCol = map(noiseCol, 0, 1, 0, 255);

        let col = color(0,mapCol, 100);
        
        wave(circW, circH, size/2, col); // replace params with the necessary parameters
        
      }
    }
}


function wave(width, height, size, color) // replace params with the necessary parameters
{
 // your code here
 fill(color)
 ellipse(width, height ,size)
}
