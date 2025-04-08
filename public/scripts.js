// Optimized standalone animation solution
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing animations');
    
    // DOM Elements
    const loadingElements = {
        screen: document.querySelector('.loading-screen'),
        iframe: document.querySelector('.loading-container iframe')
    };

    const heroElements = document.querySelectorAll('.hero-animate');
    const scrollArrow = document.getElementById('scroll-arrow');
    
    // State
    const state = {
        isLoading: true,
        hasScrolled: false
    };
    
    // Initialize loading animation
    const initializeLoadingAnimation = () => {
        if (!loadingElements.screen) return;
        
        // Calculate total animation time - just enough to see the animation
        const totalAnimTime = 3000;
        
        // Fade out loading screen after animations complete
        setTimeout(() => {
            gsap.to(loadingElements.screen, {
                duration: 0.8,
                opacity: 0,
                onComplete: () => {
                    document.body.classList.remove('loading');
                    loadingElements.screen.style.display = 'none';
                    state.isLoading = false;
                    initializePageReveal();
                }
            });
        }, totalAnimTime);
    };
    
    // Initialize page reveal
    const initializePageReveal = () => {
        animatePageElements();
        initTypewriterEffect();
    };
    
    // Function to animate page elements
    const animatePageElements = () => {
        // Animate hero elements with staggered delay
        gsap.fromTo(heroElements, {
            y: 20,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out"
        });
        
        // Animate scroll indicator
        if (scrollArrow) {
            setTimeout(() => {
                scrollArrow.style.opacity = '1';
            }, 1200);
        }
    };
    
    // Typewriter effect
    const initTypewriterEffect = () => {
        const roleText = document.getElementById('role-text');
        if (!roleText) return;
        
        const roles = ['Software Engineer', 'Web Developer', 'Problem Solver'];
        let currentRoleIndex = 0;
        
        function typeRole(role) {
            let i = 0;
            roleText.textContent = '';
            
            function type() {
                if (i < role.length) {
                    roleText.textContent += role.charAt(i);
                    i++;
                    setTimeout(type, 100);
                } else {
                    // Wait before erasing
                    setTimeout(erase, 2000);
                }
            }
            
            function erase() {
                if (roleText.textContent.length > 0) {
                    roleText.textContent = roleText.textContent.slice(0, -1);
                    setTimeout(erase, 50);
                } else {
                    // Move to next role
                    currentRoleIndex = (currentRoleIndex + 1) % roles.length;
                    setTimeout(() => typeRole(roles[currentRoleIndex]), 500);
                }
            }
            
            type();
        }
        
        // Start the typewriter effect
        typeRole(roles[currentRoleIndex]);
    };
    
    // Start the loading animation
    initializeLoadingAnimation();
});
