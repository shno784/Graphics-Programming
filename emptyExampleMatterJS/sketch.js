// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

    var engine;
    var box1;
    var ground1, ground2;

    var circle;



function setup() {
    createCanvas(windowWidth, windowHeight);
    // create an engine
    engine = Engine.create();

    box1 = Bodies.rectangle(200, 200, 80, 80, {restitution: .8, friction: 0.5});


    circle = Bodies.circle(80, 0, 20);
    ground1 = Bodies.rectangle(100,200,500,10, {isStatic: true, angle: Math.PI * 0.06});
    ground2 = Bodies.rectangle(500,500,590,10, {isStatic: true, angle: -Math.PI * 0.06});


    // add all of the bodies to the world
Composite.add(engine.world, [box1, ground1, ground2, circle]);

}

function draw() {
    background(0);
    Engine.update(engine);

    fill(255)
    drawVertices(box1.vertices);
    drawVertices(circle.vertices);

    fill(125)
    drawVertices(ground1.vertices);
    drawVertices(ground2.vertices);
}


function drawVertices(vertices) {
    beginShape();
    for(var i = 0; i < vertices.length; i++){
        vertex(vertices[i].x, vertices[i].y);
    }
    endShape(CLOSE);
}
