// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

    var engine;
    var box1;
    var ground;



function setup() {
    createCanvas(windowWidth, windowHeight);
    // create an engine
    engine = Engine.create();

    box1 = Bodies.rectangle(200, 200, 80, 80, {restitution: .8, friction: 0.5});

    var options = {isStatic: true, angle: Math.PI * 0.06};
    ground = Bodies.rectangle(400,500,810,10, options);
    // add all of the bodies to the world
Composite.add(engine.world, [box1, ground]);

}

function draw() {
    background(0);
    Engine.update(engine);

    fill(255)
    drawVertices(box1.vertices);

    fill(125)
    drawVertices(ground.vertices);
}


function drawVertices(vertices) {
    beginShape();
    for(var i = 0; i < vertices.length; i++){
        vertex(vertices[i].x, vertices[i].y);
    }
    endShape(CLOSE);
}
