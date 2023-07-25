var distance;
var length;
var angle;
function setup() {
    createCanvas(900, 800, WEBGL);

}

function draw() {
    background(125);
    angleMode(DEGREES);

    //Calculate angle and locations to rotate camera in a circle around the grid
    angle = frameCount * 0.3;
    var xLoc = cos(angle) * 1000;
    var zLoc = sin(angle) * 1000;

    //Place camera at location
    camera(xLoc, -1000, zLoc, 0, 0, 0, 0, 1, 0);

    //Nested loop of boxes from -400 to 400
    for (var x = -400; x < 400; x+= 50) {
        for(var z = -400; z < 400; z+= 50) {

            //translate and show each box
            push();

            normalMaterial();
            stroke(0);
            strokeWeight(2);
            translate(x, 0, z);


            //Find the distance of each box from the center of the coordinate system
            distance = dist(0, 0, 0, x, 0, z);
            //Modulate value from 100 to 300
            length = map(sin(distance + frameCount *2), -1, 1, 100, 300);
            //Add the lenght to the height of the boxes
            box(50, length, 50);
            pop();
        }
    }
}
