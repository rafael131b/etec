// Blog Page JavaScript

// DOM Elements
const newsletterForm = document.querySelector('.newsletter-form');
const readMoreButtons = document.querySelectorAll('.read-more-btn');
const ctaLinks = document.querySelectorAll('.cta-link');
const blogArticles = document.querySelectorAll('.blog-article');

// Newsletter Form Handler
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = this.querySelector('input[type="email"]').value;

        if (!email) {
            showBlogMessage('Por favor, insira um email válido.', 'error');
            return;
        }

        // Simulate newsletter subscription
        showBlogMessage('Obrigado por se inscrever! Em breve você receberá nossas novidades.', 'success');

        // Reset form
        this.reset();
    });
}

// Read More Button Handler
readMoreButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId && targetId.startsWith('#')) {
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Add highlight effect to target section
                targetSection.style.transition = 'all 0.3s ease';
                targetSection.style.boxShadow = '0 0 0 3px rgba(0, 128, 0, 0.3)';

                setTimeout(() => {
                    targetSection.style.boxShadow = '';
                }, 2000);
            }
        }
    });
});

// CTA Link Click Tracking
ctaLinks.forEach(link => {
    link.addEventListener('click', function() {
        const linkText = this.textContent.trim();
        console.log(`CTA clicked: ${linkText}`);

        // Add click animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
});

// Blog Article Hover Effects
blogArticles.forEach(article => {
    article.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
    });

    article.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Scroll-based Animations
function handleScrollAnimations() {
    const articles = document.querySelectorAll('.blog-article:not(.featured)');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in', 'visible');
            }
        });
    }, observerOptions);

    articles.forEach(article => {
        observer.observe(article);
    });
}

// Blog Message Function
function showBlogMessage(message, type = 'info') {
    // Remove existing message if any
    const existingMessage = document.querySelector('.blog-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    const messageDiv = document.createElement('div');
    messageDiv.className = `blog-message ${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#008000' : type === 'error' ? '#e74c3c' : '#008000'};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        font-weight: 500;
        animation: slideIn 0.3s ease;
        max-width: 300px;
    `;

    document.body.appendChild(messageDiv);

    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 300);
    }, 4000);
}

// Product Highlight Interactions
function initializeProductHighlights() {
    const highlights = document.querySelectorAll('.product-highlight');

    highlights.forEach(highlight => {
        highlight.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.boxShadow = '0 5px 15px rgba(0, 128, 0, 0.2)';
        });

        highlight.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.boxShadow = '';
        });
    });
}

// Sustainability Point Interactions
function initializeSustainabilityPoints() {
    const points = document.querySelectorAll('.sustainability-point');

    points.forEach(point => {
        point.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 25px rgba(0, 128, 0, 0.15)';
        });

        point.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });
}

// Case Study Interactions
function initializeCaseStudies() {
    const caseStudies = document.querySelectorAll('.case-study');

    caseStudies.forEach(study => {
        study.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });

        study.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Stats Animation
function animateStats() {
    const stats = document.querySelectorAll('.stat-number, .eco-stat .stat-number');

    stats.forEach(stat => {
        const targetValue = parseInt(stat.textContent);
        const isPercentage = stat.textContent.includes('%');
        const finalValue = isPercentage ? targetValue : targetValue;

        let currentValue = 0;
        const increment = finalValue / 100;
        const duration = 2000; // 2 seconds
        const step = duration / 100;

        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                currentValue = finalValue;
                clearInterval(timer);
            }

            if (isPercentage) {
                stat.textContent = Math.round(currentValue) + '%';
            } else {
                stat.textContent = Math.round(currentValue);
            }
        }, step);
    });
}

// Initialize all blog functionalities
document.addEventListener('DOMContentLoaded', function() {
    handleScrollAnimations();
    initializeProductHighlights();
    initializeSustainabilityPoints();
    initializeCaseStudies();

    // Animate stats when they come into view
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    });

    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    const ecoStats = document.querySelector('.eco-stats');
    if (ecoStats) {
        statsObserver.observe(ecoStats);
    }

    console.log('Blog page loaded successfully! 📝');
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    // Press 'Escape' to close any modals or messages
    if (e.key === 'Escape') {
        const messages = document.querySelectorAll('.blog-message');
        messages.forEach(message => {
            if (message.parentNode) {
                message.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => {
                    if (message.parentNode) {
                        message.parentNode.removeChild(message);
                    }
                }, 300);
            }
        });
    }
});

// Add required CSS animations
if (!document.querySelector('#blogAnimations')) {
    const style = document.createElement('style');
    style.id = 'blogAnimations';
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
}

// Performance optimization - lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);