let blobs = [];
let t = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  colorMode(HSB, 360, 100, 100, 100);
  background(0);
}

function draw() {
  // Soft fade to create trails
  fill(0, 0, 0, 12);
  rect(0, 0, width, height);

  // Spawn a new blob at the cursor
  if (mouseIsPressed) {
    blobs.push(new Blob(mouseX, mouseY));
  }

  // Update and display all blobs
  for (let i = blobs.length - 1; i >= 0; i--) {
    blobs[i].update();
    blobs[i].show();
    if (blobs[i].isDead()) {
      blobs.splice(i, 1);
    }
  }

  t += 0.01;
}

class Blob {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.baseSize = random(40, 120);
    this.life = 255;
    this.points = int(random(20, 50));
    this.seed = random(1000);
    this.vx = random(-0.5, 0.5);
    this.vy = random(-0.5, 0.5);
    this.hue = random(0, 360);
  }

  update() {
    this.life -= 2;
    this.x += this.vx;
    this.y += this.vy;
  }

  show() {
    fill(this.hue, 80, 100, this.life * 0.3);
    beginShape();
    for (let i = 0; i < this.points; i++) {
      let angle = map(i, 0, this.points, 0, TWO_PI);
      let r = this.baseSize + noise(cos(angle) + this.seed, sin(angle) + this.seed, t) * 80;
      let px = this.x + r * cos(angle);
      let py = this.y + r * sin(angle);
      curveVertex(px, py);
    }
    endShape(CLOSE);
  }

  isDead() {
    return this.life <= 0;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
