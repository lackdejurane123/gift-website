// Global variables
let currentScreen = 1;
let isTransitioning = false;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Show initial screen with animations
    initializeScreen1();
    updateBackgroundAnimations();
});

// Function to show a specific screen
function showScreen(screenNumber) {
    if (isTransitioning) return; // Prevent multiple rapid clicks
    
    isTransitioning = true;
    
    // Hide current screen
    const currentScreenElement = document.getElementById(`screen${currentScreen}`);
    currentScreenElement.classList.remove('active');
    
    // Update body class for background changes
    updateBodyClass(screenNumber);
    
    // Show new screen after a brief delay
    setTimeout(() => {
        const newScreenElement = document.getElementById(`screen${screenNumber}`);
        newScreenElement.classList.add('active');
        
        // Initialize animations for the new screen
        if (screenNumber === 1) {
            initializeScreen1();
        } else if (screenNumber === 2) {
            initializeScreen2();
        } else if (screenNumber === 3) {
            initializeScreen3();
        }
        
        currentScreen = screenNumber;
        updateBackgroundAnimations();
        
        // Reset transition flag after animations complete
        setTimeout(() => {
            isTransitioning = false;
        }, 100);
    }, 300);
}

// Update body class for background transitions
function updateBodyClass(screenNumber) {
    const body = document.body;
    body.classList.remove('screen1-active', 'screen2-active', 'screen3-active');
    body.classList.add(`screen${screenNumber}-active`);
}

// Update background animations visibility
function updateBackgroundAnimations() {
    const screen1Backgrounds = document.querySelectorAll('.screen1-bg');
    const screen2Backgrounds = document.querySelectorAll('.screen2-bg');
    const screen3Backgrounds = document.querySelectorAll('.screen3-bg');
    
    // Hide all backgrounds first
    screen1Backgrounds.forEach(bg => bg.style.opacity = '0');
    screen2Backgrounds.forEach(bg => bg.style.opacity = '0');
    screen3Backgrounds.forEach(bg => bg.style.opacity = '0');
    
    // Show current screen's backgrounds
    setTimeout(() => {
        if (currentScreen === 1) {
            screen1Backgrounds.forEach(bg => bg.style.opacity = '1');
        } else if (currentScreen === 2) {
            screen2Backgrounds.forEach(bg => bg.style.opacity = '1');
        } else if (currentScreen === 3) {
            screen3Backgrounds.forEach(bg => bg.style.opacity = '1');
        }
    }, 300);
}

// Initialize Screen 1 animations
function initializeScreen1() {
    const lines = document.querySelectorAll('#screen1 .line');
    const button = document.querySelector('#screen1 .romantic-btn');
    
    // Reset all animations
    lines.forEach(line => {
        line.style.opacity = '0';
        line.style.transform = 'translateY(20px)';
    });
    
    button.style.opacity = '0';
    button.style.transform = 'translateY(10px)';
    
    // Animate lines appearing
    lines.forEach((line, index) => {
        setTimeout(() => {
            line.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            line.style.opacity = '1';
            line.style.transform = 'translateY(0)';
        }, 300 + (index * 300));
    });
    
    // Animate button appearing
    setTimeout(() => {
        button.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        button.style.opacity = '1';
        button.style.transform = 'translateY(0)';
    }, 1500);
}

// Initialize Screen 2 animations
function initializeScreen2() {
    const stanzas = document.querySelectorAll('#screen2 .stanza');
    const button = document.querySelector('#screen2 .romantic-btn');
    
    // Reset animations
    stanzas.forEach(stanza => {
        stanza.style.opacity = '0';
        stanza.style.transform = 'translateY(20px)';
    });
    
    button.style.opacity = '0';
    button.style.transform = 'translateY(10px)';
    
    // Animate stanzas appearing
    stanzas.forEach((stanza, index) => {
        setTimeout(() => {
            stanza.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            stanza.style.opacity = '1';
            stanza.style.transform = 'translateY(0)';
        }, 200 + (index * 300));
    });
    
    // Animate button appearing
    setTimeout(() => {
        button.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        button.style.opacity = '1';
        button.style.transform = 'translateY(0)';
    }, 1200);
}

// Initialize Screen 3 animations
function initializeScreen3() {
    const header = document.querySelector('#screen3 .gift-header');
    const gallery = document.querySelector('#screen3 .flower-gallery');
    const instruction = document.querySelector('#screen3 .instruction-text');
    const button = document.querySelector('#screen3 .romantic-btn');
    
    // Reset animations
    [header, gallery, instruction, button].forEach(element => {
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
        }
    });
    
    // Animate elements appearing sequentially
    const elements = [header, gallery, instruction, button];
    const delays = [200, 400, 600, 800];
    
    elements.forEach((element, index) => {
        if (element) {
            setTimeout(() => {
                element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, delays[index]);
        }
    });
}

// Add subtle hover effects to flower placeholders
document.addEventListener('DOMContentLoaded', function() {
    const flowerPlaceholders = document.querySelectorAll('.flower-placeholder');
    
    flowerPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('mouseenter', function() {
            if (!isTransitioning) {
                this.style.transform = 'translateY(-5px) scale(1.02)';
            }
        });
        
        placeholder.addEventListener('mouseleave', function() {
            if (!isTransitioning) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
});

// Add smooth button hover effects
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.romantic-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (!isTransitioning && this.style.opacity === '1') {
                this.style.transform = 'translateY(-2px) scale(1.05)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            if (!isTransitioning && this.style.opacity === '1') {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
        
        button.addEventListener('mousedown', function() {
            if (!isTransitioning && this.style.opacity === '1') {
                this.style.transform = 'translateY(1px) scale(1.02)';
            }
        });
        
        button.addEventListener('mouseup', function() {
            if (!isTransitioning && this.style.opacity === '1') {
                this.style.transform = 'translateY(-2px) scale(1.05)';
            }
        });
    });
});

// Keyboard navigation support
document.addEventListener('keydown', function(event) {
    if (isTransitioning) return;
    
    switch(event.key) {
        case 'ArrowRight':
        case ' ':
        case 'Enter':
            if (currentScreen < 3) {
                showScreen(currentScreen + 1);
            }
            break;
        case 'ArrowLeft':
            if (currentScreen > 1) {
                showScreen(currentScreen - 1);
            }
            break;
        case 'Home':
            showScreen(1);
            break;
    }
});

// Add a gentle parallax effect to the animated elements
let mouseEffectActive = false;
document.addEventListener('mousemove', function(event) {
    if (mouseEffectActive || isTransitioning) return;
    
    mouseEffectActive = true;
    setTimeout(() => {
        mouseEffectActive = false;
    }, 50);
    
    const mouseX = event.clientX / window.innerWidth;
    const mouseY = event.clientY / window.innerHeight;
    
    // Apply subtle parallax to animated elements
    const hearts = document.querySelectorAll('.heart, .celebration-heart');
    const flowers = document.querySelectorAll('.flower, .celebration-flower');
    const petals = document.querySelectorAll('.petal, .drift-petal');
    
    const offsetMultiplier = 5;
    const offsetX = (mouseX - 0.5) * offsetMultiplier;
    const offsetY = (mouseY - 0.5) * offsetMultiplier;
    
    hearts.forEach(heart => {
        heart.style.transform += ` translate(${offsetX * 0.5}px, ${offsetY * 0.3}px)`;
    });
    
    flowers.forEach(flower => {
        flower.style.transform += ` translate(${offsetX * 0.3}px, ${offsetY * 0.5}px)`;
    });
    
    petals.forEach(petal => {
        petal.style.transform += ` translate(${offsetX * 0.7}px, ${offsetY * 0.4}px)`;
    });
});

// Initialize background animations and screen on load
document.addEventListener('DOMContentLoaded', function() {
    // Set initial body class
    updateBodyClass(1);
    
    // Add staggered animation delays to create more natural movement
    const hearts = document.querySelectorAll('.heart');
    hearts.forEach((heart, index) => {
        const delay = Math.random() * 5; // Random delay up to 5 seconds
        heart.style.animationDelay = `${delay}s`;
    });
    
    const petals = document.querySelectorAll('.petal, .drift-petal');
    petals.forEach((petal, index) => {
        const delay = Math.random() * 8; // Random delay up to 8 seconds
        petal.style.animationDelay = `${delay}s`;
    });
    
    const flowers = document.querySelectorAll('.flower');
    flowers.forEach((flower, index) => {
        const delay = Math.random() * 10; // Random delay up to 10 seconds
        flower.style.animationDelay = `${delay}s`;
    });
    
    const celebrationHearts = document.querySelectorAll('.celebration-heart');
    celebrationHearts.forEach((heart, index) => {
        const delay = Math.random() * 3; // Random delay up to 3 seconds
        heart.style.animationDelay = `${delay}s`;
    });
    
    const celebrationFlowers = document.querySelectorAll('.celebration-flower');
    celebrationFlowers.forEach((flower, index) => {
        const delay = Math.random() * 4; // Random delay up to 4 seconds
        flower.style.animationDelay = `${delay}s`;
    });
});

// Smooth scrolling for mobile devices
document.addEventListener('touchstart', function() {}, {passive: true});
document.addEventListener('touchmove', function() {}, {passive: true});

// Performance optimization: pause animations when tab is not visible
document.addEventListener('visibilitychange', function() {
    const animatedElements = document.querySelectorAll('.heart, .petal, .flower, .drift-petal, .celebration-heart, .celebration-flower');
    
    if (document.hidden) {
        // Pause animations
        animatedElements.forEach(element => {
            element.style.animationPlayState = 'paused';
        });
    } else {
        // Resume animations
        animatedElements.forEach(element => {
            element.style.animationPlayState = 'running';
        });
    }
});

// Add resize handler for responsive animation adjustments
window.addEventListener('resize', function() {
    // Adjust animation elements for mobile
    if (window.innerWidth <= 768) {
        const animatedElements = document.querySelectorAll('.heart, .petal, .flower, .drift-petal');
        animatedElements.forEach(element => {
            element.style.transform = 'scale(0.8)';
        });
    } else if (window.innerWidth <= 480) {
        const animatedElements = document.querySelectorAll('.heart, .petal, .flower, .drift-petal');
        animatedElements.forEach(element => {
            element.style.transform = 'scale(0.6)';
        });
    } else {
        const animatedElements = document.querySelectorAll('.heart, .petal, .flower, .drift-petal');
        animatedElements.forEach(element => {
            element.style.transform = 'scale(1)';
        });
    }
});