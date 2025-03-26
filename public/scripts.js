// Wait for all dependencies to load
window.addEventListener('load', () => {
    // Initialize GSAP plugins with reduced motion if needed
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Performance optimization: Use requestIdleCallback if available
    const scheduleTask = window.requestIdleCallback || window.setTimeout;
    
    // Global variables with performance optimizations
    const state = {
        mouseX: 0,
        mouseY: 0,
        isLoading: true,
        lastScrollTime: 0,
        ticking: false
    };
    
    // Throttle function for scroll events
    const throttle = (func, limit) => {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    };
    
    // Debounce function for resize events
    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };
    
    // DOM Elements
    const cursor = {
        dot: document.querySelector('.cursor-dot'),
        outline: document.querySelector('.cursor-outline'),
        trailer: document.querySelector('.mouse-trailer')
    };

    const loadingElements = {
        screen: document.querySelector('.loading-screen'),
        bar: document.querySelector('.loading-bar')
    };

    const header = document.querySelector('.header');

    // Loading Animation
    const initializeLoadingAnimation = () => {
        if (!loadingElements.screen || !loadingElements.bar) return;

        gsap.to(loadingElements.bar, {
            duration: 1.5,
            scaleX: 1,
            transformOrigin: 'left',
            ease: 'power4.inOut'
        });

        gsap.to(loadingElements.screen, {
            duration: 0.5,
            opacity: 0,
            delay: 2,
            onComplete: () => {
                document.body.classList.remove('loading');
                loadingElements.screen.style.display = 'none';
                state.isLoading = false;
                initializeAnimations();
            }
        });
    };

    // Optimized cursor movement
    const initializeCursor = () => {
        if (!cursor.dot || !cursor.outline) return;
        
        const updateCursor = throttle((e) => {
            requestAnimationFrame(() => {
                state.mouseX = e.clientX;
                state.mouseY = e.clientY;
                
                cursor.dot.style.transform = `translate3d(${state.mouseX - 2.5}px, ${state.mouseY - 2.5}px, 0)`;
                cursor.outline.style.transform = `translate3d(${state.mouseX - 15}px, ${state.mouseY - 15}px, 0)`;
            });
        }, 16); // ~60fps
        
        document.addEventListener('mousemove', updateCursor, { passive: true });
    };

    // Animated Background
    const initializeBackground = () => {
        const canvas = document.getElementById('gradient-canvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d', { alpha: false });
        let animationFrame;
        
        const resizeCanvas = debounce(() => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            // Recreate gradient after resize
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, '#0a192f');
            gradient.addColorStop(1, '#112240');
            ctx.fillStyle = gradient;
        }, 250);
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas, { passive: true });
        
        // Reduce number of particles based on screen size and device performance
        const particleCount = Math.min(
            Math.floor(window.innerWidth * window.innerHeight * 0.00005),
            30
        );
        
        const particles = Array.from({ length: particleCount }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5 + 0.5, // More consistent size
            vx: (Math.random() - 0.5) * 0.5, // Slower velocity
            vy: (Math.random() - 0.5) * 0.5
        }));
        
        function animate() {
            if (state.isLoading || prefersReducedMotion) return;
            
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
                
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(100, 255, 218, 0.1)';
                ctx.fill();
            });
            
            if (!document.hidden) {
                animationFrame = requestAnimationFrame(animate);
            }
        }
        
        // Cleanup function
        const cleanup = () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        };
        
        // Start animation
        animate();
        
        // Cleanup on page hide/unload
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                cleanup();
            } else {
                animate();
            }
        });
        
        // Cleanup on window blur
        window.addEventListener('blur', cleanup);
        window.addEventListener('focus', animate);
    };

    // Navigation Animations
    const initializeNavigation = () => {
        const navItems = document.querySelectorAll('.nav-item');
        const sections = document.querySelectorAll('section');
        
        // Initial animation
        gsap.from(navItems, {
            y: -50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power4.out',
            onComplete: () => {
                navItems.forEach(item => item.classList.add('animate-in'));
            }
        });

        // Smooth scrolling with GSAP
        navItems.forEach(item => {
            const link = item.querySelector('.nav-link');
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (!target) return;

                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: target,
                        offsetY: 80
                    },
                    ease: 'power4.inOut'
                });
            });
        });

        // Active section highlighting
        let currentSection = '';
        const highlightNavigation = () => {
            const scrollPosition = window.scrollY;

            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionBottom = sectionTop + section.offsetHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    const sectionId = section.getAttribute('id');
                    if (currentSection !== sectionId) {
                        currentSection = sectionId;
                        navItems.forEach(item => {
                            const link = item.querySelector('.nav-link');
                            if (link.getAttribute('href') === `#${sectionId}`) {
                                item.classList.add('active');
                            } else {
                                item.classList.remove('active');
                            }
                        });
                    }
                }
            });
        };

        window.addEventListener('scroll', highlightNavigation);
        highlightNavigation(); // Initial check
    };

    // Content Animations
    const initializeContentAnimations = () => {
        if (state.isLoading) return;

        // Split text animations
        const splitTexts = document.querySelectorAll('.split-text');
        splitTexts.forEach(text => {
            if (!text) return;
            new SplitType(text, { types: 'chars' });
            
            gsap.from(text.querySelectorAll('.char'), {
                opacity: 0,
                y: 100,
                duration: 1,
                stagger: 0.02,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: text,
                    start: 'top bottom-=100',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // Section animations
        gsap.utils.toArray('section').forEach(section => {
            if (!section) return;
            gsap.from(section, {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom-=100',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // Hero section animation
        const heroTimeline = gsap.timeline();
        heroTimeline
            .from('.line-animation', {
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: 'power4.out'
            })
            .from('.social-links a', {
                y: 20,
                opacity: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: 'power4.out'
            }, '-=0.5');

        // Initialize text scramble effect
        document.querySelectorAll('.glitch-text').forEach(el => {
            if (!el) return;
            const fx = new TextScramble(el);
            const text = el.getAttribute('data-text');
            if (text) {
                fx.setText(text);
                
                el.addEventListener('mouseenter', () => {
                    fx.setText(text);
                });
            }
        });

        // Parallax effect for cards
        gsap.utils.toArray('.project-card, .experience-card').forEach(card => {
            if (!card) return;
            gsap.to(card, {
                yPercent: -20,
                ease: 'none',
                scrollTrigger: {
                    trigger: card,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });
        });
    };

    // Project Cards Animation
    const initializeProjectCards = () => {
        if (state.isLoading) return;
        
        const cards = document.querySelectorAll('.project-card');
        if (!cards.length) return;
        
        cards.forEach(card => {
            // 3D tilt effect
            VanillaTilt.init(card, {
                max: 5,
                speed: 400,
                glare: true,
                'max-glare': 0.2,
                scale: 1.02
            });
            
            // Hover animation
            card.addEventListener('mouseenter', () => {
                const content = card.querySelector('.project-content');
                if (content) {
                    gsap.to(content, {
                        y: -10,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            });
            
            card.addEventListener('mouseleave', () => {
                const content = card.querySelector('.project-content');
                if (content) {
                    gsap.to(content, {
                        y: 0,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            });
        });
    };

    // Optimized scroll handling
    const initializeHeaderScroll = () => {
        if (!header) return;
        
        let lastScroll = 0;
        const scrollHandler = throttle(() => {
            if (!state.ticking) {
                requestAnimationFrame(() => {
                    const currentScroll = window.pageYOffset;
                    
                    if (currentScroll <= 0) {
                        header.classList.remove('scroll-up');
                        state.ticking = false;
                        return;
                    }
                    
                    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
                        header.classList.remove('scroll-up');
                        header.classList.add('scroll-down');
                    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
                        header.classList.remove('scroll-down');
                        header.classList.add('scroll-up');
                    }
                    
                    lastScroll = currentScroll;
                    state.ticking = false;
                });
                
                state.ticking = true;
            }
        }, 100);
        
        window.addEventListener('scroll', scrollHandler, { passive: true });
    };

    // Smooth Scrolling
    const initializeSmoothScrolling = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            if (!anchor) return;
            
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (!target) return;
                
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: target,
                        offsetY: 70
                    },
                    ease: 'power4.inOut'
                });
            });
        });
    };

    // Background gradient animation
    const initializeGradientAnimation = () => {
        const gradient = document.querySelector('.background-gradient');
        if (!gradient) return;

        gsap.to(gradient, {
            backgroundPosition: '100% 100%',
            duration: 20,
            repeat: -1,
            ease: 'none',
            yoyo: true
        });
    };

    // Typewriter effect
    const initTypewriter = () => {
        const roles = [
            "Software Engineer",
            "Data Engineer",
            "Full Stack Developer",
            "Problem Solver",
            "Tech Enthusiast"
        ];
        
        const roleElement = document.getElementById('role-text');
        if (!roleElement) return;

        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        const TYPING_SPEED = 70;
        const DELETING_SPEED = 50;
        const PAUSE_BEFORE_DELETE = 2000;
        const PAUSE_BEFORE_NEXT = 500;

        const type = () => {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                roleElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                
                if (charIndex === 0) {
                    isDeleting = false;
                    roleIndex = (roleIndex + 1) % roles.length;
                    requestAnimationFrame(() => setTimeout(type, PAUSE_BEFORE_NEXT));
                    return;
                }
                requestAnimationFrame(() => setTimeout(type, DELETING_SPEED));
            } else {
                roleElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                
                if (charIndex === currentRole.length) {
                    isDeleting = true;
                    requestAnimationFrame(() => setTimeout(type, PAUSE_BEFORE_DELETE));
                    return;
                }
                requestAnimationFrame(() => setTimeout(type, TYPING_SPEED));
            }
        };

        // Start the typing effect
        requestAnimationFrame(type);
    };

    // Initialize expertise section animations
    const initializeExpertise = () => {
        AOS.init({
            once: true,
            duration: 800,
            mirror: false
        });

        // Initialize scroll arrow functionality
        const scrollArrow = document.getElementById('scroll-arrow');
        if (scrollArrow) {
            const updateArrowVisibility = () => {
                const currentScroll = window.scrollY;
                const windowHeight = window.innerHeight;
                const docHeight = document.documentElement.scrollHeight;
                
                if (currentScroll + windowHeight >= docHeight - 100) {
                    scrollArrow.classList.add('hidden');
                } else {
                    scrollArrow.classList.remove('hidden');
                }
            };

            scrollArrow.addEventListener('click', () => {
                const currentScroll = window.scrollY;
                const windowHeight = window.innerHeight;
                let targetSection;

                // Determine which section to scroll to
                if (currentScroll < windowHeight) {
                    targetSection = document.getElementById('expertise');
                } else {
                    targetSection = document.getElementById('experience');
                }

                if (targetSection) {
                    gsap.to(window, {
                        duration: 1,
                        scrollTo: {
                            y: targetSection,
                            offsetY: 80
                        },
                        ease: 'power4.inOut'
                    });
                }
            });

            window.addEventListener('scroll', updateArrowVisibility);
            updateArrowVisibility(); // Initial check
        }
    };

    // Initialize everything in stages to prevent freezing
    function init() {
        console.log('Starting staged initialization...');
        
        // Stage 1: Critical UI elements
        initializeLoadingAnimation();
        
        // Stage 2: Interaction elements with small delay
        setTimeout(() => {
            initializeCursor();
            initializeHeaderScroll();
        }, 50);
        
        // Stage 3: Background and smooth scrolling
        scheduleTask(() => {
            initializeBackground();
            initializeSmoothScrolling();
        }, { timeout: 150 });
        
        // Stage 4: Content animations
        scheduleTask(() => {
            if (!prefersReducedMotion) {
                initializeContentAnimations();
                initializeGradientAnimation();
                initTypewriter();
            }
        }, { timeout: 300 });
        
        // Stage 5: Non-critical animations
        scheduleTask(() => {
            if (!prefersReducedMotion) {
                initializeProjectCards();
                initializeNavigation();
                initializeExpertise();
            }
        }, { timeout: 500 });
    }
    
    // Start initialization
    init();
});
