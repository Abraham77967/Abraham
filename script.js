// Scroll Animation
function handleScrollAnimation() {
    const elements = document.querySelectorAll('.scroll-animate');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;
        
        // Show element when it's 20% visible
        if (elementTop < windowHeight * 0.8 && elementBottom > 0) {
            element.classList.add('visible');
        }
    });
}

// Add scroll event listener
window.addEventListener('scroll', handleScrollAnimation);
// Initial check for elements in view
window.addEventListener('load', handleScrollAnimation);

// Navbar Scroll Effect
const navbar = document.querySelector('.glass-nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
});

// Liquid Button Effect
const buttons = document.querySelectorAll('.glass-button');

buttons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        button.style.setProperty('--x', `${x}px`);
        button.style.setProperty('--y', `${y}px`);
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Interactive Background Effects
const background = document.querySelector('.background-animation');
const glow = document.createElement('div');
glow.className = 'glow';
background.appendChild(glow);

let mouseX = 0;
let mouseY = 0;
let glowX = 0;
let glowY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Update glow position with smooth animation
    requestAnimationFrame(() => {
        glowX += (mouseX - glowX) * 0.1;
        glowY += (mouseY - glowY) * 0.1;
        glow.style.left = `${glowX}px`;
        glow.style.top = `${glowY}px`;
    });
});

// Add parallax effect to background elements
const backgroundElements = document.querySelectorAll('.background-animation::before, .background-animation::after');

document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    
    backgroundElements.forEach(element => {
        element.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});

// Add subtle floating animation to cards
const cards = document.querySelectorAll('.glass-card, .project-card, .timeline-item');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'none';
    });
});

// Background Animation
document.addEventListener('DOMContentLoaded', () => {
    const background = document.querySelector('.background-animation');
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = `particle ${['small', 'medium', 'large'][Math.floor(Math.random() * 3)]}`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        // Add random initial phase for each particle
        particle.dataset.phase = Math.random() * Math.PI * 2;
        background.appendChild(particle);
    }

    // Create gradient orbs
    for (let i = 0; i < 5; i++) {
        const orb = document.createElement('div');
        orb.className = `gradient-orb ${['primary', 'accent', 'secondary'][Math.floor(Math.random() * 3)]}`;
        orb.style.width = `${Math.random() * 200 + 100}px`;
        orb.style.height = orb.style.width;
        orb.style.left = `${Math.random() * 100}%`;
        orb.style.top = `${Math.random() * 100}%`;
        background.appendChild(orb);
    }

    // Animate particles
    function animateParticles() {
        const particles = document.querySelectorAll('.particle');
        const time = Date.now() * 0.001; // Convert to seconds for smoother animation
        
        particles.forEach(particle => {
            const phase = parseFloat(particle.dataset.phase);
            const speed = 0.5; // Slower speed for gentler movement
            const amplitude = 0.5; // Smaller amplitude for subtler movement
            
            // Create gentle floating motion
            const yOffset = Math.sin(time * speed + phase) * amplitude;
            const currentTop = parseFloat(particle.style.top) || 0;
            particle.style.top = `${currentTop + yOffset}%`;
            
            // Keep particles within bounds
            if (parseFloat(particle.style.top) < 0) particle.style.top = '100%';
            if (parseFloat(particle.style.top) > 100) particle.style.top = '0%';
        });
    }

    // Animate gradient orbs
    function animateOrbs() {
        const orbs = document.querySelectorAll('.gradient-orb');
        orbs.forEach(orb => {
            const currentX = parseFloat(orb.style.left) || 0;
            const currentY = parseFloat(orb.style.top) || 0;
            const speed = Math.random() * 0.01 + 0.005;
            const angle = Math.random() * Math.PI * 2;
            
            orb.style.left = `${currentX + Math.cos(angle) * speed}%`;
            orb.style.top = `${currentY + Math.sin(angle) * speed}%`;
            
            // Keep orbs within bounds
            if (parseFloat(orb.style.left) < 0) orb.style.left = '100%';
            if (parseFloat(orb.style.left) > 100) orb.style.left = '0%';
            if (parseFloat(orb.style.top) < 0) orb.style.top = '100%';
            if (parseFloat(orb.style.top) > 100) orb.style.top = '0%';
        });
    }

    // Start animations
    function animate() {
        animateParticles();
        animateOrbs();
        requestAnimationFrame(animate);
    }

    animate();
});

// Animation for elements when they come into view
document.addEventListener('DOMContentLoaded', function() {
    // Scroll animation
    const scrollElements = document.querySelectorAll('.scroll-animate');
    
    function checkElements() {
        scrollElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('visible');
            }
        });
    }
    
    window.addEventListener('scroll', checkElements);
    checkElements();
});

// Robotics achievements popup functionality - Moved outside DOMContentLoaded for immediate execution
console.log('Setting up popup functionality');

// Handle popup opening and closing
window.addEventListener('load', function() {
    const roboticsCard = document.getElementById('robotics-card');
    const achievementsPopup = document.getElementById('achievements-popup');
    const closePopupBtn = document.querySelector('.close-popup');
    
    console.log('Robotics card:', roboticsCard);
    console.log('Achievements popup:', achievementsPopup);
    console.log('Close button:', closePopupBtn);
    
    // Open popup on button click
    if (roboticsCard) {
        const viewAchievementsBtn = roboticsCard.querySelector('.view-achievements-btn');
        console.log('View achievements button:', viewAchievementsBtn);
        
        if (viewAchievementsBtn) {
            viewAchievementsBtn.addEventListener('click', function(e) {
                console.log('Button clicked');
                e.preventDefault();
                e.stopPropagation();
                achievementsPopup.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling when popup is open
            });
        }
    }
    
    // Close popup on close button click
    if (closePopupBtn) {
        closePopupBtn.addEventListener('click', function() {
            console.log('Close button clicked');
            achievementsPopup.classList.remove('active');
            document.body.style.overflow = ''; // Re-enable scrolling
        });
    }
    
    // Close popup when clicking outside the content
    if (achievementsPopup) {
        achievementsPopup.addEventListener('click', function(e) {
            if (e.target === achievementsPopup) {
                console.log('Clicked outside popup');
                achievementsPopup.classList.remove('active');
                document.body.style.overflow = ''; // Re-enable scrolling
            }
        });
    }
    
    // Close popup with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && achievementsPopup && achievementsPopup.classList.contains('active')) {
            console.log('ESC key pressed');
            achievementsPopup.classList.remove('active');
            document.body.style.overflow = ''; // Re-enable scrolling
        }
    });
}); 