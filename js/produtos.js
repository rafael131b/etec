// Products Page JavaScript

// Utility functions
function showProductDetails(productName) {
    // Simulate product details modal
    const modal = document.createElement('div');
    modal.className = 'product-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 16px;
        max-width: 500px;
        width: 90%;
        text-align: center;
        animation: scaleIn 0.3s ease;
    `;
    
    modalContent.innerHTML = `
        <h2 style="color: #008000; margin-bottom: 1rem;">${productName}</h2>
        <p style="color: #666; margin-bottom: 2rem;">Detalhes completos do produto em breve. Entre em contato para mais informações.</p>
        <div style="display: flex; gap: 1rem; justify-content: center;">
            <button class="modal-btn primary" style="padding: 10px 20px; background: #008000; color: white; border: none; border-radius: 8px; cursor: pointer;">Solicitar Informações</button>
            <button class="modal-btn secondary" style="padding: 10px 20px; background: #f0f0f0; color: #666; border: none; border-radius: 8px; cursor: pointer;">Fechar</button>
        </div>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Add event listeners to modal buttons
    const primaryBtn = modal.querySelector('.modal-btn.primary');
    const secondaryBtn = modal.querySelector('.modal-btn.secondary');
    
    primaryBtn.addEventListener('click', () => {
        showMessage('Solicitação enviada! Entraremos em contato em breve.');
        closeModal(modal);
    });
    
    secondaryBtn.addEventListener('click', () => {
        closeModal(modal);
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
}

function showContactModal(type) {
    const title = type === 'specialist' ? 'Falar com Especialista' : 'Solicitar Orçamento';
    const message = type === 'specialist'
        ? 'Nossa equipe especializada entrará em contato em breve!'
        : 'Seu pedido de orçamento foi enviado. Retornaremos em até 24 horas.';
    
    const modal = document.createElement('div');
    modal.className = 'contact-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 16px;
        max-width: 400px;
        width: 90%;
        text-align: center;
        animation: scaleIn 0.3s ease;
    `;
    
    modalContent.innerHTML = `
        <div style="color: #008000; font-size: 3rem; margin-bottom: 1rem;">
            <i class="fas fa-check-circle"></i>
        </div>
        <h2 style="color: #008000; margin-bottom: 1rem;">${title}</h2>
        <p style="color: #666; margin-bottom: 2rem;">${message}</p>
        <button class="modal-btn" style="padding: 12px 24px; background: #008000; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600;">OK</button>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Close modal
    const okBtn = modal.querySelector('.modal-btn');
    okBtn.addEventListener('click', () => {
        closeModal(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
}

function showMessage(message) {
    // Remove existing message if any
    const existingMessage = document.querySelector('.message-notification');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message-notification';
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #008000;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        font-weight: 500;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 300);
    }, 3000);
}

function closeModal(modal) {
    modal.style.animation = 'fadeOut 0.3s ease';
    setTimeout(() => {
        if (modal.parentNode) {
            modal.parentNode.removeChild(modal);
        }
    }, 300);
}

// Add required CSS animations
if (!document.querySelector('#productAnimations')) {
    const style = document.createElement('style');
    style.id = 'productAnimations';
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        @keyframes scaleIn {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
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

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const productItems = document.querySelectorAll('.product-item');
    const ctaButtons = document.querySelectorAll('.cta-btn');
    const saibaMaisLinks = document.querySelectorAll('.saiba-mais');

    // Product item interactions
    productItems.forEach(item => {
        // Add hover effects
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-8px)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
        });
        
        // Add click tracking
        item.addEventListener('click', (e) => {
            if (!e.target.classList.contains('saiba-mais')) {
                const productTitle = item.querySelector('.product-title').textContent;
                console.log(`Product clicked: ${productTitle}`);
                
                // Add a subtle click effect
                item.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    item.style.transform = 'translateY(0) scale(1)';
                }, 150);
            }
        });
    });

    // Saiba Mais link interactions
    saibaMaisLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.stopPropagation();
            const productItem = link.closest('.product-item');
            const productTitle = productItem.querySelector('.product-title').textContent;
            
            // Simulate product details modal or navigation
            showProductDetails(productTitle);
        });
    });

    // CTA button interactions
    ctaButtons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonText = button.textContent;
            
            if (buttonText.includes('Especialista')) {
                showContactModal('specialist');
            } else if (buttonText.includes('Orçamento')) {
                showContactModal('quote');
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe product items for scroll animations
    productItems.forEach(item => {
        observer.observe(item);
    });

    console.log('Products page loaded successfully! 🛍️');
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Press 'Escape' to close modals
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.product-modal, .contact-modal');
        modals.forEach(modal => {
            if (modal.parentNode) {
                modal.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => {
                    if (modal.parentNode) {
                        modal.parentNode.removeChild(modal);
                    }
                }, 300);
            }
        });
    }
});
