/**
 * 360° Artist Management - Interactive Workshop
 * Progress Tracking & UI Interactions
 */

// Course Data Structure
const courseData = {
    onboarding: {
        name: "Onboarding",
        lessons: [
            { id: "onb-01", title: "Welcome", file: "01 Welcome.pdf", type: "lesson" },
            { id: "onb-02", title: "Branding", file: "02 Branding.pdf", type: "lesson" },
            { id: "onb-03", title: "Core Values", file: "03 Core Values.pdf", type: "lesson" },
            { id: "onb-04", title: "Visualization", file: "04 Visualization.pdf", type: "lesson" },
            { id: "onb-05", title: "Artist Name", file: "05 Artist Name .pdf", type: "lesson" },
            { id: "onb-06", title: "Logo", file: "06 Logo.pdf", type: "lesson" },
            { id: "onb-07a", title: "Moodboard Worksheet", file: "07 Moodboard Worksheet.pdf", type: "worksheet" },
            { id: "onb-07b", title: "Press Photos", file: "07 Press Photos.pdf", type: "lesson" },
            { id: "onb-08", title: "Biography", file: "08 Biography.pdf", type: "lesson" },
            { id: "onb-09", title: "Stage Performance", file: "09 Stage Performance .pdf", type: "lesson" },
            { id: "onb-10", title: "Tone of Voice", file: "10 Tone of Voice.pdf", type: "lesson" },
            { id: "onb-11", title: "Your Sound", file: "11 Your Sound.pdf", type: "lesson" },
            { id: "onb-12", title: "Online Presence", file: "12 Online Presence .pdf", type: "lesson" },
            { id: "onb-13", title: "Creating Your Press Kit (EPK)", file: "13 Creating Your Press Kit (EPK) .pdf", type: "lesson" }
        ],
        resources: [
            { title: "Biography Worksheet", file: "Biography Worksheet.pdf", type: "worksheet" },
            { title: "Branding Questionnaire", file: "Branding Questionaire.pdf", type: "worksheet" },
            { title: "Moodboard Worksheet", file: "Moodboard Worksheet.pdf", type: "worksheet" },
            { title: "Core Values Worksheet", file: "My Core Values Worksheet.pdf", type: "worksheet" },
            { title: "Narrative Worksheet", file: "Narrative Worksheet .pdf", type: "worksheet" },
            { title: "Brand House Worksheet", file: "The Brand House Worksheet.pdf", type: "worksheet" }
        ]
    },
    management: {
        name: "Management",
        lessons: [
            { id: "mgmt-01", title: "Artist DNA", file: "01 Artist DNA.pdf", type: "lesson" },
            { id: "mgmt-02", title: "The Artist Cycle", file: "02 The Artist Cycle.pdf", type: "lesson" },
            { id: "mgmt-03", title: "The Fan Journey", file: "03 The Fan Journey .pdf", type: "lesson" },
            { id: "mgmt-04", title: "Building Your Network", file: "04 Building Your Network.pdf", type: "lesson" }
        ],
        resources: [
            { title: "My Network", file: "My Network.xlsx", type: "template" },
            { title: "Persona Template", file: "Persona Template.xlsx", type: "template" }
        ]
    },
    marketing: {
        name: "Marketing",
        lessons: [
            { id: "mkt-01", title: "What is Marketing?", file: "01 What is Marketing?.pdf", type: "lesson" },
            { id: "mkt-02", title: "Newsworthiness", file: "02 Newsworthiness.pdf", type: "lesson" },
            { id: "mkt-03", title: "Reaching Out", file: "03 Reaching Out.pdf", type: "lesson" },
            { id: "mkt-04", title: "Writing a Press Release", file: "04 Writing a Press Release .pdf", type: "lesson" },
            { id: "mkt-05", title: "Writing a Newsletter", file: "05 Writing a Newsletter.pdf", type: "lesson" },
            { id: "mkt-06", title: "Storytelling", file: "06 Storytelling.pdf", type: "lesson" },
            { id: "mkt-07", title: "Creating Content", file: "07 Creating Content.pdf", type: "lesson" },
            { id: "mkt-08", title: "Control Your Content", file: "08 Control Your Content .pdf", type: "lesson" }
        ],
        resources: [
            { title: "Engagement Insights", file: "Engagement Insights.xlsx", type: "template" },
            { title: "Press Release Example", file: "Press Release: Julian Jordan finally drops long-awaited ID 'Big Bad Bass'.pdf", type: "example" }
        ]
    },
    bookings: {
        name: "Bookings",
        lessons: [
            { id: "book-01", title: "What Type of DJ Are You?", file: "01 What Type of DJ Are You?.pdf", type: "lesson" },
            { id: "book-02", title: "Find Your Stage", file: "02 Find Your Stage .pdf", type: "lesson" },
            { id: "book-03", title: "Getting Booked at a Club", file: "03 Getting Booked at a Club .pdf", type: "lesson" },
            { id: "book-04", title: "Getting Booked at a Festival", file: "04 Getting Booked at a Festival .pdf", type: "lesson" },
            { id: "book-05", title: "How To Write A Booker", file: "05 How To Write A Booker.pdf", type: "lesson" },
            { id: "book-06", title: "Build Your Riders", file: "06 Build Your Riders.pdf", type: "lesson" },
            { id: "book-07", title: "Create a Setlist", file: "07 Create a Setlist.pdf", type: "lesson" },
            { id: "book-08", title: "Keep Track of Your Booking Information", file: "08 Keep Track of Your Booking Information.pdf", type: "lesson" },
            { id: "book-09", title: "Preparing Your Performance", file: "09 Preparing Your Performance.pdf", type: "lesson" },
            { id: "book-10", title: "Making a Lasting Impression", file: "10 Making a Lasting Impression.pdf", type: "lesson" }
        ],
        resources: []
    },
    finance: {
        name: "Finance",
        lessons: [
            { id: "fin-01", title: "Flows of Income", file: "01 Flows of Income.pdf", type: "lesson" },
            { id: "fin-02", title: "Invoicing", file: "02 Invoicing.pdf", type: "lesson" },
            { id: "fin-03", title: "Calculate Your Profit & Loss", file: "03 Calculate Your Profit & Lost.pdf", type: "lesson" },
            { id: "fin-04", title: "Budgeting", file: "04 Budgeting.pdf", type: "lesson" },
            { id: "fin-05", title: "Royalties", file: "05 Royalties.pdf", type: "lesson" }
        ],
        resources: [
            { title: "Budgeting Example Sheet", file: "Budgeting Example Sheet.xlsx", type: "template" },
            { title: "Document All Expenses", file: "Document All Expenses.xlsx", type: "template" },
            { title: "Revenue & Loss Tracker", file: "Revenue & Lost Tracker.xlsx", type: "template" }
        ]
    },
    legal: {
        name: "Legal",
        lessons: [
            { id: "leg-01", title: "Signing a Record Deal", file: "01 Signing a Record Deal.pdf", type: "lesson" },
            { id: "leg-02", title: "Signing a Management Agreement", file: "02 Signing a Management Agreement.pdf", type: "lesson" },
            { id: "leg-03", title: "Basic Music Rights", file: "03 Basic Music Rights.pdf", type: "lesson" }
        ],
        resources: [
            { title: "Booking Agreement Example", file: "Booking Agreement Example.pdf", type: "example" }
        ]
    }
};

// Progress Management
class ProgressManager {
    constructor() {
        this.storageKey = '360-artist-progress';
        this.progress = this.loadProgress();
    }

    loadProgress() {
        const saved = localStorage.getItem(this.storageKey);
        return saved ? JSON.parse(saved) : {};
    }

    saveProgress() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.progress));
    }

    toggleLesson(lessonId) {
        if (this.progress[lessonId]) {
            delete this.progress[lessonId];
        } else {
            this.progress[lessonId] = { completed: true, date: new Date().toISOString() };
        }
        this.saveProgress();
        return this.isCompleted(lessonId);
    }

    isCompleted(lessonId) {
        return !!this.progress[lessonId];
    }

    getModuleProgress(moduleKey) {
        const module = courseData[moduleKey];
        if (!module) return { completed: 0, total: 0, percentage: 0 };
        
        const total = module.lessons.length;
        const completed = module.lessons.filter(lesson => this.isCompleted(lesson.id)).length;
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
        
        return { completed, total, percentage };
    }

    getOverallProgress() {
        let totalLessons = 0;
        let completedLessons = 0;

        Object.keys(courseData).forEach(moduleKey => {
            const module = courseData[moduleKey];
            totalLessons += module.lessons.length;
            completedLessons += module.lessons.filter(lesson => this.isCompleted(lesson.id)).length;
        });

        const percentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
        return { completed: completedLessons, total: totalLessons, percentage };
    }

    reset() {
        this.progress = {};
        this.saveProgress();
    }
}

// Initialize Progress Manager
const progressManager = new ProgressManager();

// DOM Elements
const progressBtn = document.getElementById('progressBtn');
const progressModal = document.getElementById('progressModal');
const modalClose = document.getElementById('modalClose');
const modalOverlay = document.querySelector('.modal-overlay');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const resetProgressBtn = document.getElementById('resetProgress');

// Mobile Menu Toggle
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

// Progress Modal
if (progressBtn && progressModal) {
    progressBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openProgressModal();
    });
}

if (modalClose) {
    modalClose.addEventListener('click', closeProgressModal);
}

if (modalOverlay) {
    modalOverlay.addEventListener('click', closeProgressModal);
}

function openProgressModal() {
    updateProgressModal();
    progressModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProgressModal() {
    progressModal.classList.remove('active');
    document.body.style.overflow = '';
}

function updateProgressModal() {
    const overall = progressManager.getOverallProgress();
    
    // Update circular progress
    const progressCircle = document.getElementById('progressCircle');
    const progressText = document.getElementById('progressText');
    const completedLessons = document.getElementById('completedLessons');
    const totalLessons = document.getElementById('totalLessons');
    
    if (progressCircle) {
        const circumference = 2 * Math.PI * 45;
        const offset = circumference - (overall.percentage / 100) * circumference;
        progressCircle.style.strokeDashoffset = offset;
        
        // Add gradient definition if not exists
        if (!document.getElementById('progressGradient')) {
            const svg = progressCircle.closest('svg');
            const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
            defs.innerHTML = `
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#ff6b35"/>
                    <stop offset="100%" style="stop-color:#6366f1"/>
                </linearGradient>
            `;
            svg.insertBefore(defs, svg.firstChild);
        }
        progressCircle.style.stroke = 'url(#progressGradient)';
    }
    
    if (progressText) progressText.textContent = `${overall.percentage}%`;
    if (completedLessons) completedLessons.textContent = overall.completed;
    if (totalLessons) totalLessons.textContent = overall.total;

    // Update module list
    const moduleList = document.getElementById('moduleProgressList');
    if (moduleList) {
        moduleList.innerHTML = Object.keys(courseData).map(moduleKey => {
            const module = courseData[moduleKey];
            const progress = progressManager.getModuleProgress(moduleKey);
            return `
                <div class="module-progress-item">
                    <span class="module-name">${module.name}</span>
                    <span class="module-percent">${progress.completed}/${progress.total}</span>
                </div>
            `;
        }).join('');
    }
}

// Reset Progress
if (resetProgressBtn) {
    resetProgressBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
            progressManager.reset();
            updateProgressModal();
            updateModuleCards();
            updateLessonCheckboxes();
        }
    });
}

// Update Module Cards on Homepage
function updateModuleCards() {
    document.querySelectorAll('.module-card').forEach(card => {
        const moduleKey = card.dataset.module;
        if (!moduleKey) return;

        const progress = progressManager.getModuleProgress(moduleKey);
        
        const progressSpan = card.querySelector('.module-progress');
        const progressFill = card.querySelector('.progress-fill');
        
        if (progressSpan) {
            progressSpan.textContent = `${progress.percentage}% complete`;
            progressSpan.dataset.progress = progress.percentage;
        }
        
        if (progressFill) {
            progressFill.style.width = `${progress.percentage}%`;
        }
    });
}

// Update Lesson Checkboxes on Module Pages
function updateLessonCheckboxes() {
    document.querySelectorAll('.lesson-checkbox').forEach(checkbox => {
        const lessonId = checkbox.dataset.lessonId;
        if (lessonId && progressManager.isCompleted(lessonId)) {
            checkbox.classList.add('completed');
        } else {
            checkbox.classList.remove('completed');
        }
    });
    
    // Update module progress bar on module page
    updateModulePageProgress();
}

function updateModulePageProgress() {
    const moduleHero = document.querySelector('.module-hero');
    if (!moduleHero) return;
    
    const moduleKey = document.body.dataset.module;
    if (!moduleKey) return;
    
    const progress = progressManager.getModuleProgress(moduleKey);
    
    const progressBar = moduleHero.querySelector('.module-progress-bar .progress-fill');
    const progressText = moduleHero.querySelector('.module-progress-text');
    
    if (progressBar) {
        progressBar.style.width = `${progress.percentage}%`;
    }
    
    if (progressText) {
        progressText.textContent = `${progress.completed}/${progress.total} lessons completed`;
    }
}

// Handle Lesson Checkbox Clicks
document.addEventListener('click', (e) => {
    const checkbox = e.target.closest('.lesson-checkbox');
    if (!checkbox) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    const lessonId = checkbox.dataset.lessonId;
    if (!lessonId) return;
    
    const isCompleted = progressManager.toggleLesson(lessonId);
    
    if (isCompleted) {
        checkbox.classList.add('completed');
    } else {
        checkbox.classList.remove('completed');
    }
    
    updateModulePageProgress();
    updateModuleCards();
});

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

// Keyboard Navigation for Modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && progressModal && progressModal.classList.contains('active')) {
        closeProgressModal();
    }
});

// Initialize on Page Load
document.addEventListener('DOMContentLoaded', () => {
    updateModuleCards();
    updateLessonCheckboxes();
    
    // Add entrance animations
    const animatedElements = document.querySelectorAll('.module-card, .feature');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = `${index * 0.1}s`;
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => observer.observe(el));
});

// Export for module pages
window.courseData = courseData;
window.progressManager = progressManager;

