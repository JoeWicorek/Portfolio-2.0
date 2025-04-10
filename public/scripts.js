// Portfolio script
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing animations');
    
    // DOM Elements
    const loadingScreen = document.querySelector('.loading-screen');
    const codeTypingElement = document.querySelector('.code-typing');
    const heroElements = document.querySelectorAll('.hero-animate');
    const scrollArrow = document.getElementById('scroll-arrow');
    const roleText = document.getElementById('role-text');
    
    // Code to be typed
    const codeSnippet = `// Portfolio
const dev = {
  name: "Joseph Wicorek",
  role: "Software Engineer",
  init: function() {
    console.log(\${this.name} - \${this.role});
  }
};

dev.init(); // Output: Joseph Wicorek - Software Engineer`;
    
    // Function to add syntax highlighting
    function highlightCode(code) {
        return code
            .replace(/\/\/.*$/gm, match => `<span class="code-comment">${match}</span>`)
            .replace(/\/\*[\s\S]*?\*\//g, match => `<span class="code-comment">${match}</span>`)
            .replace(/(".*?"|'.*?'|`.*?`)/g, match => `<span class="code-string">${match}</span>`)
            .replace(/\b(const|let|var|function|return|if|else|for|while|class|import|export|from|this|new|constructor)\b/g, match => `<span class="code-keyword">${match}</span>`)
            .replace(/\b(true|false|null|undefined|console|log)\b/g, match => `<span class="code-variable">${match}</span>`)
            .replace(/\b(\d+)\b/g, match => `<span class="code-number">${match}</span>`)
            .replace(/\b(init)\b/g, match => `<span class="code-function">${match}</span>`)
            .replace(/\b(name|role)\b/g, match => `<span class="code-property">${match}</span>`)
            .replace(/\$\{.*?\}/g, match => `<span class="code-template">${match}</span>`);
    }
    
    // Initialize the loading animation
    function initLoadingAnimation() {
        // Make sure loading screen is visible
        document.body.classList.add('loading');
        if (loadingScreen) {
            loadingScreen.style.display = 'flex';
            loadingScreen.style.opacity = '1';
        } else {
            console.error('Loading screen not found');
            skipToMainContent();
            return;
        }
        
        // Get the code editor and typing element
        const codeEditor = document.querySelector('.code-editor');
        if (!codeTypingElement || !codeEditor) {
            console.error('Code typing elements not found');
            skipToMainContent();
            return;
        }
        
        // Reset typing element
        codeTypingElement.innerHTML = '';
        
        // Show code editor
        codeEditor.style.opacity = '1';
        codeEditor.style.transform = 'translateY(0)';
        
        // Type code with a delay
        let charIndex = 0;
        const typingSpeed = 8; // Even faster typing (was 15ms)
        
        function typeNextChar() {
            if (charIndex <= codeSnippet.length) {
                const currentText = codeSnippet.substring(0, charIndex);
                codeTypingElement.innerHTML = highlightCode(currentText);
                charIndex++;
                setTimeout(typeNextChar, typingSpeed);
            } else {
                // Add blinking cursor at the end
                codeTypingElement.innerHTML = highlightCode(codeSnippet) + '<span class="code-cursor"></span>';
                
                // Complete animation after a longer pause (about 2 seconds)
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
                        }, 800);
                    }, 500);
                }, 2000); // Longer pause here (was 300ms)
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
