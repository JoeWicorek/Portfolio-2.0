// Initialize GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Global variables
let mouseX = 0;
let mouseY = 0;
let isLoading = true;

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
            isLoading = false;
            initializeAnimations();
        }
    });
};

// Cursor Animations
const initializeCursor = () => {
    if (!cursor.dot || !cursor.outline) return;

    let cursorX = 0;
    let cursorY = 0;

    const updateCursor = (e) => {
        const x = e.clientX;
        const y = e.clientY;

        // Position dot at center of cursor
        cursor.dot.style.transform = `translate(${x - 2.5}px, ${y - 2.5}px)`;
        
        // Position outline around dot
        cursor.outline.style.transform = `translate(${x - 15}px, ${y - 15}px)`;
    };

    // Mouse move handler
    document.addEventListener('mousemove', updateCursor);

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.dot.style.opacity = '0';
        cursor.outline.style.opacity = '0';
    });

    // Show cursor when entering window
    document.addEventListener('mouseenter', () => {
        cursor.dot.style.opacity = '1';
        cursor.outline.style.opacity = '1';
    });

    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .project-card');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.outline.style.width = '40px';
            cursor.outline.style.height = '40px';
            cursor.outline.style.transform = `translate(${cursorX - 20}px, ${cursorY - 20}px)`;
        });

        element.addEventListener('mouseleave', () => {
            cursor.outline.style.width = '30px';
            cursor.outline.style.height = '30px';
            cursor.outline.style.transform = `translate(${cursorX - 15}px, ${cursorY - 15}px)`;
        });
    });
};

// Animated Background
const initializeBackground = () => {
    const canvas = document.getElementById('gradient-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#0a192f');
    gradient.addColorStop(1, '#112240');
    
    const particles = Array.from({ length: 50 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2,
        vx: Math.random() * 2 - 1,
        vy: Math.random() * 2 - 1
    }));
    
    function animate() {
        if (isLoading) return;
        requestAnimationFrame(animate);
        ctx.fillStyle = gradient;
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
    }
    
    animate();
};

// Text Scramble Effect
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    
    update() {
        let output = '';
        let complete = 0;
        
        for (let i = 0; i < this.queue.length; i++) {
            let { from, to, start, end, char } = this.queue[i];
            
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.chars[Math.floor(Math.random() * this.chars.length)];
                    this.queue[i].char = char;
                }
                output += char;
            } else {
                output += from;
            }
        }
        
        this.el.innerText = output;
        
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
}

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
    if (isLoading) return;

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
    if (isLoading) return;
    
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

// Header Scroll Effect
const initializeHeaderScroll = () => {
    if (!header) return;
    
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
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
    });
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

// Initialize all components
const init = () => {
    initializeCursor();
    initTypewriter();
    initializeNavigation();
    initializeBackground();
    initializeContentAnimations();
    initializeProjectCards();
    initializeExpertise();
    initializeSmoothScrolling();
    initializeHeaderScroll();
    initializeGradientAnimation();
};

// Start when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Start loading animation when page loads
window.addEventListener('load', initializeLoadingAnimation);
