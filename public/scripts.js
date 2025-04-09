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
                    
                    // Ensure hero content is ready before fading out loading screen
                    const heroContent = document.querySelector('.hero-content');
                    if (heroContent) {
                        const heroElements = heroContent.querySelectorAll('h1, h2, .typewriter-container, .hero-description');
                        heroElements.forEach(el => {
                            el.style.visibility = 'visible';
                            el.style.opacity = '1';
                            el.style.display = el.tagName.toLowerCase() === 'h1' || el.tagName.toLowerCase() === 'h2' ? 'block' : 'flex';
                        });
                    }
                    
                    // Wait for transition to complete before removing
                    setTimeout(() => {
                        document.body.classList.remove('loading');
                        loadingScreen.style.display = 'none';
                        
                        // Initialize main content
                        animateHeroElements();
                        initTypewriterEffect();
                        initializePageElements();
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
        animateHeroElements();
        initTypewriterEffect();
        initializePageElements();
    }
    
    // Animate hero elements
    function animateHeroElements() {
        console.log('Animating hero elements');
        
        // Make sure all hero elements are visible first
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.visibility = 'visible';
            heroContent.style.opacity = '1';
        }
        
        // Get hero elements
        const heroElements = document.querySelectorAll('.hero-animate');
        console.log(`Found ${heroElements.length} hero elements to animate`);
        
        if (heroElements && heroElements.length) {
            gsap.from(heroElements, {
                duration: 1,
                y: 20,
                opacity: 0,
                stagger: 0.15,
                ease: "power3.out",
                onComplete: () => {
                    console.log('Hero animation complete');
                }
            });
        }
        
        const scrollArrow = document.getElementById('scroll-arrow');
        if (scrollArrow) {
            gsap.from(scrollArrow, {
                duration: 0.8,
                y: -20,
                opacity: 0,
                ease: "back.out(1.7)",
                delay: 0.3
            });
        }
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
