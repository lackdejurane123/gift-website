// Global variables
let currentScreen = 1;

// === Persistent message store (unified) ===
const STORAGE_KEY = location.pathname.replace(/\/index\.html$/, '/') + ':sweetMessages';

function loadAll() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
  catch { return []; }
}

function saveAll(list) { 
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); 
}

// Single source of truth - always from localStorage
let messages = loadAll();

// Initialize EmailJS with your public key
document.addEventListener('DOMContentLoaded', function() {
    emailjs.init('o6Fa8y7v6sLcJA7zY'); 
    console.log('Website initialized!');

    // Load messages from storage on startup
    messages = loadAll();

    // Set initial screen
    setTimeout(() => {
        showScreen(1);
    }, 100);

    // Initialize message counter
    const msgText = document.getElementById('msg-text');
    const msgCount = document.getElementById('msg-count');

    if (msgText && msgCount) {
        msgText.addEventListener('input', function() {
            msgCount.textContent = this.value.length;
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMsgModal();
        }
    });

    // Add welcome effect
    setTimeout(() => {
        showNotification('TADAAAAAAAA', 'success');
    }, 1500);
});

// FIXED Screen transition function
function showScreen(screenNumber) {
    // Prevent invalid screen numbers
    if (screenNumber < 1 || screenNumber > 3) return;

    console.log(`Switching to screen ${screenNumber}`);

    // Hide ALL screens first - this fixes the overlap issue
    const allScreens = document.querySelectorAll('.screen');
    allScreens.forEach(screen => {
        screen.classList.remove('active');
    });

    // Wait a moment for transition, then show target screen
    setTimeout(() => {
        const targetScreen = document.getElementById(`screen${screenNumber}`);
        if (targetScreen) {
            targetScreen.classList.add('active');
        }

        // Update current screen
        currentScreen = screenNumber;

        // Update body class for background transitions
        document.body.className = '';
        document.body.classList.add(`screen${screenNumber}-active`);

        // Update background animations
        updateBackgroundAnimations(screenNumber);

        // Screen-specific animations
        if (screenNumber === 1) {
            // Reset and animate opening lines
            setTimeout(() => {
                const lines = document.querySelectorAll('#screen1 .line');
                lines.forEach((line, index) => {
                    line.style.opacity = '0';
                    line.style.transform = 'translateY(30px)';
                    setTimeout(() => {
                        line.classList.add('fade-in-up');
                    }, (index + 1) * 200);
                });

                // Animate button
                const button = document.querySelector('#screen1 .romantic-btn');
                if (button) {
                    button.style.opacity = '0';
                    button.style.transform = 'translateY(30px)';
                    setTimeout(() => {
                        button.classList.add('fade-in-up');
                    }, 1000);
                }
            }, 100);

        } else if (screenNumber === 2) {
            // Animate poem stanzas
            setTimeout(() => {
                const stanzas = document.querySelectorAll('#screen2 .stanza');
                stanzas.forEach((stanza, index) => {
                    stanza.style.opacity = '0';
                    stanza.style.transform = 'translateY(20px)';
                    stanza.style.animation = `fadeInStanza 1s ease-out ${index * 0.5}s forwards`;
                });

                // Animate button
                const button = document.querySelector('#screen2 .romantic-btn');
                if (button) {
                    button.style.opacity = '0';
                    button.style.transform = 'translateY(30px)';
                    setTimeout(() => {
                        button.classList.add('fade-in-up');
                    }, 800);
                }
            }, 100);

        } else if (screenNumber === 3) {
            // Animate screen 3 elements
            setTimeout(() => {
                const buttons = document.querySelectorAll('#screen3 .romantic-btn');
                buttons.forEach((button, index) => {
                    button.style.opacity = '0';
                    button.style.transform = 'translateY(30px)';
                    setTimeout(() => {
                        button.classList.add('fade-in-up');
                    }, (index + 1) * 200);
                });
            }, 100);
        }
    }, 100);
}

// Background animation controls
function updateBackgroundAnimations(screenNumber) {
    const screen1Bg = document.querySelectorAll('.screen1-bg');
    const screen2Bg = document.querySelectorAll('.screen2-bg');
    const screen3Bg = document.querySelectorAll('.screen3-bg');

    // Hide all backgrounds
    screen1Bg.forEach(el => el.style.opacity = '0');
    screen2Bg.forEach(el => el.style.opacity = '0');
    screen3Bg.forEach(el => el.style.opacity = '0');

    // Show appropriate background
    switch(screenNumber) {
        case 1:
            screen1Bg.forEach(el => el.style.opacity = '1');
            break;
        case 2:
            screen2Bg.forEach(el => el.style.opacity = '1');
            break;
        case 3:
            screen3Bg.forEach(el => el.style.opacity = '1');
            break;
    }
}

// Message modal functions
function openMsgModal() {
    const modal = document.getElementById('msg-modal');
    if (modal) {
        modal.classList.remove('hidden');

        // Focus on textarea
        const textarea = document.getElementById('msg-text');
        if (textarea) {
            setTimeout(() => textarea.focus(), 100);
        }

        // Always reload from storage when opening modal
        messages = loadAll();
        displayMessages();
    }
}

function closeMsgModal() {
    const modal = document.getElementById('msg-modal');
    if (modal) {
        modal.classList.add('hidden');

        // Clear textarea
        const textarea = document.getElementById('msg-text');
        const counter = document.getElementById('msg-count');
        if (textarea) textarea.value = '';
        if (counter) counter.textContent = '0';
    }
}

// UNIFIED Message saving function
// Enhanced saveMsg function that saves locally AND emails to you
async function saveMsg() {
    const textarea = document.getElementById('msg-text');
    if (!textarea) {
        console.error('Message textarea not found');
        return;
    }

    const messageText = textarea.value.trim();
    if (!messageText) {
        showNotification('Please write a message first! ', 'warning');
        return;
    }

    // Create message object
    const message = {
        id: Date.now(),
        text: messageText,
        ts: new Date().toLocaleString(),
        timestamp: new Date().toLocaleString()
    };

    // 1. Save locally (for her to see her messages)
    messages = loadAll();
    messages.unshift(message);
    saveAll(messages);

    // Clear textarea and update display
    textarea.value = '';
    const counter = document.getElementById('msg-count');
    if (counter) counter.textContent = '0';
    displayMessages();

    // 2. Send email to you via EmailJS
    try {
        // EmailJS configuration (you'll replace these with your actual IDs)
        await emailjs.send('service_fp56rrd', 'template_hrq14j6', {
            from_name: 'Sandhya', // or get from a name field
            message: messageText,
            timestamp: message.ts,
            to_email: 'your-email@example.com' // Your email address
        });

        console.log('Message saved locally and emailed successfully!');
        showNotification('Message sent! (in a nonchalant way)', 'success');

    } catch (error) {
        console.error('Email sending failed:', error);
        // Still show success because local save worked
        showNotification('Message saved! 💕', 'success');
    }
}

// UNIFIED display function (replaces loadMessages)
function displayMessages() {
    const msgList = document.getElementById('msg-list');
    if (!msgList) return;

    // Always work from current messages array
    if (messages.length === 0) {
        msgList.innerHTML = '<p class="msg-empty">No messages yet. Write the first one! ✨</p>';
        return;
    }

    msgList.innerHTML = '<h4>Your Messages:</h4>' + messages.map(m => `
        <div class="msg-item">
            <div class="msg-text">${String(m.text)
                .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
                .replace(/"/g,'&quot;').replace(/'/g,'&#039;')}</div>
            <div class="msg-timestamp">${m.ts || m.timestamp}</div>
            <button class="msg-delete" type="button" onclick="deleteMsg(${m.id})" title="Delete">×</button>
        </div>
    `).join('');
}

// UNIFIED delete function
function deleteMsg(messageId) {
    console.log('Deleting message:', messageId);

    // Reload from storage, remove message, save back
    messages = loadAll();
    messages = messages.filter(msg => msg.id !== messageId);
    saveAll(messages);

    // Update display
    displayMessages();

    // Show notification
    showNotification('Message deleted! 💔', 'info');
}

// Backup alias for HTML compatibility
window.deleteMessage = deleteMsg;

function showNotification(message, type = 'success') {
    const notification = document.getElementById('success-notification');
    if (!notification) {
        // Create notification if it doesn't exist
        const notif = document.createElement('div');
        notif.id = 'success-notification';
        notif.className = 'hidden';
        notif.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 25px;
            color: white;
            font-weight: 500;
            z-index: 1001;
            transition: all 0.3s ease;
        `;
        notif.innerHTML = '<span class="notification-icon"></span> <span class="notification-text"></span>';
        document.body.appendChild(notif);
    }

    const notification2 = document.getElementById('success-notification');
    const textElement = notification2.querySelector('.notification-text');
    const iconElement = notification2.querySelector('.notification-icon');

    if (textElement) textElement.textContent = message;

    // Update icon and styling based on type
    if (iconElement) {
        switch(type) {
            case 'success':
                iconElement.textContent = ':D';
                notification2.style.background = 'linear-gradient(135deg, #00b894, #00a085)';
                break;
            case 'warning':
                iconElement.textContent = '⚠️';
                notification2.style.background = 'linear-gradient(135deg, #fdcb6e, #e17055)';
                break;
            case 'info':
                iconElement.textContent = '💔';
                notification2.style.background = 'linear-gradient(135deg, #74b9ff, #0984e3)';
                break;
            default:
                iconElement.textContent = ':)';
                notification2.style.background = 'linear-gradient(135deg, #00b894, #00a085)';
        }
    }

    // Show notification
    notification2.classList.remove('hidden');

    // Hide after 3 seconds
    setTimeout(() => {
        notification2.classList.add('hidden');
    }, 3000);
}

// Utility function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // Don't interfere when modal is open
    const modal = document.getElementById('msg-modal');
    if (modal && !modal.classList.contains('hidden')) {
        return;
    }

    switch(e.key) {
        case 'ArrowRight':
        case ' ':
            e.preventDefault();
            if (currentScreen < 3) {
                showScreen(currentScreen + 1);
            }
            break;
        case 'ArrowLeft':
            e.preventDefault();
            if (currentScreen > 1) {
                showScreen(currentScreen - 1);
            }
            break;
        case 'Home':
            e.preventDefault();
            showScreen(1);
            break;
        case 'End':
            e.preventDefault();
            showScreen(3);
            break;
    }
});

// Touch/swipe support for mobile
let touchStartX = null;
let touchStartY = null;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchend', function(e) {
    if (!touchStartX || !touchStartY) return;

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;

    const deltaX = touchStartX - touchEndX;
    const deltaY = touchStartY - touchEndY;

    // Check if it's a horizontal swipe (not vertical scroll)
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        // Don't interfere when modal is open
        const modal = document.getElementById('msg-modal');
        if (modal && !modal.classList.contains('hidden')) {
            return;
        }

        if (deltaX > 0 && currentScreen < 3) {
            // Swipe left (next screen)
            showScreen(currentScreen + 1);
        } else if (deltaX < 0 && currentScreen > 1) {
            // Swipe right (previous screen)
            showScreen(currentScreen - 1);
        }
    }

    touchStartX = null;
    touchStartY = null;
});

// Enhanced modal interaction
document.addEventListener('click', function(e) {
    // Close modal when clicking backdrop
    if (e.target.classList.contains('msg-backdrop')) {
        closeMsgModal();
    }
});

// Add smooth scrolling for message list
function smoothScroll() {
    const msgList = document.getElementById('msg-list');
    if (msgList && msgList.scrollHeight > msgList.clientHeight) {
        msgList.scrollTop = 0; // Scroll to top to show newest messages
    }
}
