// Image of Husky Creative commons from Wikipedia:
// https://en.wikipedia.org/wiki/Dog#/media/File:Siberian_Husky_pho.jpg

/*Added two filters, a grayscale filter and a edge detection filter.
These were implemented by using an if statement and doing the regular functions
to get these filters (from class) and when a key is presssed, the currentFilter will
switch to the appropriate flag and redraw the draw function to show the new filter
*/
var imgIn;
var matrix = [
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64]
];
//horizontal edge detection / vertical lines
var matrixY = [ 
    [-1, -2, -1],
    [0, 0, 0],
    [1, 2, 1]
];
//vertical edge detection / horizontal lines
var matrixX = [
    [-1, 0, 1],
    [-2, 0, 2],
    [-1, 0, 1]
];

var embossMatrix = [
  [0, 1, 0],
  [0, 0, 0],
  [0, -1, 0]
];

// var embossMatrix = [
//   [-1, 0, 0],
//   [0, 0, 0],
//   [0, 0, 1]
// ]

var currentFilter = 1;
/////////////////////////////////////////////////////////////////
function preload() {
    imgIn = loadImage("assets/husky.jpg");
}
/////////////////////////////////////////////////////////////////
function setup() {
    createCanvas((imgIn.width * 2), imgIn.height);
    pixelDensity(1);
    
}
/////////////////////////////////////////////////////////////////
function draw() {
    background(125);

    image(imgIn, 0, 0);

    if(currentFilter == 1) {
      image(earlyBirdFilter(imgIn), imgIn.width, 0);//Press '1' to switch to this filter
      
    } else if (currentFilter == 2) {
      image(grayScale(imgIn), imgIn.width, 0);//Press '2' to switch to this filter    
  
    } else if (currentFilter == 3) {
      image(edgeDetection(imgIn), imgIn.width, 0);//Press '3' to switch to this filter
      
    } else if (currentFilter == 4) {
      image(embossFilter(imgIn), imgIn.width, 0);//Press '4' to switch to this filter
    }
    noLoop();
}
/////////////////////////////////////////////////////////////////
function mousePressed(){
  loop();
}
/////////////////////////////////////////////////////////////////
function keyPressed(){

  //After pressing the correct key, redraw the draw function to show the filter
  if (key == '1') {
    currentFilter = 1;
    redraw();
  } else if (key == '2') {
    currentFilter = 2;
    redraw();
  } else if (key == '3') {
    currentFilter = 3;
    redraw();
  } else if (key == '4') {
    currentFilter = 4;
    redraw();
  }
}
/////////////////////////////////////////////////////////////////
function earlyBirdFilter(img){
  var resultImg = createImage(img.width, img.height);
  resultImg = sepiaFilter(img);
  resultImg = darkCorners(resultImg);
  resultImg = radialBlurFilter(resultImg);
  resultImg = borderFilter(resultImg)
  return resultImg;
}

function sepiaFilter(img) {
  var imgOut = createImage(img.width, img.height);

  imgOut.loadPixels();
  img.loadPixels();

  for(var x = 0; x < img.width; x++) {
    for (var y = 0; y < img.height; y++) {
      var index = ((img.width * y) + x) * 4;

      //Find the RGB of each pixel
      var r = img.pixels[index + 0];
      var g = img.pixels[index + 1];
      var b = img.pixels[index + 2];

      //Convert the RGB to new values
      var newR = (r * 0.393) + (g * 0.769) + (b * 0.189);
      var newG = (r * 0.349) + (g * 0.686) + (b * 0.168)
      var newB = (r * 0.272) + (g * 0.534) + (b * 0.131)

    
      //Put each value in the new image filter
      imgOut.pixels[index + 0] = newR
      imgOut.pixels[index + 1] = newG
      imgOut.pixels[index + 2] = newB
      imgOut.pixels[index + 3] = 255
    }
  }
  imgOut.updatePixels();
  return imgOut;
}

function darkCorners(img) {
  img.loadPixels();

  for(var x = 0; x < img.width; x++) {
    for (var y = 0; y < img.height; y++) {

      var index = ((img.width * y) + x) * 4;
      //The maximum distance from the center of the image to the ends of the image
      var maxDistance = dist(0, 0, img.width / 2, img.height / 2);
      //The distance of the current pixel to the edge of the image
      var distance = dist(x, y, img.width / 2, img.height / 2);
      
      var dynLum;

      if(distance <= 300) dynLum = 1;
       else if (distance >= 300 && distance <= 450) dynLum = constrain(map(distance, 300, 450, 1, 0.4), 0.4, 1);
       //Map the distance from 450 to the maximum distance of the image  to 0.4 to 0
       else dynLum = constrain(map(distance, 450, maxDistance, 0.4, 0), 0, 0.4);


      //Append dynLum to the RGB values
      img.pixels[index + 0]*= dynLum;
      img.pixels[index + 1]*= dynLum;
      img.pixels[index + 2]*= dynLum;
      img.pixels[index + 3] = 255;
      
    }
  }
  img.updatePixels();
  return img;
  
}

function radialBlurFilter(img){
  var imgOut = createImage(img.width, img.height);
  var matrixSize = matrix.length;

  imgOut.loadPixels();
  img.loadPixels();

  // read every pixel
  for (var x = 0; x < imgOut.width; x++) {
      for (var y = 0; y < imgOut.height; y++) {

          var index = (x + y * imgOut.width) * 4;
          var c = convolution(x, y, matrix, matrixSize, img);
          
          //Get the distance of each pixel to the mouse
          var pixelDist = dist(x, y, mouseX, mouseY)
          //Map the distance from 100 to 300 to 0 to 1 and constrain it
          var pixelMap = map(pixelDist, 100, 300, 0, 1)
          var dynBlur = constrain(pixelMap, 0, 1);

          //Get the RGBA of the image
          var r = img.pixels[index + 0]
          var g = img.pixels[index + 1]
          var b = img.pixels[index + 2]
          var a = img.pixels[index + 3]

          //Apply calculation to blur the image on the right
          imgOut.pixels[index + 0] = c[0]*dynBlur + r*(1-dynBlur);
          imgOut.pixels[index + 1] = c[1]*dynBlur + g*(1-dynBlur);
          imgOut.pixels[index + 2] = c[2]*dynBlur + b*(1-dynBlur);
          imgOut.pixels[index + 3] = a;
      }
  }
  imgOut.updatePixels();
  return imgOut;
}

function convolution(x, y, matrix, matrixSize, img) {
    var totalRed = 0.0;
    var totalGreen = 0.0;
    var totalBlue = 0.0;
    var offset = floor(matrixSize / 2);

    // convolution matrix loop
    for (var i = 0; i < matrixSize; i++) {
        for (var j = 0; j < matrixSize; j++) {
            // Get pixel loc within convolution matrix
            var xloc = x + i - offset;
            var yloc = y + j - offset;
            var index = (xloc + img.width * yloc) * 4;
            // ensure we don't address a pixel that doesn't exist
            index = constrain(index, 0, img.pixels.length - 1);

            // multiply all values with the mask and sum up
            totalRed += img.pixels[index + 0] * matrix[i][j];
            totalGreen += img.pixels[index + 1] * matrix[i][j];
            totalBlue += img.pixels[index + 2] * matrix[i][j];
        }
    }
    // return the new color
    return [totalRed, totalGreen, totalBlue];
}

function borderFilter(img) {

  var buffer = createGraphics(img.width, img.height);
  buffer.background(255)
  buffer.image(img, 0, 0);
  buffer.noFill();
  buffer.stroke(255);
  buffer.strokeWeight(25)
  buffer.rect(0, 0, img.width, img.height, 70);
  buffer.rect(0, 0, img.width, img.height);


  return buffer;
}

function grayScale(img) {
  var resultImg = createImage(img.width, img.height);
  resultImg = grayscaleFilter(img);
  resultImg = darkCorners(resultImg);2
  resultImg = borderFilter(resultImg);

  return resultImg;
}
function grayscaleFilter(img) {
  var imgOut = createImage(img.width, img.height);
  imgOut.loadPixels();
  img.loadPixels();

  for (x = 0; x < imgOut.width; x++) {
      for (y = 0; y < imgOut.height; y++) {

          var index = (x + y * imgOut.width) * 4;

          var r = img.pixels[index + 0];
          var g = img.pixels[index + 1];
          var b = img.pixels[index + 2];

          var gray = r * 0.299 + g * 0.587 + b * 0.114; // LUMA ratios 

          imgOut.pixels[index+0]= imgOut.pixels[index+1] = imgOut.pixels[index+2] = gray;
          imgOut.pixels[index+3]= 255;
      }
  }
  imgOut.updatePixels();
  return imgOut;
}
function edgeDetection (img) {
  var resultImg = createImage(img.width, img.height);
  resultImg = edgeDetectionFilter(img);
  resultImg = borderFilter(resultImg);
  return resultImg;
}
function edgeDetectionFilter(img) {
  var imgOut = createImage(img.width, img.height);
  var matrixSize = matrixX.length;

  imgOut.loadPixels();
  img.loadPixels();

  // read every pixel
  for (var x = 0; x < imgOut.width; x++) {
      for (var y = 0; y < imgOut.height; y++) {

          var index = (x + y * imgOut.width) * 4;
          var cX = convolution(x, y, matrixX, matrixSize, img);
          var cY = convolution(x, y, matrixY, matrixSize, img);

          cX = map(abs(cX[0]), 0, 1020, 0, 255);
          cY = map(abs(cY[0]), 0, 1020, 0, 255);
          var combo = sqrt(cX * cX + cY * cY);

          imgOut.pixels[index + 0] = combo;
          imgOut.pixels[index + 1] = combo;
          imgOut.pixels[index + 2] = combo;
          imgOut.pixels[index + 3] = 255;
      }
  }
  imgOut.updatePixels();
  return imgOut;
}

function embossFilter (img) {
  var resultImg = createImage(img.width, img.height);
  resultImg = emboss(img);
  resultImg = borderFilter(resultImg);
  return resultImg;
}

function emboss(img) {
  var imgOut = createImage(img.width, img.height);
  var matrixSize = embossMatrix.length;

  imgOut.loadPixels();
  img.loadPixels();

  // read every pixel
  for (var x = 0; x < imgOut.width; x++) {
      for (var y = 0; y < imgOut.height; y++) {

           var index = (x + y * imgOut.width) * 4;
          // var combo = convolution(x, y, embossMatrix, matrixSize, img);
          // combo = combo[0];

          // imgOut.pixels[index + 0] = combo + 128;
          // imgOut.pixels[index + 1] = combo + 128;
          // imgOut.pixels[index + 2] = combo + 128;
          // imgOut.pixels[index + 3] = 255;



          var embossColor = convolution(x, y, embossMatrix, 3, img);
          var cX = convolution(x, y, matrixX, matrixSize, img);
          var cY = convolution(x, y, matrixY, matrixSize, img);

          cX = map(abs(cX[0]), 0, 1020, 0, 255);
          cY = map(abs(cY[0]), 0, 1020, 0, 255);
          var combo = sqrt(cX * cX + cY * cY) * 2;

          imgOut.pixels[index + 0] = combo + embossColor[0] * 5;
          imgOut.pixels[index + 1] = combo + embossColor[1] * 5;
          imgOut.pixels[index + 2] = combo + embossColor[2] * 5;
          imgOut.pixels[index + 3] = 255;
          // REMOVE NUMBER 3 AND MERGE THIS AS NUMBER 3. ALSO YOU HAVE TO USE THE MOUSE TO PRESS SOMEWHERE WHICH WILL MAKE THE AREA MORE CONCENTRATED.

      }
  }
  imgOut.updatePixels();
  return imgOut;
}