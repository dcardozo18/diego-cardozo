// Animations JavaScript - Handle all animations and scroll effects

function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Trigger stagger animations for children
                if (entry.target.classList.contains('stagger-animation')) {
                    const children = entry.target.children;
                    Array.from(children).forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('animated');
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .animate-on-scroll-left, .animate-on-scroll-right, .animate-on-scroll-scale, .stagger-animation');
    animatedElements.forEach(el => observer.observe(el));
    
    // Parallax scrolling
    initParallax();
    
    // Morph animation for SVG path
    initMorphAnimation();
    
    // Number counter animation
    initCounterAnimation();
    
    // Text reveal animation
    initTextReveal();
}

// Parallax scrolling effect
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax, .parallax-slow, .parallax-fast');
    
    if (parallaxElements.length === 0) return;
    
    window.addEventListener('scroll', window.utils.throttle(() => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.classList.contains('parallax-slow') ? 0.5 : 
                          element.classList.contains('parallax-fast') ? 1.5 : 1;
            const yPos = -(scrolled * speed / 10);
            
            element.style.transform = `translateY(${yPos}px)`;
        });
    }, 10));
}

// SVG path morph animation
function initMorphAnimation() {
    const morphPath = document.querySelector('.morph-path');
    if (!morphPath) return;
    
    const paths = [
        "M 0,400 C 0,400 0,200 0,200 C 114.35714285714286,156.53571428571428 228.71428571428572,113.07142857142857 351,131 C 473.2857142857143,148.92857142857142 603.5,228.25 713,248 C 822.5,267.75 911.2857142857142,227.92857142857142 1029,210 C 1146.7142857142858,192.07142857142858 1293.357142857143,196.03571428571428 1440,200 C 1440,200 1440,400 1440,400 Z",
        "M 0,400 C 0,400 0,200 0,200 C 85.53571428571428,234.32142857142858 171.07142857142856,268.64285714285717 306,251 C 440.92857142857144,233.35714285714283 625.25,163.75 759,159 C 892.75,154.25 975.9285714285714,214.35714285714286 1086,238 C 1196.0714285714286,261.64285714285717 1333.0357142857142,248.82142857142858 1440,236 C 1440,236 1440,400 1440,400 Z"
    ];
    
    let currentPath = 0;
    
    setInterval(() => {
        currentPath = (currentPath + 1) % paths.length;
        morphPath.setAttribute('d', paths[currentPath]);
    }, 4000);
}

// Number counter animation
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const target = parseInt(entry.target.dataset.count);
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        entry.target.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        entry.target.textContent = target;
                        entry.target.classList.add('counted');
                    }
                };
                
                updateCounter();
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

// Text reveal animation
function initTextReveal() {
    const revealTexts = document.querySelectorAll('.text-reveal');
    
    revealTexts.forEach(text => {
        const content = text.textContent;
        text.textContent = '';
        text.style.opacity = '1';
        
        const words = content.split(' ');
        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.textContent = word + ' ';
            span.style.opacity = '0';
            span.style.display = 'inline-block';
            span.style.transform = 'translateY(20px)';
            span.style.transition = `all 0.6s ease ${index * 0.1}s`;
            text.appendChild(span);
        });
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const spans = entry.target.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.opacity = '1';
                    span.style.transform = 'translateY(0)';
                });
            }
        });
    });
    
    revealTexts.forEach(text => observer.observe(text));
}

// Advanced hover effects
document.addEventListener('DOMContentLoaded', () => {
    // 3D tilt effect on cards
    const tiltElements = document.querySelectorAll('.project-card, .skill-item');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
    
    // Ripple effect on buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Smooth scroll with easing
function smoothScrollTo(target, duration = 1000) {
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    requestAnimationFrame(animation);
}

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);