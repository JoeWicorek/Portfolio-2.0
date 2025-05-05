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
        
        // The final code to display with syntax highlighting
        const finalCodeHTML = `<span class="code-comment">// Portfolio</span>
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
        
        // Set up a simple CSS animation for the cursor
        const style = document.createElement('style');
        style.textContent = `
            @keyframes blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
            }
            .code-cursor {
                display: inline-block;
                width: 2px;
                height: 1em;
                background-color: #fff;
                margin-left: 2px;
                animation: blink 1s infinite;
                vertical-align: text-bottom;
            }
        `;
        document.head.appendChild(style);
        
        // Create a cursor element
        const cursor = document.createElement('span');
        cursor.className = 'code-cursor';
        
        // Set initial empty content
        codeTypingElement.innerHTML = '';
        codeTypingElement.appendChild(cursor);
        
        // Use GSAP for ultra-smooth animation if available
        if (window.gsap) {
            // Pre-render the typing animation
            const rawCode = finalCodeHTML.replace(/<[^>]*>/g, '');
            const duration = 2; // 2 seconds
            
            gsap.to(cursor, {
                duration: 0.01,
                opacity: 1,
                ease: "none"
            });
            
            // Create a timeline for typing
            const tl = gsap.timeline();
            
            // Animate typing
            tl.to({}, {
                duration: duration,
                onUpdate: function() {
                    const progress = this.progress();
                    const charCount = Math.floor(rawCode.length * progress);
                    const visibleText = rawCode.substring(0, charCount);
                    
                    // Apply syntax highlighting to the final HTML
                    const visibleHTML = finalCodeHTML.substring(0, 
                        getHTMLIndexForRawIndex(finalCodeHTML, rawCode, charCount));
                    
                    codeTypingElement.innerHTML = visibleHTML;
                    codeTypingElement.appendChild(cursor);
                }
            });
            
            // Pause after typing
            tl.to({}, {
                duration: 1, // 1 second pause
                onComplete: function() {
                    // Complete animation
                    codeEditor.classList.add('complete');
                    
                    // Fade out loading screen
                    gsap.to(loadingScreen, {
                        opacity: 0,
                        duration: 0.3,
                        delay: 0.3,
                        clearProps: 'all', // Clear props after animation for better performance
                        onComplete: function() {
                            loadingScreen.style.display = 'none';
                            document.body.classList.remove('loading');
                            startStaggeredAnimations();
                        }
                    });
                }
            });
        } else {
            // Fallback for when GSAP is not available
            // Just show the code immediately
            codeTypingElement.innerHTML = finalCodeHTML + '<span class="code-cursor"></span>';
            
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
            }, 1000);
        }
    }
    
    // Helper function to find the HTML index corresponding to a raw text index
    function getHTMLIndexForRawIndex(html, rawText, rawIndex) {
        if (rawIndex >= rawText.length) return html.length;
        if (rawIndex <= 0) return 0;
        
        let htmlIndex = 0;
        let rawCurrentIndex = 0;
        let inTag = false;
        
        for (let i = 0; i < html.length; i++) {
            if (html[i] === '<') {
                inTag = true;
            } else if (html[i] === '>') {
                inTag = false;
            } else if (!inTag) {
                if (rawCurrentIndex === rawIndex) {
                    htmlIndex = i;
                    break;
                }
                rawCurrentIndex++;
            }
        }
        
        return htmlIndex;
    }
    
    // Skip the loading animation and go straight to the main content
    function skipToMainContent() {
        // Hide loading screen if it exists
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            loadingScreen.style.visibility = 'hidden';
            
            // Remove after transition
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
        
        // Show all hero elements
        document.querySelectorAll('.hero-animate').forEach(el => {
            el.classList.add('fade-in-element');
            el.classList.remove('hidden');
            el.style.opacity = '1';
            el.style.visibility = 'visible';
            el.style.transform = 'translateY(0)';
        });
        
        // Show the CTA wrapper specifically
        const ctaWrapper = document.querySelector('.cta-wrapper');
        if (ctaWrapper) {
            ctaWrapper.classList.add('fade-in-element');
            ctaWrapper.classList.remove('hidden');
            ctaWrapper.style.opacity = '1';
            ctaWrapper.style.visibility = 'visible';
            ctaWrapper.style.transform = 'translateY(0)';
        }
        
        // Show the hero description specifically
        const heroDescription = document.querySelector('.hero-description');
        if (heroDescription) {
            heroDescription.classList.add('fade-in-element');
            heroDescription.classList.remove('hidden');
            heroDescription.style.opacity = '1';
            heroDescription.style.visibility = 'visible';
            heroDescription.style.transform = 'translateY(0)';
        }
        
        // Add animations-complete class to body
        document.body.classList.add('animations-complete');
        
        // Initialize typewriter effect
        initTypewriterEffect();
        
        // Initialize other page elements
        initializePageElements();
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
            
            // 5. Finally animate hero content
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
                
                // Make sure the CTA link is visible
                const ctaWrapper = document.querySelector('.cta-wrapper');
                if (ctaWrapper) {
                    ctaWrapper.classList.add('fade-in-element');
                    ctaWrapper.style.opacity = '1';
                    ctaWrapper.style.visibility = 'visible';
                    ctaWrapper.style.transform = 'translateY(0)';
                }
                
                // Make sure the hero description is visible
                const heroDescription = document.querySelector('.hero-description');
                if (heroDescription) {
                    heroDescription.classList.add('fade-in-element');
                    heroDescription.style.opacity = '1';
                    heroDescription.style.visibility = 'visible';
                    heroDescription.style.transform = 'translateY(0)';
                }
                
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
            AOS.init({
                duration: 800,
                easing: 'ease-out',
                once: false,
                mirror: false,
                offset: 50,
                delay: 0,
                throttleDelay: 99
            });
        }

        // Initialize smooth scrolling for anchor links
        initSmoothScrolling();

        // Initialize contact form
        initContactForm();
    }
    
    // Direct scrolling implementation with no delay
    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Get the target position with offset
                    const offset = 80;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
                    
                    // Immediate scroll with animation
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Typewriter effect for role text
    function initTypewriterEffect() {
        const roleText = document.getElementById('role-text');
        if (!roleText) {
            console.error('Role text element not found');
            return;
        }
        
        // Roles to cycle through - restored to original roles
        const roles = [
            'Software Engineer',
            'Data Engineer',
            'Full-Stack Developer'
        ];
        
        let currentRoleIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100; // Base typing speed
        
        // Type or delete characters
        function typeCharacter() {
            const currentRole = roles[currentRoleIndex];
            
            // If deleting, remove a character
            if (isDeleting) {
                roleText.textContent = currentRole.substring(0, currentCharIndex - 1);
                currentCharIndex--;
                typingSpeed = 50; // Faster when deleting
            } else {
                // If typing, add a character
                roleText.textContent = currentRole.substring(0, currentCharIndex + 1);
                currentCharIndex++;
                typingSpeed = 100; // Normal speed when typing
            }
            
            // If finished typing the current role
            if (!isDeleting && currentCharIndex === currentRole.length) {
                isDeleting = true;
                typingSpeed = 1000; // Pause at the end of the word
            } 
            // If finished deleting the current role
            else if (isDeleting && currentCharIndex === 0) {
                isDeleting = false;
                currentRoleIndex = (currentRoleIndex + 1) % roles.length;
                typingSpeed = 500; // Pause before typing the next word
            }
            
            // Continue the typing effect
            setTimeout(typeCharacter, typingSpeed);
        }
        
        // Start the typing effect
        setTimeout(typeCharacter, 1000);
        
        // Make sure the CTA link is visible
        const ctaWrapper = document.querySelector('.cta-wrapper');
        if (ctaWrapper) {
            ctaWrapper.classList.remove('hidden');
            ctaWrapper.style.opacity = '1';
            ctaWrapper.style.visibility = 'visible';
        }
        
        // Make sure the hero description is visible
        const heroDescription = document.querySelector('.hero-description');
        if (heroDescription) {
            heroDescription.classList.remove('hidden');
            heroDescription.style.opacity = '1';
            heroDescription.style.visibility = 'visible';
        }
    }
    
    // Handle contact form submission
    function initContactForm() {
        const contactForm = document.querySelector('.contact-form');
        if (!contactForm) return;

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                showFormMessage('Please fill out all required fields', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormMessage('Please enter a valid email address', 'error');
                return;
            }
            
            // Normally you would send this data to a server
            console.log('Form submitted:', { name, email, subject, message });
            
            // For demo purposes, just show success message
            showFormMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
            
            // Reset form
            contactForm.reset();
        });
        
        function showFormMessage(message, type) {
            // Check if message element already exists
            let messageEl = document.querySelector('.form-message');
            
            // If not, create one
            if (!messageEl) {
                messageEl = document.createElement('div');
                messageEl.className = 'form-message';
                contactForm.appendChild(messageEl);
            }
            
            // Set message content and class
            messageEl.textContent = message;
            messageEl.className = `form-message ${type}`;
            
            // Add styles dynamically
            const style = document.createElement('style');
            style.textContent = `
                .form-message {
                    padding: 10px;
                    margin-top: 15px;
                    border-radius: 4px;
                    text-align: center;
                    animation: fadeIn 0.3s ease;
                }
                
                .form-message.success {
                    background-color: rgba(0, 255, 128, 0.1);
                    color: #00ff80;
                    border: 1px solid rgba(0, 255, 128, 0.3);
                }
                
                .form-message.error {
                    background-color: rgba(255, 0, 0, 0.1);
                    color: #ff5555;
                    border: 1px solid rgba(255, 0, 0, 0.3);
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `;
            
            // Add style to document if not already added
            if (!document.querySelector('style[data-form-message]')) {
                style.setAttribute('data-form-message', 'true');
                document.head.appendChild(style);
            }
            
            // Remove message after 5 seconds
            setTimeout(() => {
                messageEl.style.animation = 'fadeOut 0.3s ease forwards';
                
                // Add fadeOut animation if not already added
                if (!document.querySelector('style[data-form-message-out]')) {
                    const outStyle = document.createElement('style');
                    outStyle.setAttribute('data-form-message-out', 'true');
                    outStyle.textContent = `
                        @keyframes fadeOut {
                            from { opacity: 1; transform: translateY(0); }
                            to { opacity: 0; transform: translateY(-10px); }
                        }
                    `;
                    document.head.appendChild(outStyle);
                }
                
                setTimeout(() => {
                    messageEl.remove();
                }, 300);
            }, 5000);
        }
    }
    
    // Start the loading animation
    initLoadingAnimation();
});
