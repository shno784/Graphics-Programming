var speed;

function setup() {
    createCanvas(900, 700);
}

function draw() {
    background(0);
    speed = frameCount;

    // SUN
    translate(width/2, height/2);
    push();
    rotate(radians(speed/3))
    celestialObj(color(255,150,0), 200); 

    // EARTH
    translate(300, 0);
    rotate(radians(speed));  
    celestialObj(color(0, 0, 255), 80); 
     
    // MOON
    rotate(radians(-speed * 2));  
    translate(100, 0);
    rotate(radians(-speed * 2)); 
    celestialObj(255, 30); 

    // Asteroid
    rotate(radians(-speed * 3));
    translate(45, 0);
    celestialObj(120, 20);

    pop();
}

function celestialObj(c, size){
    strokeWeight(5);
    fill(c);
    stroke(0);
    ellipse(0, 0, size, size);
    line(0, 0, size/2, 0);
}



