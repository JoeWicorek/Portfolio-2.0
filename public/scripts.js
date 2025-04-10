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
    const codeSnippet = `/* Portfolio */
const dev = {
  name: "Joseph Wicorek",
  role: "Software Engineer"
};
dev.init();`;
    
    // Function to add syntax highlighting
    function highlightCode(code) {
        return code
            .replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, match => `<span class="code-comment">${match}</span>`)
            .replace(/(".*?"|'.*?'|`.*?`)/g, match => `<span class="code-string">${match}</span>`)
            .replace(/\b(const|let|var|function|return|if|else|for|while|class|import|export|from|this|new|constructor)\b/g, match => `<span class="code-keyword">${match}</span>`)
            .replace(/\b(true|false|null|undefined|console)\b/g, match => `<span class="code-variable">${match}</span>`)
            .replace(/\b(\d+)\b/g, match => `<span class="code-number">${match}</span>`)
            .replace(/\b(log|map|render|init|createPortfolio)\b/g, match => `<span class="code-function">${match}</span>`)
            .replace(/\b(name|role|skills|passion|projects)\b/g, match => `<span class="code-property">${match}</span>`)
            .replace(/\b(SoftwareEngineer)\b/g, match => `<span class="code-class">${match}</span>`);
    }
    
    // Initialize the loading animation
    function initLoadingAnimation() {
        if (!codeTypingElement || !loadingScreen) {
            skipToMainContent();
            return;
        }
        
        // Set up typing animation
        let charIndex = 0;
        const cursor = '<span class="code-cursor"></span>';
        
        // Pre-process the highlighted code once
        const highlightedCode = highlightCode(codeSnippet);
        
        // Type each character with a fixed delay
        function typeNextChar() {
            if (charIndex <= codeSnippet.length) {
                // Get the current substring of the original code
                const currentText = codeSnippet.substring(0, charIndex);
                
                // Apply highlighting to the entire current text
                codeTypingElement.innerHTML = highlightCode(currentText) + cursor;
                
                charIndex++;
                setTimeout(typeNextChar, 30); // Even faster 30ms delay between characters (was 50ms)
            } else {
                // Typing complete, show completion effect
                const codeEditor = document.querySelector('.code-editor');
                if (codeEditor) {
                    codeEditor.classList.add('complete');
                }
                
                // Wait a moment before fading out
                setTimeout(() => {
                    loadingScreen.classList.add('fade-out');
                    
                    // Wait for transition to complete before removing
                    setTimeout(() => {
                        document.body.classList.remove('loading');
                        loadingScreen.style.display = 'none';
                        
                        // Start main content animations
                        startBrittanyChiangStyleAnimations();
                    }, 800);
                }, 800);
            }
        }
        
        // Start typing
        typeNextChar();
    }
    
    // Skip to main content if animation elements not found
    function skipToMainContent() {
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
        }
        document.body.classList.remove('loading');
        startBrittanyChiangStyleAnimations();
    }
    
    // Brittany Chiang style staggered animations
    function startBrittanyChiangStyleAnimations() {
        console.log('Starting Brittany Chiang style animations');
        
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
        
        // Animate navbar items one by one with setTimeout
        navItems.forEach((navItem, index) => {
            setTimeout(() => {
                navItem.classList.add('fade-in-element');
                navItem.classList.remove('hidden');
                navItem.style.opacity = '1';
                navItem.style.visibility = 'visible';
                navItem.style.transform = 'translateY(0)';
                console.log(`Animating navbar item ${index + 1}`);
            }, 150 * index);
        });
        
        // Calculate when navbar animation will complete
        const navbarAnimationTime = 150 * navItems.length + 200;
        
        // Animate the rest of the elements after navbar animation completes
        setTimeout(() => {
            // Get non-navbar elements
            const nonNavElements = validElements.filter(el => !el.classList.contains('nav-item'));
            
            // Animate each non-navbar element with a delay
            nonNavElements.forEach((element, index) => {
                setTimeout(() => {
                    element.classList.add('fade-in-element');
                    element.classList.remove('hidden');
                    element.style.opacity = '1';
                    element.style.visibility = 'visible';
                    element.style.transform = 'translateY(0)';
                    console.log(`Animating non-nav element ${index + 1}`);
                }, 150 * index);
            });
            
            // After all animations complete
            const totalDelay = 150 * nonNavElements.length + 200;
            
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
