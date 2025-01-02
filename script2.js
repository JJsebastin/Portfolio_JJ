// Function to add 'active' class to the current navigation link
function setActiveLink() {
    const navLinks = document.querySelectorAll('nav a');
    const currentPage = window.location.pathname.split('/').pop(); // Get current page from URL

    navLinks.forEach(link => {
        if (link.href.includes(currentPage)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Smooth scrolling for internal links
function smoothScroll() {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', event => {
            const targetId = link.getAttribute('href').slice(1); // Extract target ID
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                event.preventDefault();
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }
        });
    });
}

// Page transition animations
function setupPageTransitions() {
    const body = document.body;
    const currentPage = window.location.pathname.split('/').pop();

    // Apply initial animation
    if (currentPage === '' || currentPage === 'index.html') {
        body.classList.add('rise-animation'); // For home page
    } else {
        body.classList.add('pan-animation'); // For other pages
    }

    // Clean up animations after they're done
    body.addEventListener('animationend', () => {
        body.classList.remove('rise-animation', 'pan-animation');
    });
}

// Initialize scripts on page load
document.addEventListener('DOMContentLoaded', () => {
    setActiveLink();
    setupPageTransitions();
    smoothScroll();
});
