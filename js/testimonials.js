// Testimonials section animations
document.addEventListener('DOMContentLoaded', function() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    // Add hover effect to testimonial cards
    testimonialCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Animate testimonials on scroll
    const animateTestimonials = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };
    
    const testimonialObserver = new IntersectionObserver(animateTestimonials, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    testimonialCards.forEach(card => {
        testimonialObserver.observe(card);
    });
});