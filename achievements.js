// Simple script to handle the achievements popup
document.addEventListener('DOMContentLoaded', function() {
    console.log('Achievements script loaded');
    
    // Get elements
    const viewButton = document.querySelector('.view-achievements-btn');
    const popup = document.getElementById('achievements-popup');
    const closeButton = document.querySelector('.close-popup');
    
    console.log('Button:', viewButton);
    console.log('Popup:', popup);
    console.log('Close button:', closeButton);
    
    // Open popup when button is clicked
    if (viewButton) {
        viewButton.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('View button clicked');
            if (popup) {
                popup.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            }
        });
    }
    
    // Close popup when close button is clicked
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            console.log('Close button clicked');
            popup.classList.remove('active');
            document.body.style.overflow = ''; // Re-enable scrolling
        });
    }
    
    // Close popup when clicking outside content
    if (popup) {
        popup.addEventListener('click', function(e) {
            if (e.target === popup) {
                console.log('Clicked outside popup');
                popup.classList.remove('active');
                document.body.style.overflow = ''; // Re-enable scrolling
            }
        });
    }
    
    // Close popup with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popup && popup.classList.contains('active')) {
            console.log('ESC key pressed');
            popup.classList.remove('active');
            document.body.style.overflow = ''; // Re-enable scrolling
        }
    });
}); 