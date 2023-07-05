class BulletSystem {
  //I wrote this code
  constructor(bulletDirection, bulletDiameter, bulletColour) {
    //End of writing code
    this.bullets = [];
    //I wrote this code
    this.velocity = new createVector(0, bulletDirection);
    this.diam = bulletDiameter;
    this.color = bulletColour;
    //End of writing code
  }

  run() {
    this.move();
    this.draw();
    this.edges();
  }

  fire(x, y) {
    this.bullets.push(createVector(x, y));
  }

  //draws all bullets
  draw() {
    //I wrote this code
    fill(this.color);
    for (var i = 0; i < this.bullets.length; i++) {
      ellipse(this.bullets[i].x, this.bullets[i].y, this.diam, this.diam * 5);
      //End of writing code
    }
  }

  //updates the location of all bullets
  move() {
    for (var i = 0; i < this.bullets.length; i++) {
      this.bullets[i].y += this.velocity.y;
    }
  }

  //check if bullets leave the screen and remove them from the array
  edges() {
    // I wrote this code
    for (var i = 0; i < this.bullets.length; i++) {
      //If the bullet is off the screen (y position less than 0) remove it from the array
      if (this.bullets[i].y <= 0) {
        this.bullets.splice(0, 1);
      }
    }
  }
  //Destroy the bullet
  destroy() {
    this.bullets.splice(0, 1);
  }
  //End of writing this code
}
