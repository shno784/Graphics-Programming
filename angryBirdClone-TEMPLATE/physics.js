////////////////////////////////////////////////////////////////
function setupGround(){
  ground = Bodies.rectangle(500, 600, 1000, 40, {
    isStatic: true, angle: 0
  });
  World.add(engine.world, [ground]);
}

////////////////////////////////////////////////////////////////
function drawGround(){
  push();
  fill(128);
  drawVertices(ground.vertices);
  pop();
}
////////////////////////////////////////////////////////////////
function setupPropeller(){
  // your code here
  propeller = Bodies.rectangle(150,480,200,15, {isStatic: true});

  World.add(engine.world, [propeller])

}
////////////////////////////////////////////////////////////////
//updates and draws the propeller
function drawPropeller(){
  push();
  // your code here
  fill(255);

  Body.setAngle(propeller, angle);
  Body.setAngularVelocity(propeller,angleSpeed);

  angle += angleSpeed;

  drawVertices(propeller.vertices)
  pop();
}
////////////////////////////////////////////////////////////////
function setupBird(){
  var bird = Bodies.circle(mouseX, mouseY, 20, {friction: 0,
      restitution: 0.95 });
  Matter.Body.setMass(bird, bird.mass*10);
  World.add(engine.world, [bird]);
  birds.push(bird);
}
////////////////////////////////////////////////////////////////
function drawBirds(){
  push();
  //your code here
  for(var i = 0; i < birds.length; i++){

    fill(255,15,123)
    drawVertices(birds[i].vertices)
    if(isOffScreen(birds[i])){
      removeFromWorld(birds[i]);
      birds.splice(i,1);
      i--;
    }
  }
  pop();
}
////////////////////////////////////////////////////////////////
//creates a tower of boxes
function setupTower(){
  //you code here

  for(var i = 0; i < 3; i++){
    for (var j = 0; j < 6; j++){
      //Get random colours of different shades of green and push into colours array
      colors.push(color(0, random(0,255), 0));
      //Define a box and push into boxes array and add to engine
      var box = Bodies.rectangle(650 + i * 80, j * (80 + 10), 80, 80);
      World.add(engine.world,[box])
      boxes.push(box);
    }
  }

}
////////////////////////////////////////////////////////////////
//draws tower of boxes
function drawTower(){
  push();
  //your code here
  //Loop over the boxes array and draw all boxes with different colours
  for(var i = 0; i < boxes.length; i++){
    fill(colors[i])
    drawVertices(boxes[i].vertices)
  }
  pop();
}
////////////////////////////////////////////////////////////////
function setupSlingshot(){
//your code here
  slingshotBird = Bodies.circle(200, 150, 20, {friction: 0, restitution: 0.95});
  Matter.Body.setMass(slingshotBird, slingshotBird.mass*10);

  slingshotConstraint = Constraint.create({
    pointA: {x: 200, y: 150},
    bodyB: slingshotBird,
    pointB: {x:0, y: 0},
    stiffness: 0.01,
    damping: 0.0001
  })
  World.add(engine.world, [slingshotBird, slingshotConstraint])


}
////////////////////////////////////////////////////////////////
//draws slingshot bird and its constraint
function drawSlingshot(){
  push();
  // your code here
  fill('orange');
  drawVertices(slingshotBird.vertices)
  drawConstraint(slingshotConstraint);
  pop();
}
/////////////////////////////////////////////////////////////////
function setupMouseInteraction(){
  var mouse = Mouse.create(canvas.elt);
  var mouseParams = {
    mouse: mouse,
    constraint: { stiffness: 0.05 }
  }
  mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, mouseConstraint);
}
