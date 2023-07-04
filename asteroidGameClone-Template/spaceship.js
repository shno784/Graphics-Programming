class Spaceship {

  constructor(){
    this.velocity = new createVector(0, 0);
    this.location = new createVector(width/2, height/2);
    this.acceleration = new createVector(0, 0);
    this.maxVelocity = 5;
    this.bulletSys = new BulletSystem(-5, 5, "red");
    this.size = 30;
    this.isAccelerating = false;
  }

  run(){
    this.bulletSys.run();
    this.draw();
    this.move();
    this.edges();
    this.interaction();
  }

  draw(){

    //Ship drawing from https://editor.p5js.org/ri1/sketches/HhwycpKut
    
    //Flame
    noStroke();
    //If the ship is accelerating, show the flame
    if(this.isAccelerating){
      fill(255,185,0);
      ellipse(this.location.x, this.location.y + this.size / 2, 
              this.size / 1.5, this.size * 2)
  
    }

    //Rocket arc
    fill(30,144,255);
    arc(this.location.x, this.location.y + this.size / 1.2, 
        this.size * 1.5, this.size * 1.5, PI, 0, CHORD)

    //Ship body
    fill(255, 0, 0);
    ellipse(this.location.x, this.location.y, this.size, this.size * 2)

    //Windows
    fill(255);
    ellipse(this.location.x, this.location.y - 10, this.size / 2);
    ellipse(this.location.x, this.location.y + 10, this.size / 2);
  }


  move(){
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0)
    this.velocity.limit(this.maxVelocity);
  }

  applyForce(f){
    this.acceleration.add(f);
  }

  interaction(){
    //I wrote this code
      if (keyIsDown(LEFT_ARROW)){
        this.applyForce(createVector(-0.1, 0));
      }
      if (keyIsDown(RIGHT_ARROW)){
        this.applyForce(createVector(0.1, 0));
      }
      if (keyIsDown(UP_ARROW)){
        this.applyForce(createVector(0, -0.1));
        this.isAccelerating = true;
      }
      if (keyIsDown(DOWN_ARROW)){
        this.applyForce(createVector(0, 0.1));
        this.isAccelerating = false;
      }
      //End of writing this code
  }

  fire(){
    this.bulletSys.fire(this.location.x, this.location.y);
  }

  edges(){
    if (this.location.x<0) this.location.x=width;
    else if (this.location.x>width) this.location.x = 0;
    else if (this.location.y<0) this.location.y = height;
    else if (this.location.y>height) this.location.y = 0;
  }

  // I wrote this code
  setNearEarth(){
    //Applies a downward force of 0.05 to the spaceship
    this.applyForce(createVector(0, 0.05));
    var friction = this.velocity.copy();
    //Multiply the velocity by -1 to make it opposite then multiply again by 1/30 to ensure that it is 30
    // Times smaller than the velocity
    friction.mult(-1);
    friction.mult(1/30)
    this.applyForce(friction)
  }
  //End of writing this code
}
