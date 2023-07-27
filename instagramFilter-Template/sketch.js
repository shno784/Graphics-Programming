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
// function mousePressed(){
//   loop();
// }
/////////////////////////////////////////////////////////////////
function earlyBirdFilter(img){
  var resultImg = createImage(imgIn.width, imgIn.height);
  resultImg = sepiaFilter(imgIn);
  //resultImg = darkCorners(resultImg);
  // resultImg = radialBlurFilter(resultImg);
  // resultImg = borderFilter(resultImg)
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
      var newR = (r * .393) + (g * .769) + (b + .189);
      var newG = (r * .349) + (g *.686) + (b * .168)
      var newB = (r * .272) + (g *.534) + (b * .131)

    
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

      //Find the RGB of each pixel
      var r = img.pixels[index + 0];
      var g = img.pixels[index + 1];
      var b = img.pixels[index + 2];

    }
  }
  
}