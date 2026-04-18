const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const range = document.getElementById("myRange");
const rangeValue = document.getElementById("rangeValue");

canvas.width = innerWidth * 0.9;
canvas.height = innerHeight * 0.8;

let autoUpdate = true;
const G = 2;
// const repulsionRadius = 10;
const gap = 3;
const dt = 0.1;
var milliSecondsPerFrame = 35; // milliseconds per frame
let addMass = range.value;

range.addEventListener("input", function () {
  rangeValue.textContent = this.value;
  addMass = this.value;
});

var particles = generateParticles(0);

canvas.addEventListener('click', (event) => {
  const x = event.offsetX;
  const y = event.offsetY;
  particles.push(new Particle(x, y, addMass));
  particles[particles.length - 1].draw();
});

for (let i = 0; i < particles.length; i++) {
  particles[i].draw();
}

async function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particles.length; i++) {
    particles[i].calculate(i);

    // if (Math.abs(particles[i].vx) + Math.abs(particles[i].vy) < 0.000001) {
    //   particles[i].vx = 0;
    //   particles[i].vy = 0;
    // }
  }

  for (let i = 0; i < particles.length; i++) {
    particles[i].updatePosition();
    particles[i].draw();
  }

  if (autoUpdate) {
    await wait(milliSecondsPerFrame * dt);
    update();
  }
}

update();

document.addEventListener('keydown', function (event) {
  console.log('Key pressed:', event.key);
  if (event.key === " ") {
    if (!autoUpdate) {
      autoUpdate = true;
      update();
    } else {
      autoUpdate = false;
    }
  }
});

function toggle() {
  if (!autoUpdate) {
    autoUpdate = true;
    update();
  } else {
    autoUpdate = false;
  }
}

function refresh() {
  particles = [];
  update();
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}