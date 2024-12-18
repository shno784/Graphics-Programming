var ball;

function setup() {
    createCanvas(400, 400);
    ball = new Ball();
}

function draw() {
    background(0);

    ball.run();
}

class Ball {
    constructor(){
        this.velocity = new createVector(0, 0);
        this.location = new createVector(0, height/2);
        this.acceleration = new createVector(0.03, 0);
        this.maxVelocity = 10;
    }
    run(){
        this.draw();
        this.move();
        this.edge();
    }

    draw(){
        fill(100);
        ellipse(this.location.x, this.location.y,50,50);

    }

    move(){
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxVelocity);
        this.location.add(this.velocity);
    }

    edge(){
        if (this.location.x<0) this.location.x = width;
        else if(this.location.x>width) this.location.x = 0;
        else if(this.location.y <0) this.location.y = height;
        else if(this.location.y > height) this.location.y = 0;
    }
}