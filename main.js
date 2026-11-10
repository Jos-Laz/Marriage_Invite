// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 200
});

// Countdown Timer
function updateCountdown() {
    const weddingDate = new Date('July 2, 2026 11:00:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').innerText = days < 10 ? '0' + days : days;
    document.getElementById('hours').innerText = hours < 10 ? '0' + hours : hours;
    document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;

    if (distance < 0) {
        clearInterval(countdownInterval);
        document.querySelector('.timer').innerHTML = "<h3>Just Married!</h3>";
    }
}

const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();

// Floating Particles (Petals & Sparkles)
function createParticles() {
    const container = document.getElementById('particles-container');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const isPetal = Math.random() > 0.5;
        particle.className = isPetal ? 'particle petal' : 'particle sparkle';

        const size = isPetal ? (Math.random() * 15 + 10) : (Math.random() * 5 + 2);
        const left = Math.random() * 100;
        const duration = Math.random() * 15 + 15;
        const delay = Math.random() * 20;

        particle.style.width = `${size}px`;
        particle.style.height = isPetal ? `${size * 0.7}px` : `${size}px`;
        particle.style.left = `${left}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `-${delay}s`;

        if (isPetal) {
            particle.style.borderRadius = '0 50% 0 50%';
            particle.style.backgroundColor = Math.random() > 0.5 ? '#FADADD' : '#FFFDF5'; // Blush or Pearl
            particle.style.transform = `rotate(${Math.random() * 360}deg)`;
        } else {
            particle.style.borderRadius = '50%';
            particle.style.backgroundColor = '#D4AF37'; // Gold
            particle.style.boxShadow = '0 0 10px #FFD700';
        }

        container.appendChild(particle);
    }
}

createParticles();

// Music Player Logic
const music = document.getElementById('bg-music');
music.volume = 0.15; // Set volume to 15% for a pleasant background feel
const toggleBtn = document.getElementById('music-toggle');
let isPlaying = false;

// Function to start music
function startMusic() {
    music.play().then(() => {
        isPlaying = true;
    }).catch(error => {
        console.log("Autoplay prevented. Waiting for user interaction.");
    });
}

// Click anywhere for first time to start music (if blocked by browser)
document.body.addEventListener('click', () => {
    if (!isPlaying) {
        startMusic();
    }
}, { once: true });

toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent body click from firing
    if (isPlaying) {
        music.pause();
        isPlaying = false;
        toggleBtn.style.opacity = '0.5';
    } else {
        music.play();
        isPlaying = true;
        toggleBtn.style.opacity = '1';
    }
});

// Smooth Parallax for Scroll
window.addEventListener('scroll', () => {
    if (window.innerWidth <= 768) return; // Disable parallax on mobile

    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero .content');
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / 700);
    }
});

// 🌸 Red Flower Burst Click Effect
const flowerColors = ['#e63946', '#c1121f', '#ff4d6d', '#ff758f', '#ff1744', '#d00000'];
const flowerShapes = ['❀', '✿', '❁', '✾', '🌸'];

document.addEventListener('click', (e) => {
    // Don't fire on music toggle or links
    if (e.target.closest('#music-toggle') || e.target.closest('a') || e.target.closest('button')) return;

    const count = 12 + Math.floor(Math.random() * 8); // 12–20 petals per burst

    for (let i = 0; i < count; i++) {
        const petal = document.createElement('span');
        petal.className = 'flower-burst';
        petal.innerText = flowerShapes[Math.floor(Math.random() * flowerShapes.length)];

        // Position at click point
        const size = 16 + Math.random() * 18;
        petal.style.left = `${e.clientX}px`;
        petal.style.top = `${e.clientY}px`;
        petal.style.fontSize = `${size}px`;
        petal.style.color = flowerColors[Math.floor(Math.random() * flowerColors.length)];

        // Random burst direction
        const angle = (Math.PI * 2 / count) * i + (Math.random() - 0.5) * 0.5;
        const distance = 60 + Math.random() * 80;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        const rotate = (Math.random() - 0.5) * 720;

        petal.style.setProperty('--tx', `${tx}px`);
        petal.style.setProperty('--ty', `${ty}px`);
        petal.style.setProperty('--rot', `${rotate}deg`);

        document.body.appendChild(petal);

        // Remove after animation
        setTimeout(() => petal.remove(), 900);
    }
});
