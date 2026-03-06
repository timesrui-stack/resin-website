// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add to cart functionality (demo)
const quickViewButtons = document.querySelectorAll('.btn-secondary');
quickViewButtons.forEach(button => {
    button.addEventListener('click', function() {
        const productCard = this.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        
        // Update cart count
        const cartCount = document.querySelector('.cart-count');
        const currentCount = parseInt(cartCount.textContent);
        cartCount.textContent = currentCount + 1;
        
        // Show notification
        showNotification(`"${productName}" added to cart!`);
    });
});

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        if (email) {
            showNotification('Thank you for subscribing! 🎉');
            emailInput.value = '';
        }
    });
}

// Notification system
function showNotification(message) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #ff6b9d 0%, #ffa8c5 100%);
        color: white;
        padding: 15px 25px;
        border-radius: 30px;
        box-shadow: 0 4px 15px rgba(255, 107, 157, 0.4);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Animate elements on scroll
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

// Observe all product cards and category cards
document.querySelectorAll('.product-card, .category-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(card);
});

// Instagram cards hover effect enhancement
document.querySelectorAll('.instagram-card').forEach(card => {
    card.addEventListener('click', function() {
        showNotification('Opening Instagram post... 📷');
    });
});

// Category cards click
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', function() {
        const categoryName = this.querySelector('h3').textContent;
        showNotification(`Browsing ${categoryName} products...`);
    });
});

// Search icon click
document.querySelector('.nav-icons .icon:first-child').addEventListener('click', function() {
    showNotification('Search feature coming soon! 🔍');
});

// User icon click
document.querySelector('.nav-icons .icon:nth-child(2)').addEventListener('click', function() {
    showNotification('Please sign in to continue 👤');
});

// Cart icon click
document.querySelector('.nav-icons .icon:last-child').addEventListener('click', function() {
    const count = document.querySelector('.cart-count').textContent;
    if (count === '0') {
        showNotification('Your cart is empty 🛒');
    } else {
        showNotification(`You have ${count} item(s) in cart 🛒`);
    }
});

console.log('🦞 Timesrui Resin website loaded successfully!');
