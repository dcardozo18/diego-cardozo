// Contact JavaScript - Handle contact form with Supabase

// Supabase configuration
const SUPABASE_URL = 'https://iaewecelzumseollzbcn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlhZXdlY2VsenVtc2VvbGx6YmNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4MTk3MzksImV4cCI6MjA3MjM5NTczOX0.37VX0ohZxcPz4a_XEnyKkjSPdzipvAWjLPzmBaLtZb0';

// Input validation constants - matching backend
const MAX_NAME_LENGTH = 100;
const MAX_SUBJECT_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 5000;

// HTML sanitization function
function sanitizeHtml(input) {
    return input
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
}

// Add character counter to textarea/input
function addCharacterCounter(input, maxLength) {
    const wrapper = input.parentElement;
    let counter = wrapper.querySelector('.char-counter');
    
    if (!counter) {
        counter = document.createElement('span');
        counter.className = 'char-counter';
        counter.style.cssText = 'font-size: 0.75rem; color: var(--text-secondary); position: absolute; right: 15px; bottom: 10px; opacity: 0.7;';
        wrapper.style.position = 'relative';
        wrapper.appendChild(counter);
    }
    
    const updateCounter = () => {
        const remaining = maxLength - input.value.length;
        counter.textContent = `${input.value.length} / ${maxLength}`;
        
        // Change color when close to limit
        if (remaining < 20) {
            counter.style.color = 'var(--accent)';
        } else {
            counter.style.color = 'var(--text-secondary)';
        }
    };
    
    input.addEventListener('input', updateCounter);
    updateCounter();
}

function initContact() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    // Add input length restrictions and character counters
    const nameInput = form.querySelector('input[name="name"]');
    const emailInput = form.querySelector('input[name="email"]');
    const subjectInput = form.querySelector('input[name="subject"]');
    const messageInput = form.querySelector('textarea[name="message"]');
    
    if (nameInput) {
        nameInput.setAttribute('maxlength', MAX_NAME_LENGTH);
        addCharacterCounter(nameInput, MAX_NAME_LENGTH);
    }
    
    if (subjectInput) {
        subjectInput.setAttribute('maxlength', MAX_SUBJECT_LENGTH);
        addCharacterCounter(subjectInput, MAX_SUBJECT_LENGTH);
    }
    
    if (messageInput) {
        messageInput.setAttribute('maxlength', MAX_MESSAGE_LENGTH);
        addCharacterCounter(messageInput, MAX_MESSAGE_LENGTH);
    }
    
    // Float labels
    const inputs = form.querySelectorAll('.form-input');
    inputs.forEach(input => {
        // Add placeholder for proper label animation
        if (input.tagName === 'INPUT') {
            input.setAttribute('placeholder', ' ');
        } else if (input.tagName === 'TEXTAREA') {
            input.setAttribute('placeholder', ' ');
        }
        
        // Add focus/blur effects
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });
    
    // Form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Validate form
        const validation = validateForm(data);
        if (!validation.isValid) {
            window.utils.showToast(validation.message, 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.disabled = true;
        
        try {
            // Sanitize inputs before sending
            const sanitizedData = {
                name: sanitizeHtml(data.name.trim()),
                email: data.email.trim().toLowerCase(),
                subject: data.subject ? sanitizeHtml(data.subject.trim()) : '',
                message: sanitizeHtml(data.message.trim())
            };
            
            // Submit to Supabase Edge Function
            const response = await fetch(`${SUPABASE_URL}/functions/v1/submit-contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': SUPABASE_ANON_KEY
                },
                body: JSON.stringify(sanitizedData)
            });
            
            const result = await response.json();
            
            if (!response.ok) {
                // Handle rate limiting specifically
                if (response.status === 429) {
                    throw new Error('Too many requests. Please wait a few minutes before trying again.');
                }
                throw new Error(result.error || 'Failed to submit form');
            }
            
            // Reset form on success
            form.reset();
            inputs.forEach(input => {
                input.parentElement.classList.remove('focused');
            });
            
            // Reset character counters
            form.querySelectorAll('.char-counter').forEach(counter => {
                counter.textContent = `0 / ${counter.textContent.split('/')[1]}`;
                counter.style.color = 'var(--text-secondary)';
            });
            
            // Show success message
            window.utils.showToast(result.message || 'Message sent successfully! We\'ll get back to you soon.', 'success');
            
        } catch (error) {
            console.error('Form submission error:', error);
            window.utils.showToast(error.message || 'Failed to send message. Please try again.', 'error');
        } finally {
            // Restore button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Enhanced form validation with length checks
function validateForm(data) {
    // Check required fields
    if (!data.name || !data.email || !data.message) {
        return { isValid: false, message: 'Please fill in all required fields' };
    }
    
    // Validate lengths
    if (data.name.length > MAX_NAME_LENGTH) {
        return { isValid: false, message: `Name must be less than ${MAX_NAME_LENGTH} characters` };
    }
    
    if (data.subject && data.subject.length > MAX_SUBJECT_LENGTH) {
        return { isValid: false, message: `Subject must be less than ${MAX_SUBJECT_LENGTH} characters` };
    }
    
    if (data.message.length > MAX_MESSAGE_LENGTH) {
        return { isValid: false, message: `Message must be less than ${MAX_MESSAGE_LENGTH} characters` };
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        return { isValid: false, message: 'Please enter a valid email address' };
    }
    
    return { isValid: true };
}

// Social links hover effect
document.addEventListener('DOMContentLoaded', () => {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.animation = 'bounce 0.5s';
        });
        
        link.addEventListener('animationend', () => {
            link.style.animation = '';
        });
    });
});