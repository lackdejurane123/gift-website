// Application data
const appData = {
  "welcomeText": "Hey… 👋\nSo, you're finally back huh? 👀✨\nThought I'd make you something small.",
  "buttonText": "Tap Me 🌿",
  "surpriseMainText": "I hope today was kind to you,\nand I hope you're smiling right now. 🌸\nThat's it… no big reason,\njust me being me.",
  "handwrittenNote": "P.S. I still like you, btw.",
  "footerText": "You can close this now, I just wanted to be here when you got back :)",
  "gift1Title": "A little something for you 📸",
  "gift2Title": "Your Gift Voucher 🎁",
  "voucherCode": "YOUR-VOUCHER-CODE-HERE",
  "imagePlaceholder1": "Replace with your image 1",
  "imagePlaceholder2": "Replace with your image 2",
  "colors": {
    "beige": "#F5F5DC",
    "pastelPink": "#FFB6C1",
    "lightPink": "#FFC0CB",
    "gold": "#FFD700",
    "softGold": "#F4A460",
    "lightGrey": "#888888"
  }
};

// Audio Context for Web Audio API
let audioContext = null;
let backgroundMusic = null;

// Initialize audio context
function initAudio() {
  try {
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContext;
  } catch (error) {
    console.log('Audio context not available:', error);
    return null;
  }
}

// Create chime sound using Web Audio API
function playChime() {
  try {
    const ctx = initAudio();
    if (!ctx) return;
    
    // Resume context if suspended
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    
    // Create a gentle chime sound
    const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5
    
    frequencies.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.type = 'sine';
      
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.5 + index * 0.2);
      
      osc.start(ctx.currentTime + index * 0.15);
      osc.stop(ctx.currentTime + 2 + index * 0.2);
    });
  } catch (error) {
    console.log('Chime sound not available:', error);
  }
}

// Create ambient background music
function startBackgroundMusic() {
  try {
    const ctx = initAudio();
    if (!ctx) return;
    
    // Resume context if suspended
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    
    // Create a gentle, ambient background tone
    const oscillator1 = ctx.createOscillator();
    const oscillator2 = ctx.createOscillator();
    const gainNode1 = ctx.createGain();
    const gainNode2 = ctx.createGain();
    
    oscillator1.connect(gainNode1);
    oscillator2.connect(gainNode2);
    gainNode1.connect(ctx.destination);
    gainNode2.connect(ctx.destination);
    
    // Soft, harmonic frequencies
    oscillator1.frequency.setValueAtTime(220, ctx.currentTime); // A3
    oscillator2.frequency.setValueAtTime(330, ctx.currentTime); // E4
    
    oscillator1.type = 'sine';
    oscillator2.type = 'sine';
    
    // Very gentle volume
    gainNode1.gain.setValueAtTime(0, ctx.currentTime);
    gainNode2.gain.setValueAtTime(0, ctx.currentTime);
    gainNode1.gain.linearRampToValueAtTime(0.02, ctx.currentTime + 2);
    gainNode2.gain.linearRampToValueAtTime(0.015, ctx.currentTime + 3);
    
    oscillator1.start();
    oscillator2.start();
    
    // Store references for potential cleanup
    backgroundMusic = { oscillator1, oscillator2, gainNode1, gainNode2 };
  } catch (error) {
    console.log('Background music not available:', error);
  }
}

// Petals animation system
class PetalsManager {
  constructor() {
    this.container = document.getElementById('petalsContainer');
    this.petals = [];
    this.isIntense = false;
    this.isRunning = false;
  }
  
  createPetal() {
    if (!this.container) return null;
    
    const petal = document.createElement('div');
    petal.className = 'petal';
    
    // Random properties
    const isGold = Math.random() < 0.3;
    const size = Math.random() < 0.3 ? 'large' : Math.random() < 0.5 ? 'small' : '';
    
    if (isGold) petal.classList.add('gold');
    if (size) petal.classList.add(size);
    
    // Random position and timing
    const leftPosition = Math.random() * 100;
    const animationDuration = this.isIntense ? 4 + Math.random() * 3 : 8 + Math.random() * 6;
    const delay = Math.random() * 1;
    
    petal.style.left = leftPosition + '%';
    petal.style.animationDuration = animationDuration + 's';
    petal.style.animationDelay = delay + 's';
    
    // Add some horizontal drift
    const drift = (Math.random() - 0.5) * 40;
    petal.style.setProperty('--drift', drift + 'px');
    
    this.container.appendChild(petal);
    this.petals.push(petal);
    
    // Remove petal after animation
    setTimeout(() => {
      if (petal && petal.parentNode) {
        petal.parentNode.removeChild(petal);
        const index = this.petals.indexOf(petal);
        if (index > -1) {
          this.petals.splice(index, 1);
        }
      }
    }, (animationDuration + delay + 1) * 1000);
    
    return petal;
  }
  
  startAnimation() {
    if (this.isRunning) return;
    this.isRunning = true;
    
    const animate = () => {
      if (!this.isRunning) return;
      
      this.createPetal();
      
      // Create new petals at intervals
      const interval = this.isIntense ? 200 : 1000;
      const randomDelay = Math.random() * 500;
      
      setTimeout(animate, interval + randomDelay);
    };
    
    // Start the animation loop
    animate();
    
    // Create initial petals immediately
    for (let i = 0; i < 3; i++) {
      setTimeout(() => this.createPetal(), i * 300);
    }
  }
  
  makeIntense() {
    this.isIntense = true;
    this.container.classList.add('petals-intense');
    
    // Create burst of petals
    for (let i = 0; i < 15; i++) {
      setTimeout(() => {
        this.createPetal();
      }, i * 80);
    }
  }
  
  stop() {
    this.isRunning = false;
  }
}

// Application controller
class HeartfeltApp {
  constructor() {
    this.petalsManager = new PetalsManager();
    this.isTransitioning = false;
    this.currentScreen = 'welcome';
    
    this.init();
  }
  
  init() {
    // Wait for DOM to be fully ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }
  
  setup() {
    this.loadContent();
    this.bindEvents();
    
    // Start petals animation after a short delay
    setTimeout(() => {
      this.petalsManager.startAnimation();
    }, 500);
    
    // Initialize audio context on first user interaction
    const initAudioOnce = () => {
      initAudio();
      document.removeEventListener('click', initAudioOnce);
      document.removeEventListener('touchstart', initAudioOnce);
    };
    document.addEventListener('click', initAudioOnce);
    document.addEventListener('touchstart', initAudioOnce);
  }
  
  loadContent() {
    const elements = {
      'welcomeText': appData.welcomeText,
      'surpriseMainText': appData.surpriseMainText,
      'handwrittenNote': appData.handwrittenNote,
      'footerText': appData.footerText
    };
    
    Object.keys(elements).forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        element.textContent = elements[id];
      }
    });
  }
  
  bindEvents() {
    // Main tap button
    const tapButton = document.getElementById('tapButton');
    if (tapButton) {
      tapButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!this.isTransitioning) {
          this.handleTransition('welcome', 'surprise');
        }
      });
      
      tapButton.addEventListener('touchend', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!this.isTransitioning) {
          this.handleTransition('welcome', 'surprise');
        }
      });
    }
    
    // Gift buttons
    const gift1Button = document.getElementById('gift1Button');
    const gift2Button = document.getElementById('gift2Button');
    
    if (gift1Button) {
      gift1Button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!this.isTransitioning) {
          this.handleTransition('surprise', 'gift1');
        }
      });
      
      gift1Button.addEventListener('touchend', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!this.isTransitioning) {
          this.handleTransition('surprise', 'gift1');
        }
      });
    }
    
    if (gift2Button) {
      gift2Button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!this.isTransitioning) {
          this.handleTransition('surprise', 'gift2');
        }
      });
      
      gift2Button.addEventListener('touchend', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!this.isTransitioning) {
          this.handleTransition('surprise', 'gift2');
        }
      });
    }
    
    // Back buttons
    const gift1BackButton = document.getElementById('gift1BackButton');
    const gift2BackButton = document.getElementById('gift2BackButton');
    
    if (gift1BackButton) {
      gift1BackButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!this.isTransitioning) {
          this.handleTransition('gift1', 'surprise');
        }
      });
      
      gift1BackButton.addEventListener('touchend', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!this.isTransitioning) {
          this.handleTransition('gift1', 'surprise');
        }
      });
    }
    
    if (gift2BackButton) {
      gift2BackButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!this.isTransitioning) {
          this.handleTransition('gift2', 'surprise');
        }
      });
      
      gift2BackButton.addEventListener('touchend', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!this.isTransitioning) {
          this.handleTransition('gift2', 'surprise');
        }
      });
    }
    
    // Add keyboard support
    document.addEventListener('keydown', (e) => {
      if ((e.key === 'Enter' || e.key === ' ') && !this.isTransitioning) {
        if (this.currentScreen === 'welcome') {
          e.preventDefault();
          this.handleTransition('welcome', 'surprise');
        }
      }
      
      // ESC to go back
      if (e.key === 'Escape' && !this.isTransitioning) {
        if (this.currentScreen === 'gift1' || this.currentScreen === 'gift2') {
          e.preventDefault();
          this.handleTransition(this.currentScreen, 'surprise');
        }
      }
    });
  }
  
  async handleTransition(fromScreen, toScreen) {
    if (this.isTransitioning) return;
    
    console.log(`Transitioning from ${fromScreen} to ${toScreen}...`);
    this.isTransitioning = true;
    
    const fromElement = document.getElementById(fromScreen + 'Screen');
    const toElement = document.getElementById(toScreen + 'Screen');
    
    if (!fromElement || !toElement) {
      console.error('Screen elements not found');
      this.isTransitioning = false;
      return;
    }
    
    // Special handling for initial welcome -> surprise transition
    if (fromScreen === 'welcome' && toScreen === 'surprise') {
      const tapButton = document.getElementById('tapButton');
      if (tapButton) {
        tapButton.disabled = true;
        tapButton.style.cursor = 'default';
      }
      
      // Play chime sound
      playChime();
      
      // Make petals intense
      this.petalsManager.makeIntense();
      
      // Fade out welcome screen
      fromElement.style.transition = 'opacity 0.8s ease-in-out, transform 0.8s ease-in-out';
      fromElement.style.opacity = '0';
      fromElement.style.transform = 'translateY(-20px)';
      
      // Wait for fade out
      await this.sleep(800);
      
      // Hide welcome, show surprise
      fromElement.classList.add('hidden');
      fromElement.style.display = 'none';
      toElement.classList.remove('hidden');
      toElement.style.display = 'flex';
      
      // Small delay then make surprise visible
      await this.sleep(50);
      
      // Show surprise screen with animation
      toElement.style.opacity = '1';
      toElement.style.transform = 'translateY(0)';
      toElement.classList.add('visible');
      
      // Start background music after a moment
      setTimeout(() => {
        startBackgroundMusic();
      }, 1500);
    } else {
      // Regular transitions between other screens
      // Fade out current screen
      if (fromElement.classList.contains('visible')) {
        fromElement.classList.remove('visible');
      }
      fromElement.style.opacity = '0';
      fromElement.style.transform = 'translateY(20px)';
      
      // Wait for fade out
      await this.sleep(300);
      
      // Hide current, show new
      fromElement.classList.add('hidden');
      fromElement.style.display = 'none';
      toElement.classList.remove('hidden');
      toElement.style.display = 'flex';
      
      // Small delay then make new screen visible
      await this.sleep(50);
      
      // Show new screen with animation
      toElement.style.opacity = '1';
      toElement.style.transform = 'translateY(0)';
      toElement.classList.add('visible');
    }
    
    this.currentScreen = toScreen;
    console.log(`Transition to ${toScreen} completed`);
    
    this.isTransitioning = false;
  }
  
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Global app instance
let app;

// Initialize the application
function initApp() {
  if (!app) {
    console.log('Initializing heartfelt app...');
    app = new HeartfeltApp();
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// Handle visibility change to pause/resume audio
document.addEventListener('visibilitychange', () => {
  if (audioContext) {
    if (document.hidden) {
      if (audioContext.state === 'running') {
        audioContext.suspend();
      }
    } else {
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
    }
  }
});

// Add dynamic CSS for better petal animations
const dynamicStyle = document.createElement('style');
dynamicStyle.textContent = `
  .petal {
    animation-fill-mode: forwards;
    will-change: transform, opacity;
  }
  
  @keyframes float {
    0% {
      transform: translateY(100vh) translateX(0) rotate(0deg);
      opacity: 0;
    }
    10% {
      opacity: 0.7;
    }
    50% {
      transform: translateY(50vh) translateX(var(--drift, 0px)) rotate(180deg);
    }
    90% {
      opacity: 0.7;
    }
    100% {
      transform: translateY(-10vh) translateX(var(--drift, 0px)) rotate(360deg);
      opacity: 0;
    }
  }
  
  @keyframes floatIntense {
    0% {
      transform: translateY(100vh) translateX(0) rotate(0deg) scale(1);
      opacity: 0;
    }
    15% {
      opacity: 0.9;
    }
    50% {
      transform: translateY(50vh) translateX(var(--drift, 0px)) rotate(180deg) scale(1.3);
      opacity: 0.9;
    }
    85% {
      opacity: 0.9;
    }
    100% {
      transform: translateY(-10vh) translateX(var(--drift, 0px)) rotate(360deg) scale(1);
      opacity: 0;
    }
  }
  
  .petals-intense .petal {
    animation-name: floatIntense;
  }
`;

// Add the style when DOM is ready
if (document.head) {
  document.head.appendChild(dynamicStyle);
} else {
  document.addEventListener('DOMContentLoaded', () => {
    document.head.appendChild(dynamicStyle);
  });
}