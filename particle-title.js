// Liquid Metallic Particle Animation
document.addEventListener('DOMContentLoaded', function() {
    const particleTitle = document.querySelector('.particle-title');
    const particleText = document.querySelector('.particle-text');
    const particlesContainer = document.querySelector('.particles');
    
    if (!particleTitle || !particleText || !particlesContainer) return;
    
    // Create particles based on text position
    function createParticles() {
        // Clear existing particles
        particlesContainer.innerHTML = '';
        
        // Get text dimensions
        const textRect = particleText.getBoundingClientRect();
        const textWidth = textRect.width;
        const textHeight = textRect.height;
        
        // Create particles - more for a denser effect
        const particleCount = Math.floor(textWidth / 6); // One particle per 6px of width
        
        for (let i = 0; i < particleCount; i++) {
            createParticle(textWidth, textHeight);
        }
        
        // Create some larger "droplet" particles for liquid effect
        const dropletCount = Math.floor(particleCount / 5); // 20% of the particles are droplets
        
        for (let i = 0; i < dropletCount; i++) {
            createLiquidParticle(textWidth, textHeight);
        }
        
        // Start animation loop
        animateParticles();
    }
    
    // Create a standard particle
    function createParticle(textWidth, textHeight) {
        const particle = document.createElement('div');
        
        // Random size - weighted to smaller particles
        const sizeRandom = Math.random();
        let sizeClass = 'size-1';
        if (sizeRandom > 0.7) sizeClass = 'size-2';
        else if (sizeRandom > 0.9) sizeClass = 'size-3';
        
        particle.className = `particle ${sizeClass}`;
        
        // Random position along the text
        const xPos = Math.random() * textWidth;
        const yPos = Math.random() * textHeight;
        
        // Random x movement direction
        const xDirection = Math.random() > 0.5 ? 1 : -1;
        const xMovement = Math.random() * 60 * xDirection;
        
        particle.style.left = `${xPos}px`;
        particle.style.top = `${yPos}px`;
        particle.style.setProperty('--tx', `${xMovement}px`);
        
        // Random animation delay
        const delay = Math.random() * 3;
        particle.style.animationDelay = `${delay}s`;
        
        // Random opacity for shimmer effect
        particle.style.opacity = (Math.random() * 0.5).toString();
        
        // Add metallic color variation
        const colorOptions = [
            { hue: 210, sat: 70, light: 75 }, // Blue metallic
            { hue: 230, sat: 60, light: 70 }, // Indigo metallic
            { hue: 45, sat: 80, light: 80 },  // Gold accent
            { hue: 0, sat: 0, light: 90 }     // Silver accent
        ];
        
        const colorChoice = colorOptions[Math.floor(Math.random() * colorOptions.length)];
        const hue = colorChoice.hue + Math.random() * 15; // Add slight variation
        const sat = colorChoice.sat + Math.random() * 10;
        const lightness = colorChoice.light + Math.random() * 10;
        
        particle.style.background = `radial-gradient(circle at 30% 30%, 
            rgba(255, 255, 255, 0.9), 
            hsla(${hue}, ${sat}%, ${lightness}%, 0.6))`;
        
        // Add particle to container
        particlesContainer.appendChild(particle);
        
        return particle;
    }
    
    // Create a liquid-like particle (droplet)
    function createLiquidParticle(textWidth, textHeight) {
        const particle = document.createElement('div');
        particle.className = `particle droplet size-4`;
        
        // Position at bottom of text for rising effect
        const xPos = Math.random() * textWidth;
        const yPos = textHeight - (Math.random() * 20);
        
        // Random x movement for fluid motion
        const xDirection = Math.random() > 0.5 ? 1 : -1;
        const xMovement = Math.random() * 80 * xDirection;
        
        // Random rotation for fluid effect
        const rotation = Math.random() * 360;
        
        particle.style.left = `${xPos}px`;
        particle.style.top = `${yPos}px`;
        particle.style.setProperty('--tx', `${xMovement}px`);
        particle.style.setProperty('--rot', `${rotation}deg`);
        
        // Random animation delay
        const delay = Math.random() * 5;
        particle.style.animationDelay = `${delay}s`;
        
        // Random metallic color variation - more luxury options for droplets
        const dropletColors = [
            { hue: 210, sat: 70, light: 75 }, // Blue metallic
            { hue: 230, sat: 60, light: 70 }, // Indigo metallic
            { hue: 45, sat: 80, light: 80 },  // Gold accent
            { hue: 0, sat: 0, light: 90 },    // Silver accent
            { hue: 190, sat: 90, light: 70 }  // Teal accent
        ];
        
        const dropletColor = dropletColors[Math.floor(Math.random() * dropletColors.length)];
        const dropletHue = dropletColor.hue + Math.random() * 15;
        const dropletSat = dropletColor.sat + Math.random() * 10;
        const dropletLight = dropletColor.light + Math.random() * 10;
        
        particle.style.background = `linear-gradient(135deg, 
            rgba(255, 255, 255, 0.9), 
            hsla(${dropletHue}, ${dropletSat}%, ${dropletLight}%, 0.6))`;
        
        // Add particle to container
        particlesContainer.appendChild(particle);
        
        return particle;
    }
    
    // Animate particles
    function animateParticles() {
        const particles = document.querySelectorAll('.particle');
        
        particles.forEach(particle => {
            // Different animation types
            if (particle.classList.contains('droplet')) {
                // Liquid droplets get the fluid animation
                const duration = Math.random() * 4 + 6; // 6-10 seconds for slower movement
                particle.style.animation = `liquidFlow ${duration}s ease-in-out infinite`;
            } else {
                // Standard particles get the floating animation
                const duration = Math.random() * 3 + 4; // 4-7 seconds
                particle.style.animation = `floatUp ${duration}s ease-out infinite`;
            }
            
            // When animation completes, reposition particle
            particle.addEventListener('animationiteration', () => {
                const textRect = particleText.getBoundingClientRect();
                const xPos = Math.random() * textRect.width;
                
                // Different repositioning based on particle type
                if (particle.classList.contains('droplet')) {
                    // Reset droplet position to bottom with new rotation
                    particle.style.left = `${xPos}px`;
                    particle.style.top = `${textRect.height - 10}px`;
                    
                    const rotation = Math.random() * 360;
                    particle.style.setProperty('--rot', `${rotation}deg`);
                } else {
                    // Reset standard particle
                    particle.style.left = `${xPos}px`;
                    particle.style.top = `${textRect.height - 5}px`;
                }
                
                // Random x movement direction
                const xDirection = Math.random() > 0.5 ? 1 : -1;
                const xMovement = Math.random() * 60 * xDirection;
                particle.style.setProperty('--tx', `${xMovement}px`);
                
                // Random opacity for shimmer effect
                particle.style.opacity = (Math.random() * 0.5 + 0.3).toString();
            });
        });
    }
    
    // Initialize particles when page loads
    createParticles();
    
    // Recreate particles when window resizes
    window.addEventListener('resize', createParticles);
    
    // Add interactive splash effect on hover
    particleTitle.addEventListener('mouseenter', function() {
        particlesContainer.classList.add('hover');
        const particles = document.querySelectorAll('.particle');
        
        particles.forEach(particle => {
            // Create splash/ripple effect
            const rect = particleTitle.getBoundingClientRect();
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const particleX = parseInt(particle.style.left);
            const particleY = parseInt(particle.style.top);
            
            // Calculate direction away from center
            const dirX = particleX - centerX;
            const dirY = particleY - centerY;
            
            // Normalize direction
            const length = Math.sqrt(dirX * dirX + dirY * dirY) || 1;
            const normX = dirX / length;
            const normY = dirY / length;
            
            // Apply explosion force - different force for different particle types
            const force = particle.classList.contains('droplet') 
                ? 150 + Math.random() * 100 
                : 100 + Math.random() * 50;
                
            const targetX = particleX + normX * force;
            const targetY = particleY + normY * force;
            
            // Add rotation for more dynamic effect
            const rotation = Math.random() * 720 - 360;
            
            // Apply transform and fade out with liquid-like timing
            particle.style.transition = 'transform 0.7s cubic-bezier(0.2, 0.8, 0.3, 1), opacity 0.7s cubic-bezier(0.3, 0, 0.7, 1)';
            particle.style.transform = `translate(${targetX - particleX}px, ${targetY - particleY}px) rotate(${rotation}deg) scale(${0.5 + Math.random() * 0.5})`;
            particle.style.opacity = '0';
        });
        
        // Reset after animation completes
        setTimeout(() => {
            createParticles();
            particlesContainer.classList.remove('hover');
        }, 700);
    });
    
    // Add liquid ripple effect on click
    particleTitle.addEventListener('click', function(e) {
        // Create ripple effect at click position
        const rect = particleTitle.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;
        
        // Create 30 particles radiating from click position
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            
            // Larger particles for the splash
            particle.className = `particle size-${Math.floor(Math.random() * 3) + 2}`;
            
            // Position at click point
            particle.style.left = `${clickX}px`;
            particle.style.top = `${clickY}px`;
            
            // Random direction for 360-degree splash
            const angle = (i / 30) * Math.PI * 2 + (Math.random() * 0.5 - 0.25);
            const distance = 50 + Math.random() * 100;
            const speed = 0.5 + Math.random() * 0.5;
            
            // Random metallic color variation
            const hue = 190 + Math.random() * 60; // blue to light-blue range
            particle.style.background = `radial-gradient(circle at 30% 30%, 
                rgba(255, 255, 255, 0.9), 
                hsla(${hue}, 80%, 75%, 0.7))`;
            
            // Apply animation directly for this one-time effect
            particle.style.transition = `transform ${speed}s cubic-bezier(0.1, 0.8, 0.3, 1), opacity ${speed}s ease-out`;
            
            // Apply initial styles
            particle.style.opacity = '0.8';
            
            // Add to container
            particlesContainer.appendChild(particle);
            
            // Trigger animation with a slight delay to create ripple effect
            setTimeout(() => {
                particle.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(${0.3 + Math.random() * 0.7})`;
                particle.style.opacity = '0';
            }, 10);
            
            // Remove particle after animation
            setTimeout(() => {
                particle.remove();
            }, speed * 1000);
        }
    });
}); 