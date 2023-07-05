//I wrote this code
class Boss {
  constructor() {
    this.velocity = new createVector(0, 0);
    this.location = new createVector(width / 2, height / 6);
    this.acceleration = new createVector(3, 0);
    this.maxVelocity = 5;
    this.bulletSys = new BulletSystem(5, 15, "pink");
    this.size = 170;
    this.hp = 20;
  }

  run() {
    //If the hp of the boss is 0, leave the run method
    if (this.hp <= 0) {
      return;
    }

    this.bulletSys.run();
    this.draw();
    this.spawn();
    this.move();
    this.fire();
  }

  draw() {
    //Wings
    fill(255, 0, 0);
    ellipse(this.location.x, this.location.y, this.size * 2, this.size / 5);

    //face
    fill(255);
    ellipse(this.location.x, this.location.y, this.size);

    //Cheeks
    fill(255, 182, 193);
    //Right cheek
    ellipse(
      this.location.x + this.size / 3,
      this.location.y + 20,
      this.size / 6
    );
    //Left cheek
    ellipse(
      this.location.x - this.size / 3,
      this.location.y + 20,
      this.size / 6
    );

    //Nose
    fill(255, 0, 0);
    ellipse(this.location.x, this.location.y, this.size / 4, this.size / 2);
  }

  move() {
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
    this.velocity.limit(this.maxVelocity);
  }

  fire() {
    //Shoots a bullet every 50 frames
    if (frameCount % 50 == 0) {
      this.bulletSys.fire(this.location.x, this.location.y);
    }
  }

  spawn() {
    //Bounce the boss off the walls
    if (this.location.x + this.size > width) {
      this.velocity.x *= -1;
    } else if (this.location.x - this.size <= 0) {
      this.velocity.x *= -1;
    }
  }
}
//End of me writing this code
