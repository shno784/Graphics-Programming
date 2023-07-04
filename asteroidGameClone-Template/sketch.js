var spaceship;
var asteroids;
var atmosphereLoc;
var atmosphereSize;
var earthLoc;
var earthSize;
var starLocs = [];
var score = 0;
var startTime;
var currentTime;
var boss;

//////////////////////////////////////////////////
function setup() {
  createCanvas(1200, 800);
  spaceship = new Spaceship();
  asteroids = new AsteroidSystem();
  boss = new Boss();

  //Start time since sketch has been running
  startTime = millis();

  //location and size of earth and its atmosphere
  atmosphereLoc = new createVector(width / 2, height * 2.9);
  atmosphereSize = new createVector(width * 3, width * 3);
  earthLoc = new createVector(width / 2, height * 3.1);
  earthSize = new createVector(width * 3, width * 3);
}

//////////////////////////////////////////////////
function draw() {
  background(0);

  sky();

  boss.run();
  spaceship.run();
  asteroids.run();


  //I wrote this code
  fill(255);
  textSize(40);
  text( "Score " + score, 50, height / 13);

  //Store current time in seconds
  var currentTime = int((millis() - startTime)/1000);
  speedAsteroids(currentTime);

  //End of writing code
  drawEarth();

  checkCollisions(spaceship, asteroids); // function that checks collision between various elements
}

//////////////////////////////////////////////////
//draws earth and atmosphere
function drawEarth() {
  noStroke();
  //draw atmosphere
  fill(0, 0, 255, 50);
  ellipse(atmosphereLoc.x, atmosphereLoc.y, atmosphereSize.x, atmosphereSize.y);
  //draw earth
  fill(100, 255);
  ellipse(earthLoc.x, earthLoc.y, earthSize.x, earthSize.y);
}

//////////////////////////////////////////////////
//checks collisions between all types of bodies
function checkCollisions(spaceship, asteroids) {
  //YOUR CODE HERE (2-3 lines approx)

  //I wrote this code

  //spaceship-2-asteroid collisions
  for (var i = 0; i < asteroids.locations.length; i++) {
    //If the spaceship collides into an asteroid, end the game
    if (
      isInside(
        spaceship.location,
        spaceship.size,
        asteroids.locations[i],
        asteroids.diams[i]
      )
    )
      gameOver();
  }

  //asteroid-2-earth collisions
  for (var i = 0; i < asteroids.locations.length; i++) {
    //If the asteroid collides with earth, end the game
    if (
      isInside(
        earthLoc,
        earthSize.x,
        asteroids.locations[i],
        asteroids.diams[i]
      )
    )
      gameOver();
  }

  //spaceship-2-earth
  //If the spaceship collides with earth, end the game
  if (isInside(earthLoc, earthSize.x, spaceship.location, spaceship.size))
    gameOver();

  //spaceship-2-atmosphere
  //If the spaceship is inside the atmosphere, call setNearEarth to apply gravity to the spaceship
  if (
    isInside(
      atmosphereLoc,
      atmosphereSize.x,
      spaceship.location,
      spaceship.size
    )
  )
    spaceship.setNearEarth();

  //bullet collisions
  for (var i = 0; i < spaceship.bulletSys.bullets.length; i++) {
    for (var j = 0; j < asteroids.locations.length; j++) {
      //If the distance between the asteroid and the bullet is less than the diameters, remove the asteroid
      if (
        isInside(
          asteroids.locations[j],
          asteroids.diams[j],
          spaceship.bulletSys.bullets[i],
          spaceship.bulletSys.diam
        )
      ) {
        //Updates the score and destroy the asteroid
        score ++;
        asteroids.destroy(j);
        boss = null;
      }
    }
  }

  //boss bullet with spaceship
  for(var i = 0; i < boss.bulletSys.bullets.length; i++){
    if(isInside(boss.bulletSys.bullets[i], boss.bulletSys.diam, spaceship.location, spaceship.size)){
    // gameOver();
    }
  }


  //bullet touching boss
  for(var i = 0; i < spaceship.bulletSys.bullets.length; i++){
    if (isInside(spaceship.bulletSys.bullets[i], spaceship.bulletSys.diam, boss.location, boss.size )){
      console.log("touch")
    }
  }
}

//////////////////////////////////////////////////
//helper function checking if there's collision between object A and object B
function isInside(locA, sizeA, locB, sizeB) {
  // YOUR CODE HERE (3-5 lines approx)
  var distance = dist(locA.x, locA.y, locB.x, locB.y);

  if (distance < sizeA / 2 + sizeB / 2) {
    return true;
  }
  return false;
}

//End of writing this code

//////////////////////////////////////////////////
function keyPressed() {
  if (keyIsPressed && keyCode === 32) {
    // if spacebar is pressed, fire!
    spaceship.fire();
  }
}

//////////////////////////////////////////////////
// function that ends the game by stopping the loops and displaying "Game Over"
function gameOver() {
  fill(255);
  textSize(80);
  textAlign(CENTER);
  text("GAME OVER", width / 2, height / 2);
  noLoop();
}

//////////////////////////////////////////////////
// function that creates a star lit sky
function sky() {
  push();
  while (starLocs.length < 300) {
    starLocs.push(new createVector(random(width), random(height)));
  }
  fill(255);
  for (var i = 0; i < starLocs.length; i++) {
    rect(starLocs[i].x, starLocs[i].y, 2, 2);
  }

  if (random(1) < 0.3) starLocs.splice(int(random(starLocs.length)), 1);
  pop();
}

//I wrote this code
function speedAsteroids(currentTime){

  var force = new createVector(0, 0.001);
  //Apply force every 60 seconds
  if((currentTime % 60) == 0)
  {
    asteroids.applyForce(force);
  }

}

//End of writing this code