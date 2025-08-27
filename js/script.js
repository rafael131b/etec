// DOM Elements
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav-link');
const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');
const serviceCards = document.querySelectorAll('.service-card');
const header = document.querySelector('.header');

// Mobile Menu Toggle
let mobileMenuOpen = false;

function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
    
    if (mobileMenuOpen) {
        nav.style.display = 'block';
        nav.style.position = 'absolute';
        nav.style.top = '100%';
        nav.style.left = '0';
        nav.style.right = '0';
        nav.style.background = 'rgba(44, 85, 48, 0.95)';
        nav.style.backdropFilter = 'blur(10px)';
        nav.style.padding = '1rem';
        nav.style.borderRadius = '0 0 16px 16px';
        nav.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
        
        const navList = nav.querySelector('.nav-list');
        navList.style.flexDirection = 'column';
        navList.style.gap = '0.5rem';
        
        mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
    } else {
        nav.style.display = 'none';
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
}

// Event Listeners
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
}

// Close mobile menu when clicking nav links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        
        // Close mobile menu if open
        if (mobileMenuOpen) {
            toggleMobileMenu();
        }
        
        // Only prevent default and handle smooth scroll for anchor links on same page
        if (targetId.startsWith('#')) {
            // Update active link for anchor navigation
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            e.preventDefault();
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
        // For external links (like produtos.html, index.html), let the browser handle navigation normally
        // Don't prevent default, don't update active class here (will be handled by setActiveNavLink on page load)
    });
});

// Search Functionality
function performSearch() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (searchTerm === '') {
        showSearchMessage('Digite algo para buscar');
        return;
    }
    
    // Simple search simulation
    const searchableContent = [
        { term: 'água', section: 'services', message: 'Encontrado: Atividade de água' },
        { term: 'umidade', section: 'services', message: 'Encontrado: Umidade relativa do ar' },
        { term: 'clima', section: 'services', message: 'Encontrado: Climatização de ambientes' },
        { term: 'tempo', section: 'services', message: 'Encontrado: Previsão do tempo' },
        { term: 'aparelhos', section: 'home', message: 'Encontrado: Aparelhos médicos' },
        { term: 'médico', section: 'home', message: 'Encontrado: Equipamentos médicos' }
    ];
    
    const found = searchableContent.find(item => 
        item.term.includes(searchTerm) || searchTerm.includes(item.term)
    );
    
    if (found) {
        showSearchMessage(found.message);
        // Scroll to relevant section
        const section = document.querySelector(`#${found.section}`) || document.querySelector(`.${found.section}`);
        if (section) {
            const headerHeight = header.offsetHeight;
            const targetPosition = section.offsetTop - headerHeight;
            
            setTimeout(() => {
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }, 1000);
        }
    } else {
        showSearchMessage('Nenhum resultado encontrado');
    }
    
    searchInput.value = '';
}

function showSearchMessage(message) {
    // Create and show search result message
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #7dd87f;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        font-weight: 500;
        animation: slideIn 0.3s ease;
    `;
    
    // Add animation keyframes
    if (!document.querySelector('#searchAnimations')) {
        const style = document.createElement('style');
        style.id = 'searchAnimations';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(messageDiv);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 300);
    }, 3000);
}

// Search event listeners
if (searchBtn) {
    searchBtn.addEventListener('click', performSearch);
}

if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Search input focus effects
    searchInput.addEventListener('focus', () => {
        searchInput.parentElement.style.background = 'rgba(255, 255, 255, 0.2)';
        searchInput.parentElement.style.transform = 'scale(1.02)';
    });
    
    searchInput.addEventListener('blur', () => {
        searchInput.parentElement.style.background = 'rgba(255, 255, 255, 0.1)';
        searchInput.parentElement.style.transform = 'scale(1)';
    });
}

// Service Cards Animation
function animateServiceCards() {
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Header Scroll Effect
function handleHeaderScroll() {
    const scrolled = window.scrollY > 50;
    
    if (scrolled) {
        header.style.background = 'rgba(44, 85, 48, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
        header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.2)';
    } else {
        header.style.background = 'linear-gradient(135deg, #2c5530 0%, #4a7c59 100%)';
        header.style.backdropFilter = 'none';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    }
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('services')) {
                animateServiceCards();
            }
            
            // Add fade-in animation to other sections
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for animations
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.services, .welcome, .quotes, .blog');
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease';
        observer.observe(section);
    });
});

// Scroll event listener
window.addEventListener('scroll', handleHeaderScroll);

// Resize event listener for mobile menu
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && mobileMenuOpen) {
        toggleMobileMenu();
    }
});

// Service card hover effects
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Quote animation
function animateQuote() {
    const quote = document.querySelector('.quote');
    if (quote) {
        quote.style.opacity = '0';
        quote.style.transform = 'translateX(-50px)';
        quote.style.transition = 'all 1s ease';
        
        setTimeout(() => {
            quote.style.opacity = '1';
            quote.style.transform = 'translateX(0)';
        }, 500);
    }
}

// Apple floating animation enhancement
function enhanceAppleAnimation() {
    const apple = document.querySelector('.apple-container');
    if (apple) {
        apple.addEventListener('mouseenter', () => {
            apple.style.transform = 'scale(1.1) translateY(-10px)';
            apple.style.transition = 'all 0.3s ease';
        });
        
        apple.addEventListener('mouseleave', () => {
            apple.style.transform = 'scale(1)';
        });
    }
}

// Initialize animations on page load
window.addEventListener('load', () => {
    // Add loading animation to body
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

console.log('ETEC Website loaded successfully! 🚀');

// Set active navigation link based on current page and hash
function setActiveNavLink() {
    // Get current page filename
    const path = window.location.pathname;
    const currentPage = path.split('/').pop() || 'index.html';
    const currentHash = window.location.hash;
    
    // If we're at the root, treat as index.html
    const normalizedPage = (currentPage === '' || currentPage === '/') ? 'index.html' : currentPage;
    
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Remove active class from all links first
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Set active class based on current page and hash
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;
        
        // Special case for index.html - handle anchor links
        if (normalizedPage === 'index.html') {
            if (href.startsWith('#')) {
                // If no hash in URL, #home should be active
                if (currentHash === '' && href === '#home') {
                    link.classList.add('active');
                }
                // If hash matches the link
                else if (currentHash === href) {
                    link.classList.add('active');
                }
            } else if (href === '#home') {
                // If the href is #home and we're on index.html with no hash, it should be active
                if (currentHash === '') {
                    link.classList.add('active');
                }
            }
        }
        // For produtos.html, the produtos.html link should be active
        else if (normalizedPage === 'produtos.html' && href.endsWith('produtos.html')) {
            link.classList.add('active');
        }
        // For contatos.html, the contatos.html link should be active
        else if (normalizedPage === 'contatos.html' && href.endsWith('contatos.html')) {
            link.classList.add('active');
        }
    });
}

// Call the function to set active nav link when page loads
document.addEventListener('DOMContentLoaded', setActiveNavLink);

// Also check on hash change for single-page navigation
window.addEventListener('hashchange', setActiveNavLink);

// Carousel functionality
document.addEventListener('DOMContentLoaded', () => {
    const carouselSlide = document.querySelector('.carousel-slide');
    const carouselPrevBtn = document.querySelector('.carousel-prev');
    const carouselNextBtn = document.querySelector('.carousel-next');

    // Products data embedded directly to avoid CORS issues
    const products = [
        {
            "id": "R039",
            "name": "Desumidificador Cristal",
            "image": "https://placehold.co/300x200/7dd87f/ffffff?text=Desumidificador+Cristal",
            "image_icon": "fas fa-snowflake",
            "details": {
                "Alimentação (V)": "127~220V",
                "Garantia": "1 Ano"
            }
        },
        {
            "id": "A031",
            "name": "Desumidificador Eco Dry",
            "image": "https://placehold.co/300x200/7dd87f/ffffff?text=Desumidificador+Eco+Dry",
            "image_icon": "fas fa-tint",
            "details": {
                "Voltagem/Alimentação": "Bivolt",
                "Cor": "Branco"
            }
        },
        {
            "id": "C004",
            "name": "Desumidificador Desidrat Max",
            "image": "https://placehold.co/300x200/7dd87f/ffffff?text=Desidrat+Max",
            "image_icon": "fas fa-droplet",
            "details": {
                "Alimentação (V)": "127V / 220V",
                "Garantia": "1 Ano"
            }
        }
    ];

    let currentIndex = 0;
    let autoSlideInterval;

    function renderCarousel() {
        carouselSlide.innerHTML = '';
        products.forEach(product => {
            const carouselItem = document.createElement('div');
            carouselItem.classList.add('carousel-item');
            carouselItem.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px;">
                </div>
                <h3>${product.name}</h3>
                <p>COD. ${product.id}</p>
                ${Object.entries(product.details).map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`).join('')}
            `;
            carouselSlide.appendChild(carouselItem);
        });
        updateCarouselPosition();
    }

    function updateCarouselPosition() {
        carouselSlide.style.transform = `translateX(${-currentIndex * 100}%)`;
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % products.length;
        updateCarouselPosition();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + products.length) % products.length;
        updateCarouselPosition();
    }

    function startAutoSlide() {
        // Clear any existing interval
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
        
        // Start new interval (change slide every 5 seconds)
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoSlide() {
        startAutoSlide();
    }

    if (carouselNextBtn) {
        carouselNextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoSlide();
        });
    }

    if (carouselPrevBtn) {
        carouselPrevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoSlide();
        });
    }

    // Pause auto slide when user hovers over carousel
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', () => {
            if (autoSlideInterval) {
                clearInterval(autoSlideInterval);
            }
        });
        
        carouselContainer.addEventListener('mouseleave', () => {
            startAutoSlide();
        });
    }

    // Initialize carousel
    renderCarousel();
    startAutoSlide(); // Start automatic sliding
});

// Contact form validation and handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        // Real-time validation
        const inputs = ['name', 'email', 'phone', 'subject', 'message'];
        inputs.forEach(fieldId => {
            const input = document.getElementById(fieldId);
            if (input) {
                input.addEventListener('blur', () => validateField(fieldId));
                input.addEventListener('input', () => clearFieldError(fieldId));
            }
        });

        contactForm.addEventListener('submit', function(e) {
            if (!validateForm()) {
                e.preventDefault();
                return false;
            }
            // If validation passes, let formsubmit.co handle the submission
            // The form will be submitted normally and redirect to thank-you.html
        });
    }
});

function validateField(fieldId) {
    const input = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + '-error');
    let isValid = true;
    let errorMessage = '';

    if (!input || !errorElement) return true;

    const value = input.value.trim();

    switch (fieldId) {
        case 'name':
            if (!value) {
                isValid = false;
                errorMessage = 'Nome é obrigatório';
            } else if (value.length < 2) {
                isValid = false;
                errorMessage = 'Nome deve ter pelo menos 2 caracteres';
            }
            break;

        case 'email':
            if (!value) {
                isValid = false;
                errorMessage = 'Email é obrigatório';
            } else {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Por favor, insira um email válido';
                }
            }
            break;

        case 'phone':
            if (value && !/^[\d\s\-\+\(\)]+$/.test(value)) {
                isValid = false;
                errorMessage = 'Por favor, insira um telefone válido';
            }
            break;

        case 'subject':
            if (!value) {
                isValid = false;
                errorMessage = 'Assunto é obrigatório';
            } else if (value.length < 3) {
                isValid = false;
                errorMessage = 'Assunto deve ter pelo menos 3 caracteres';
            }
            break;

        case 'message':
            if (!value) {
                isValid = false;
                errorMessage = 'Mensagem é obrigatória';
            } else if (value.length < 10) {
                isValid = false;
                errorMessage = 'Mensagem deve ter pelo menos 10 caracteres';
            } else if (value.length > 1000) {
                isValid = false;
                errorMessage = 'Mensagem deve ter no máximo 1000 caracteres';
            }
            break;
    }

    if (isValid) {
        input.classList.remove('error');
        input.classList.add('valid');
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    } else {
        input.classList.remove('valid');
        input.classList.add('error');
        errorElement.textContent = errorMessage;
        errorElement.classList.add('show');
    }

    return isValid;
}

function clearFieldError(fieldId) {
    const input = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + '-error');

    if (input && errorElement) {
        input.classList.remove('error', 'valid');
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }
}

function validateForm() {
    const fields = ['name', 'email', 'subject', 'message'];
    let isFormValid = true;

    fields.forEach(fieldId => {
        if (!validateField(fieldId)) {
            isFormValid = false;
        }
    });

    // Phone is optional, only validate if has value
    const phoneInput = document.getElementById('phone');
    if (phoneInput && phoneInput.value.trim()) {
        if (!validateField('phone')) {
            isFormValid = false;
        }
    }

    return isFormValid;
}
