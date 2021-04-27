var bgcolor;
let system;
let x = 350;
let y = 350;
let img;

function preload() {
  img = loadImage('assets/Fossil1.png');
}

function setup () {
  createCanvas(windowWidth, windowHeight);
  bgcolor = color(200);
  system = new ParticleSystem(createVector(width / 2, 350));
}

function mousePressed () {
  bgcolor = color((0, 570, 60), random(0, 10), random(0, 70));
}

function draw () {
  background(bgcolor);
  
  image(img, 210, 90, 270, 150);
  noStroke();
  fill(95, 40, 40);
  rect(0, 500, windowWidth, 200);
  quad(320, 370, 370, 370, 450, 500, 250, 500);

text("FOSSIL", 240, 260);
textSize(60);
  
  system.addParticle();
  system.run();
}

let Particle = function(position) {
  this.acceleration = createVector(0, 0.05);
  this.velocity = createVector(random(-1, 1), random(-1, 0));
  this.position = position.copy();
  this.lifespan = 255;
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
Particle.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 2;
};

// Method to display
Particle.prototype.display = function() {
  noStroke();
  strokeWeight(2);
  fill(600, 160, 40, this.lifespan);
  ellipse(this.position.x, this.position.y, 12, 12);
};

// Is the particle still useful?
Particle.prototype.isDead = function(){
  return this.lifespan < 0;
};

let ParticleSystem = function(position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function() {
  this.particles.push(new Particle(this.origin));
};

ParticleSystem.prototype.run = function() {
  for (let i = this.particles.length-1; i >= 0; i--) {
    let p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};