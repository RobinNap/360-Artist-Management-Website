/**
 * 360° Artist Management - Knowledge Base
 * Enhanced UI interactions with article navigation
 */

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Add entrance animations for cards
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.module-card, .lesson-card, .feature');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = `${index * 0.05}s`;
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => observer.observe(el));
});

// ============================================
// Article Navigation Enhancements
// ============================================

// Sidebar Toggle (Mobile)
const sidebarToggle = document.getElementById('sidebarToggle');
const chapterSidebar = document.querySelector('.chapter-sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');

if (sidebarToggle && chapterSidebar && sidebarOverlay) {
    sidebarToggle.addEventListener('click', () => {
        chapterSidebar.classList.toggle('active');
        sidebarOverlay.classList.toggle('active');
        document.body.style.overflow = chapterSidebar.classList.contains('active') ? 'hidden' : '';
    });

    sidebarOverlay.addEventListener('click', () => {
        chapterSidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close sidebar when clicking a chapter link (mobile)
    chapterSidebar.querySelectorAll('.chapter-item').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 1024) {
                chapterSidebar.classList.remove('active');
                sidebarOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
}

// Keyboard Navigation (Arrow Keys)
document.addEventListener('keydown', (e) => {
    // Don't trigger if user is typing in an input
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    
    const prevLink = document.querySelector('.sidebar-nav-btn.prev, .article-nav-link.prev:not(.disabled)');
    const nextLink = document.querySelector('.sidebar-nav-btn.next, .article-nav-link.next:not(.disabled)');
    
    if (e.key === 'ArrowLeft' && prevLink) {
        e.preventDefault();
        // Add visual feedback
        prevLink.style.transform = 'scale(0.95)';
        setTimeout(() => {
            window.location.href = prevLink.href;
        }, 100);
    }
    
    if (e.key === 'ArrowRight' && nextLink) {
        e.preventDefault();
        // Add visual feedback
        nextLink.style.transform = 'scale(0.95)';
        setTimeout(() => {
            window.location.href = nextLink.href;
        }, 100);
    }
});

// Smooth page transitions
document.addEventListener('DOMContentLoaded', () => {
    // Add loaded class for page entrance animation
    document.body.classList.add('page-loaded');
    
    // Handle navigation clicks for smooth exit
    const navigationLinks = document.querySelectorAll('.chapter-item, .sidebar-nav-btn, .sticky-nav-btn, .continue-card, .article-nav-link');
    
    navigationLinks.forEach(link => {
        if (link.href && !link.href.startsWith('#')) {
            link.addEventListener('click', (e) => {
                // Allow normal navigation, the CSS will handle the transition
            });
        }
    });
});
