const canvas = document.getElementById('simulationCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const blackHole = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 50,
    mass: 10
};

let particles = [];

document.getElementById('blackHoleMass').addEventListener('input', (event) => {
    blackHole.mass = event.target.value;
});

document.getElementById('blackHoleRadius').addEventListener('input', (event) => {
    blackHole.radius = event.target.value;
});

document.getElementById('numParticles').addEventListener('input', (event) => {
    const numParticles = event.target.value;
    particles = [];
    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
    }
});

document.getElementById('resetParticles').addEventListener('click', () => {
    const numParticles = document.getElementById('numParticles').value;
    particles = [];
    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
    }
});

fetch('/particles')
    .then(response => response.json())
    .then(data => {
        particles = data.map(p => new Particle(p.x, p.y));
        animate();
    });

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.mass = 1; // Mass of the particle
    }

    update() {
        const dx = blackHole.x - this.x;
        const dy = blackHole.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Gravitational force calculation
        const G = 1; // Gravitational constant (scaled for simulation)
        const force = (G * blackHole.mass * this.mass) / (distance * distance);
        const angle = Math.atan2(dy, dx);
        this.vx += Math.cos(angle) * force;
        this.vy += Math.sin(angle) * force;

        this.x += this.vx;
        this.y += this.vy;

        if (distance < blackHole.radius) {
            // Particle gets absorbed by the black hole
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = (Math.random() - 0.5) * 2;
        }
    }

    draw() {
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fill();
    }
}

let isDragging = false;

canvas.addEventListener('mousedown', (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const dx = mouseX - blackHole.x;
    const dy = mouseY - blackHole.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < blackHole.radius) {
        isDragging = true;
    }
});

canvas.addEventListener('mousemove', (event) => {
    if (isDragging) {
        const rect = canvas.getBoundingClientRect();
        blackHole.x = event.clientX - rect.left;
        blackHole.y = event.clientY - rect.top;
    }
});

canvas.addEventListener('mouseup', () => {
    isDragging = false;
});

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    particles.push(new Particle(x, y));
});

canvas.addEventListener('touchstart', (event) => {
    const rect = canvas.getBoundingClientRect();
    const touchX = event.touches[0].clientX - rect.left;
    const touchY = event.touches[0].clientY - rect.top;
    const dx = touchX - blackHole.x;
    const dy = touchY - blackHole.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < blackHole.radius) {
        isDragging = true;
    }
});

canvas.addEventListener('touchmove', (event) => {
    if (isDragging) {
        const rect = canvas.getBoundingClientRect();
        blackHole.x = event.touches[0].clientX - rect.left;
        blackHole.y = event.touches[0].clientY - rect.top;
    }
});

canvas.addEventListener('touchend', () => {
    isDragging = false;
});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw black hole with gravitational lensing effect
    const lensingRadius = blackHole.radius * 1.5;
    const gradient = ctx.createRadialGradient(
        blackHole.x, blackHole.y, blackHole.radius * 0.8,
        blackHole.x, blackHole.y, lensingRadius
    );
    gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
    gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.5)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(blackHole.x, blackHole.y, lensingRadius, 0, Math.PI * 2);
    ctx.fill();

    // Draw accretion disk
    const diskGradient = ctx.createRadialGradient(
        blackHole.x, blackHole.y, blackHole.radius,
        blackHole.x, blackHole.y, blackHole.radius * 2
    );
    diskGradient.addColorStop(0, 'rgba(255, 204, 0, 0.8)');
    diskGradient.addColorStop(0.5, 'rgba(255, 153, 0, 0.4)');
    diskGradient.addColorStop(1, 'rgba(255, 102, 0, 0.2)');

    ctx.fillStyle = diskGradient;
    ctx.beginPath();
    ctx.arc(blackHole.x, blackHole.y, blackHole.radius * 2, 0, Math.PI * 2);
    ctx.fill();

    // Draw particles
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    requestAnimationFrame(animate);
}
