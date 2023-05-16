var balls=[];
let boxX = 300;
let boxY = 500;
let boxSize = 200;
////////////////////////////////////////////////////
function setup() {
    createCanvas(windowWidth, windowHeight);
    
}
////////////////////////////////////////////////////
function draw() {
  background(0);

  fill(255,0,0,100);
  rect(boxX, boxY, boxSize,boxSize)

  for(let i = 0; i < balls.length; i++){

    var gravity = createVector(0, 0.1);
    var friction = balls[i].velocity.copy();
    friction.mult(-1);
    friction.normalize();
    friction.mult(0.01);
    balls[i].applyForce(friction);
    balls[i].applyForce(gravity);
    balls[i].run()

    var distance = dist(balls[i].location.x,balls[i].location.y,boxX + boxSize/2, boxY + boxSize-2)

    if( distance <= boxSize/2 + balls[i].size/2){
        balls[i].colour = 'red';
    }
  }

 

}

function mouseDragged(){

    balls.push(new Ball(mouseX, mouseY, 'yellow' ));
}

function mouseClicked(){
    
    console.log(mouseX)
}
//////////////////////////////////////////////////////
class Ball {

  constructor(x, y, colour){
    this.velocity = new createVector(-3, 3);
    this.location = new createVector(x, y);
    this.acceleration = new createVector(0, 0);
    this.size = random(40,55);
    this.colour = colour;
  }

  run(){
    this.draw();
    this.move();
    this.bounce();
  }

  draw(){
    fill(this.colour);

    noStroke();
    ellipse(this.location.x, this.location.y, this.size, this.size);
  }

  move(){
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }

  bounce(){
    if (this.location.x > width-this.size/2) {
          this.location.x = width-this.size/2;
          this.velocity.x *= -1;
    } else if (this.location.x < this.size/2) {
          this.velocity.x *= -1;
          this.location.x = this.size/2;
    }
    if (this.location.y > height-this.size/2) {
          this.velocity.y *= -1;
          this.location.y = height-this.size/2;
    }
  }

  applyForce(force){
    this.acceleration.add(force);
  }
}
