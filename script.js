// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on nav links
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
const anchorLinks = document.querySelectorAll('a[href^="#"]');
anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
const header = document.querySelector('.header');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add/remove scrolled class for styling
    if (scrollTop > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Hide/show header on scroll (optional)
    if (scrollTop > lastScrollTop && scrollTop > 200) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.program-card, .facility-item, .about-feature, .contact-item');
animateElements.forEach(el => {
    observer.observe(el);
});

// WhatsApp Button Animation & Tracking
const whatsappBtn = document.querySelector('.whatsapp-btn');
if (whatsappBtn) {
    // Add pulse animation
    setInterval(() => {
        whatsappBtn.style.animation = 'none';
        setTimeout(() => {
            whatsappBtn.style.animation = 'pulse 2s infinite';
        }, 10);
    }, 10000);
    
    // Track WhatsApp clicks for ads conversion
    whatsappBtn.addEventListener('click', () => {
        // Google Ads Conversion
        if (typeof gtag !== 'undefined') {
            gtag('event', 'conversion', {
                'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL',
                'value': 1.0,
                'currency': 'IDR'
            });
        }
        
        // Facebook Pixel Conversion
        if (typeof fbq !== 'undefined') {
            fbq('track', 'Lead', {
                content_name: 'WhatsApp Contact',
                content_category: 'Contact',
                value: 1.0,
                currency: 'IDR'
            });
        }
        
        // TikTok Pixel Conversion
        if (typeof ttq !== 'undefined') {
            ttq.track('Contact', {
                content_type: 'whatsapp',
                content_name: 'WhatsApp Contact'
            });
        }
    });
}

// Add pulse animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
        100% {
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);

// Form validation and WhatsApp integration
function sendWhatsAppMessage(program = '') {
    const phoneNumber = '6281234567890';
    let message = 'Halo English Booster Sidoarjo! ';
    
    if (program) {
        message += `Saya tertarik dengan program ${program}. `;
    }
    
    message += 'Bisa tolong berikan informasi lebih lanjut tentang:';
    message += '\n- Jadwal kelas';
    message += '\n- Metode pembelajaran';
    message += '\n- Fasilitas yang didapat';
    message += '\n\nTerima kasih!';
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
}

// Add click tracking for program cards
const programCards = document.querySelectorAll('.program-card');
programCards.forEach(card => {
    const programTitle = card.querySelector('.program-title').textContent;
    const registerBtn = card.querySelector('.btn');
    
    if (registerBtn) {
        registerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            sendWhatsAppMessage(programTitle);
        });
    }
});

// FAQ Accordion Functionality
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all FAQ items
        faqItems.forEach(faqItem => {
            faqItem.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Testimonials auto-scroll (optional)
const testimonialsGrid = document.querySelector('.testimonials-grid');
if (testimonialsGrid && window.innerWidth > 768) {
    let scrollAmount = 0;
    const scrollStep = 1;
    const scrollDelay = 50;
    
    function autoScroll() {
        if (scrollAmount >= testimonialsGrid.scrollWidth - testimonialsGrid.clientWidth) {
            scrollAmount = 0;
        } else {
            scrollAmount += scrollStep;
        }
        testimonialsGrid.scrollLeft = scrollAmount;
    }
    
    // Auto-scroll every 3 seconds
    setInterval(() => {
        if (!testimonialsGrid.matches(':hover')) {
            autoScroll();
        }
    }, scrollDelay);
}

// Lazy loading for images
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
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

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Update active nav link
    const sections = document.querySelectorAll('section[id]');
    const headerHeight = header.offsetHeight;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Add loading state management
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Remove any loading overlays
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 300);
    }
});

// Error handling for external resources
window.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG') {
        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=';
        e.target.alt = 'Image not found';
    }
});

// Accessibility improvements
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
    
    // Enter key activates buttons
    if (e.key === 'Enter' && e.target.classList.contains('btn')) {
        e.target.click();
    }
});

// Add focus management for mobile menu
navToggle.addEventListener('click', () => {
    if (navMenu.classList.contains('active')) {
        // Focus first nav link when menu opens
        const firstNavLink = navMenu.querySelector('.nav-link');
        if (firstNavLink) {
            setTimeout(() => firstNavLink.focus(), 100);
        }
    }
});

// Preload critical resources
const preloadLinks = [
    'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

preloadLinks.forEach(href => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = href;
    document.head.appendChild(link);
});

// Analytics and tracking (placeholder)
function trackEvent(category, action, label) {
    // Google Analytics or other tracking service integration
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
    
    console.log(`Event tracked: ${category} - ${action} - ${label}`);
}

// Track Program Registration Buttons
const programButtons = document.querySelectorAll('.program-card .btn');
programButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const programCard = button.closest('.program-card');
        const programTitle = programCard.querySelector('.program-title').textContent;
        const programPrice = programCard.querySelector('.price').textContent;
        
        // Google Ads Conversion
        if (typeof gtag !== 'undefined') {
            gtag('event', 'conversion', {
                'send_to': 'AW-CONVERSION_ID/PROGRAM_CONVERSION_LABEL',
                'value': parseFloat(programPrice.replace(/[^0-9]/g, '')) / 1000,
                'currency': 'IDR',
                'transaction_id': Date.now().toString()
            });
        }
        
        // Facebook Pixel Conversion
        if (typeof fbq !== 'undefined') {
            fbq('track', 'Lead', {
                content_name: programTitle,
                content_category: 'Program Registration',
                value: parseFloat(programPrice.replace(/[^0-9]/g, '')) / 1000,
                currency: 'IDR'
            });
        }
        
        // TikTok Pixel Conversion
        if (typeof ttq !== 'undefined') {
            ttq.track('ClickButton', {
                content_type: 'program',
                content_name: programTitle,
                value: parseFloat(programPrice.replace(/[^0-9]/g, '')) / 1000,
                currency: 'IDR'
            });
        }
    });
});

// Track button clicks
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn')) {
        const buttonText = e.target.textContent.trim();
        const buttonType = e.target.classList.contains('btn-primary') ? 'primary' : 'secondary';
        trackEvent('Button', 'click', `${buttonType}: ${buttonText}`);
    }
    
    if (e.target.closest('.whatsapp-btn')) {
        trackEvent('WhatsApp', 'click', 'Float Button');
    }
});

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Add structured data for SEO
const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "English Booster Sidoarjo",
    "description": "Kursus bahasa Inggris terbaik di Sidoarjo dengan program TOEFL, IELTS, dan conversation untuk semua usia",
    "url": "https://kampunginggristerdekat.com",
    "telephone": "+62-81-475-8554",
    "email": "englishboostersidoarjo@gmail.com",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "Jl. Mutiara Citra Asri No.6, Kerawean",
        "addressLocality": "Sumorame",
        "addressRegion": "Sidoarjo",
        "addressCountry": "ID"
    },
    "sameAs": [
        "https://instagram.com/englishboostersidoarjo"
    ]
};

const script = document.createElement('script');
script.type = 'application/ld+json';
script.textContent = JSON.stringify(structuredData);
document.head.appendChild(script);

console.log('English Booster Sidoarjo website loaded successfully! 🚀');