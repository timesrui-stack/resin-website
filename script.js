// Timesrui shared site script
const TIMESRUI_STORAGE_KEY = 'timesrui.visualEditor.products.v3';

function loadEditorState() {
    try {
        return JSON.parse(localStorage.getItem(TIMESRUI_STORAGE_KEY) || '{}');
    } catch {
        return {};
    }
}

function escapeHtml(str) {
    return String(str || '').replace(/[&<>\"]/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));
}

function showNotification(message) {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) existingNotification.remove();

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

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function injectSharedStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(400px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(400px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

function applyEditorOverrides() {
    const state = loadEditorState();

    if (state.siteTitle) document.title = state.siteTitle;

    const announcement = document.querySelector('.announcement-bar');
    if (announcement && state.announcement) announcement.textContent = state.announcement;

    const logo = document.querySelector('.logo-img');
    if (logo && state.logoUrl) logo.src = state.logoUrl;

    const brandH1 = document.querySelector('.nav-logo h1, .logo-text h1');
    if (brandH1 && state.brandName) brandH1.textContent = state.brandName;

    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && state.heroTitle) heroTitle.textContent = state.heroTitle;

    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle && state.heroSubtitle) heroSubtitle.textContent = state.heroSubtitle;

    const heroBtn = document.querySelector('.hero .btn-primary');
    if (heroBtn && state.heroBtn) heroBtn.textContent = state.heroBtn;

    const hero = document.querySelector('.hero');
    if (hero && state.heroBg) {
        hero.style.background = `linear-gradient(135deg, ${state.heroBg} 0%, #fab1a0 100%)`;
    }

    if (state.primaryColor || state.secondaryColor) {
        const primary = state.primaryColor || '#ff6b9d';
        const secondary = state.secondaryColor || '#c06c84';
        const sharedTheme = document.createElement('style');
        sharedTheme.id = 'timesrui-shared-theme';
        sharedTheme.textContent = `
            .announcement-bar{background:linear-gradient(135deg, ${primary} 0%, ${secondary} 100%) !important;}
            .btn-primary,.btn-secondary{background:linear-gradient(135deg, ${primary} 0%, ${secondary} 100%) !important;}
            .section-title,.badge h3,.price,.logo-text h1{background:linear-gradient(135deg, ${primary} 0%, ${secondary} 100%) !important;-webkit-background-clip:text !important;-webkit-text-fill-color:transparent !important;background-clip:text !important;}
        `;
        const old = document.getElementById('timesrui-shared-theme');
        if (old) old.remove();
        document.head.appendChild(sharedTheme);
    }
}

function renderProductsFromState(targetSelector) {
    const state = loadEditorState();
    if (!Array.isArray(state.products) || !state.products.length) return false;
    const grid = document.querySelector(targetSelector);
    if (!grid) return false;

    grid.innerHTML = '';
    state.products.forEach((p) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            ${p.badge ? `<div class="product-badge">${escapeHtml(p.badge)}</div>` : ''}
            <div class="product-image">
                <img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.name)}">
            </div>
            <h3>${escapeHtml(p.name)}</h3>
            <p class="product-desc">${escapeHtml(p.desc)}</p>
            <div class="product-price">
                <span class="price">${escapeHtml(p.price)}</span>
                ${p.originalPrice ? `<span class="original-price">${escapeHtml(p.originalPrice)}</span>` : ''}
            </div>
            <button class="btn btn-secondary">Add to Cart 🛒</button>
        `;
        grid.appendChild(card);
    });
    return true;
}

// Smooth scrolling for navigation links
const anchors = document.querySelectorAll('a[href^="#"]');
anchors.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

injectSharedStyles();
applyEditorOverrides();

// If editor has saved products, rebuild the product grids on both index and catalog pages
renderProductsFromState('.products .product-grid');
if (document.querySelectorAll('.products .product-grid').length > 1) {
    const grids = document.querySelectorAll('.products .product-grid');
    const state = loadEditorState();
    if (Array.isArray(state.products) && state.products.length) {
        grids.forEach(grid => {
            grid.innerHTML = '';
            state.products.forEach((p) => {
                const card = document.createElement('div');
                card.className = 'product-card';
                card.innerHTML = `
                    ${p.badge ? `<div class="product-badge">${escapeHtml(p.badge)}</div>` : ''}
                    <div class="product-image"><img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.name)}"></div>
                    <h3>${escapeHtml(p.name)}</h3>
                    <p class="product-desc">${escapeHtml(p.desc)}</p>
                    <div class="product-price">
                        <span class="price">${escapeHtml(p.price)}</span>
                        ${p.originalPrice ? `<span class="original-price">${escapeHtml(p.originalPrice)}</span>` : ''}
                    </div>
                    <button class="btn btn-secondary">Add to Cart 🛒</button>
                `;
                grid.appendChild(card);
            });
        });
    }
}

// Add to cart functionality (demo)
const quickViewButtons = document.querySelectorAll('.btn-secondary');
quickViewButtons.forEach(button => {
    button.addEventListener('click', function() {
        const productCard = this.closest('.product-card');
        const productName = productCard?.querySelector('h3')?.textContent || 'Product';
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) cartCount.textContent = String((parseInt(cartCount.textContent || '0', 10) || 0) + 1);
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

// Animate elements on scroll
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

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
        const categoryName = this.querySelector('h3')?.textContent || 'Category';
        showNotification(`Browsing ${categoryName} products...`);
    });
});

const icons = document.querySelectorAll('.nav-icons .icon');
if (icons[0]) icons[0].addEventListener('click', () => showNotification('Search feature coming soon! 🔍'));
if (icons[1]) icons[1].addEventListener('click', () => showNotification('Please sign in to continue 👤'));
if (icons[2]) icons[2].addEventListener('click', () => {
    const count = document.querySelector('.cart-count')?.textContent || '0';
    if (count === '0') showNotification('Your cart is empty 🛒');
    else showNotification(`You have ${count} item(s) in cart 🛒`);
});

window.addEventListener('storage', (e) => {
    if (e.key === TIMESRUI_STORAGE_KEY) location.reload();
});

console.log('🦞 Timesrui Resin website loaded successfully!');