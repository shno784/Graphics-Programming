var secLength = 160;
var secWidth = 1;
var minLength = 140;
var minWidth = 2;
var hourLength = 90;
var hourWidth = 5;

function setup() {
    createCanvas(900, 600);
    background(0);
}

function draw() {

    background(255);
    translate(width/2, height/2);
    push()
    ellipse(0,0,360,360);
    pop()

    //Seconds 
    push();
    strokeWeight(secWidth);
    stroke(200,0,0);
    var secAngle = map(second(), 0, 60, 0, 360);
    rotate(radians(secAngle));
    line(0, 0, 0, -secLength)
    pop();

    //Minutes
    push();
    strokeWeight(minWidth);
    stroke(0,200,0);
    var minAngle = map(minute(), 0, 60, 0, 360);
    rotate(radians(minAngle));
    line(0,0,0, -minLength);
    pop();

    //Hours
    push();
    strokeWeight(hourWidth);
    stroke(0,0,200);
    var hourAngle = map(hour(), 0, 12, 0, 360);
    rotate(radians(hourAngle));
    line(0,0,0, -hourLength);



   var hours = 12;
    var hourStep = 360/hours;
   
    for (var i= 0; i < hours; i++)
    {
        push()
        rotate(radians(60))
        rotate(radians(hourStep * i));
        translate (0, -160);
        strokeWeight(minWidth)
        text(`${i+1 }`,0, 0)
        pop()
    }
  
    pop();

}
