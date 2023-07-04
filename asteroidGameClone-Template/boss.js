/* 
Boss should come from the top, stop at a certain height and move left and right

Boss has 20 HP

Boss spawns every 20 kills

*/

class Boss {

    constructor(){
        this.velocity = new createVector(0, 0);
        this.location = new createVector(width/2, height/2);
        this.acceleration = new createVector(2, 0);
        this.maxVelocity = 5;
        this.bulletSys = new BulletSystem();
        this.size = 100;
    }

    run(){
        this.bulletSys.run();
        this.draw();
        this.move();
        this.bounce();
    }

    draw(){
    
        //Inspired by "hack_it_robot_1 University of London"
        strokeWeight(5);
 
        //Boss head
        fill(192,199,19);
        rect(this.location.x - this.size , this.location.y, this.size  * 3, this.size);
      
        //Boss eyes
        fill(255);
        //Left eye
        ellipse(this.location.x , this.location.y + this.size / 3, this.size, this.size);
        //Right eye
        ellipse(this.location.x + this.size, this.location.y + this.size / 3, this.size, this.size);

        fill(0)
        //Left eye
        ellipse(this.location.x, this.location.y + this.size / 3, 60, 60);
        ellipse(this.location.x, this.location.y + this.size / 3, 40, 40);
        ellipse(this.location.x, this.location.y + this.size / 3, 20, 20);

        //Right eye 
        ellipse(this.location.x + this.size, this.location.y + this.size / 3, 60, 60);
        ellipse(this.location.x + this.size, this.location.y + this.size / 3, 40, 40);
        ellipse(this.location.x + this.size, this.location.y + this.size / 3, 20, 20);
    
        //Boss mouth
        fill(192);
        ellipse(this.location.x + this.size / 2, this.location.y + this.size / 1.3, this.size, 60);
    }

    move(){
        this.velocity.add(this.acceleration);
        this.location.add(this.velocity);
        this.acceleration.mult(0)
        this.velocity.limit(this.maxVelocity);
    }

    fire(){
        this.bulletSys.fire(random(this.location.x - 20, this.location.x + 20), this.location.y)
    }

    bounce(){
        //If the boss reaches to the end of the screen, bounce him backwards
        if (this.location.x > width - 200) {
            this.location.x = width;
            this.velocity.x *= -1;
        }
    }
    //REFER BACK TO THE BOUNCING BALL TO GET IT TO BOUNCE OFF THE WALL.
}