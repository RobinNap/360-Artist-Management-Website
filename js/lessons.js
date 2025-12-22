/**
 * 360° Artist Management - Interactive Lessons
 * Handles exercises, quizzes, notes, and progress tracking
 */

// Lesson-specific storage
class LessonStorage {
    constructor(lessonId) {
        this.lessonId = lessonId;
        this.storageKey = `360-lesson-${lessonId}`;
    }

    getData() {
        const saved = localStorage.getItem(this.storageKey);
        return saved ? JSON.parse(saved) : {};
    }

    saveData(data) {
        const current = this.getData();
        const updated = { ...current, ...data };
        localStorage.setItem(this.storageKey, JSON.stringify(updated));
    }

    getField(field) {
        const data = this.getData();
        return data[field] || '';
    }

    saveField(field, value) {
        this.saveData({ [field]: value });
    }
}

// Initialize lesson
document.addEventListener('DOMContentLoaded', () => {
    const lessonId = document.body.dataset.lessonId;
    if (!lessonId) return;

    const storage = new LessonStorage(lessonId);

    // Initialize all components
    initAccordions();
    initExercises(storage);
    initQuizzes(storage);
    initActionItems(storage);
    initNotes(storage);
    initCompleteButton();
    initReadingProgress();
});

// Accordion functionality
function initAccordions() {
    const accordionHeaders = document.querySelectorAll('.concept-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.closest('.concept-item');
            const isActive = item.classList.contains('active');
            
            // Close all other items in the same accordion
            const accordion = item.closest('.concepts-accordion');
            accordion.querySelectorAll('.concept-item').forEach(i => {
                i.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Exercise textareas with auto-save
function initExercises(storage) {
    const exerciseTextareas = document.querySelectorAll('.exercise-textarea');
    
    exerciseTextareas.forEach(textarea => {
        const fieldId = textarea.id;
        
        // Load saved content
        const saved = storage.getField(fieldId);
        if (saved) {
            textarea.value = saved;
        }
        
        // Auto-save on input with debounce
        let saveTimeout;
        textarea.addEventListener('input', () => {
            clearTimeout(saveTimeout);
            saveTimeout = setTimeout(() => {
                storage.saveField(fieldId, textarea.value);
                showSaveIndicator('saveIndicator');
            }, 500);
        });
    });
}

// Quiz functionality
function initQuizzes(storage) {
    const quizContainers = document.querySelectorAll('.quiz-options');
    
    quizContainers.forEach(container => {
        const quizId = container.id;
        const options = container.querySelectorAll('.quiz-option');
        const correctFeedback = document.getElementById(`${quizId}-correct`);
        const incorrectFeedback = document.getElementById(`${quizId}-incorrect`);
        
        // Load saved answer
        const savedAnswer = storage.getField(quizId);
        if (savedAnswer) {
            const savedOption = container.querySelector(`[data-answer="${savedAnswer === 'correct' ? 'correct' : 'wrong'}]`);
            // Restore quiz state
        }
        
        options.forEach(option => {
            option.addEventListener('click', () => {
                // Remove previous selections
                options.forEach(o => {
                    o.classList.remove('selected', 'correct', 'incorrect');
                });
                
                // Hide feedback
                if (correctFeedback) correctFeedback.style.display = 'none';
                if (incorrectFeedback) incorrectFeedback.style.display = 'none';
                
                // Check answer
                const isCorrect = option.dataset.answer === 'correct';
                option.classList.add('selected');
                option.classList.add(isCorrect ? 'correct' : 'incorrect');
                
                // Show feedback
                if (isCorrect && correctFeedback) {
                    correctFeedback.style.display = 'block';
                } else if (!isCorrect && incorrectFeedback) {
                    incorrectFeedback.style.display = 'block';
                }
                
                // Save answer
                storage.saveField(quizId, isCorrect ? 'correct' : 'wrong');
            });
        });
    });
}

// Action item checkboxes
function initActionItems(storage) {
    const actionItems = document.querySelectorAll('.action-item');
    
    actionItems.forEach(item => {
        const actionId = item.dataset.action;
        
        // Load saved state
        const isCompleted = storage.getField(actionId);
        if (isCompleted) {
            item.classList.add('completed');
        }
        
        item.addEventListener('click', () => {
            const wasCompleted = item.classList.contains('completed');
            item.classList.toggle('completed');
            storage.saveField(actionId, !wasCompleted);
        });
    });
}

// Notes with auto-save
function initNotes(storage) {
    const notesTextarea = document.getElementById('lessonNotes');
    if (!notesTextarea) return;
    
    // Load saved notes
    const savedNotes = storage.getField('notes');
    if (savedNotes) {
        notesTextarea.value = savedNotes;
    }
    
    // Auto-save on input with debounce
    let saveTimeout;
    notesTextarea.addEventListener('input', () => {
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(() => {
            storage.saveField('notes', notesTextarea.value);
            showSaveIndicator('notesIndicator');
        }, 500);
    });
}

// Show save indicator
function showSaveIndicator(indicatorId) {
    const indicator = document.getElementById(indicatorId);
    if (!indicator) return;
    
    indicator.classList.add('visible');
    setTimeout(() => {
        indicator.classList.remove('visible');
    }, 2000);
}

// Mark lesson as complete button
function initCompleteButton() {
    const btn = document.getElementById('markCompleteBtn');
    if (!btn) return;
    
    const lessonId = document.body.dataset.lessonId;
    
    // Check if already completed
    if (progressManager && progressManager.isCompleted(lessonId)) {
        btn.classList.add('completed');
        btn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"/>
            </svg>
            Completed!
        `;
    }
    
    btn.addEventListener('click', () => {
        if (progressManager) {
            const isCompleted = progressManager.toggleLesson(lessonId);
            
            if (isCompleted) {
                btn.classList.add('completed');
                btn.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    Completed!
                `;
                
                // Celebration effect
                createConfetti();
            } else {
                btn.classList.remove('completed');
                btn.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    Mark as Complete
                `;
            }
        }
    });
}

// Reading progress bar
function initReadingProgress() {
    const progressBar = document.getElementById('readingProgress');
    if (!progressBar) return;
    
    const updateProgress = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = `${Math.min(progress, 100)}%`;
    };
    
    window.addEventListener('scroll', updateProgress);
    updateProgress();
}

// Confetti celebration effect
function createConfetti() {
    const colors = ['#ff6b35', '#ff8c5a', '#6366f1', '#22c55e', '#f59e0b'];
    const container = document.body;
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}vw;
            top: -10px;
            border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
            pointer-events: none;
            z-index: 9999;
            animation: confetti-fall ${2 + Math.random() * 2}s ease-out forwards;
        `;
        container.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 4000);
    }
}

// Add confetti animation styles
const confettiStyles = document.createElement('style');
confettiStyles.textContent = `
    @keyframes confetti-fall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyles);

