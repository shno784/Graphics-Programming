var imgs = [];
var avgImg;
var numOfImages = 30;
var imageIndex = 0;

//////////////////////////////////////////////////////////
function preload() { // preload() runs once
    for(var i = 0; i < numOfImages; i++) {
        //Get filename of each file and load them
        var filename = `assets/${i}.jpg`;
        imgs[i] = loadImage(filename)
    }
}
//////////////////////////////////////////////////////////
function setup() {
    var firstImage = imgs[0];
    createCanvas(firstImage.width * 2, firstImage.height);
    pixelDensity(1);

    avgImg = createGraphics(firstImage.width, firstImage.height)

}
//////////////////////////////////////////////////////////
function draw() {
    background(125);
    //Draw image
    image(imgs[imageIndex], 0, 0);

    for(var i = 0; i < imgs.length; i++) {
        imgs[i].loadPixels();
        avgImg.loadPixels();
    }

    //Loop over the first image and get the index value
    for(var x = 0; x < imgs[0].width; x++) {
        for(var y = 0; y < imgs[0].height; y++) {
            var index = ((imgs[0].width * y)+ x) * 4;

            //Change pixel in avgImg to red
            avgImg.pixels[index + 0] = 255; //red
            avgImg.pixels[index + 3] = 255; //alpha

            var sumR = 0;
            var sumG = 0;
            var sumB = 0;

            for(var i = 0; i < numOfImages; i++) {

                var img = imgs[i];
                
                //Loop over all images and add the value of each image channel to appropriate RGB values
                sumR += img.pixels[index + 0] 
                sumG += img.pixels[index + 1] 
                sumB += img.pixels[index + 2] 
                

                //Add the average values to the avgimg, no need to update alpha since it is the same 255
                avgImg.pixels[index + 0] = sumR / numOfImages
                avgImg.pixels[index + 1] = sumG / numOfImages
                avgImg.pixels[index + 2] = sumB / numOfImages
                    
            }
        }
    }
    //Update pixels of avgImg
    avgImg.updatePixels();
    //Show the image to the right of the first image
    image(avgImg, imgs[0].width, 0);


    noLoop();
}

function keyPressed() {
    if(keyCode == 32) { //spacebar pressed, change to a random image  
        imageIndex = floor(random(0, 30));
        loop();
    } 
}