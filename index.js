// Main container for scrolling
const mainContainer = document.querySelector('.main-content-container');

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');
const menuIcon = document.querySelector('.menu-icon');
const closeIcon = document.querySelector('.close-icon');

if (mobileMenuBtn && mobileNav && menuIcon && closeIcon) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileNav.classList.toggle('hidden');
        menuIcon.classList.toggle('hidden');
        closeIcon.classList.toggle('hidden');
    });
}

// Smooth Scrolling for Navigation Links
const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // If link points to another page (like index.html#section), allow default navigation
        if (href && href.includes('index.html')) {
            // Allow default navigation to work - browser will handle the page change and hash
            return;
        }
        
        // Otherwise, handle smooth scrolling on current page
        e.preventDefault();
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);
        const scrollContainer = mainContainer || window;
        
        if (targetSection) {
            if (mainContainer) {
                const offsetTop = targetSection.offsetTop;
                mainContainer.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            } else {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
            
            // Close mobile menu if open
            if (mobileNav && !mobileNav.classList.contains('hidden')) {
                mobileNav.classList.add('hidden');
                if (menuIcon) menuIcon.classList.remove('hidden');
                if (closeIcon) closeIcon.classList.add('hidden');
            }
        }
    });
});

// Active Section Tracking
const sections = document.querySelectorAll('section[id]');
const desktopNavLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

function updateActiveSection() {
    let currentSection = '';
    const scrollTop = mainContainer ? mainContainer.scrollTop : window.pageYOffset;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollTop >= sectionTop - 150) {
            currentSection = section.getAttribute('id');
        }
    });
    
    // Update desktop nav
    desktopNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === currentSection) {
            link.classList.add('active');
        }
    });
    
    // Update mobile nav
    mobileNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === currentSection) {
            link.classList.add('active');
        }
    });
}

// Throttle function for better performance
function throttle(func, wait) {
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

// Listen to scroll events
const scrollContainer = mainContainer || window;
if (scrollContainer) {
    scrollContainer.addEventListener('scroll', throttle(updateActiveSection, 100));
}

// Initial check
updateActiveSection();

// Add fade-in animation on scroll for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe cards and sections for fade-in
const fadeElements = document.querySelectorAll('.about-card, .skill-card, .experience-card, .education-card, .tool-tag');
fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55), transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    observer.observe(el);
});

// Parallax effect for hero section
let lastScrollTop = 0;
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');
const heroBlobs = document.querySelectorAll('.liquid-blob');

if (mainContainer) {
    mainContainer.addEventListener('scroll', throttle(() => {
        const scrollTop = mainContainer.scrollTop;
        const heroHeight = hero ? hero.offsetHeight : 0;
        
        if (scrollTop < heroHeight) {
            // Parallax effect for hero content
            if (heroContent) {
                const parallaxValue = scrollTop * 0.5;
                heroContent.style.transform = `translateY(${parallaxValue}px)`;
                heroContent.style.opacity = 1 - (scrollTop / heroHeight) * 0.5;
            }
            
            // Blobs are hidden in professional theme
        }
        
        lastScrollTop = scrollTop;
    }, 10));
}

// Subtle hover effect for glass cards (professional theme)
const glassCards = document.querySelectorAll('.glass-card');

glassCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'all 0.3s ease';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transition = 'all 0.3s ease';
    });
});

// Dynamic glass effect on navigation based on scroll
const nav = document.getElementById('navigation');

if (nav && mainContainer) {
    mainContainer.addEventListener('scroll', throttle(() => {
        const scrollTop = mainContainer.scrollTop;
        
        if (scrollTop > 50) {
            nav.style.background = 'rgba(255, 255, 255, 0.98)';
            nav.style.backdropFilter = 'blur(25px) saturate(180%)';
            nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
            nav.style.backdropFilter = 'blur(20px) saturate(180%)';
            nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
        }
    }, 50));
}

// Add ripple effect to buttons
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

// Add CSS for ripple effect dynamically
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.2);
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

// Smooth reveal animation for section titles
const sectionTitles = document.querySelectorAll('.section-title');

const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fade-in 0.8s ease-out';
            entry.target.style.opacity = '1';
        }
    });
}, { threshold: 0.5 });

sectionTitles.forEach(title => {
    title.style.opacity = '0';
    titleObserver.observe(title);
});

// Add floating animation to tool tags on hover
const toolTags = document.querySelectorAll('.tool-tag');

toolTags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.animation = 'liquid-float 2s ease-in-out infinite';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.animation = '';
    });
});

// Performance optimization: Use requestAnimationFrame for smooth animations
let ticking = false;

function updateOnScroll() {
    updateActiveSection();
    ticking = false;
}

if (scrollContainer) {
    scrollContainer.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Image Modal Functionality
const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalClose = document.querySelector('.image-modal-close');
const modalOpen = document.querySelector('.image-modal-open');
const projectImages = document.querySelectorAll('.project-image');

// Open modal when image is clicked
projectImages.forEach(img => {
    img.addEventListener('click', function() {
        if (imageModal && modalImage) {
            modalImage.src = this.src;
            modalImage.alt = this.alt;
            imageModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close modal
if (modalClose && imageModal) {
    modalClose.addEventListener('click', function() {
        imageModal.classList.remove('active');
        document.body.style.overflow = '';
    });
}

// Open image in new tab
if (modalOpen && modalImage) {
    modalOpen.addEventListener('click', function(e) {
        e.stopPropagation();
        if (modalImage.src) {
            window.open(modalImage.src, '_blank');
        }
    });
}

// Close modal when clicking outside the image
if (imageModal) {
    imageModal.addEventListener('click', function(e) {
        if (e.target === imageModal) {
            imageModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && imageModal && imageModal.classList.contains('active')) {
        imageModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Projects Section - Navigation to detail pages
const projectCards = document.querySelectorAll('.project-card');

// Observe project cards for fade-in animation
const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

projectCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    projectObserver.observe(card);
});
