// Portfolio script
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing animations');
    
    // DOM Elements
    const loadingScreen = document.querySelector('.loading-screen');
    const codeTypingElement = document.querySelector('.code-typing');
    const heroElements = document.querySelectorAll('.hero-animate');
    const scrollArrow = document.getElementById('scroll-arrow');
    const roleText = document.getElementById('role-text');
    
    // Initialize the loading animation
    function initLoadingAnimation() {
        // Make sure loading screen is visible
        document.body.classList.add('loading');
        if (!loadingScreen) {
            console.error('Loading screen not found');
            skipToMainContent();
            return;
        }
        
        // Ensure loading screen is visible
        loadingScreen.style.display = 'flex';
        loadingScreen.style.opacity = '1';
        
        // Get the code editor and typing element
        const codeEditor = document.querySelector('.code-editor');
        if (!codeTypingElement || !codeEditor) {
            console.error('Code typing elements not found');
            skipToMainContent();
            return;
        }
        
        // Set the exact HTML content we want to display
        const exactCodeHTML = `<span class="code-comment">// Portfolio</span>
<span class="code-keyword">const</span> dev = {
  <span class="code-property">name</span>: <span class="code-string">"Joseph Wicorek"</span>,
  <span class="code-property">role</span>: <span class="code-string">"Software Engineer"</span>,
  <span class="code-function">init</span>: <span class="code-keyword">function</span>() {
    <span class="code-variable">console</span>.<span class="code-function">log</span>(<span class="code-template">\${this.name}</span> - <span class="code-template">\${this.role}</span>);
  }
};

dev.<span class="code-function">init</span>(); <span class="code-comment">// Output: Joseph Wicorek - Software Engineer</span>`;
        
        // Show code editor
        codeEditor.style.opacity = '1';
        codeEditor.style.transform = 'translateY(0)';
        
        // Function to simulate typing
        let displayedText = '';
        let charIndex = 0;
        
        // Calculate typing speed to make the entire animation take about 2 seconds
        const totalChars = exactCodeHTML.length;
        const totalTypingTime = 2000; // 2 seconds in milliseconds
        const typingSpeed = Math.floor(totalTypingTime / totalChars);
        
        function typeNextChar() {
            if (charIndex < exactCodeHTML.length) {
                displayedText += exactCodeHTML.charAt(charIndex);
                codeTypingElement.innerHTML = displayedText;
                charIndex++;
                setTimeout(typeNextChar, typingSpeed);
            } else {
                // Add blinking cursor at the end
                codeTypingElement.innerHTML = exactCodeHTML + '<span class="code-cursor"></span>';
                
                // Complete animation after a 1-second pause
                setTimeout(() => {
                    codeEditor.classList.add('complete');
                    
                    // Fade out loading screen
                    setTimeout(() => {
                        loadingScreen.style.opacity = '0';
                        
                        // Remove loading screen and start main animations
                        setTimeout(() => {
                            loadingScreen.style.display = 'none';
                            document.body.classList.remove('loading');
                            startStaggeredAnimations();
                        }, 500);
                    }, 300);
                }, 1000); // 1-second pause
            }
        }
        
        // Start typing after a short delay
        setTimeout(typeNextChar, 200);
    }
    
    // Skip to main content if animation elements not found
    function skipToMainContent() {
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
        }
        document.body.classList.remove('loading');
        startStaggeredAnimations();
    }
    
    // Staggered animations for page elements
    function startStaggeredAnimations() {
        console.log('Starting staggered animations');
        
        // Force hide hero elements initially
        document.querySelectorAll('.hero-animate, .hero-description, .social-links').forEach(el => {
            el.style.opacity = '0';
            el.style.visibility = 'hidden';
            el.style.transform = 'translateY(20px)';
        });
        
        // Define animation sequence in exact order
        const animationSequence = [
            // 1. First animate navbar items one by one
            ...Array.from(document.querySelectorAll('.nav-item')),
            
            // 2. Then animate the logo
            document.querySelector('.logo-container'),
            
            // 3. Then animate resume button
            document.querySelector('.resume-button-container'),
            
            // 4. Then animate side social links
            document.querySelector('.side-social'),
            
            // 5. Then animate scroll arrow
            document.getElementById('scroll-arrow'),
            
            // 6. Finally animate hero content
            ...Array.from(document.querySelectorAll('.hero-animate'))
        ];
        
        // Filter out any null elements
        const validElements = animationSequence.filter(el => el !== null);
        
        // Log what we found
        console.log(`Found ${validElements.length} elements to animate`);
        
        // Get navbar items for special handling
        const navItems = Array.from(document.querySelectorAll('.nav-item'));
        
        // Animate navbar items one by one with setTimeout - faster animation (100ms instead of 150ms)
        navItems.forEach((navItem, index) => {
            setTimeout(() => {
                navItem.classList.add('fade-in-element');
                navItem.classList.remove('hidden');
                navItem.style.opacity = '1';
                navItem.style.visibility = 'visible';
                navItem.style.transform = 'translateY(0)';
                console.log(`Animating navbar item ${index + 1}`);
            }, 100 * index); // Reduced from 150ms to 100ms
        });
        
        // Calculate when navbar animation will complete - reduced by 0.5 seconds
        const navbarAnimationTime = 100 * navItems.length + 100; // Reduced from 200ms to 100ms
        
        // Animate the rest of the elements after navbar animation completes
        setTimeout(() => {
            // Get non-navbar elements
            const nonNavElements = validElements.filter(el => !el.classList.contains('nav-item'));
            
            // Animate each non-navbar element with a delay - faster animation (100ms instead of 150ms)
            nonNavElements.forEach((element, index) => {
                setTimeout(() => {
                    element.classList.add('fade-in-element');
                    element.classList.remove('hidden');
                    element.style.opacity = '1';
                    element.style.visibility = 'visible';
                    element.style.transform = 'translateY(0)';
                    console.log(`Animating non-nav element ${index + 1}`);
                }, 100 * index); // Reduced from 150ms to 100ms
            });
            
            // After all animations complete
            const totalDelay = 100 * nonNavElements.length + 100; // Reduced from 200ms to 100ms
            
            setTimeout(() => {
                document.body.classList.add('animations-complete');
                
                // Initialize typewriter effect
                initTypewriterEffect();
                
                // Initialize other page elements
                initializePageElements();
            }, totalDelay);
        }, navbarAnimationTime);
    }
    
    // Initialize other page elements
    function initializePageElements() {
        // Initialize project card tilt effect if available
        const projectCards = document.querySelectorAll('.project-card');
        if (projectCards.length && typeof VanillaTilt !== 'undefined') {
            VanillaTilt.init(projectCards, {
                max: 5,
                speed: 400,
                glare: true,
                "max-glare": 0.2,
            });
        }
        
        // Initialize AOS animations if available
        if (typeof AOS !== 'undefined' && AOS.refresh) {
            AOS.refresh();
        }
    }
    
    // Typewriter effect for role text
    function initTypewriterEffect() {
        const roleText = document.getElementById('role-text');
        if (!roleText) {
            console.error('Role text element not found');
            return;
        }
        
        console.log('Initializing typewriter effect');
        const roles = ['Software Engineer', 'Data Engineer', 'Full-Stack Developer'];
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
    }
    
    // Start the loading animation
    initLoadingAnimation();
});
