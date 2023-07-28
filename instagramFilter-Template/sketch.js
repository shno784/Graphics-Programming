// Image of Husky Creative commons from Wikipedia:
// https://en.wikipedia.org/wiki/Dog#/media/File:Siberian_Husky_pho.jpg
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
/////////////////////////////////////////////////////////////////
function preload() {
    imgIn = loadImage("assets/husky.jpg");
}
/////////////////////////////////////////////////////////////////
function setup() {
    createCanvas((imgIn.width * 2), imgIn.height);
}
/////////////////////////////////////////////////////////////////
function draw() {
    background(125);
    image(imgIn, 0, 0);
    image(earlyBirdFilter(imgIn), imgIn.width, 0);
    noLoop();
}
/////////////////////////////////////////////////////////////////
function mousePressed(){
  loop();
}
/////////////////////////////////////////////////////////////////
function earlyBirdFilter(img){
  var resultImg = createImage(imgIn.width, imgIn.height);
  resultImg = sepiaFilter(imgIn);
  resultImg = darkCorners(resultImg);
  resultImg = radialBlurFilter(resultImg);
  resultImg = borderFilter(resultImg)
  return resultImg;
}

function sepiaFilter(img) {
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
      img.pixels[index + 0] = newR
      img.pixels[index + 1] = newG
      img.pixels[index + 2] = newB
      img.pixels[index + 3] = 255
    }
  }
  img.updatePixels();
  return img;
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
/////////////////////////////////////////////////////////////////////////
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