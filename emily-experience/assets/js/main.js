// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileToggle.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileToggle.textContent = '☰';
            });
        });
    }

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.category-card, .vendor-card, .gift-card, .step-card, .stat-card').forEach(el => {
        observer.observe(el);
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 100) {
                navbar.style.background = 'rgba(15, 10, 26, 0.95)';
            } else {
                navbar.style.background = 'rgba(15, 10, 26, 0.8)';
            }

            lastScroll = currentScroll;
        });
    }

    // Form handling
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Form submitted successfully!', 'success');
        });
    });

    // Dashboard Sidebar Toggle for mobile
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');

    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('open');
        });
    }

    // Calendar day selection
    const calendarDays = document.querySelectorAll('.calendar-day:not(.booked)');
    calendarDays.forEach(day => {
        day.addEventListener('click', function() {
            calendarDays.forEach(d => d.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Vendor card click
    const vendorCards = document.querySelectorAll('.vendor-card');
    vendorCards.forEach(card => {
        card.addEventListener('click', function() {
            // Could navigate to vendor detail page
            console.log('Vendor clicked');
        });
    });

    // Gift card click
    const giftCards = document.querySelectorAll('.gift-card');
    giftCards.forEach(card => {
        card.addEventListener('click', function() {
            // Could open gift detail modal
            console.log('Gift clicked');
        });
    });

    // Category card click
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't interfere with link clicks
            if (e.target.tagName === 'A') return;

            const link = this.querySelector('.category-link');
            if (link) {
                link.click();
            }
        });
    });
});

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span class="notification-icon">${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}</span>
        <span class="notification-message">${message}</span>
        <button class="notification-close">×</button>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--bg-card);
        border: 1px solid rgba(147, 51, 234, 0.3);
        border-radius: 12px;
        padding: 1rem 1.5rem;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);

    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
}

// Budget Calculator
function calculateBudget() {
    const budget = document.getElementById('total-budget');
    const venue = document.getElementById('venue-budget');
    const catering = document.getElementById('catering-budget');
    const decor = document.getElementById('decor-budget');
    const other = document.getElementById('other-budget');

    if (budget && venue && catering && decor && other) {
        const total = parseFloat(budget.value) || 0;
        const venueVal = parseFloat(venue.value) || 0;
        const cateringVal = parseFloat(catering.value) || 0;
        const decorVal = parseFloat(decor.value) || 0;
        const otherVal = parseFloat(other.value) || 0;

        const spent = venueVal + cateringVal + decorVal + otherVal;
        const remaining = total - spent;

        document.getElementById('budget-spent').textContent = `$${spent.toLocaleString()}`;
        document.getElementById('budget-remaining').textContent = `$${remaining.toLocaleString()}`;

        const progressBar = document.getElementById('budget-progress');
        if (progressBar) {
            const percentage = total > 0 ? (spent / total) * 100 : 0;
            progressBar.style.width = `${Math.min(percentage, 100)}%`;

            if (percentage > 100) {
                progressBar.style.background = '#EF4444';
            } else if (percentage > 80) {
                progressBar.style.background = '#F59E0B';
            }
        }
    }
}

// Event Creation Steps
let currentStep = 1;
const totalSteps = 4;

function nextStep() {
    if (currentStep < totalSteps) {
        document.getElementById(`step-${currentStep}`).classList.remove('active');
        document.getElementById(`step-content-${currentStep}`).style.display = 'none';

        currentStep++;

        document.getElementById(`step-${currentStep}`).classList.add('active');
        document.getElementById(`step-content-${currentStep}`).style.display = 'block';

        updateStepIndicator();
    }
}

function prevStep() {
    if (currentStep > 1) {
        document.getElementById(`step-${currentStep}`).classList.remove('active');
        document.getElementById(`step-content-${currentStep}`).style.display = 'none';

        currentStep--;

        document.getElementById(`step-${currentStep}`).classList.add('active');
        document.getElementById(`step-content-${currentStep}`).style.display = 'block';

        updateStepIndicator();
    }
}

function updateStepIndicator() {
    for (let i = 1; i <= totalSteps; i++) {
        const stepEl = document.getElementById(`step-${i}`);
        if (stepEl) {
            if (i < currentStep) {
                stepEl.classList.add('completed');
            } else {
                stepEl.classList.remove('completed');
            }
        }
    }
}

// Vendor filtering
function filterVendors(category) {
    const cards = document.querySelectorAll('.vendor-card');
    cards.forEach(card => {
        const cardCategory = card.dataset.category;
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Gift filtering
function filterGifts(category) {
    const cards = document.querySelectorAll('.gift-card');
    cards.forEach(card => {
        const cardCategory = card.dataset.category;
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Wishlist functionality
const wishlist = new Set();

function toggleWishlist(itemId) {
    if (wishlist.has(itemId)) {
        wishlist.delete(itemId);
        showNotification('Removed from wishlist', 'info');
    } else {
        wishlist.add(itemId);
        showNotification('Added to wishlist', 'success');
    }
    updateWishlistCount();
}

function updateWishlistCount() {
    const countEl = document.getElementById('wishlist-count');
    if (countEl) {
        countEl.textContent = wishlist.size;
    }
}

// Search functionality
function searchVendors(query) {
    const cards = document.querySelectorAll('.vendor-card');
    const lowerQuery = query.toLowerCase();

    cards.forEach(card => {
        const name = card.querySelector('h4').textContent.toLowerCase();
        const category = card.querySelector('.vendor-category').textContent.toLowerCase();

        if (name.includes(lowerQuery) || category.includes(lowerQuery)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function searchGifts(query) {
    const cards = document.querySelectorAll('.gift-card');
    const lowerQuery = query.toLowerCase();

    cards.forEach(card => {
        const name = card.querySelector('h4').textContent.toLowerCase();

        if (name.includes(lowerQuery)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
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
            transform: translateX(100%);
            opacity: 0;
        }
    }

    .notification-icon {
        font-size: 1.25rem;
    }

    .notification-success .notification-icon {
        color: #10B981;
    }

    .notification-error .notification-icon {
        color: #EF4444;
    }

    .notification-close {
        background: none;
        border: none;
        color: var(--text-muted);
        font-size: 1.25rem;
        cursor: pointer;
        padding: 0.25rem;
        margin-left: 0.5rem;
    }

    .notification-close:hover {
        color: var(--text-primary);
    }
`;
document.head.appendChild(style);
