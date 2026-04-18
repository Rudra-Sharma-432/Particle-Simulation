class Particle {
  constructor(x, y, mass) {
    this.mass = mass;
    this.radius = mass / 2;
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
  }

  draw() {
    ctx.fillStyle = "rgba(95, 95, 250, 1)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();

  }

  calculate(forIndex) {
    this.ax = 0;
    this.ay = 0;
    for (let i = 0; i < particles.length; i++) {
      if (i !== forIndex) {
        let dx = particles[i].x - this.x;
        let dy = particles[i].y - this.y;
        let distSq = dx * dx + dy * dy;
        let dist = Math.sqrt(distSq);
        
        let costheta = (particles[i].x - this.x) / dist;
        let sintheta = (particles[i].y - this.y) / dist;
        
        var acceleration;

        if (dist > this.radius + particles[i].radius + (gap + 1)) {
          acceleration = G * (particles[i].mass) / (distSq + 0.01);
        } else {
          acceleration = -(G * (particles[i].mass) / (distSq + 0.01)) * (this.radius + particles[i].radius + gap - dist);
          
          if (dist < this.radius + particles[i].radius + 1) {
            acceleration -= 0.3;

            this.vx *= 0.999;
            this.vy *= 0.999;
            // console.log('collision');
          }
        }


        this.ax += (acceleration) * costheta;
        this.ay += (acceleration) * sintheta;
      }
    }
    this.vx += this.ax * dt;
    this.vy += this.ay * dt;

  }

  updatePosition() {
    this.x += this.vx * dt;
    this.y += this.vy * dt;
  }
}

function generateParticles(N) {
  const particles = [];
  for (let i = 0; i < N; i++) {
    let x = Math.floor(Math.random() * canvas.width);
    let y = Math.floor(Math.random() * canvas.height);
    particles.push(new Particle(x, y, 16));
  }
  return particles;
}
