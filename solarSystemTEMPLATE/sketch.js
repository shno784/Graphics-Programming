var speed;

function setup() {
    createCanvas(900, 700);
}

function draw() {
    background(0);
    speed = frameCount;

    // SUN
    translate(width/2, height/2);


    push();//Start current transformation state of the sun
    //I wrote this code
    rotate(radians(speed/3)) // Rotate the sun around its axis
    //End of writing code
    celestialObj(color(255,150,0), 200); 

    //I wrote this code
    pop();// Restore original state

    // EARTH
    push();//Start current transformation state of the earth
    rotate(radians(speed)); //Rotate the earth around the sun
    translate(300, 0); //Earth orbit sun at 300 pixels

    push();//Start current transformation for earth rotation
    rotate(radians(speed)); // rotate earth around its axis
    celestialObj(color(0, 0, 255), 80); //EARTH
    pop();// Restore  originial state qwllfor earth rotation

    // MOON
    push();//Start current transformation state of the moon
    rotate(radians(-speed * 2)); //Rotate the moon around the sun
    translate(100, 0);

    // push();//Save current transformation state for moon's rotation
    rotate(radians(-speed * 2)); 
    celestialObj(255, 30); 
    
    pop(); // Restore original state of the earth

    //End of writing code
    pop(); //restore original state of the moon

    
}

//Draw celestial shapes
function celestialObj(c, size){
    strokeWeight(5);
    fill(c);
    stroke(0);
    ellipse(0, 0, size, size);
    line(0, 0, size/2, 0);
}
