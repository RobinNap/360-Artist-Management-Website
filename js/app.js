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
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            if (mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
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
            
            // Close mobile menu if open
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
                document.body.style.overflow = '';
            }
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
    
    const currentActive = document.querySelector('.chapter-item.active');
    
    if (e.key === 'ArrowLeft' && currentActive) {
        e.preventDefault();
        const prevItem = currentActive.previousElementSibling;
        if (prevItem && prevItem.classList.contains('chapter-item')) {
            window.location.href = prevItem.href;
        }
    }
    
    if (e.key === 'ArrowRight') {
        e.preventDefault();
        // Use continue card if available, otherwise find next from chapter list
        const continueCard = document.querySelector('.continue-card');
        if (continueCard) {
            window.location.href = continueCard.href;
        } else if (currentActive) {
            const nextItem = currentActive.nextElementSibling;
            if (nextItem && nextItem.classList.contains('chapter-item')) {
                window.location.href = nextItem.href;
            }
        }
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
    
    // #region agent log
    // Debug: Measure viewport and document dimensions to identify overflow
    const measureOverflow = () => {
        const viewportWidth = window.innerWidth;
        const documentWidth = document.documentElement.scrollWidth;
        const bodyWidth = document.body.scrollWidth;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        const hasOverflow = documentWidth > viewportWidth;
        
        fetch('http://127.0.0.1:7242/ingest/94ef39dd-ac61-4fbc-b144-204f8904f436',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app.js:156',message:'Viewport dimensions',data:{viewportWidth,documentWidth,bodyWidth,scrollLeft,hasOverflow},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
        
        // Check for elements that might cause overflow
        const allElements = document.querySelectorAll('*');
        const overflowElements = [];
        allElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const computedStyle = window.getComputedStyle(el);
            const width = parseFloat(computedStyle.width);
            const paddingLeft = parseFloat(computedStyle.paddingLeft);
            const paddingRight = parseFloat(computedStyle.paddingRight);
            const marginLeft = parseFloat(computedStyle.marginLeft);
            const marginRight = parseFloat(computedStyle.marginRight);
            const totalWidth = width + paddingLeft + paddingRight + marginLeft + marginRight;
            
            if (rect.right > viewportWidth || rect.left < 0 || totalWidth > viewportWidth) {
                overflowElements.push({
                    tag: el.tagName,
                    class: el.className,
                    id: el.id,
                    right: rect.right,
                    left: rect.left,
                    width: totalWidth,
                    viewportWidth
                });
            }
        });
        
        if (overflowElements.length > 0) {
            fetch('http://127.0.0.1:7242/ingest/94ef39dd-ac61-4fbc-b144-204f8904f436',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app.js:180',message:'Overflow elements found',data:{count:overflowElements.length,elements:overflowElements.slice(0,10)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
        }
        
        // Check specific problematic elements
        const vinylContainer = document.querySelector('.vinyl-container');
        if (vinylContainer) {
            const vinylRect = vinylContainer.getBoundingClientRect();
            const vinylStyle = window.getComputedStyle(vinylContainer);
            fetch('http://127.0.0.1:7242/ingest/94ef39dd-ac61-4fbc-b144-204f8904f436',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app.js:190',message:'Vinyl container dimensions',data:{width:vinylRect.width,right:vinylRect.right,left:vinylRect.left,viewportWidth,overflow:vinylRect.right > viewportWidth},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
        }
        
        // Check sections with padding
        const sections = document.querySelectorAll('section, .hero, .modules-section, .about-section');
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const style = window.getComputedStyle(section);
            const paddingLeft = parseFloat(style.paddingLeft);
            const paddingRight = parseFloat(style.paddingRight);
            if (rect.right > viewportWidth || paddingLeft + paddingRight > 0) {
                fetch('http://127.0.0.1:7242/ingest/94ef39dd-ac61-4fbc-b144-204f8904f436',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app.js:203',message:'Section padding check',data:{class:section.className,right:rect.right,viewportWidth,paddingLeft,paddingRight,overflow:rect.right > viewportWidth},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
            }
        });
        
        // Check for elements with fixed/absolute positioning
        const positionedElements = document.querySelectorAll('[style*="position"], .bg-gradient, .noise-overlay, .nav');
        positionedElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const style = window.getComputedStyle(el);
            if (rect.right > viewportWidth || rect.left < 0) {
                fetch('http://127.0.0.1:7242/ingest/94ef39dd-ac61-4fbc-b144-204f8904f436',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app.js:214',message:'Positioned element overflow',data:{class:el.className,position:style.position,right:rect.right,left:rect.left,viewportWidth},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
            }
        });
    };
    
    // Measure on load and resize
    measureOverflow();
    window.addEventListener('resize', measureOverflow);
    // #endregion
});
