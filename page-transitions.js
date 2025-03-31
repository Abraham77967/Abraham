document.addEventListener('DOMContentLoaded', () => {
    // Create page transition overlay
    const transitionOverlay = document.createElement('div');
    transitionOverlay.className = 'page-transition';
    document.body.appendChild(transitionOverlay);

    // Important: Set initial state based on navigation
    document.body.classList.add('fade-in');
    
    // Force page to start with opacity 0
    if (performance.navigation.type !== performance.navigation.TYPE_RELOAD) {
        document.body.style.opacity = "0";
    }
    
    // Get all navigation links that lead to different pages
    const links = document.querySelectorAll('a[href]:not([href^="#"]):not([target="_blank"])');
    
    // Preload pages for smoother transitions
    function preloadPage(url) {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = url;
        document.head.appendChild(link);
    }
    
    // Preload all internal pages
    links.forEach(link => {
        if (link.hostname === window.location.hostname) {
            preloadPage(link.href);
        }
    });
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only handle links to other pages on the same site
            const isSameDomain = this.hostname === window.location.hostname;
            const isAnchorLink = this.getAttribute('href').startsWith('#');
            const isDownload = this.hasAttribute('download');
            
            if (isSameDomain && !isAnchorLink && !isDownload) {
                e.preventDefault();
                const targetHref = this.getAttribute('href');
                
                // Start page transition - hide nav and footer first
                const nav = document.querySelector('.glass-nav');
                const footer = document.querySelector('.glass-footer');
                
                if (nav) nav.style.transition = 'transform 0.4s ease-in, opacity 0.4s ease-in';
                if (footer) footer.style.transition = 'transform 0.4s ease-in, opacity 0.4s ease-in';
                
                // Quickly animate out nav and footer
                if (nav) {
                    nav.style.transform = 'translateY(-100%)';
                    nav.style.opacity = '0';
                }
                
                if (footer) {
                    footer.style.transform = 'translateY(100%)';
                    footer.style.opacity = '0';
                }
                
                // Then fade out the body
                setTimeout(() => {
                    document.documentElement.classList.add('is-transitioning');
                    transitionOverlay.classList.add('active');
                    document.body.classList.add('fade-out');
                    document.body.classList.remove('fade-in');
                    
                    // Wait for animation to complete before navigating
                    setTimeout(() => {
                        window.location.href = targetHref;
                    }, 800); // Match the transition duration in CSS
                }, 200);
            }
        });
    });
    
    // Trigger the fade-in animation after a short delay
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.body.classList.remove('fade-out');
            document.body.classList.remove('fade-in');
            document.body.classList.add('content-visible');
            document.documentElement.classList.remove('is-transitioning');
            document.documentElement.classList.remove('is-entering');
            transitionOverlay.classList.remove('active');
            
            // Reset nav and footer transition timing for subsequent animations
            const nav = document.querySelector('.glass-nav');
            const footer = document.querySelector('.glass-footer');
            
            if (nav) nav.style.transition = 'transform 1.2s cubic-bezier(0.22, 1, 0.36, 1), opacity 1.2s cubic-bezier(0.22, 1, 0.36, 1)';
            if (footer) footer.style.transition = 'transform 1.2s cubic-bezier(0.22, 1, 0.36, 1), opacity 1.2s cubic-bezier(0.22, 1, 0.36, 1)';
        }, 50);
    });
    
    // Fade in when page loads from back/forward
    window.addEventListener('pageshow', function(event) {
        if (event.persisted) {
            // Coming from back/forward buttons
            document.body.classList.remove('fade-out');
            document.body.classList.remove('fade-in');
            document.body.classList.add('content-visible');
            document.documentElement.classList.remove('is-transitioning');
            document.documentElement.classList.remove('is-entering');
            transitionOverlay.classList.remove('active');
        }
    });
}); 